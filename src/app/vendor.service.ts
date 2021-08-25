import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private tokenService:TokenService,private http: HttpClient) { }

  feed (data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/vendor/feed', data, { headers });
  }

  addProduct(data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/vendor/add/product', data, { headers });
  }

  myProfile(){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.get<any>('http://localhost:8080/api/vendor/myprofile', { headers });
  }

  uploadProfile(avatar:any){
    const headers = {'Authorization' : this.tokenService.getToken()};
    var formData: any = new FormData();
    formData.append("profile", avatar);

    return this.http.post<any>('http://localhost:8080/api/vendor/upload/profile', formData, { headers }).subscribe(data=>{
      alert(data.message);
    });
  }

  updateProfile(data:any){
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/vendor/update', data, { headers });
  }


}
