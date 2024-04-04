import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewRequestComponent } from './components/view-request/view-request.component';
import { HomeComponent } from './components/home/home.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ReviewShopComponent } from './components/review-shop/review-shop.component';
import { HeaderComponent } from './components/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';
import { ViewShopkeepersComponent } from './components/view-shopkeepers/view-shopkeepers.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    NavbarComponent,
    ViewRequestComponent,
    HomeComponent,
    ViewUserComponent,
    ReviewShopComponent,
    HeaderComponent,
    ReviewShopComponent,
    ViewCustomersComponent,
    ViewShopkeepersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatCardModule
  ]
})
export class AdminModule { }
