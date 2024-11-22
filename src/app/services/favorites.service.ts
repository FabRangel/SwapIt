import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIURL = 'http://127.0.0.1:8000/api/favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  getNewFood: EventEmitter<any> = new EventEmitter();
  private tk:string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getFavorites(){
    return this.http.get(`${APIURL}/`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getFavorite(id: number){
    return this.http.get(`${APIURL}/${id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  createFavorite(body: any){
    return this.http.post(`${APIURL}/`, body , {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  updateFavorite(id: number, body: any){
    return this.http.put(`${APIURL}/${id}`, body, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  deleteFavorite(id: number){
    return this.http.delete(`${APIURL}/${id}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  showFavoritesByUser(user_id: number){
    return this.http.get(`${APIURL}/user/${user_id}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

}
