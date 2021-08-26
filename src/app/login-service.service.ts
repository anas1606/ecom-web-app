import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  isCustomerVisible:boolean = false;

  constructor(private router:Router , private http: HttpClient , private tokenservice: TokenService) { }

  login(email: string , pswd : string){
      const headers = {'Content-Type': 'application/json'};
      const body = { emailId: email , password : pswd };
      this.http.post<any>('http://localhost:8080/api/customer/login', body, { headers }).subscribe(data =>{
        if(data.statusCode == 200){
          // Store the Token to Local Storage
          this.tokenservice.storeToken(data.data.session_token);
          this.tokenservice.storeName(data.data.first_name+" " +data.data.last_name);

          this.router.navigate(["/dashboard"]);
          this.isCustomerVisible = true;
          alert(data.message);
        }else{
          alert(data.message);
        }
      });
  }

  vendorlogin(email: string , pswd : string){
    const headers = {'Content-Type': 'application/json'};
    const body = { emailId: email , password : pswd };
    this.http.post<any>('http://localhost:8080/api/vendor/login', body, { headers }).subscribe(data =>{
      if(data.statusCode == 200){
        // Store the Token to Local Storage
        this.tokenservice.storeToken(data.data.session_token);
        this.tokenservice.storeName(data.data.first_name+" " +data.data.last_name);
        this.router.navigate(["/vendor/dashboard"]);
        alert(data.message);
      }else{
        alert(data.message);
      }
    });
}
}
