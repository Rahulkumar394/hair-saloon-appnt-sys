import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopReviewService } from '../../../../services/shop-review/shop-review.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-shop',
  templateUrl: './review-shop.component.html',
  styleUrl: './review-shop.component.css',
})
export class ReviewShopComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private shopReviewService: ShopReviewService,
    private router: Router
  ) {}


  

  ownerName:string|null= localStorage.getItem('ownerName');
  ownerEmail:string|null= localStorage.getItem('ownerEmail');
  shopEmail: string|null = localStorage.getItem('shopEmail');
  shopName: string|null = '';
  shopContactNo:string|null='';
  state:string|null = '';
  district:string|null = '';
  landmark: string|null= '';
  licenseDocument:string|null='';





  ngOnInit(): void {
    console.log('come inside the oninit');
    this.showAllShopInformation();
  }

  //get all the information of the shop which is begin review
  showAllShopInformation() {
    console.log('come inside the show method');

    //git shop Email from the localStorage
    const shopEmail = localStorage.getItem('shopEmail');

    //if shopEmail is not present in the localStorage then redirect to the view-request page
    if (shopEmail === null) {
      this.router.navigate(['/admin/view-request']);
      return;
    }

    //else call the service which  will fetch shop information using the shopEmail
    this.shopReviewService.getReviewShop(shopEmail).subscribe((response:any)=>{
      console.log(response);
      this.shopName= response.shopName;
      this.shopContactNo= response.shopContactNo;
      this.state= response.state;
      this.district = response.district;
      this.landmark = response.landmark;
      this.licenseDocument = response.licenseDocument;
      
    },
    error=>{
      console.log("error occured"+ error);
    });
  }

  //approve the shop
  public approveShop() {
    //enable the spinner
    const spinner = document.querySelector('.spinner');
    spinner?.classList.remove('disable');

      //call the service
      this.shopReviewService.approveRequest(this.shopEmail).subscribe(response=>{
        console.log(response);
        spinner?.classList.add('disable');
        Swal.fire({
          title: 'Approved',
          text: 'Shop has been approved',
          icon: 'success',
        });
        this.router.navigate(['/admin/view-request']);
      },
      (error) => {
        console.log('error occured' + error);
        spinner?.classList.add('disable');
        Swal.fire({
          title: 'Error',
          text: 'Server error occured',
          icon: 'error',
        });
      }
    );
  }

  //reject the shop
  public rejectShop() {
    //take the surity to reject the job
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      //if the confirmation is done then reject
      if (result.isConfirmed) {
        //enable the spinner
        const spinner = document.querySelector('.spinner');
        spinner?.classList.remove('disable');

        //call the service
        this.shopReviewService.rejectRequest(this.shopEmail).subscribe(
          (response) => {
            console.log(response);
            spinner?.classList.add('disable');
            Swal.fire({
              title: 'Rejected!',
              text: 'Shop has been Rejected.',
              icon: 'success',
            });
            this.router.navigate(['/admin/view-request']);
          },
          (error) => {
            console.log('error in rejection');
            spinner?.classList.add('disable');
            Swal.fire({
              title: 'Error',
              text: 'Server error occured',
              icon: 'error',
            });
          }
        );
      }

      //else do nothing
      else {
        return;
      }
    });
  }

  public viewLicence() {
    //get image URL which has been come from backend
    const imgURL = this.shopContactNo;
    console.log(imgURL);
    Swal.fire({
      imageUrl: '../../../../../../assets/userUploadedImages/'+'licence_' + imgURL+'.jpg',
      imageAlt: "Licence Image Not Available",
      imageHeight: 550,
      imageWidth: 500,
    });
  }
}
