import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-vendorlogin',
  templateUrl: './vendorlogin.component.html',
  styleUrls: ['./vendorlogin.component.css']
})
export class VendorloginComponent implements OnInit {

  constructor(private loginservice: LoginServiceService) { }

  ngOnInit(): void {
  }

  onSignin(inputEmail:any , pswd:any){
    if(inputEmail != '' && pswd != ''){
      this.loginservice.vendorlogin(inputEmail,pswd);
    }
    else{
      alert("Requierd Filed Missing")
    }
  }

}
