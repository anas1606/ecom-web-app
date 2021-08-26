import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'E COM';
  name : string = "";
  constructor(private loginservice:LoginServiceService,
    private router:Router,
    private tokenservice:TokenService){
  }

  ngOnInit(): void {
    this.name = this.tokenservice.getName();
  }

  logout(){
    this.loginservice.isCustomerVisible = false;
    this.router.navigate(["/login"]);
    localStorage.removeItem("token");
  }
}
