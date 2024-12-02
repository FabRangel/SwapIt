import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIURL = 'http://127.0.0.1:8000/api/offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  getNewFood: EventEmitter<any> = new EventEmitter();
  private tk:string | null = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getOffers(){
    return this.http.get(`${APIURL}/`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getOffersByUser(user_id: number){
    return this.http.get(`${APIURL}/user/${user_id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }
  
}
