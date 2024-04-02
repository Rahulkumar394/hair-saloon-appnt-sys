package com.SalonSphereServer.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SalonSphereServer.common.Validation;
import com.SalonSphereServer.dto.PendingShopsDetailsDTO;
import com.SalonSphereServer.dto.ShopOwnerDTO;
import com.SalonSphereServer.dto.ShopReviewDTO;
import com.SalonSphereServer.dto.ShowShopDto;
import com.SalonSphereServer.entity.ShopInformation;
import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.repository.ShopkeeperRepository;
import com.SalonSphereServer.repository.UserRepository;

@Service
public class ShopkeeperService {

	@Autowired
	private ShopkeeperRepository shopkeeperRepository;

	@Autowired
	private UserRepository userRepository;

	// through this method we get all shop for particular shopkeeper User
	public List<ShowShopDto> getAllShops(String userId) {

		List<ShopInformation> shopInfo = shopkeeperRepository.findByUserId(userId);
		List<ShowShopDto> shops = new ArrayList<ShowShopDto>();

		for (ShopInformation s : shopInfo) {
			ShowShopDto dto = new ShowShopDto();

			dto.setShopName(s.getShopName());
			dto.setShopAddress(s.getAddress());
			dto.setShopEmail(s.getShopEmail());
			dto.setShopCity(s.getShopCity());
			dto.setShopContactNo(s.getShopContactNo());
			dto.setStatus(s.getStatus());
			dto.setShopId(s.getShopId());
			shops.add(dto);
		}
		return shops;
	}

	// call the userRepository method and fetch all the Shopkeepers data from
	// database
	public List<ShopOwnerDTO> getAllShopKeepers() {

		System.out.println("come inside the services  getAllShopKeepers() method");
		List<Users> users = userRepository.findByRole("shopkeeper");

		List<ShopOwnerDTO> shopkeepers = new ArrayList<ShopOwnerDTO>();

		for (int i = 0; i < users.size(); i++) {

			Users user = users.get(i);
			long numberOfShops = shopkeeperRepository.countByUserIdAndStatusAndIsDelete(user.getUserId(), "accepted",
					false);
			shopkeepers.add(new ShopOwnerDTO(user.getFirstName() + " " + user.getLastName(), user.getEmail(),
					user.getContactNumber(), numberOfShops));
		}
		return shopkeepers;
	}

	// Through this method we add shopInformation to the database
	public boolean addShopInformation(ShopInformation shopInformation) {

		// Validationlida
		if (Validation.emailValidation(shopInformation.getShopEmail())
				&& Validation.contactNumberValidation(shopInformation.getShopContactNo())
				&& Validation.firstNameValidation(shopInformation.getShopName())
				&& Validation.addressValidation(shopInformation.getAddress())
				&& Validation.pincodeValidation(shopInformation.getPincode())) {

			System.out.println("This is shop keeper service inside add service after validation");
			// Setting default values
			shopInformation.setShopId(UUID.randomUUID().toString());
			shopInformation.setDelete(false);

			// Create a java.util.Date object
			java.util.Date utilDate = new java.util.Date();

			// Convert java.util.Date to java.sql.Date
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

			shopInformation.setCreateDate(sqlDate);
			shopInformation.setModifyDate(sqlDate);
			
			shopInformation.setCoverImage(shopInformation.getCoverImage());
			shopInformation.setLicenseDocument(shopInformation.getLicenseDocument());

			System.out.println("licence =>"+shopInformation.getLicenseDocument());
			System.out.println("cover image =>"+shopInformation.getCoverImage());
			// This line tell shop is create and its status is pending admin approval
			// pending means not approved yet
			shopInformation.setStatus("Pending");
			shopInformation.setShopCity(shopInformation.getShopCity().trim());
			System.out.println("licence =>"+shopInformation.getLicenseDocument());
			System.out.println("cover image =>"+shopInformation.getCoverImage());
			// This line tell shop is create and its status is pending admin approval
			// pending means not approved yet
			shopInformation.setStatus("Pending");

			
			ShopInformation shopInformation2 = shopkeeperRepository.save(shopInformation);

			// not null then shop added successfully
			return shopInformation2 != null;
		}
		return false;
	}

	// Through this method we find shopInformation through shopid
	public Optional<ShopInformation> getShopDetailsByShopId(@NonNull String shopId) {
		Optional<ShopInformation> shopInformation = shopkeeperRepository.findById(shopId);
		return shopInformation;
	}

