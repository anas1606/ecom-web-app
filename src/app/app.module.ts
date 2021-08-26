import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { VendorloginComponent } from './vendorlogin/vendorlogin.component';
import { VendorFeedComponent } from './vendor-feed/vendor-feed.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ProfileComponent } from './profile/profile.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    EmailVerificationComponent,
    VendorloginComponent,
    VendorFeedComponent,
    VendorProfileComponent,
    MyordersComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
