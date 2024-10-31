import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIURL = 'http://127.0.0.1:8000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body:any){
    return this.http.post(`${APIURL}/login`, body);
 }

 register(body:any){
    return this.http.post(`${APIURL}/register`, body);
 }
}