	// Through this method we get shop infromation details by shopEmail.
	public ShopReviewDTO getShopDetailsByShopEmail(@NonNull String shopEmail) {
		ShopInformation shopInformation = shopkeeperRepository.findByShopEmail(shopEmail);

		ShopReviewDTO shopReviewDTO = new ShopReviewDTO();
		shopReviewDTO.setShopName(shopInformation.getShopName());
		shopReviewDTO.setShopContactNo(shopInformation.getShopContactNo());
		shopReviewDTO.setState(shopInformation.getState());
		shopReviewDTO.setDistrict(shopInformation.getDistrict());
		shopReviewDTO.setLandmark(shopInformation.getLandmark());
		shopReviewDTO.setLicenseDocument(shopInformation.getLicenseDocument());

		return shopReviewDTO;
	}

	// Through this method we get shop infromation details by shopEmail.
	public ShopInformation getShopDetailsByShopEmail2(@NonNull String shopEmail) {
		ShopInformation shopInformation = shopkeeperRepository.findByShopEmail(shopEmail);
		return shopInformation;
	}

	// Through this method we upadte shopInformation to the database
	public boolean updateShopInformation(ShopInformation shopInformation) {

		Optional<ShopInformation> existingShopOptional = shopkeeperRepository.findById(shopInformation.getShopId());
		// Validation
		if (existingShopOptional.isPresent() && (Validation.emailValidation(shopInformation.getShopEmail())
				&& Validation.contactNumberValidation(shopInformation.getShopContactNo())
				&& Validation.firstNameValidation(shopInformation.getShopName())
				&& Validation.addressValidation(shopInformation.getAddress())
				&& Validation.pincodeValidation(shopInformation.getPincode()))) {

			System.out.println("This is shop keeper service inside update service after validation");

			ShopInformation existingShop = existingShopOptional.get();
			// Update the properties of the existing shop with the new values
			existingShop.setShopName(shopInformation.getShopName());
			existingShop.setPincode(shopInformation.getPincode());
			existingShop.setState(shopInformation.getState());
			existingShop.setDistrict(shopInformation.getDistrict());
			existingShop.setLandmark(shopInformation.getLandmark());
			existingShop.setAddress(shopInformation.getAddress());
			// existingShop.setLicenceNo(shopInformation.getLicenceNo());
			// existingShop.setShopStatus(shopInformation.isShopStatus());
			existingShop.setShopEmail(shopInformation.getShopEmail());
			existingShop.setShopContactNo(shopInformation.getShopContactNo());
			existingShop.setShopCity(shopInformation.getShopCity().trim());

		
			


			// Create a java.util.Date object
			java.util.Date utilDate = new java.util.Date();

			// Convert java.util.Date to java.sql.Date
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
			existingShop.setModifyDate(sqlDate);

			// Cheking cover image and licence document name is null or not if null then set
			// default name
			if (existingShop.getCoverImage() == null && existingShop.getLicenseDocument() == null) {
				existingShop.setCoverImage(existingShop.getShopId() + existingShop.getCoverImage());
				existingShop.setLicenseDocument(existingShop.getShopId() + existingShop.getLicenseDocument());
			} else if (existingShop.getCoverImage() == null) {
				existingShop.setCoverImage(existingShop.getShopId() + existingShop.getCoverImage());
			} else if (existingShop.getLicenseDocument() == null) {
				existingShop.setLicenseDocument(existingShop.getShopId() + existingShop.getLicenseDocument());
			}

			ShopInformation shopInformation2 = shopkeeperRepository.save(existingShop);
			// shopInformation equal to null that means shop not add successfull if it is
			// not null then shop added successfully
			return shopInformation2 != null;
		}
		return false;
	}

	// Through this method we delete Shop from the database and mark isDeleted=true
	// in the table but we not delete data physically,we just make flag true
	@Transactional
	public void deleteShopById(String shopId) {
		shopkeeperRepository.updateIsDeleteById(shopId, true);
		return;
	}

	// Through this method we get all pending Shop Details which status is pending
	public List<PendingShopsDetailsDTO> findPendingShopsDetails() {
		List<Object[]> results = (List<Object[]>) shopkeeperRepository.findPendingShopsDetails();
		List<PendingShopsDetailsDTO> pendingShops = new ArrayList<>();

		for (Object[] result : results) {
			PendingShopsDetailsDTO pendingShopDetailDTO = new PendingShopsDetailsDTO();
			pendingShopDetailDTO.setShopOwnerName((String) result[4] + " " + (String) result[5]);
			pendingShopDetailDTO.setShopOwnerEmail((String) result[6]);
			pendingShopDetailDTO.setShopEmail((String) result[3]);
			pendingShopDetailDTO.setShopName((String) result[2]);
			pendingShopDetailDTO.setShopLocation((String) result[0] + " " + (String) result[1]);

			pendingShops.add(pendingShopDetailDTO);
		}
		return pendingShops;
	}

