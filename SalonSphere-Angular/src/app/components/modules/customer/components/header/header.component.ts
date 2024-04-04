import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocationService } from '../../../../services/common/location.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private locationService: LocationService, private router:Router) {}

  private customerCity: string = 'Ahmedabad';
  private customerCountry: string = 'India';

  ngOnInit(): void {
    //take the permission to the user to take the location of the user
    if(localStorage.getItem('location')==null){
    navigator.geolocation.getCurrentPosition(
      (positition) => {
        let endpoint = 'https://api.opencagedata.com/geocode/v1/json';
        let key = 'be879b6b424d483a810eae00a8a58307';
        let longitude = positition.coords.longitude;
        let letitude = positition.coords.latitude;
        let q = `${letitude},${longitude}`;
        console.log('location api');
        console.log(`${endpoint}?key=${key}&q=${q}&pretty=1`);
        let URL = `${endpoint}?key=${key}&q=${q}&pretty=1`;

        //call the loaction service which give the all the  information about the city and country by using the latitude and logitude
        this.locationService.location(URL).subscribe((response: any) => {
          console.log(response);
          this.customerCity = response.results[0].components.state_district;
          this.customerCity = this.customerCity.split(' ')[0];
          this.customerCountry = response.results[0].components.country;
          console.log('hare is your data' + this.customerCountry);

          // save the location in local storage also
          localStorage.setItem('location', this.customerCity);
          this.updateDropdown(this.customerCity,this.customerCountry);

        });
      },
      () => {
        this.updateDropdown('Ahmedabad', 'India');
        
      }
    );  
    }
    else{
      this.updateDropdown(localStorage.getItem('location'),'India');
    }
}

updateDropdown(city: any, country: string) {

  const dropdown = document.querySelector('.dropdown');
  // Remove existing options
  while (dropdown?.firstChild) {
    dropdown?.firstChild.remove();
  }

  // Add the default location option as the first option
  const defaultOption = document.createElement('option');
  defaultOption.textContent = `${city}, ${country}`;
  dropdown?.appendChild(defaultOption);

  // Add the "Enter your city" option as the second option
  const enterCityOption = document.createElement('option');
  enterCityOption.textContent = 'Enter your city';
  dropdown?.appendChild(enterCityOption);

  console.log(this.customerCity);
}

onDropdownChange(event: any): void {
  const selectedOption = event.target.value;
  if (selectedOption === 'Enter your city') {
    // Open modal using Swal for user to input their city
    Swal.fire({
      title: 'Enter your city',
      input: 'text',
      inputPlaceholder: 'Enter your city',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const enteredCity = result.value;
        // Update the dropdown menu with the entered city
        this.updateDropdown(enteredCity, '');
        let city = enteredCity.split(' ')[0];
        localStorage.setItem('location',city);
        console.log("come inside the header section");
        this.router.navigate(['/customer/view-shops']);
        window.location.reload();
      }
    });
  }
}
}
