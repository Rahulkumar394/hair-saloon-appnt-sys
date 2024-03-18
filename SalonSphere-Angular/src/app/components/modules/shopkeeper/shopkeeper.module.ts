import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormGroup,FormControl } from '@angular/forms';

import { ShopkeeperRoutingModule } from './shopkeeper-routing.module';

// MatImports

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';





import { ShopkeeperDashboardComponent } from './components/shopkeeper-dashboard/shopkeeper-dashboard.component';
import { ViewshopsComponent } from './components/viewshops/viewshops.component';
import { UpdateShopComponent } from './components/update-shop/update-shop.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';
import { ViewShopServicesComponent } from './components/view-shop-services/view-shop-services.component';



@NgModule({
  declarations: [
    ShopkeeperDashboardComponent,
    ViewshopsComponent,
    UpdateShopComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    AddserviceComponent,
    UpdateServiceComponent,
    ViewShopServicesComponent
  ],
  imports: [
    CommonModule,
    ShopkeeperRoutingModule,
    MatCardModule,
    ReactiveFormsModule,

    // Mat Imports
    MatTooltipModule,
    MatButtonModule,  
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MatAccordion,
    MatDialogModule,
    MatOption,
    MatSelectModule, 
  ]
})
export class ShopkeeperModule { }
