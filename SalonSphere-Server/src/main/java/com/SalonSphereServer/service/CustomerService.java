package com.SalonSphereServer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.dto.CustomerDTO;
import com.SalonSphereServer.entity.ShopEmployees;
import com.SalonSphereServer.entity.ShopInformation;
import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.repository.FeedbackRepository;
import com.SalonSphereServer.repository.ShopEmployeeRepository;
import com.SalonSphereServer.repository.ShopkeeperRepository;
import com.SalonSphereServer.repository.SlotRepository;
import com.SalonSphereServer.repository.UserRepository;
import com.SalonSphereServer.request.FilterRequest;
import com.SalonSphereServer.response.FilterResponse;
import com.SalonSphereServer.response.FilterResponseByCity;

@Service
public class CustomerService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ShopEmployeeRepository shopEmployeeRepository;
	@Autowired
	private SlotRepository slotRepository;
	@Autowired
	private ShopkeeperRepository shopKeeperRepository;
	@Autowired
	private FeedbackRepository feedbackRepository;

	// call the userRepository method and fetch all the customer data from database
	public List<CustomerDTO> getAllCustomers() {

		System.out.println("come inside the services method");
		List<Users> users = userRepository.findByRole("customer");

		List<CustomerDTO> cutomers = new ArrayList<CustomerDTO>();

		for (int i = 0; i < users.size(); i++) {

			Users user = users.get(i);
			cutomers.add(new CustomerDTO(user.getFirstName() + " " + user.getLastName(), user.getEmail(),
					user.getContactNumber()));
		}
		return cutomers;
	}


	public Map<String, List<String>> getAllSlots(String shopId, String shopTiming, int serviceTime) {

		List<ShopEmployees> shopEmployees = shopEmployeeRepository.findShopEmployeesByShopId(shopId);
		Map<String, List<String>> avilableSlots = new HashMap<String, List<String>>();

		for (ShopEmployees employeeData : shopEmployees) {

			String employeeName =  employeeData.getEmployeeName() ;
			String employeeId = employeeData.getEmployeeId() ;
			List<String> bookedSlots = slotRepository.findAllSlotTimeByEmployeeId(employeeId);
			List<String> list = getAvailableSlots(serviceTime, bookedSlots, shopTiming);
			avilableSlots.put(employeeName, list);
		}
		return avilableSlots;
	}

	public List<String> getAvailableSlots(int serviceTime, List<String> bookedSlots, String shopTiming) {

		List<String> avilableSlots = new ArrayList<String>();
		// Set the opening time

		int openingTime = Integer.parseInt("" + shopTiming.charAt(0) + shopTiming.charAt(1));
		int startMinute = Integer.parseInt("" + shopTiming.charAt(3) + shopTiming.charAt(4));
		int endMinute = Integer.parseInt("" + shopTiming.charAt(9) + shopTiming.charAt(10));
		// Set the closing time
		int closingTime = Integer.parseInt("" + shopTiming.charAt(6) + shopTiming.charAt(7));

		// Convert opening time to total minutes
		int totalMinutes = openingTime * 60 + startMinute;

		while ((totalMinutes + serviceTime) <= closingTime * 60 + endMinute) {
			// Calculate end time
			int endHourSlot = (totalMinutes + serviceTime) / 60;
			int endMinuteSlot = (totalMinutes + serviceTime) % 60;

			// Format start and end time strings
			String startSlot = String.format("%02d:%02d", totalMinutes / 60, totalMinutes % 60);
			String endSlot = String.format("%02d:%02d", endHourSlot, endMinuteSlot);

			// Check if the slot is already booked
			boolean isBooked = false;
			String currentSlot = startSlot + "-" + endSlot;
			for (String bookedSlot : bookedSlots) {
				if (isOverlap(currentSlot, bookedSlot)) {
					isBooked = true;
					break;
				}
			}

			// Add the slot to the list if not booked
			if (!isBooked) {
				avilableSlots.add(currentSlot);
			}

			// Move to the next slot
			totalMinutes += serviceTime;
		}
		return avilableSlots;

	}

	// Helper method to check if two time slots overlap
	public static boolean isOverlap(String slot1, String slot2) {
		String[] parts1 = slot1.split("-");
		String[] parts2 = slot2.split("-");

		String[] startTime1 = parts1[0].split(":");
		String[] endTime1 = parts1[1].split(":");
		String[] startTime2 = parts2[0].split(":");
		String[] endTime2 = parts2[1].split(":");

		int startHour1 = Integer.parseInt(startTime1[0]);
		int startMinute1 = Integer.parseInt(startTime1[1]);
		int endHour1 = Integer.parseInt(endTime1[0]);
		int endMinute1 = Integer.parseInt(endTime1[1]);
		int startHour2 = Integer.parseInt(startTime2[0]);
		int startMinute2 = Integer.parseInt(startTime2[1]);
		int endHour2 = Integer.parseInt(endTime2[0]);
		int endMinute2 = Integer.parseInt(endTime2[1]);

		int start1 = startHour1 * 60 + startMinute1;
		int end1 = endHour1 * 60 + endMinute1;
		int start2 = startHour2 * 60 + startMinute2;
		int end2 = endHour2 * 60 + endMinute2;

		return !(end1 <= start2 || start1 >= end2);
	}

	public static int extractOpeningTime(String shopTiming) {
		String[] parts = shopTiming.split("-");
		String openingTimeStr = parts[0];
		String[] timeParts = openingTimeStr.split(":");
		return Integer.parseInt(timeParts[0]);
	}

	public static int extractClosingTime(String shopTiming) {
		String[] parts = shopTiming.split("-");
		String closingTimeStr = parts[1];
		String[] timeParts = closingTimeStr.split(":");
		return Integer.parseInt(timeParts[0]);
	}

	// ===========================================================================================================

	// Throuhg this method we filter on city
	public List<FilterResponseByCity> filterByCity(String city) {

		System.out.println("+++++++Inside Customer Service FilterByCity++++++++++" + city);

		List<ShopInformation> shops = shopKeeperRepository.findShopByCity(city);
		if (shops != null) {
			List<FilterResponseByCity> filterResponse = new ArrayList<>();
			for (ShopInformation s : shops) {
				FilterResponseByCity fResponse = new FilterResponseByCity();

				fResponse.setShopName(s.getShopName());
				fResponse.setLocation(s.getAddress() + " " + s.getLandmark() + " " + s.getState());
				fResponse.setCoverImage(s.getCoverImage());
				fResponse.setShopId(s.getShopId());
				fResponse.setShopTiming(s.getShopTiming());
				Double rating = feedbackRepository.getAverageRatingByShopId(s.getShopId());
				if (rating != null)
					fResponse.setRating(rating);
				else
					fResponse.setRating(0);
				filterResponse.add(fResponse);

			}
			return filterResponse;
		}
		return null;
	}

	// ===========================================================================================================
	// Throuhg this method we filter on city,serviceName,priceRange(100-200) and
	// distanceRange (5-10).Distance always in meter
	public List<FilterResponse> filterByCityAndServiceNameAndServicePriceAndDistance(FilterRequest request) {

		System.out.println("*********inside customerservice filter shop**********");
		// Initialize variables for price and distance ranges
		int minPrice, maxPrice;
		int minDistance, maxDistance;
		
		if (request.getPrice() == null) {

			minPrice = 0;
			maxPrice = 100000;// Maximum price range
		} else {

			// Split and parse price range from request
			String priceRange[] = request.getPrice().split("-");
			minPrice = Integer.parseInt(priceRange[0].trim());
			maxPrice = Integer.parseInt(priceRange[1].trim());

		}
		if (request.getDistance() == null) {
			minDistance = 0;
			maxDistance = 10000000;// // Maximum distance range (10,000,000 meters)	        
		} else {
			// Split and parse distance range from request
			String distanceRange[] = request.getDistance().split("-");
			minDistance = Integer.parseInt(distanceRange[0].trim());
			maxDistance = Integer.parseInt(distanceRange[1].trim());
		}

		// Fetch shops based on filters
		List<Object[]> shops = shopKeeperRepository.findShopByCityAndServiceNameAndServicePriceAndDistance(
				request.getCity(), request.getServiceName(), minPrice, maxPrice, minDistance, maxDistance);

		// Set to store unique shop IDs
		Set<String> uniqueShopIds = new HashSet<>();
		// List to hold the final response
		List<FilterResponse> responseList = new ArrayList<>();

		// Iterate through the fetched shops
		for (Object[] obj : shops) {
			String shopId = (String) obj[1]; // Extract shop ID from the fetched data
			if (!uniqueShopIds.contains(shopId)) { // Check if the shop ID is unique
				uniqueShopIds.add(shopId); // Add the shop ID to the set of unique IDs

				// Create a new FilterResponse object and populate its fields
				FilterResponse filterResponse = new FilterResponse();
				filterResponse.setShopName((String) obj[0]);
				filterResponse.setShopId(shopId);
				filterResponse.setShopTiming((String) obj[2]);
				filterResponse.setLocation((String) obj[3] + ", " + (String) obj[4] + ", " + (String) obj[5]);
				filterResponse.setCoverImage((String) obj[6]);
				filterResponse.setServiceName((String) obj[7]);
				double price1 = (double) obj[8];
				int roundedPrice = (int) price1;
				filterResponse.setServicePrice(roundedPrice);
				filterResponse.setServiceDuration((int) obj[9]);

				// Get the average rating for the shop ID from the feedback repository
				filterResponse.setRating(feedbackRepository.getAverageRatingByShopId(shopId));

				// Add the FilterResponse to the responseList
				responseList.add(filterResponse);
			}
		}

		// Return the list of unique FilterResponse objects
		return responseList;

	}
}
