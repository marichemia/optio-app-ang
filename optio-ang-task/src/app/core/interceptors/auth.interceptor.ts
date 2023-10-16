import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  accessToken: string = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiJpbnRlcm5zaGlwIiwiaW50ZXJuc2hpcElkIjoibWFyaWNoZW1pYTEwQGdtYWlsLmNvbSIsImlhdCI6MTY5NzQzMDI4MCwiZXhwIjoxNjk4Mjk0MjgwfQ.e49GHJxsgFrFbvyyrQEeHO6LNAHjrqGByzgY8pVMgPlbwIPoA8DNOtWXtqOOW0QacPB3LFz9nVK-ivfbhpsSEQ';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`)
    })

    return next.handle(authReq);

  }
}
