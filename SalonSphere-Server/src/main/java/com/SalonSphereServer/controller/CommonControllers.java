package com.SalonSphereServer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.apache.logging.log4j.CloseableThreadContext.Instance;
import org.hibernate.query.NativeQuery.ReturnableResultNode;
import org.json.JSONObject;
import com.razorpay.*;

import ch.qos.logback.core.net.server.Client;

import com.SalonSphereServer.entity.Transactions;
import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.jwtsecurity.JwtHelper;
import com.SalonSphereServer.request.AppointmentRequest;
import com.SalonSphereServer.request.LoginRequest;
import com.SalonSphereServer.request.SlotBookingRequest;
import com.SalonSphereServer.response.LoginResponse;
import com.SalonSphereServer.response.RegisterResponse;
import com.SalonSphereServer.response.Response;
import com.SalonSphereServer.service.CustomerService;
import com.SalonSphereServer.service.PaymentIntegrationService;
import com.SalonSphereServer.service.SlotBookingService;
import com.SalonSphereServer.service.UserService;

@RestController
public class CommonControllers {
	
	@Autowired
	private CustomerService customerService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtHelper helper;

	@Autowired
	private AuthenticationManager manager;
	
	@Autowired
	private SlotBookingService slotBookingService;
	
	@Autowired
	private PaymentIntegrationService paymentIntegrationService;

	//this API for registration with validation
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(@RequestBody Users user) {

		RegisterResponse registerResponse = new RegisterResponse();
		boolean isRegister = userService.registerUser(user);

		if (isRegister == true) {
			registerResponse.setResponse("User Register Successful");
			return new ResponseEntity<>(registerResponse, HttpStatus.OK);
		} else {
			registerResponse.setResponse("User Already Register");
			return new ResponseEntity<>(registerResponse, HttpStatus.OK);
		}
	}

	//this api for login with jwt token
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

		this.doAuthenticate(loginRequest.getEmail(), loginRequest.getPassword());
		LoginResponse loginResponse = userService.loginUser(loginRequest);
		System.out.println("This============================="+loginResponse);
		if (loginResponse != null) {

			UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
			String token = this.helper.generateToken(userDetails);

			loginResponse.setJwtToken(token);
			return new ResponseEntity<>(loginResponse, HttpStatus.OK);

		} else {
			return new ResponseEntity<>(loginResponse, HttpStatus.BAD_REQUEST);
		}
	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,
				password);
		try {
			manager.authenticate(authenticationToken);
		} catch (BadCredentialsException ex) {
			throw new BadCredentialsException("invalid user and password");
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/view-slots")
	public ResponseEntity<Map<List<String>, List<String>>> getAllAvilableSlots(@RequestBody AppointmentRequest appointmentRequest) {
		
		System.out.println("============================================"+appointmentRequest);
		
		
		Map<List<String>, List<String>> avilableSlots = customerService.getAllSlots(appointmentRequest.getShopId(),appointmentRequest.getShopTiming(),appointmentRequest.getServiceDuration(), appointmentRequest.getDate());
		
		return new ResponseEntity<>(avilableSlots, HttpStatus.OK);
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/book-slots")
	public ResponseEntity<Response> bookSlot(@RequestBody SlotBookingRequest slotBookingRequest){
		
		System.out.println("++++++++++++++++++++++++++++++++++++hello aman"+ slotBookingRequest);
	    String bookingId = slotBookingService.bookSlot(slotBookingRequest);
	    
	    if(bookingId != null)
		return new ResponseEntity<>(new Response(bookingId), HttpStatus.OK);
	    
	    return new ResponseEntity<>(new Response("not fount"), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/create-order/{value}")
	public ResponseEntity<String> createOrder(@PathVariable int value) throws Exception{
		
		System.out.println("777777777777777777777777777777777777777777777"+value);
		String order = paymentIntegrationService.createNewOrder(value);
		return new ResponseEntity<>(order, HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/save-transaction")
	public ResponseEntity<String> saveTransactionalDetails(@RequestBody Transactions transactions){
	
		System.out.println("5555555555555555555555555555555555555555555"+ transactions);
		if(paymentIntegrationService.saveTransaction(transactions)) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		
		return new ResponseEntity<>("Failure", HttpStatus.OK);
	}
	
}
