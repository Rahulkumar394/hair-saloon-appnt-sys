import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"forgotPassword", component: ForgotPasswordComponent},
  {path:"about", component: AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"register", component: RegisterComponent},
  {path:"", component: HomeComponent},
  {path:"admin", loadChildren: () => import('./components/modules/admin/admin.module').then((m)=> m.AdminModule)},
  {path:"customer", loadChildren: () => import('./components/modules/customer/customer.module').then((m)=> m.CustomerModule)},
  {path:"shopkeeper", loadChildren: () => import('./components/modules/shopkeeper/shopkeeper.module').then((m)=> m.ShopkeeperModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }