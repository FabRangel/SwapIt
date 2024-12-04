import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIURL = 'http://127.0.0.1:8000/api/messages';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  getNewFood: EventEmitter<any> = new EventEmitter();
  private tk:string | null = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getMessages(){
    return this.http.get(`${APIURL}/`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getMessage(id: number){
    return this.http.get(`${APIURL}/${id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  createMessage(body: any){
    return this.http.post(`${APIURL}/`, body , {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  updateMessage(id: number, body: any){
    return this.http.put(`${APIURL}/${id}`, body, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  deleteMessage(id: number){
    return this.http.delete(`${APIURL}/${id}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }
  
}
