import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.headers.set('key', 'DCtbqRXC8L');
    req.headers.set('testio', 'Mio testio');
    // console.log('req.headers.keys: ', req);

    const dupReq = req.clone({
      headers: req.headers,
      // url: environment.apiUrl + req.url
    });
    return next.handle(dupReq);

  }
}
