import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // ✅ Add these imports
import { throwError } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5278/api/auth';

  constructor(private http: HttpClient) {}

  // register(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, user);
  // }

  // register(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' as 'json' });
  // }
  
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' as 'json' }).pipe(
      tap(response => console.log(' Registration response:', response)),
      catchError(error => {
        console.error(' Registration error:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
  


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => console.log(' Login response:', response)),
      catchError(error => {
        console.error(' Login failed:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // login(credentials: any): Observable<{ token: string; role: string }> {
  //   return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, credentials);
  // }

  
}