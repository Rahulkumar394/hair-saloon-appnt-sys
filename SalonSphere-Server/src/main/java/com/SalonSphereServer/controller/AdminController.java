package com.SalonSphereServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SalonSphereServer.common.Email;
import com.SalonSphereServer.dto.CustomerDTO;
import com.SalonSphereServer.dto.PendingShopsDetailsDTO;
import com.SalonSphereServer.dto.ShopOwnerDTO;
import com.SalonSphereServer.dto.ShopReviewDTO;
import com.SalonSphereServer.repository.ShopkeeperRepository;
import com.SalonSphereServer.repository.UserRepository;
import com.SalonSphereServer.service.CustomerService;
import com.SalonSphereServer.service.EmailService;
import com.SalonSphereServer.service.ShopkeeperService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private ShopkeeperService shopKeeperService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ShopkeeperRepository shopkeeperRepository;

	@GetMapping("/view-customer")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<CustomerDTO>> getAllCutomers() {

		System.out.println("come inside the controller getAllCustomer");
		return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/view-shopkeeper")
	public ResponseEntity<List<ShopOwnerDTO>> getAllShopkeepers() {

		System.out.println("come inside the Admin contoller shopKeepers");
		List<ShopOwnerDTO> shopOwnerList = shopKeeperService.getAllShopKeepers();
		return new ResponseEntity<>(shopOwnerList, HttpStatus.OK);
	}

	// this delete API for delete the user
	@SuppressWarnings("null")
	@PostMapping("/deleteuser/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable String userId) {
		userRepository.deleteById(userId);
		return ResponseEntity.status(HttpStatus.OK).body("delete succesfully");
	}

	// Through this api , we can fetch all request of shop request Details
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/shop-requests")
	public ResponseEntity<List<PendingShopsDetailsDTO>> getShopRequestDetails() {
		List<PendingShopsDetailsDTO> pendingShopsDetailsDTOs = shopKeeperService.findPendingShopsDetails();
		System.out.println("========IN SIDE ADMIN PENDINGSHOPDETAILS====");
		if (pendingShopsDetailsDTOs != null)
			return new ResponseEntity<>(pendingShopsDetailsDTOs, HttpStatus.OK);
		return new ResponseEntity<>(pendingShopsDetailsDTOs, HttpStatus.NOT_FOUND);
	}

	// Through this api we will get shops information through shopEmail
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/view-requests/review-shop")
	public ResponseEntity<ShopReviewDTO> getShopByEmail(@RequestBody @NonNull String shopEmailId) {
		System.out.println("=======GetShopinformation by email=============>" + shopEmailId);
		ShopReviewDTO sDto = shopKeeperService.getShopDetailsByShopEmail(shopEmailId);
		if (sDto != null) {
			return new ResponseEntity<>(sDto, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// This method is used to accept the Shop Request by admin
	@CrossOrigin(origins = "http://localhost:4200")
	// @Secured("admin")
	@PostMapping("/view-requests/approve-request")
	public ResponseEntity<?> approveRequest(@RequestBody String shopEmail) {

		System.out.println("========" + shopEmail);

		// Setting email information
		Email email = new Email();
		email.setCc(shopkeeperRepository.getOwnerEmailByShopEmail(shopEmail));
		email.setTo(shopEmail);
		email.setSubject("Shop has been approved.");
		email.setMessage(
				"Greetings for the day! \r\nThis mail is being sent to you by SalonSphere regarding your request for adding a shop.\r\n Congratulations your shop has been approved by our team. We wish you the best for you upcoming Journey.\r\n\r\n Thank you for connecting with us\r\nSalonSphere Inc. ");

		// calling Email Service
		EmailService.sendEmail(email);
		shopKeeperService.updateStatus(shopEmail, "accepted");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// This method is used to reject the Shop Request by admin
	@CrossOrigin(origins = "http://localhost:4200")
	// @Secured("admin")
	@PostMapping("/view-requests/reject-request")
	public ResponseEntity<?> rejectRequest(@RequestBody String shopEmail) {

		// Setting email information
		Email email = new Email();
		email.setCc(shopkeeperRepository.getOwnerEmailByShopEmail(shopEmail));
		email.setTo(shopEmail);
		email.setSubject("Shop has been rejected.");
		email.setMessage(
				"Greetings for the day! \r\nThis mail is being sent to you by SalonSphere regarding your request for adding a shop.\r\n Sorry to Inform you that the request for adding your Shop could not be considered due to incompatible details.\r\nYou can try again after 15 days .\r\n Thank You for Connecting with Us\r\n We wish you the best!!!\r\nSalonSphere Inc. ");

		// calling Email Service
		EmailService.sendEmail(email);
		shopKeeperService.updateStatus(shopEmail, "rejected");
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
