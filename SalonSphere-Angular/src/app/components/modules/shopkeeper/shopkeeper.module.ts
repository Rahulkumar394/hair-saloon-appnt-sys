import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



import { ShopkeeperDashboardComponent } from './components/shopkeeper-dashboard/shopkeeper-dashboard.component';
import { ViewshopsComponent } from './components/viewshops/viewshops.component';
import { ShopkeeperprofileComponent } from './components/shopkeeperprofile/shopkeeperprofile.component';
import { AddshopserviceComponent } from './components/addshopservice/addshopservice.component';
import { UpdateshopserviceComponent } from './components/updateshopservice/updateshopservice.component';



@NgModule({
  declarations: [
    ShopkeeperDashboardComponent,
    ViewshopsComponent,
    ShopkeeperprofileComponent,
    AddshopserviceComponent,
    UpdateshopserviceComponent
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
    MatDialogModule
  ]
})
export class ShopkeeperModule { }
