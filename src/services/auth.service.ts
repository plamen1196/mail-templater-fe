import { Inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_CREDENTIALS_TOKEN_KEY = 'email-templater-auth-token';
  private readonly authToken$: BehaviorSubject<string | null>;

  constructor(@Inject('Window') private window: Window) {
    const storedAuthToken = localStorage.getItem(this.AUTH_CREDENTIALS_TOKEN_KEY);
    this.authToken$ = new BehaviorSubject<string | null>(storedAuthToken);
  }

  getAuthToken(): Observable<string | null> {
    return this.authToken$.asObservable();
  }

  setAuthToken(authToken: string): void {
    if (authToken) {
      /* Save authentication */
      localStorage.setItem(this.AUTH_CREDENTIALS_TOKEN_KEY, authToken);

      this.authToken$.next(authToken);
    } else {
      /* Remove authentication */
      localStorage.removeItem(this.AUTH_CREDENTIALS_TOKEN_KEY);

      this.authToken$.next(null);
    }
  }

  generateBasicAuth(username: string, password: string): string {
    return this.window.btoa(username + ":" + password);
  }
}
