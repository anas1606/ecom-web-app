import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeToken(token: string){
    localStorage.setItem("token","Bearer "+token);
  }

  getToken(): any{
    return localStorage.getItem("token");
  }

  deleteToken(){
    localStorage.removeItem("token")
  }
}
