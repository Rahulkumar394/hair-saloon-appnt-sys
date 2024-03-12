package com.SalonSphereServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SalonSphereServer.dto.CustomerDTO;
import com.SalonSphereServer.dto.PendingShopsDetailsDTO;
import com.SalonSphereServer.dto.ShopOwnerDTO;
import com.SalonSphereServer.service.CustomerService;
import com.SalonSphereServer.service.ShopkeeperService;
import com.SalonSphereServer.service.UserService;

@RestController
//@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private ShopkeeperService shopKeeperService;

	@Autowired
	private UserService userService;

	@GetMapping("/view-customer")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<CustomerDTO>> getAllCutomers() {

		System.out.println("come inside the controller");
		return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.OK);
	}

	@GetMapping("/view-shopkeeper")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<ShopOwnerDTO>> getAllShopkeepers() {

		System.out.println("come inside the contoller");
		return new ResponseEntity<>(userService.getAllShopKeepers(), HttpStatus.OK);
	}

	// Through this api , we can fetch all request of shop request Details
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/shop-requests")
	public ResponseEntity<List<PendingShopsDetailsDTO>> getShopRequestDetails() {
		List<PendingShopsDetailsDTO> pendingShopsDetailsDTOs = shopKeeperService.findPendingShopsDetails();
		System.out.println("iN SIDE ADMIN pENDINGSHOPDETAILS====");
		if (pendingShopsDetailsDTOs != null)
			return new ResponseEntity<>(pendingShopsDetailsDTOs, HttpStatus.OK);
		return new ResponseEntity<>(pendingShopsDetailsDTOs, HttpStatus.NOT_FOUND);
	}

}
