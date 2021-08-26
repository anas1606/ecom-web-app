import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { DropdownService } from '../dropdown.service';
import { LoginServiceService } from '../login-service.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feed:any;
  page:any;
  limit:number = 6;
  pricefilter:string ='asc';
  selectedcategory:string = "";
  category:any;

  constructor(private tokenservice:TokenService,
    private customerService : CustomerService,
    private router:Router,
    private dropdownservice:DropdownService,
    private loginService:LoginServiceService
    ) { }

  ngOnInit(): void {

    this.loginService.isCustomerVisible = true;

    if(this.tokenservice.getToken() == null){
      this.router.navigate(["/login"]);
    }else{
      const data = {
        "page" : 0,
        "limit" : this.limit,
        "sortorder" : this.pricefilter,
        "category" : this.selectedcategory,
        "search" : ""
      }

      this.dropdownservice.getCategory().subscribe(data=>{
        this.category = data.data;
      });


      this.customerService.feed(data).subscribe(data=> {
        if(data.statusCode != 200){
          this.validate(data.statusCode);
          alert(data.message);
        }else{
          this.feed = data.data;
          this.page = data.result;
        }
      });
    }
  }

  onBuyNow(id:string){
    this.customerService.buyNow(id).subscribe(data=>{
      this.validate(data.statusCode);
      alert(data.message);
    });
  }

  //   onChange , Filter Funtions

  oncategorySelect(event:any){
    if(event.target.checked)
      this.selectedcategory = event.target.value;
    else
      this.selectedcategory = "";
  }
  
  onPageChange(page:any){
    const data = {
      "page" : page,
      "limit" : this.limit,
      "sortorder" : this.pricefilter,
      "category" : this.selectedcategory,
      "search" : ""
    }
    this.customerService.feed(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.feed = data.data;
        this.page = data.result;
      }
    });
  }

  onCategoryFilter(){
    const data = {
      "page" : 0,
      "limit" : this.limit,
      "sortorder" : this.pricefilter,
      "category" : this.selectedcategory,
      "search" : ""
    }
    this.customerService.feed(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.feed = data.data;
        this.page = data.result;
      }
    });
  }

  onPriceFilter(event:any){
    this.pricefilter = event.target.value;
    
    const data = {
      "page" : 0,
      "limit" : this.limit,
      "sortorder" : this.pricefilter,
      "category" : this.selectedcategory,
      "search" : ""
    }
    this.customerService.feed(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.feed = data.data;
        this.page = data.result;
      }
    });
  }
  
  onSearch(search:string){
    const data = {
      "page" : 0,
      "limit" : this.limit,
      "sortorder" : this.pricefilter,
      "category" : this.selectedcategory,
      "search" : search
    }
    this.customerService.feed(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.feed = data.data;
        this.page = data.result;
      }
    });
  }
  
  validate(code:any){
    if(code == 401)
      this.router.navigate(["/login"]);
  }
  counter(i: number) {
    return new Array(i);
  }
}
