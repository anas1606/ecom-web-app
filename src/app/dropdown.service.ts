import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DropdownService {

  constructor(private http: HttpClient) { }
  getCountry(){
    return this.http.get<any>("http://localhost:8080/api/admin/dropdown/country");
  }

  getState(country:string){
    return this.http.get<any>("http://localhost:8080/api/admin/dropdown/state/"+country);
  }

  getHobby(){
    return this.http.get<any>("http://localhost:8080/api/admin/dropdown/hobby");
  }

  getCategory(){
    return this.http.get<any>("http://localhost:8080/api/admin/dropdown/category");
  }
}
