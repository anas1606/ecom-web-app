import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../dropdown.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {

  profile:any;
  isEdit:boolean = false; 
  reactiveForm:FormGroup;
  submitted: boolean = false;
  selectedCountry:string ='';
  selectedState:string ='';
  country: any ;
  state: any;

  constructor(private tokenservice:TokenService,
    private vendorservice:VendorService,
    private router:Router,
    private formbuilder: FormBuilder,
    private dropdownservice: DropdownService) { 

      this.reactiveForm = this.formbuilder.group({
        firstname: new FormControl(null,[Validators.required]),
        lastname: new FormControl(null,[Validators.required]),
        phoneno: new FormControl(null,[Validators.required]),
        address1: new FormControl(null,[Validators.required]),
        address2: new FormControl(null,[Validators.required]),
        pincode: new FormControl(null,[Validators.required]),
        companyname: new FormControl(null,[Validators.required]),
      });

    }
    get validate(){return this.reactiveForm.controls}

  ngOnInit(): void {
    if(this.tokenservice.getToken() == null){
      this.router.navigate(["/vendor/login"]);
    }else{
      this.vendorservice.myProfile().subscribe(data=>{
        if(data.statusCode == 200){
          this.profile = data.data;
        }else{
          this.validat(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  uploadProfile(event:any){
    const file = (event.target).files[0];
    this.vendorservice.uploadProfile(file);
  }

  onEdit(){
    this.isEdit = true;

    this.dropdownservice.getCountry().subscribe(data => {
      this.country = JSON.parse(JSON.stringify(data.data));
    });

    this.reactiveForm.controls["firstname"].setValue(this.profile.firstName);
    this.reactiveForm.controls["lastname"].setValue(this.profile.lastName);
    this.reactiveForm.controls["phoneno"].setValue(this.profile.phoneno);
    this.reactiveForm.controls["companyname"].setValue(this.profile.compnayName);
    this.reactiveForm.controls["address1"].setValue(this.profile.address1);
    this.reactiveForm.controls["address2"].setValue(this.profile.address2);
    this.reactiveForm.controls["pincode"].setValue(this.profile.pincode);
    this.selectedCountry = this.profile.country;
    this.selectedState = this.profile.state;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.selectedCountry != 'Country' , this.selectedState != 'State' , this.reactiveForm.valid);
    if(this.selectedCountry != 'Country' && this.selectedState != 'State' && this.reactiveForm.valid ){
      const data = {
        "firstName" : this.reactiveForm.controls["firstname"].value,
        "lastName" : this.reactiveForm.controls["lastname"].value,
        "companyName" : this.reactiveForm.controls["companyname"].value,
        "phoneno" : this.reactiveForm.controls["phoneno"].value,
        "address1" : this.reactiveForm.controls["address1"].value,
        "address2" : this.reactiveForm.controls["address2"].value,
        "country" : this.selectedCountry,
        "state" : this.selectedState,
        "pincode" : this.reactiveForm.controls["pincode"].value
      }

      this.vendorservice.updateProfile(data).subscribe(data=>{
        if(data.statusCode == 200)
          window.location.reload();
        else{
          this.validat(data.statusCode);
          alert(data.message);
        }
      });

    }else{
      alert("Please Fill All the Fields");
    }
  }

  onChangeCountry(name:string){
    this.selectedCountry = name; 
    this.selectedState = 'State';
    this.dropdownservice.getState(name).subscribe(data => {
      this.state = JSON.parse(JSON.stringify(data.data));
    });
  }

  onChangeState(name:string){
    this.selectedState = name; 
  }

  onLogout(){
    localStorage.removeItem("token");
    window.location.reload();
  }

  getProfileURL() : string{
      return this.profile.profile_url + "?" + new Date().getTime(); 
  }
  validat(code:any){
    if(code == 401)
      this.router.navigate(["/vendor/login"]);
  }

}
