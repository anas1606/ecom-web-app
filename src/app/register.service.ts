import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  id:string = "0";
  type:string = "";
  constructor(private http: HttpClient,private router:Router) { }

  vendorRegister(data:any, avatar:any){

    var formData: any = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("profile", avatar);

    this.type = "vendor";

    return this.http.post<any>('http://localhost:8080/api/vendor/register', formData).subscribe(data=>{
      if(data.statusCode == 200){
        this.id = data.data;
        this.router.navigate(["/verify"]);
      }else{
        alert(data.message);
      }
    });
  }

  customerRegister(data:any, avatar:any){

    var formData: any = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("profile", avatar);

    this.type = "customer";

    return this.http.post<any>('http://localhost:8080/api/customer/register', formData).subscribe(data=>{
      if(data.statusCode == 200){
        this.id = data.data;
        this.router.navigate(["/verify"]);
      }else{
        alert(data.message);
      }
    });
  }

  verify (data:any){
    return this.http.post<any>('http://localhost:8080/api/'+this.type+'/verify', data).subscribe(data=>{
      if(data.statusCode == 200){
        if(this.type == "vendor")
          this.router.navigate(["/vendor/login"]);
        else
          this.router.navigate(["/login"]);
      }else{
        alert(data.message);
      }
    });
  }
}
