import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopkeeperDashboardComponent } from './components/shopkeeper-dashboard/shopkeeper-dashboard.component';
import { shopGuardGuard } from '../../guards/shopkeeper/shop-guard.guard';
import { ViewshopsComponent } from './components/viewshops/viewshops.component';

import { HomeComponent } from './home/home.component';
import { ShopregisterComponent } from './components/shopregister/shopregister.component';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { UpdateShopComponent } from './components/update-shop/update-shop.component';
import { ViewShopServicesComponent } from './components/view-shop-services/view-shop-services.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';
import { ShopDashboardComponent } from './components/shop-dashboard/shop-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RequestAgainComponent } from './components/request-again/request-again.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';

const routes: Routes = [
  {
    path: '',
    component: ShopkeeperDashboardComponent,
    children: [
      { path: 'view-shop', component: ViewshopsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'updateshop', component: UpdateShopComponent },
      { path: 'add-shop', component: ShopregisterComponent },
      { path: '', redirectTo: '/shopkeeper/home', pathMatch: 'full' },
      { path: 'addservice', component: AddserviceComponent },
      { path: 'showServices', component: ViewShopServicesComponent },
      { path: 'updateService', component: UpdateServiceComponent },
      { path: 'shopDashboard', component: ShopDashboardComponent },
      { path: 'addEmployee', component:AddEmployeeComponent },
      { path: 'updateEmployee' , component:UpdateEmployeeComponent },
      { path: 'requestAgain', component:RequestAgainComponent },
      { path: 'viewBookings', component: ViewBookingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopkeeperRoutingModule {}
