import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIURL = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getNewFood: EventEmitter<any> = new EventEmitter();
  private tk:string | null = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(`${APIURL}/products`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProduct(id: number){
    return this.http.get(`${APIURL}/products/${id}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getCategories(){
    return this.http.get(`${APIURL}/categories`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByCategory(category: string){
    return this.http.get(`${APIURL}/categories/${category}/products`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  createProduct(body: any){
    return this.http.post(`${APIURL}/products`, body , {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  updateProduct(id: number, body: any){
    return this.http.put(`${APIURL}/products/${id}`, body, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  deleteProduct(id: number){
    return this.http.delete(`${APIURL}/products/${id}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  searchProducts(query: string){
    return this.http.get(`${APIURL}/products/search?q=${query}`, {
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getInterests(){
    return this.http.get(`${APIURL}/interests`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByInterest(interest: string){
    return this.http.get(`${APIURL}/interests/${interest}/products`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUser(id: number){
    return this.http.get(`${APIURL}/users/${id}/products`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUserInterest(id: number, interest: string){
    return this.http.get(`${APIURL}/users/${id}/interests/${interest}/products`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUserCategory(id: number, category: string){
    return this.http.get(`${APIURL}/users/${id}/categories/${category}/products`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUserCategoryInterest(id: number, category: string, interest: string){
    return this.http.get(`${APIURL}/users/${id}/categories/${category}/interests/${interest}/products`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUserCategoryInterestQuery(id: number, category: string, interest: string, query: string){
    return this.http.get(`${APIURL}/users/${id}/categories/${category}/interests/${interest}/products/search?q=${query}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUserQuery(id: number, query: string){
    return this.http.get(`${APIURL}/users/${id}/products/search?q=${query}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }

  getProductsByUserInterestQuery(id: number, interest: string, query: string){
    return this.http.get(`${APIURL}/users/${id}/interests/${interest}/products/search?q=${query}`,{
      headers:{
        Authorization: `Bearer ${this.tk}`
      }
    });
  }
  
  setNewFood(food:any){
    this.getNewFood.emit(food);
  }
  

}
