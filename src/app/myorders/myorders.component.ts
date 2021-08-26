import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { LoginServiceService } from '../login-service.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders:any;
  pricefilter:string ='asc';
  total:number = 0;

  constructor(private customerService : CustomerService,
    private router:Router,
    private tokenservice:TokenService,
    private loginService:LoginServiceService,
    ) { }

  ngOnInit(): void {

    this.loginService.isCustomerVisible = true;

    if(this.tokenservice.getToken() == null){
      this.router.navigate(["/login"]);
    }else{
    
      this.customerService.myOrder().subscribe(data=> {
        if(data.statusCode != 200){
          this.validate(data.statusCode);
          alert(data.message);
        }else{
          this.orders = data.data;
          this.total = this.orders.length;
        }
      });
    }
  }
  
  validate(code:any){
    if(code == 401)
      this.router.navigate(["/login"]);
  }

}
