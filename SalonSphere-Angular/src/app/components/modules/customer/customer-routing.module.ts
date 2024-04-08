import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { customerGuardGuard } from '../../guards/customer/customer-guard.guard';
import { AddServiceToCardComponent } from './components/add-service-to-card/add-service-to-card.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { ViewShopsComponent } from './components/view-shops/view-shops.component';
import { ViewSlotsComponent } from './components/view-slots/view-slots.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'view-shops',
        component: ViewShopsComponent,
      },
      {
        path: 'add-service-to-card',
        component: AddServiceToCardComponent,
      },
      {
        path: 'view-shop',
        component: ShopInfoComponent,
      },
      {
        path: 'view-slots',
        canActivate: [customerGuardGuard],
        component: ViewSlotsComponent,
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent,
      },
      { path: 'booking-details', canActivate: [customerGuardGuard], component: BookingDetailsComponent },
      { path: '', redirectTo: '/customer/view-shops', pathMatch: 'full' },
      
    ],
  },

      
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path: 'profile',
        component: CustomerProfileComponent,
      },
      {
        path: 'edit-profile',
        component: UpdateUserProfileComponent,
      },
      { path: 'forgetPassword', component:ForgotPasswordComponent},
    ]
  }
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
