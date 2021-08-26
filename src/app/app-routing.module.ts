import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { VendorFeedComponent } from './vendor-feed/vendor-feed.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { VendorloginComponent } from './vendorlogin/vendorlogin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch : "full"
  },
  { path: 'login',
   component: LoginComponent,
   pathMatch : "full"
  },
  { path: 'dashboard',
   component: DashboardComponent,
   pathMatch : "full"
  },
  { path: 'register',
   component: RegistrationComponent,
   pathMatch : "full"
  },
  { path: 'verify',
   component: EmailVerificationComponent,
   pathMatch : "full"
  },
  { path: 'myorders',
   component: MyordersComponent,
   pathMatch : "full"
  },
  { path: 'profile',
   component: ProfileComponent,
   pathMatch : "full"
  },
  { path: 'vendor/login',
   component: VendorloginComponent,
   pathMatch : "full"
  },
  { path: 'vendor/dashboard',
   component: VendorFeedComponent,
   pathMatch : "full"
  },
  { path: 'vendor/profile',
   component: VendorProfileComponent,
   pathMatch : "full"
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
