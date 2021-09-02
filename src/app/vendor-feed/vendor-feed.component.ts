import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { DropdownService } from '../dropdown.service';

@Component({
  selector: 'app-vendor-feed',
  templateUrl: './vendor-feed.component.html',
  styleUrls: ['./vendor-feed.component.css']
})
export class VendorFeedComponent implements OnInit {

  feed:any;
  page:any;
  limit:number = 6;
  category:any;
  pricefilter:string ='asc';
  selectedcategory:string = "";
  username:string = 'aa';
  categoryToAdd:string = "Category";
  

  constructor(private tokenservice:TokenService,
    private router:Router,
    private vendorservice:VendorService,
    private dropdownservice:DropdownService) { }

  ngOnInit(): void {
    this.username = this.tokenservice.getName();

    if(this.tokenservice.getToken() == null){
      this.router.navigate(["/vendor/login"]);
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

      this.vendorservice.feed(data).subscribe(data=> {
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

  onPageChange(page:any){
    const data = {
      "page" : page,
      "limit" : this.limit,
      "sortorder" : this.pricefilter,
      "category" : this.selectedcategory,
      "search" : ""
    }
    this.vendorservice.feed(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.feed = data.data;
        this.page = data.result;
      }
    });
  }

  oncategorySelect(event:any){
    if(event.target.checked)
      this.selectedcategory = event.target.value;
    else
      this.selectedcategory = "";
  }

  onCategoryFilter(){
    const data = {
      "page" : 0,
      "limit" : this.limit,
      "sortorder" : this.pricefilter,
      "category" : this.selectedcategory,
      "search" : ""
    }
    this.vendorservice.feed(data).subscribe(data=> {
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
    this.vendorservice.feed(data).subscribe(data=> {
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
    this.vendorservice.feed(data).subscribe(data=> {
      if(data.statusCode != 200){
        this.validate(data.statusCode);
        alert(data.message);
      }else{
        this.feed = data.data;
        this.page = data.result;
      }
    });
  }

  onChangeCategory(event:any){
    this.categoryToAdd = event.target.value; 
  }

  addProduct(name:string,desc:string,price:any){
    if(this.categoryToAdd != "Category" && name.length > 0 && price > 0){
      const data = {
        "productName" : name,
        "desc" : desc,
        "price" : price,
        "category" : this.categoryToAdd
      }
      this.vendorservice.addProduct(data).subscribe(data=>{
        if(data.statusCode == 200){
          alert(data.message);
          window.location.reload();
        }else{
          this.validate(data.statusCode);
          alert(data.message);
        }
      });
    }else{
      alert("Fill All the Fields");
      if(price == 0 || price < 0 )
        alert("price can not be 0 or negative")
    }
  }

  onGetCategory(){
    this.dropdownservice.getCategory().subscribe(data=>{
      this.category = data.data;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  validate(code:any){
    if(code == 401)
      this.router.navigate(["/vendor/login"]);
  }

}
