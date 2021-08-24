import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../dropdown.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  reactiveForm:FormGroup;
  submitted:boolean = false;
  country: any ;
  state: any;
  hobby: any;
  selectedCounrty: string = 'Country';
  selectedState: string = 'State';
  hobbyList: string[] = [];
  index: number = -1;
  avatar: any;

  constructor(private router:Router, private formbuilder: FormBuilder , private dropdownservice: DropdownService , private http: HttpClient) {
      this.reactiveForm = this.formbuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      firstname: new FormControl(null,[Validators.required]),
      lastname: new FormControl(null,[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmpassword: new FormControl('',[Validators.required]),
      phoneno: new FormControl(null,[Validators.required]),
      address1: new FormControl(null,[Validators.required]),
      address2: new FormControl(null,[Validators.required]),
      pincode: new FormControl(null,[Validators.required]),
      avatar: null
    },
    {
      validators: this.MustMatch('password' , 'confirmpassword'),
    },
    );
   }

  get validate(){return this.reactiveForm.controls}

  IsvalidEmail(email: string){
    return (formGroup:FormGroup)=>{
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      const control = formGroup.controls[email];
      console.log(control.value);
      if(control.value != "" && (control.value.length < 5 || !EMAIL_REGEXP.test(control.value)) ){
        control.setErrors({IsvalidEmail:true});
      }else{
        control.setErrors(null);
      }
    }

  }

  MustMatch(password: string , confirmpassword: string){
    return (formGroup:FormGroup)=>{
      const control = formGroup.controls[password];
      const match = formGroup.controls[confirmpassword];
      if(match.errors && !match.errors.MustMatch){
        return
      }
      if(control.value !== match.value){
        match.setErrors({MustMatch:true});
      }else{
        match.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.dropdownservice.getCountry().subscribe(data => {
      this.country = JSON.parse(JSON.stringify(data.data));
    });
    this.dropdownservice.getHobby().subscribe(data => {
      this.hobby = JSON.parse(JSON.stringify(data.data));
    });
  }

  onChangeCountry(name:string){
    this.selectedCounrty = name; 
    this.dropdownservice.getState(name).subscribe(data => {
      this.state = JSON.parse(JSON.stringify(data.data));
    });
  }

  onChangeState(name:string){
    this.selectedState = name; 
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

  uploadFile(event:any) {
    const file = (event.target).files[0];
    this.avatar = file;
  }

  onSubmit(){
    this.submitted = true;
    var formData: any = new FormData();

    if(this.selectedCounrty != 'Country' && this.selectedState != 'State'){
       const data = {
        "firstName" : this.reactiveForm.controls['firstname'].value,
        "lastName" : this.reactiveForm.controls['lastname'].value,
        "emailId" : this.reactiveForm.controls['email'].value,
        "password" : this.reactiveForm.controls['password'].value,
        "gender" : "MALE",
        "phoneno" : this.reactiveForm.controls['phoneno'].value,
        "address1" : this.reactiveForm.controls['address1'].value,
        "address2" : this.reactiveForm.controls['address2'].value,
        "pincode" : this.reactiveForm.controls['pincode'].value,
        "country" : this.selectedCounrty,
        "state" : this.selectedState,
        "hobby" : this.hobbyList
      };
    
    formData.append("data", JSON.stringify(data));
    formData.append("profile", this.avatar);

    this.http.post<any>('http://localhost:8080/api/customer/register', formData,).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.router.navigate(["/login"]);
    }
  }
}