	private String imageDirectory = "D:\\SaloonSphere\\hair-saloon-appnt-sys\\SalonSphere-Server\\src\\main\\webapp\\images";

	public List<byte[]> getImagesByShopId(String shopId) throws IOException {
		List<byte[]> images = new ArrayList<>();
		File folder = new File(imageDirectory);

		// Filter images by shopId
		File[] files = folder.listFiles((dir, name) -> name.startsWith(shopId));

		if (files != null) {
			for (File file : files) {
				images.add(Files.readAllBytes(file.toPath()));
			}
		}
		return images;
	}

	// this method for filter the shops according searchbar keyword
	public List<ShowShopDto> searchShops(String userId, String keyword) {

		List<ShowShopDto> list = new ArrayList<>();
		List<ShopInformation> sList = shopkeeperRepository.search(keyword, userId);
		for (ShopInformation s : sList) {
			ShowShopDto tem = new ShowShopDto();
			tem.setShopName(s.getShopName());
			tem.setShopAddress(s.getAddress());
			tem.setShopEmail(s.getShopEmail());
			tem.setShopContactNo(s.getShopContactNo());
			tem.setShopCity(s.getShopCity());
			tem.setStatus(s.getStatus());

			list.add(tem);
		}
		return list;
	}

	// Through this method we can update status
	@Transactional
	public void updateStatus(String shopEmail, String status) {
		shopkeeperRepository.updateStatusByShopEmail(shopEmail, status);
		return;
	}


	@SuppressWarnings("null")
	public boolean requestAgain(ShopInformation shopInformation) {

		Optional<ShopInformation> existingShopOptional = shopkeeperRepository.findById(shopInformation.getShopId());
		// Validation
		if (existingShopOptional.isPresent() && (Validation.emailValidation(shopInformation.getShopEmail())
				&& Validation.contactNumberValidation(shopInformation.getShopContactNo())
				&& Validation.firstNameValidation(shopInformation.getShopName())
				&& Validation.addressValidation(shopInformation.getAddress())
				&& Validation.pincodeValidation(shopInformation.getPincode()))) {

			System.out.println("This is shop keeper service inside update service after validation");

			ShopInformation existingShop = existingShopOptional.get();
			// Update the properties of the existing shop with the new values
			existingShop.setShopName(shopInformation.getShopName());
			existingShop.setPincode(shopInformation.getPincode());
			existingShop.setState(shopInformation.getState());
			existingShop.setDistrict(shopInformation.getDistrict());
			existingShop.setLandmark(shopInformation.getLandmark());
			existingShop.setAddress(shopInformation.getAddress());
			existingShop.setLicenceNo(shopInformation.getLicenceNo());
			existingShop.setShopStatus(shopInformation.isShopStatus());
			existingShop.setShopEmail(shopInformation.getShopEmail());
			existingShop.setShopContactNo(shopInformation.getShopContactNo());
			existingShop.setShopCity(shopInformation.getShopCity().trim());

			// Create a java.util.Date object
			java.util.Date utilDate = new java.util.Date();

			// Convert java.util.Date to java.sql.Date
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
			shopInformation.setModifyDate(sqlDate);
			shopInformation.setCreateDate(sqlDate);

			// Cheking cover image and licence document name is null or not if null then set
			// default name
			// if (shopInformation.getCoverImage() == null && shopInformation.getLicenseDocument() == null) {
			// 	shopInformation.setCoverImage(shopInformation.getShopId() + shopInformation.getCoverImage());
			// 	shopInformation.setLicenseDocument(shopInformation.getShopId() + shopInformation.getLicenseDocument());
			// } else if (shopInformation.getCoverImage() == null) {
			// 	shopInformation.setCoverImage(shopInformation.getShopId() + shopInformation.getCoverImage());
			// } else if (shopInformation.getLicenseDocument() == null) {
			// 	shopInformation.setLicenseDocument(shopInformation.getShopId() + shopInformation.getLicenseDocument());
			// }


			shopInformation.setStatus("Pending");
			shopInformation.setShopTiming("10:00-22:00");
			ShopInformation shopInformation2 = shopkeeperRepository.save(shopInformation);
			// shopInformation equal to null that means shop not add successfull if it is
			// not null then shop added successfully
			return shopInformation2 != null;
		}
		return false;
	}
	// Deleting shop after 30 days automatically Don't remove this method 
	// @Scheduled(fixedRate = 24 * 60 * 60 * 1000) // Scheduled to run every 24 hours
    // public void deleteMarkedRows() {
    //     Date month = new Date(System.currentTimeMillis() - (30 * 24 * 60 * 60 * 1000));
    //     shopkeeperRepository.deleteByIsDeleteAndCreateDateBefore(true, month);
    // }

}
