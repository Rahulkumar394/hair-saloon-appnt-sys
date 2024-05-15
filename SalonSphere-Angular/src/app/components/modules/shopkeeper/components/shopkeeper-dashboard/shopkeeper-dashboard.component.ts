import { Component, OnInit } from '@angular/core';
import { GetshopService } from '../../../../services/getshop/getshop.service';
import { Cookie } from 'ng2-cookies';
import { FormControl, FormGroup } from '@angular/forms';
import { ToggleService } from '../../../../services/toggle.service';

@Component({
  selector: 'app-shopkeeper-dashboard',
  templateUrl: './shopkeeper-dashboard.component.html',
  styleUrl: './shopkeeper-dashboard.component.css',
})
export class ShopkeeperDashboardComponent implements OnInit {
  data: any[] = [];
  leftMargin: string = '280px';
  width: string = "86%";

  constructor(private getshop: GetshopService, private toggleService:ToggleService) {}

  ngOnInit(): void {

    this.toggleService.leftMargin$.subscribe(margin => {
      this.leftMargin = margin;
    });

    this.toggleService.width$.subscribe(width => {
      this.width = width;
    });

    this.getshop.getshop(Cookie.get('userId')).subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
  }
}
