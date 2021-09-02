import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private tokenService:TokenService,
    private http: HttpClient,
    private tokenservice:TokenService,
    private loderService:LoaderService) { }

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
    this.loderService.show()
    const headers = {'Authorization' : this.tokenService.getToken()};
    var formData: any = new FormData();
    formData.append("profile", avatar);
  
    return this.http.post<any>('http://localhost:8080/api/vendor/upload/profile', formData, { headers }).subscribe(data=>{
      alert(data.message);
      window.location.reload();
    });
  }

  updateProfile(data:any){
    this.tokenservice.storeName(data.firstName+" " +data.lastName);
    const headers = {'Content-Type': 'application/json' , 'Authorization' : this.tokenService.getToken()};
    return this.http.post<any>('http://localhost:8080/api/vendor/update', data, { headers });
  }


}
