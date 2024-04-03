import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  customerName: any = Cookie.get('name').split(' ')[0];

navigateHome() {
throw new Error('Method not implemented.');
}
navigateViewUsers() {
throw new Error('Method not implemented.');
}
viewBookings() {
throw new Error('Method not implemented.');
}
navigateLogout() {
throw new Error('Method not implemented.');
}

}
