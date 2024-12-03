import { EventEmitter, Injectable } from '@angular/core';
const APIURL = 'http://127.0.0.1:8000/api/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  getNewFood: EventEmitter<any> = new EventEmitter();
  private tk:string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${APIURL}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getUser(id: number){
    return this.http.get(`${APIURL}/${id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  updateUser(id: number, body: any){
    return this.http.put(`${APIURL}/${id}`, body, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  deleteUser(id: number){
    return this.http.delete(`${APIURL}/${id}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }
}
