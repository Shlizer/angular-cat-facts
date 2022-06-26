import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { JWT } from './jwt';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Credentials } from '../models/credentials.model';
import { AuthResponse } from '../models/authResponse.model';

const Headers: any = {
  withCredentials: true,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
};

@Injectable()
export class AuthService {
  private currentUser$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private authenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(
    1
  );

  constructor(
    private http: HttpClient,
    private jwt: JWT,
    private router: Router
  ) {}

  attempAuth(credentials: Credentials) {
    const url = `${environment.baseUrl}login`;

    this.http
      .post<AuthResponse>(url, credentials, Headers)
      .subscribe((result) => {
        const res = result as unknown as AuthResponse;
        if (res.error === null) {
          this.jwt.save(res.token!);
        }

        this.setState({ username: '' });

        this.router.navigate(['dashboard']);
      });
  }

  verifyAuth(): void {
    if (this.jwt.get()) {
      this.http.get<User>('/me').subscribe(
        (res) => {
          this.currentUser$.next(res);
          this.authenticated$.next(true);
        },
        (err) => {
          this.jwt.destroy();
          this.currentUser$.next(null);
          this.authenticated$.next(false);
        }
      );
    } else {
      this.jwt.destroy();
      this.currentUser$.next(null);
      this.authenticated$.next(false);
    }
  }

  logout() {
    this.setState(null);
    this.jwt.destroy();
    this.router.navigate(['']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  private setState(state: User | null) {
    if (state) {
      this.currentUser$.next(state);
      this.authenticated$.next(true);
    } else {
      this.currentUser$.next(null);
      this.authenticated$.next(false);
    }
  }
}
