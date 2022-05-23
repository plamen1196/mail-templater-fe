import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';

import { AuthService } from 'src/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* Add header with basic auth credentials if token is provided and the request is to the api url. */
    return this.authService.getAuthToken()
      .pipe(
        switchMap((authToken) => {
          const isApiUrl = request.url.startsWith(environment.apiUrl);

          if (authToken && isApiUrl) {
              request = request.clone({
                  setHeaders: { 
                      Authorization: `Basic ${authToken}`
                  }
              });
          }

          return next.handle(request);   
        })
      );
  }
}
