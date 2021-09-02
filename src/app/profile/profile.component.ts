import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../dropdown.service';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:any;
  isEdit:boolean = false; 
  reactiveForm:FormGroup;
  submitted: boolean = false;
  selectedCountry:string ='';
  selectedState:string ='';
  country: any ;
  state: any;
  gender: string = "MALE";
  hobby: any;
  hobbyList: any;
  index: number = -1;

  constructor(private loginservice:LoginServiceService,
    private customerservice:CustomerService,
    private router:Router,
    private formbuilder: FormBuilder,
    private dropdownservice: DropdownService,
    private tokenservice:TokenService
    ) {

    this.reactiveForm = this.formbuilder.group({
      firstname: new FormControl(null,[Validators.required]),
      lastname: new FormControl(null,[Validators.required]),
      phoneno: new FormControl(null,[Validators.required]),
      address1: new FormControl(null,[Validators.required]),
      address2: new FormControl(null,[Validators.required]),
      pincode: new FormControl(null,[Validators.required]),
    });

   }

  ngOnInit(): void {
    this.loginservice.isCustomerVisible = true;
    if(this.tokenservice.getToken() == null){
      this.router.navigate(["/login"]);
    }else{
      this.customerservice.myProfile().subscribe(data=>{
        if(data.statusCode == 200){
          this.profile = data.data;
          this.profile.gender = (this.profile.gender == 1) ? "MALE" : "FEMALE";
          this.hobbyList = data.data.hobby
          this.gender = this.profile.gender;
        }else{
          this.validat(data.statusCode);
          alert(data.message);
        }
      });
    }
  }

  get validate(){return this.reactiveForm.controls}
  
  uploadProfile(event:any){
    const file = (event.target).files[0];
    this.customerservice.uploadProfile(file);
  }

  onEdit(){
    this.isEdit = true;

    this.dropdownservice.getCountry().subscribe(data => {
      this.country = JSON.parse(JSON.stringify(data.data));
    });

    this.dropdownservice.getHobby().subscribe(data => {
      this.hobby = JSON.parse(JSON.stringify(data.data));
    });

    this.reactiveForm.controls["firstname"].setValue(this.profile.firstname);
    this.reactiveForm.controls["lastname"].setValue(this.profile.lastname);
    this.reactiveForm.controls["phoneno"].setValue(this.profile.phoneno);
    this.reactiveForm.controls["address1"].setValue(this.profile.address1);
    this.reactiveForm.controls["address2"].setValue(this.profile.address2);
    this.reactiveForm.controls["pincode"].setValue(this.profile.pincode);
    this.selectedCountry = this.profile.country;
    this.selectedState = this.profile.state;
  }

  onSubmit(){
    this.submitted = true;
   
    if(this.selectedCountry != 'Country' && this.selectedState != 'State' && this.reactiveForm.valid ){
      
      const data = {
        "firstName" : this.reactiveForm.controls["firstname"].value,
        "lastName" : this.reactiveForm.controls["lastname"].value,
        "phoneno" : this.reactiveForm.controls["phoneno"].value,
        "address1" : this.reactiveForm.controls["address1"].value,
        "address2" : this.reactiveForm.controls["address2"].value,
        "country" : this.selectedCountry,
        "state" : this.selectedState,
        "gender" : this.gender,
        "pincode" : this.reactiveForm.controls["pincode"].value,
        "hobby" : this.hobbyList
      }      

     this.customerservice.updateProfile(data).subscribe(data=>{
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

  onGenderChnage(event:any){
    if(event.target.value == "FEMALE"){
      this.gender = "FEMALE";
    }else{
      this.gender = "MALE";
    }
  }

  check(hobby:string , event:any){
    if(event.target.checked){
      this.hobbyList.push(hobby)
    }else{
        this.index = this.hobbyList.indexOf(hobby);
        if( this.index != -1){
          this.hobbyList.splice(this.index,1)
        }
    }
  }

  getProfileURL() : string{
    return this.profile.profile_url + "?" + new Date().getTime(); 
  }

  validat(code:any){
    if(code == 401)
      this.router.navigate(["/vendor/login"]);
  }

}
