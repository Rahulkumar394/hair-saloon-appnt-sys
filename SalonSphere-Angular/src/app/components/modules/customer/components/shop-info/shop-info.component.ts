import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FetchshopInfoService } from '../../../../services/fetchshopInfo/fetchshop-info.service';
import { GetServiceInfoService } from '../../../../services/fetchShopServices/get-service-info.service';
import { DeleteServiceService } from '../../../../services/deleteService/delete-service.service';
import { FetchReviewsService } from '../../../../services/viewReviews/fetch-reviews.service';
import { LikeService } from '../../../../services/like/like.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrl: './shop-info.component.css',
})
export class ShopInfoComponent implements OnInit {
  constructor(
    private fetchshopInfo: FetchshopInfoService,
    private getShopServices: GetServiceInfoService,
    private removeService: DeleteServiceService,
    private reviewService: FetchReviewsService,
    private likeService:LikeService
  ) {}

  data: any[] = [];
  reviews: any[] = [];

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

        console.log(data);
      });

      this.reviewService.getReviews(localStorage.getItem('shopId')).subscribe(
        (data: any) => {
          this.reviews = data;
          console.log(data)
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

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
  

  getFilledStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // Function to return array of empty stars
  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }


  saveId(serviceId: any) {
    console.log(serviceId);
    localStorage.setItem('serviceId', serviceId);
  }

  
}
