import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AddServiceToCardComponent } from './components/add-service-to-card/add-service-to-card.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewShopsComponent } from './components/view-shops/view-shops.component';
import { ViewSlotsComponent } from './components/view-slots/view-slots.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DurationPipe } from '../shopkeeper/pipe/duration.pipe';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
// import {MatDialogModule} from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

import { MatSelectModule } from '@angular/material/select';
import { TimeSincePipe } from './components/pipe/time-since.pipe';
// import { ShopkeeperDurationPipe } from '../shopkeeper/pipe/shopkeeper-duration.pipe';




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
    ShopInfoComponent,
    TimeSincePipe
    // ShopkeeperDurationPipe

  ],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule,
    MatOption,
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
  ],
})
export class CustomerModule {}
