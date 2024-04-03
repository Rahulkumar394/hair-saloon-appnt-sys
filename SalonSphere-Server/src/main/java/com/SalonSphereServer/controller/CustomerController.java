package com.SalonSphereServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SalonSphereServer.dto.ShowShopDto;
import com.SalonSphereServer.entity.Feedback;
import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.repository.FeedbackRepository;
import com.SalonSphereServer.repository.UserRepository;
import com.SalonSphereServer.request.FilterRequest;
import com.SalonSphereServer.request.SlotBookingRequest;
import com.SalonSphereServer.response.FilterResponse;
import com.SalonSphereServer.response.FilterResponseByCity;
import com.SalonSphereServer.response.Response;
import com.SalonSphereServer.service.CustomerService;
import com.SalonSphereServer.service.FeedbackService;
import com.SalonSphereServer.service.UserService;

// This is Shopkeerper related  controller class  for handling shopkeeper related API
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	@Autowired
	private FeedbackService feedbackService;
	@Autowired
	private FeedbackRepository feedbackRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;

	// =============CODE FOR FILLTER==============

	// Filter shops by given city
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/filter-by-city/{city}")
	public ResponseEntity<List<FilterResponseByCity>> filterByCity(@PathVariable String city) {

		System.out.println("====Inside the customer Controller in filterByCity===++++++++\n" + city);

		// wriet code for fiter according to city
		List<FilterResponseByCity> filterResponse = customerService.filterByCity(city);
		System.out.println("This is filter Response" + filterResponse);
		if (filterResponse != null)
			return ResponseEntity.ok().body(filterResponse);
		else
			return new ResponseEntity<>(filterResponse, HttpStatus.NOT_FOUND);
	}

	// Filtering based on service name, service price and distance
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/filter-shop")
	public ResponseEntity<List<FilterResponse>> filterShop(@RequestBody FilterRequest request) {

		System.out.println("====Inside the customer Controller in filtershop===\n" + request);
		List<FilterResponse> filterRespons = customerService
				.filterByCityAndServiceNameAndServicePriceAndDistance(request);

		System.out.println("=============This is filter respnse================>\n" + filterRespons);
		return ResponseEntity.ok().body(filterRespons);

	}
	// ===================END OF FILLTER=========================================

	// =============CODE FOR FEEDBACK/REVIEW/RATING========================
	// Through this method the user can give feedback to the provider
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/add-feedback")
	public ResponseEntity<Response> addFeedBack(@RequestBody Feedback feedback) {

		System.out.println("=====INSIDE THE COUSTOMERCONTROLLER ADDFEEDBACK======\n" + feedback);
		boolean isAdd = feedbackService.addFeedBack(feedback);
		if (isAdd)
			return ResponseEntity.ok().body(new Response("Review added Successfully"));
		else
			return ResponseEntity.badRequest().body(new Response("Review not added"));
	}

	// Through this controller we get all leatest feedback in deasending order by
	// date from the database by shopid
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/get-all-feedback/{shopId}")
	public ResponseEntity<List<Feedback>> getAllFeedbackByShopId(@PathVariable String shopId) {

		System.out.println("=====INSIDE THE COUSTOMERCONTROLLER getAllFeedbackByShopId======\n" + shopId);
		List<Feedback> fList = feedbackRepository.findByShopIdOrderByReviewDateDesc(shopId);
		return ResponseEntity.ok().body(fList);
	}

	// This API's is used for getting values of likes by review_id
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/likes-by-reviewid/{reviewId}")
	public ResponseEntity<Response> getLikesByReviewId(@PathVariable int reviewId) {
		System.out.println("=====INSIDE THE COUSTOMERCONTROLLER getLikesByReviewId======\n" + reviewId);
		return ResponseEntity.ok().body(new Response("" + feedbackRepository.findLikesByReviewId(reviewId)));
	}

	// This API's is used for updating likes value by 1 with the help of review_id
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/like/{reviewId}/{like}")
	public ResponseEntity<Response> incrementLikeByReviewId(@PathVariable int reviewId, @PathVariable int like) {
		System.out.println(
				"=====INSIDE THE COUSTOMERCONTROLLER  incrementLikeByReviewId======\n" + reviewId + "," + like);
		feedbackRepository.updateLikesByReviewId(like, reviewId);
		return ResponseEntity.ok().body(new Response("Like Increment By 1."));
	}

	// This API's is used for updating likes value by -1 with the help of review_id
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/unlike/{reviewId}/{like}")
	public ResponseEntity<Response> decrementLikeByReviewId(@PathVariable int reviewId, @PathVariable int like) {
		System.out.println(
				"=====INSIDE THE COUSTOMERCONTROLLER  incrementLikeByReviewId======\n" + reviewId + "," + like);
		feedbackRepository.updateLikesByReviewId(like, reviewId);
		return ResponseEntity.ok().body(new Response("Like decrement By -1."));
	}

	// This API's is used for updating likes value by -1 with the help of review_id
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/delete-review/{reviewId}")
	public ResponseEntity<Response> deleteReviewId(@PathVariable int reviewId) {
		System.out.println("=====INSIDE THE COUSTOMERCONTROLLER  deleteReviewId======\n" + reviewId);
		feedbackRepository.deleteById(reviewId);
		return ResponseEntity.ok().body(new Response("Review Deleted Succeefully"));
	}

	// ================END FOR FEEDBACK/REVIEW/RATING===========================

	// here we check filterResponse is empty or not

	// =================================================================================================================
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/book-slot")
	public ResponseEntity<Boolean> bookSlot(@RequestBody SlotBookingRequest slotBookingRequest) {

		return new ResponseEntity<>(true, HttpStatus.OK);

	}

	// this api is for filter the shop
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/search/{keyword}")
	public ResponseEntity<List<ShowShopDto>> searchShops(@PathVariable String keyword) {
		System.out.println("====come inside the ShopKeeper controller search shop method =================");

		List<ShowShopDto> filterShop = customerService.searchShops(keyword);
		if (filterShop != null) {
			return new ResponseEntity<>(filterShop, HttpStatus.OK);
		}
		return new ResponseEntity<>(filterShop, HttpStatus.NOT_FOUND);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/userInfo/{userId}")
	public ResponseEntity<Users> fetchUserInfo(@PathVariable String userId) {

		System.out.println("come inside the Shopkeeper contoller shopKeeper");
		Users userInfo = userRepository.getUserInfo(userId);
		return new ResponseEntity<>(userInfo, HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/updateUser")
	public ResponseEntity<Response> editUserInfo(@RequestBody Users userInfo) {

		System.out.println("=======come inside the Shopkeeper contoller editUserInfo======\n" + userInfo);
		boolean isUpdated = userService.updateUser(userInfo);
		System.out.println(isUpdated + "888888888888888888888888888888888888888");
		if (isUpdated)
			return new ResponseEntity<>(new Response("Success"), HttpStatus.OK);
		else
			return new ResponseEntity<>(new Response("Faliure"), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/delete-user/{userId}")
	public ResponseEntity<Response> deleteUserAccount(@PathVariable String userId) {
		Boolean isDelete = userService.deleteUser(userId);
		if (isDelete)
			return new ResponseEntity<>(new Response("User Deleted Successfully"), HttpStatus.OK);
		return new ResponseEntity<>(new Response("Unable to delete User"), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
