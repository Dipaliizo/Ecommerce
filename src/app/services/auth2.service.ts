import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {
  private readonly tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
  private readonly profileUrl = 'https://api.linkedin.com/v2/me';

  constructor(private http: HttpClient) { }

  getAccessToken(code: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(environment.clientId + ':' + environment.clientSecret)}`,
    });
    const body = new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': environment.redirectUri,
      'client_id': environment.clientId,
      'client_secret': environment.clientSecret
    }).toString();

    return this.http.post(this.tokenUrl, body, { headers })
      .pipe(
        switchMap((response: any) => {
          const accessToken = response.access_token;
          return this.getUserProfile(accessToken);
        }),
        catchError(error => {
          console.error('Error fetching access token or user profile', error);
          return of(null);
        })
      );
  }

  private getUserProfile(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get(this.profileUrl, { headers })
      .pipe(
        switchMap(profile => {
          // Save the profile data to local storage
          localStorage.setItem('userProfile', JSON.stringify(profile));
          return of(profile);
        }),
        catchError(error => {
          console.error('Error fetching user profile', error);
          return of(null);
        })
      );
  }
}


