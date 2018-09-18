import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Link } from '../site-navigation/link.service';
import { DexieService } from '../dexie.service';
import {
  mergeMap,
  materialize,
  delay,
  dematerialize,
  switchMap,
  map
} from 'rxjs/operators';
import { Dexie } from 'dexie';

// List of status code: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let table: Dexie.Table<any, number>;
    let httpResponse: HttpResponse<any>;
    let errorResponse;
    let promise;
    window['DexieService'] = DexieService;
    const sort = (req.params.get('sort') || '').split(',');
    let sortIndex;
    if ( ['id', 'title', 'order'].includes(sort[0]) ) {
      sortIndex = sort[0];
    }
    let sortDirection;
    if ( sort[1] && ['asc', 'desc'].includes(sort[1])) { sortDirection = sort[1]; }

    const pageSize = +req.params.get('pageSize');
    const pageNum = +req.params.get('page');
    const search = req.params.get('q');

    // if()
    // const result = table
    // .where('[customerId+orderDate]')
    // .between(['FooCustomer', Dexie.minKey], ['FooCustomer', Dexie.maxKey])
    // .reverse()
    // .offset(pageNum * pageSize)
    // .limit(pageSize)
    // .toArray();

    // user api...

    // Links api...
    const linksApiUrlMatch = req.url.match(/\/api\/links\/?(\d+)?/); // TODO: Try a better/safer approach to url matching
    if (linksApiUrlMatch) {
      // TODO: Should first validade the whole request
      // 1) Match against all available methods
      // 2) In the matched method should match agains all available endpoints in this method
      // 3) In the matched endpoint should validate all params

      table = new DexieService().table<Link, number>('links');
      table.hook('creating', function (primKey, obj, trans) {
        if ( typeof obj.order !== 'number' ) { obj.order = 999999; }
        obj.createdDate = new Date();
      });

      table.hook('updating', function (newObj, primKey, obj, trans) {
        if ( typeof newObj['order'] !== 'number' ) { newObj['order'] = 999999; }
        newObj['lastUpdateDate'] = new Date();
      });

      // CRUD for the links API
      if (req.method === 'OPTIONS') {
        // Does nothing
        httpResponse = new HttpResponse({ status: 200, body: 'all' });
      } else if (req.method === 'POST') {

        // Create. ===============================>>> Needed params: Method: POST, body: Type Link,

        // TODO: procede (backend)validations on req.body
        promise = async () =>
          await table
            .add(req.body)
            .then(id => {
              // TODO: check if item was created
              httpResponse = new HttpResponse({ status: 201, body: id });
            })
            .catch(ex => {
              // TODO: Build httpErrorResponse according to ex(error)
          errorResponse = {
            error: {message: 'Bad request. Id is not valid'},
            status: 400,
            statusText: 'Bad request'
          };
            });
      } else if (req.method === 'GET') {
        // Read. ===============================>>>  Needed params: Method: GET, params: filter params
        const endPointWithId = linksApiUrlMatch[0].match(/\d+/);
        // TODO: resolve for malformed url

        // Read one
        if (endPointWithId) {
          const id = +endPointWithId[0];
          if ( typeof id === 'number') {
            promise = async () =>
              await table
                .get(id)
                .then(link => {
                  if (!link) {
                    errorResponse = {
                      error: { message: 'Not found' },
                      status: 404,
                      statusText: 'Not found'
                    };
                  } else {
                    httpResponse = new HttpResponse({
                      status: 200,
                      body: link
                    });
                  }
                })
                .catch(ex => {
                  // TODO: Build httpErrorResponse according to ex(error).
                  errorResponse = {
                    error: ex,
                    status: 500,
                    statusText: 'Server internal error'
                  };
                });
          } else {
            errorResponse = {
              error: {message: 'Bad request. Id is not valid'},
              status: 400,
              statusText: 'Bad request'
            };
          }
        } else if (req.url.endsWith('/api/links')) {
          // Read many:

          let result;
          console.log('typeof result 1\t:', typeof result);
          if ( sortDirection ) {
            if (sortDirection === 'desc') {
              result = table.orderBy(sortIndex).reverse();
            } else {
              result = table.orderBy(sortIndex);
            }
          }
          console.log('typeof result 2\t:', typeof result);
          if ( search ) {
            result = result
            .filter(function (item) {
                return item[search['field']].toLowerCase().indexOf(search['term']) > -1;
            });
          }
          window['table'] = result;
          console.log('typeof result 3\t:', typeof result);
          if ( !result ) { result = table; }
          promise = async () =>
            await result
              .toArray()
              .then(links => {
                if (!links) {
                  errorResponse = {
                    error: { message: 'No content' },
                    status: 204,
                    statusText: 'No Content'
                  };
                } else {
                  httpResponse = new HttpResponse({ status: 200, body: { results: links} });
                }
              })
              .catch(ex => {
                // TODO: Build httpErrorResponse according to ex(error).
                debugger;
                console.log('FakeBackendInterceptor:\t', ex);
                errorResponse = {
                  error: ex,
                  status: 500,
                  statusText: 'Server internal error'
                };
              });
        } else {
          errorResponse = {
            error: {message: 'Bad request. Id is not valid'},
            status: 400,
            statusText: 'Bad request'
          };
        }
        // TODO: handle filters and paginated data.
      } else if (req.method === 'PUT') {
        // Update. ===============================>>> Needed params: Method: PUT, body: Type Link,

        const urlStr = req.url.match(/\/api\/links(\/)?/);

        if (urlStr) {
          // TODO: procede (backend)validations on req.body

          const id = req.body.id;
          if ( typeof id === 'number') {
            promise = async () =>
              await table
                .update(req.body.id, req.body)
                .then(updated => {
                  httpResponse = new HttpResponse({ status: 200, body: updated });
                })
                .catch(ex => {
                  // TODO: Build httpErrorResponse according to ex(error).
                  errorResponse = {
                    error: ex,
                    status: 400,
                    statusText: 'Bad request'
                  };
                });
          }
        } else {
          // TODO: throw malformed url exception
          errorResponse = {
            error: {message: 'Bad request. Id is not valid'},
            status: 400,
            statusText: 'Bad request'
          };
        }
      } else if (req.method === 'DELETE') {
        // Delete. ===============================>>> Needed params: Method: DELETE, params: id,
        const endPointWithId = linksApiUrlMatch[0].match(/\d+/);
        const id = +endPointWithId[0];
        if ( typeof id === 'number') {
          // TODO: procede (backend)validations on req.body
          promise = async () =>
            await table
              .delete(id)
              .then(deleted => {
                httpResponse = new HttpResponse({ status: 200, body: deleted });
              })
              .catch(ex => {
                // TODO: Build httpErrorResponse according to ex(error).
                errorResponse = {
                  error: ex,
                  status: 500,
                  statusText: 'Server internal error'
                };
              });
        } else {
          errorResponse = {
            error: { message: 'MalformedUrlException.' },
            status: 404,
            statusText: 'Bad request'
          };
        }
      } else {
        errorResponse = {
          error: {message: 'Method not implemented'},
          status: 501,
          statusText: 'Method not implemented'
        };
      }

    } else {
      // The request is other than /api/liks
      return next.handle(req);
    }

    let interceptorReturn = of(null);

    if ( promise ) {
       // https://medium.com/@benlesh/rxjs-observable-interop-with-promises-and-async-await-bebb05306875
      interceptorReturn  = interceptorReturn.pipe(switchMap(promise));
    }
    return interceptorReturn
    .pipe(map(val => {console.log('val is:\t', val); return val || {message: 'Nothing to be sent.'}; }))
    .pipe(
      mergeMap(() => {
        if (errorResponse) {
          return throwError(errorResponse);
        } else {
          return of(httpResponse);
        }
      })
    )
    .pipe(materialize())
    .pipe(delay(300))
    .pipe(dematerialize());
  }
}
export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
