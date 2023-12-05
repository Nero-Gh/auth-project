import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  signUp(userObj: any) {
    return this.http.post(`${this.baseUrl}/register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}/login`, loginObj);
  }

  //This stores the token in the local storage
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  //this returns the token from the local storage
  getToken() {
    return localStorage.getItem('token');
  }

  //this checks if the user is logged in or not
  isLoggedIn() {
    // !! converts the value to boolean
    return !!localStorage.getItem('token');
  }
}
