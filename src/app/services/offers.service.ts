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
  
  getOffersByProduct(product_id: number){
    return this.http.get(`${APIURL}/product/${product_id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getOffer(offer_id: number){
    return this.http.get(`${APIURL}/${offer_id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }
   

  updateOffer(offer_id: number, body: any){
    return this.http.put(`${APIURL}/${offer_id}`, body, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  deleteOffer(offer_id: number){
    return this.http.delete(`${APIURL}/${offer_id}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  createOffer(body: any){
    return this.http.post(`${APIURL}/`, body, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }
  
}
