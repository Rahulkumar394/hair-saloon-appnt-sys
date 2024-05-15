import { Component } from '@angular/core';
import { ToggleService } from '../../../../services/toggle.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {

  leftMargin: string = '280px';
  width: string = '86%';

  constructor(private toggleService:ToggleService) {}

  ngOnInit(): void {

    this.toggleService.leftMargin$.subscribe(margin => {
      this.leftMargin = margin;
    });

    this.toggleService.width$.subscribe(width => {
      this.width = width;
    });
  
  }
}


