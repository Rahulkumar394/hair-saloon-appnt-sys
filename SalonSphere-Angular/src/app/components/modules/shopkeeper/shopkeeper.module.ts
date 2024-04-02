import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../../../app.component';
import { IDropdownSettings, NgMultiSelectDropDownModule, } from 'ng-multiselect-dropdown';


// import { FormGroup,FormControl } from '@angular/forms';

import { ShopkeeperRoutingModule } from './shopkeeper-routing.module';

// MatImports

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

import { MatSelectModule } from '@angular/material/select';





import { ShopkeeperDashboardComponent } from './components/shopkeeper-dashboard/shopkeeper-dashboard.component';
import { ViewshopsComponent } from './components/viewshops/viewshops.component';
import { UpdateShopComponent } from './components/update-shop/update-shop.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewShopServicesComponent } from './components/view-shop-services/view-shop-services.component';
import { ShopDashboardComponent } from './components/shop-dashboard/shop-dashboard.component';
// import { DurationPipe } from './pipe/duration.pipe';
import { PhoneNumberPipe } from './pipe/phone-number.pipe';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
// import { DurationPipe } from './pipe/duration.pipe';
import { ShopkeeperDurationPipe } from './pipe/shopkeeper-duration.pipe';
import { TimeSincePipe } from '../shopkeeper/pipe/time-since.pipe';


import { RequestAgainComponent } from './components/request-again/request-again.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { TimeFormatPipe } from './pipe/time-format.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';




@NgModule({
  declarations: [
    AppComponent,
    ShopkeeperDashboardComponent,
    ViewshopsComponent,
    UpdateShopComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    AddserviceComponent,
    UpdateServiceComponent,
    ViewShopServicesComponent,
    ShopDashboardComponent,
    PhoneNumberPipe,
    AddEmployeeComponent,
    ShopkeeperDurationPipe,
    TimeSincePipe,
    RequestAgainComponent,
    UpdateEmployeeComponent,
    ViewBookingsComponent,
    TimeFormatPipe,
    TimeFormatPipe,
    

  ],
  imports: [
    CommonModule,
    ShopkeeperRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    


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
    MatTabsModule,
    NgMultiSelectDropDownModule
    
    
  ]
})
export class ShopkeeperModule { }
