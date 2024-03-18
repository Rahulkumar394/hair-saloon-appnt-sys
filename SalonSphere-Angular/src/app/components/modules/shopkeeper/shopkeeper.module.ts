import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormGroup,FormControl } from '@angular/forms';

import { ShopkeeperRoutingModule } from './shopkeeper-routing.module';

// MatImports

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';





import { AddshopserviceComponent } from './components/addshopservice/addshopservice.component';
import { ShopkeeperDashboardComponent } from './components/shopkeeper-dashboard/shopkeeper-dashboard.component';
import { ShopkeeperprofileComponent } from './components/shopkeeperprofile/shopkeeperprofile.component';
import { UpdateshopserviceComponent } from './components/updateshopservice/updateshopservice.component';
import { ViewShopInfoComponent } from './components/view-shop-info/view-shop-info.component';
import { ViewshopsComponent } from './components/viewshops/viewshops.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateShopComponent } from './components/update-shop/update-shop.component';



@NgModule({
  declarations: [
    ShopkeeperDashboardComponent,
    ViewshopsComponent,
    ShopkeeperprofileComponent,
    AddshopserviceComponent,
    UpdateshopserviceComponent,
    ViewShopInfoComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    UpdateShopComponent
  ],
  imports: [
    CommonModule,
    ShopkeeperRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    


    // Mat Imports
    MatInputModule,
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
