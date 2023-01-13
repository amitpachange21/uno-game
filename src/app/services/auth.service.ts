import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    
    const loginUrl = `${this.baseUrl}/login`;
    
    let params = new HttpParams();
    params = params.append("email", email);
    params = params.append("password", password);

    return this.http.get<{token:string}>(loginUrl, {params: params});
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

}
