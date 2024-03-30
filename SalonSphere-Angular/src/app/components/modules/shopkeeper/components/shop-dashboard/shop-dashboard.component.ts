import { Component, OnInit } from '@angular/core';
import { GetServiceInfoService } from '../../../../services/fetchShopServices/get-service-info.service';
import { FetchshopInfoService } from '../../../../services/fetchshopInfo/fetchshop-info.service';
import Swal from 'sweetalert2';
import { DeleteServiceService } from '../../../../services/deleteService/delete-service.service';
import { FetchReviewsService } from '../../../../services/viewReviews/fetch-reviews.service';
import { LikeService } from '../../../../services/like/like.service';
import { FetchEmployeeService } from '../../../../services/fetchEmployee/fetch-employee.service';
import { error } from 'console';
interface employee {
  employeeName: any;
  email: any;
  contactNumber: any;
  salary: any;
  gender: any;
  services: any;
  address: any;
  employeeId: any;
}
@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrl: './shop-dashboard.component.css',
})
export class ShopDashboardComponent implements OnInit {
  constructor(
    private fetchshopInfo: FetchshopInfoService,
    private getShopServices: GetServiceInfoService,
    private removeService: DeleteServiceService,
    private reviewService: FetchReviewsService,
    private likeService: LikeService,
    private fetchEmployeeService: FetchEmployeeService
  ) {}

  data: any[] = [];
  reviews: any[] = [];
  employeeInfo: employee[] = [];

  shopData: any;
  amount: any;
  ngOnInit(): void {
    this.fetchshopInfo
      .fetchshopInfo(localStorage.getItem('shopEmail'))
      .subscribe((data: any) => {
        this.shopData = data;
        console.log(this.shopData.coverImage);
      });

    this.getShopServices
      .fetchAllServices(localStorage.getItem('shopId'))
      .subscribe((data: any) => {
        this.data = data;
        this.amount = data.servicePrice;

        console.log('Hello This is get Shop By email', data);
      });

    this.reviewService.getReviews(localStorage.getItem('shopId')).subscribe(
      (data: any) => {
        this.reviews = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.fetchEmployeeService
      .fetchEmployee(localStorage.getItem('shopId'))
      .subscribe(
        (data: any) => {
          this.employeeInfo = data;
          console.log('This is emp', data);
        },
        (error: any) => {
          console.log('This is error message', error);
        }
      );
  }

  // Inside your component class
  toggleLike(review: any): void {
    // Update UI instantly
    review.liked = !review.liked;
    review.likes += review.liked ? 1 : -1;

    // Call API to update likes in the database
    if (review.liked) {
      this.likeService.like(review.likes, review.reviewId).subscribe(
        (response: any) => {
          // Handle success if needed
          console.log('Liked successfully:', response);
        },
        (error: any) => {
          // Handle error if needed
          console.error('Error liking review:', error);
        }
      );
    } else {
      this.likeService.unlike(review.likes, review.reviewId).subscribe(
        (response: any) => {
          // Handle success if needed
          console.log('Unliked successfully:', response);
        },
        (error: any) => {
          // Handle error if needed
          console.error('Error unliking review:', error);
        }
      );
    }
  }

  saveEmpId(employeeId: any) {
    localStorage.setItem('employeeId', employeeId);
  }

  saveId(serviceId: any) {
    console.log(serviceId);
    localStorage.setItem('serviceId', serviceId);
  }

  getFilledStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // Function to return array of empty stars
  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  deleteService() {
    Swal.fire({
      title: 'Are you sure you want to delete this Service?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteService();
      }
    });
  }

  confirmDeleteService() {
    this.removeService
      .deleteService(localStorage.getItem('serviceId'))
      .subscribe(
        (data: any) => {
          // Handle successful deletion
          Swal.fire('Service deleted!', '', 'success');
        },
        (error) => {
          // Handle error
          Swal.fire('Error', 'Failed to delete the service', 'error');
        }
      );
  }
}
