import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice: LoginServiceService) {
    this.loginservice.isCustomerVisible = false;
  }

  ngOnInit(): void{
    this.loginservice.isCustomerVisible = false;
  }

  onSignin(inputEmail:any , pswd:any){
    if(inputEmail != '' && pswd != ''){
      this.loginservice.login(inputEmail,pswd);
    }
    else{
      alert("Requierd Filed Missing")
    }
  }
}
