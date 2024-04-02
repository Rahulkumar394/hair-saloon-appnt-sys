import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewShopsComponent } from './components/view-shops/view-shops.component';
import { AddServiceToCardComponent } from './components/add-service-to-card/add-service-to-card.component';
import { ViewSlotsComponent } from './components/view-slots/view-slots.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



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
import { DurationPipe } from '../shopkeeper/pipe/duration.pipe';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    ViewShopsComponent,
    AddServiceToCardComponent,
    ViewSlotsComponent,
    DurationPipe,
    PaymentMethodComponent,
    BookingDetailsComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    NgbDatepickerModule,
    FormsModule,
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
    
  ]
})
export class CustomerModule { }
