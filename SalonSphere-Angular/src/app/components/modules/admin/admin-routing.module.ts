import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewRequestComponent } from './components/view-request/view-request.component';
import { HomeComponent } from './components/home/home.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ReviewShopComponent } from './components/review-shop/review-shop.component';
import { adminGuardGuard } from '../../guards/admin/admin-guard.guard';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';
import { ViewShopkeepersComponent } from './components/view-shopkeepers/view-shopkeepers.component';



const routes: Routes = [
  {
    path: '',
    canActivate: [adminGuardGuard],
    component: AdminDashboardComponent,
    children: [{path: 'home', component: HomeComponent},
      { path: 'view-request', component: ViewRequestComponent},
      { path: 'view-user', component: ViewUserComponent},
      {path: 'review-shop', component: ReviewShopComponent},
      {path: 'viewCustomers', component: ViewCustomersComponent},
      {path: 'viewShopkeepers', component: ViewShopkeepersComponent},
    {path: '', redirectTo: '/admin/home', pathMatch: 'full'}
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
