import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() clck = new EventEmitter();
  title: string = 'E COM';

  constructor() { 
  }

  ngOnInit(): void {
  }

  onClick(){
      this.clck.emit();
      this.title = "clicked";
  }

  logout(){
    this.title = "log";
    localStorage.removeItem("token");
  }
}
