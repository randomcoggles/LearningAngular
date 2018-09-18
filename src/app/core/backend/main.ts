import { HttpRequest, HttpHandler } from '@angular/common/http';


// interface IPersistedEntity;


export default class ClientServer {
  req: HttpRequest<any>;
  next: HttpHandler;
  persistedEntities: {};
  constructor(req: HttpRequest<any>, next: HttpHandler) {
    this.req = req;
    this.next = next;

    this._validateHttpRequest(req);
  }

  private _validateHttpRequest(req: HttpRequest<any>) {
    let validationResult;
    // TODO: Read apiUrl from a config file
    const linksApiUrlMatch = req.url.match(/\/api\/^[a-zA-Z]+$+(\d|\w)+\/?(\d+)?/); // TODO: Try a better/safer approach to url matching
    const url = '/api/links/2';
    const urlSplit = url.split('/api/'); // match(/\/api\/\w+(\d|\w)+\/?(\d+)?/)[0];
    const isApi = urlSplit && urlSplit[1];
    if (isApi) {
      const antityName = urlSplit[1].split('/')[0];
      let table = this.persistedEntities[antityName];

    } else {

    }
  }

  call() {

  }
}
