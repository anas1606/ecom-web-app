import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeToken(token: string){
    localStorage.setItem("token","Bearer "+token);
  }

  storeName(name: string){
    localStorage.setItem("name",name);
  }

  getToken(): any{
    return localStorage.getItem("token");
  }

  getName(): any{
    return localStorage.getItem("name");
  }

  deleteToken(){
    localStorage.removeItem("token")
  }

  deleteName(){
    localStorage.removeItem("name")
  }
}
