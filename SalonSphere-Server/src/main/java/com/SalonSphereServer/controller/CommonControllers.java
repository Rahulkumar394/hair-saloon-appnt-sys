package com.SalonSphereServer.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SalonSphereServer.common.EmailContent;
import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.jwtsecurity.JwtHelper;
import com.SalonSphereServer.request.AppointmentRequest;
import com.SalonSphereServer.request.LoginRequest;
import com.SalonSphereServer.request.SlotBookingRequest;
import com.SalonSphereServer.response.LoginResponse;
import com.SalonSphereServer.response.RegisterResponse;
import com.SalonSphereServer.response.Response;
import com.SalonSphereServer.service.CustomerService;
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

	// this API for registration with validation
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(@RequestBody Users user) {

		RegisterResponse registerResponse = new RegisterResponse();
		boolean isRegister = userService.registerUser(user);

		if (isRegister == true) {
			registerResponse.setResponse("User Register Successful");
			EmailContent.registerMail(user.getEmail(), user.getFirstName() + " " + user.getLastName());
			return new ResponseEntity<>(registerResponse, HttpStatus.OK);
		} else {
			registerResponse.setResponse("User Already Register");
			return new ResponseEntity<>(registerResponse, HttpStatus.OK);
		}
	}

	// this api for login with jwt token
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

		this.doAuthenticate(loginRequest.getEmail(), loginRequest.getPassword());
		LoginResponse loginResponse = userService.loginUser(loginRequest);
		System.out.println("This=============================" + loginResponse);
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
	public ResponseEntity<Map<List<String>, List<String>>> getAllAvilableSlots(
			@RequestBody AppointmentRequest appointmentRequest) {

		System.out.println("============================================" + appointmentRequest);

		Map<List<String>, List<String>> avilableSlots = customerService.getAllSlots(appointmentRequest.getShopId(),
				appointmentRequest.getShopTiming(), appointmentRequest.getServiceDuration(),
				appointmentRequest.getDate());

		return new ResponseEntity<>(avilableSlots, HttpStatus.OK);

	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/book-slots")
	public ResponseEntity<Boolean> bookSlot(@RequestBody SlotBookingRequest slotBookingRequest) {

		System.out.println("++++++++++++++++++++++++++++++++++++hello aman");
		Boolean slotBooked = slotBookingService.bookSlot(slotBookingRequest);
		if (!slotBooked) {
			return new ResponseEntity<>(true, HttpStatus.OK);

		}
		return new ResponseEntity<>(true, HttpStatus.OK);

	}

	// Taking Image as multipart input and uploading in the below destination
	public static String uploadDirectory = "D:\\SalonSphere\\hair-saloon-appnt-sys\\SalonSphere-Angular\\src\\assets\\profileImage";

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value = "/uploadImage", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {

		System.out.println("================================================come inside the controller");
		String originalFileName = file.getOriginalFilename();
		Path fileNameAndPath = Paths.get(uploadDirectory, originalFileName);
		Files.write(fileNameAndPath, file.getBytes());

		return ResponseEntity.status(HttpStatus.OK).body(new Response("Profile Image Uploaded Successfully"));
	}
	

}
