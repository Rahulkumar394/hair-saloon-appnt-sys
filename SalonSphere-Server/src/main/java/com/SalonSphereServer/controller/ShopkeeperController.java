package com.SalonSphereServer.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SalonSphereServer.dto.ShowShopDto;
import com.SalonSphereServer.entity.ShopInformation;
import com.SalonSphereServer.service.ShopkeeperService;

// This is Shopkeerper related  controller class  for handling shopkeeper related API
@RestController
@RequestMapping("/shopkeeper")
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = false)
public class ShopkeeperController {

	@Autowired
	private ShopkeeperService shopkeeperService;

	// Through addshop API we can add new salons in the system
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addshop")
	@Secured("shopkeeper")
	public ResponseEntity<String> addShop(@RequestBody ShopInformation shop) {

		// Call service method to add shop
		System.out.println("======THIS IS SHOPKEEPER CONTROLLER  ADDSHOP METHOD=======");
		boolean isAdd = shopkeeperService.addShopInformation(shop);
		if (isAdd)
			return ResponseEntity.status(HttpStatus.CREATED).body("success");
		else
			return ResponseEntity.status(HttpStatus.CREATED).body("failer");
	}

	// Through this api we will get shops information through id
	@CrossOrigin(origins = "http://localhost:4200")
	@Secured("shopkeeper")
	@GetMapping("/shopid")
	public ResponseEntity<ShopInformation> getShopById(@RequestParam @NonNull String shopId) {
		Optional<ShopInformation> shopOptional = shopkeeperService.getShopDetailsByShopId(shopId);
		if (shopOptional.isPresent()) {
			return new ResponseEntity<>(shopOptional.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Through show-shop api we can show all salons of perticular user
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/show-shop/{userId}")
	public ResponseEntity<List<ShowShopDto>> showShops(@PathVariable String userId) {
		System.out.println(userId);
		return new ResponseEntity<>(shopkeeperService.getAllShops(userId), HttpStatus.OK);
	}

	// Through addshop API we can add new salons in the system
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/updateshop")
	@Secured("shopkeeper")
	public ResponseEntity<String> updateShop(@RequestBody ShopInformation shop) {

		// Call service method to add shop
		System.out.println("======THIS IS SHOPKEEPER CONTROLLER  UPDATESHOP METHOD=======");
		boolean isUpdate = shopkeeperService.updateShopInformation(shop);
		if (isUpdate)
			return ResponseEntity.status(HttpStatus.CREATED).body("update  successfull");
		else
			return ResponseEntity.status(HttpStatus.CREATED).body("update failer");
	}

	// Through addshop API we can delete salons in the system
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/deleteshop")
	@Secured("shopkeeper")
	public ResponseEntity<String> deleteShop(@RequestParam String shopId) {

		// Call service method to add shop
		System.out.println("======THIS IS SHOPKEEPER CONTROLLER  DELETESHOP METHOD=======");
		shopkeeperService.deleteShopById(shopId);
		return ResponseEntity.status(HttpStatus.OK).body("Delete successfull");
	}

	public static String uploadDirectory ="D:\\SaloonSphere\\hair-saloon-appnt-sys\\SalonSphere-Server\\src\\main\\webapp\\images";

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value = "/uploadDocument", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, String>> uploadDocument(@RequestParam("file") MultipartFile file)
			throws IOException {
		try {
			String originalFileName = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(uploadDirectory, originalFileName);
			Files.write(fileNameAndPath, file.getBytes());

			Map<String, String> response = new HashMap<>();
			response.put("status", "success");
			response.put("message", "Image uploaded successfully");

			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			Map<String, String> response = new HashMap<>();
			response.put("status", "error");
			response.put("message", "Image upload failed");

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/fetchDocument/{shopId}")
	public List<byte[]> getImagesByShopId(@PathVariable String shopId) throws IOException {
		return shopkeeperService.getImagesByShopId(shopId);
	}

}
