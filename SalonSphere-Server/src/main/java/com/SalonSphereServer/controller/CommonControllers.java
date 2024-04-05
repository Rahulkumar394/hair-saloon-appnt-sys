package com.SalonSphereServer.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SalonSphereServer.common.EmailContent;
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

	// Taking Image as multipart input and uploading in the below destination
	public static String uploadDirectory = "D:\\SalonSphere\\hair-saloon-appnt-sys\\SalonSphere-Angular\\src\\assets\\profileImage";

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value = "/uploadImage", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response> uploadDocument(@RequestParam("file") MultipartFile file) throws IOException {

		System.out.println("================================================come inside the controller");
		String originalFileName = file.getOriginalFilename();
		Path fileNameAndPath = Paths.get(uploadDirectory, originalFileName);
		Files.write(fileNameAndPath, file.getBytes());

		return ResponseEntity.status(HttpStatus.OK).body(new Response("Image Uploaded Successfully"));
	}

	public ResponseEntity<Response> bookSlot(@RequestBody SlotBookingRequest slotBookingRequest) {

		System.out.println("+++++++++++Common Controller book slot service" + slotBookingRequest);
		String bookingId = slotBookingService.bookSlot(slotBookingRequest);

		if (bookingId != null)
			return new ResponseEntity<>(new Response(bookingId), HttpStatus.OK);

		return new ResponseEntity<>(new Response("not fount"), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/create-order/{value}")
	public ResponseEntity<String> createOrder(@PathVariable int value) throws Exception {

		System.out.println("777777777777777777777777777777777777777777777" + value);
		String order = paymentIntegrationService.createNewOrder(value);
		return new ResponseEntity<>(order, HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/save-transaction")
	public ResponseEntity<String> saveTransactionalDetails(@RequestBody Transactions transactions) {

		System.out.println("5555555555555555555555555555555555555555555" + transactions);
		if (paymentIntegrationService.saveTransaction(transactions)) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}

		return new ResponseEntity<>("Failure", HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value = "/changeProfileName/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response> changeProfileName(@PathVariable String userId, @RequestBody String profileImage) {
		userService.updateProfileName(userId, profileImage);
		return ResponseEntity.status(HttpStatus.OK).body(new Response("Successfully Change ProfileImage Name"));
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

	// For sending OTP for Password change
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/sendOTP/{email}")
	public ResponseEntity<String> sendOTP(@PathVariable String email) {

		// Characters that the OTP can contain
		final String OTP_CHARS = "0123456789"; // characters to be used for OTP generation
		final int OTP_LENGTH = 6; // length of the OTP

		// Used for generating Random numbers but securely
		SecureRandom random = new SecureRandom();
		StringBuilder otp = new StringBuilder(OTP_LENGTH);
		for (int i = 0; i < OTP_LENGTH; i++) {
			int randomIndex = random.nextInt(OTP_CHARS.length());
			otp.append(OTP_CHARS.charAt(randomIndex));
		}
		//

		// Since it is in string builder hence converting it in String
		String OTP = otp.toString();

		if (!userService.isRegistered(email)) {
			if (EmailContent.sendOTP(email, OTP)) {
				return ResponseEntity.status(HttpStatus.OK).body(OTP);
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problem while sending OTP");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
		}

	}

}
