import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'profile', component:ProfileComponent},
  { path:'dashboard', component: DashboardComponent },
  { path:'about', component:AboutComponent},
  { path:'register', component:RegisterComponent},  
  { path:'forgotPassword',component:ForgotPassComponent},
  { path:'resetpassword',component:ResetPassComponent},
    
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
