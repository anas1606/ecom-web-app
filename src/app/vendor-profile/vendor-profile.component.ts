import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {

  profile:any;
  isEdit:boolean = false;

  constructor(private tokenservice:TokenService,
    private vendorservice:VendorService,
    private router:Router) { }

  ngOnInit(): void {
    if(this.tokenservice.getToken() == null){
      this.router.navigate(["/vendor/login"]);
    }else{
      this.vendorservice.myProfile().subscribe(data=>{
        if(data.statusCode == 200){
          this.profile = data.data;
        }else{
          alert(data.message);
        }
      })
    }
  }

  uploadProfile(event:any){
    const file = (event.target).files[0];
    this.vendorservice.uploadProfile(file);
  }

  onEdit(){
    this.isEdit = true;
  }

  onUpdate(firstname:any,
    lastname:any,
    phoneno:any,
    comanpyname:any,
    address1:any,
    address2:any,
    country:any,
    state:any,
    pincode:any
    ){

      const data = {
        "firstName" : firstname.value,
        "lastName" : lastname.value,
        "companyName" : comanpyname.value,
        "phoneno" : phoneno.value,
        "address1" : address1.value,
        "address2" : address2.value,
        "country" : country.value,
        "state" : state.value,
        "pincode" : pincode.value
      }

      this.vendorservice.updateProfile(data).subscribe(data=>{
        if(data.statusCode == 200)
          window.location.reload();
        else
          alert(data.message);
      })
  }

  onLogout(){
    localStorage.removeItem("token");
    window.location.reload();
  }
}
