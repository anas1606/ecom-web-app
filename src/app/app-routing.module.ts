import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


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
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
