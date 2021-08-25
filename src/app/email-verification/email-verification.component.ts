import { Component, Input, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  id:string;
  constructor(private registerService: RegisterService) { 
    this.id = this.registerService.id;
  }

  ngOnInit(): void {
  }

  onClick(opt:any){
      const data = {
        'otp' : opt,
        'customerid' : this.id
      }
      this.registerService.verify(data);
  }
}
