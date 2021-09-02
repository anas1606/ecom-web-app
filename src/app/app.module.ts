import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { VendorloginComponent } from './vendorlogin/vendorlogin.component';
import { VendorFeedComponent } from './vendor-feed/vendor-feed.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ProfileComponent } from './profile/profile.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './http-interceptor.service';

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
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
