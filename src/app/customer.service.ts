import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private tokenService:TokenService,
    private http: HttpClient,
    private tokenservice:TokenService,
    private loaderService:LoaderService) { }

  feed (data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/customer/feed', data, { headers });
  }

  myOrder (){
    const headers = {'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/customer/myorders',{ headers });
  }

  buyNow (id:string){
    const headers = {'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/customer/buynow/'+id, {} ,{ headers });
  }

  myProfile(){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/customer/myprofile', { headers });
  }

  uploadProfile(avatar:any){
    const headers = {'Authorization' : this.tokenService.getToken()};
    var formData: any = new FormData();
    formData.append("profile", avatar);

    return this.http.post<any>('http://localhost:8080/api/customer/upload/profile', formData, { headers }).subscribe(data=>{
      alert(data.message);
      window.location.reload();
    });
  }

  updateProfile(data:any){
    this.tokenservice.storeName(data.firstName+" " +data.lastName);
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.put<any>('http://localhost:8080/api/customer/update', data, { headers });
  }

}
