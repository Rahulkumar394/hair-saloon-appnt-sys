package com.SalonSphereServer.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.dto.CustomerDTO;
import com.SalonSphereServer.entity.ShopInformation;
import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.repository.FeedbackRepository;
import com.SalonSphereServer.repository.ShopEmployeeRepository;
import com.SalonSphereServer.repository.SlotRepository;
import com.SalonSphereServer.repository.TransactionRepository;
import com.SalonSphereServer.repository.ShopkeeperRepository;
import com.SalonSphereServer.repository.UserRepository;
import com.SalonSphereServer.request.FilterRequest;
import com.SalonSphereServer.response.BookingDetailsResponse;
import com.SalonSphereServer.response.FilterResponse;
import com.SalonSphereServer.response.FilterResponseByCity;

import lombok.Getter;

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
	
	@Autowired
	private TransactionRepository transactionRepository;

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

	public Map<List<String>, List<String>> getAllSlots(String shopId, String shopTiming, int serviceTime, String date) {

		List<Object[]> shopEmployees = shopEmployeeRepository.findShopEmplooyesByShopId(shopId);

		Map<List<String>, List<String>> avilableSlots = new HashMap<List<String>, List<String>>();

		for (Object[] employeeData : shopEmployees) {

			String employeeName = (String) employeeData[1];
			String employeeId = (String) employeeData[0];

			List<String> employeeInfo = new ArrayList<String>();
			employeeInfo.add(employeeId);
			employeeInfo.add(employeeName);

			List<String> bookedSlots = slotRepository.findAllSlotTimeByEmployeeIdAndDate(employeeId, date);

			List<String> list = geeAllAbilableSlots(serviceTime, bookedSlots, shopTiming, date);
			avilableSlots.put(employeeInfo, list);
		}

		return avilableSlots;
	}

	public List<String> geeAllAbilableSlots(int serviceTime, List<String> bookedSlots, String shopTiming, String date) {

		List<String> avilableSlots = new ArrayList<String>();

		// Set the opening time

		int openingTime = Integer.parseInt("" + shopTiming.charAt(0) + shopTiming.charAt(1));
		int startMinute = Integer.parseInt("" + shopTiming.charAt(3) + shopTiming.charAt(4));
		int endMinute = Integer.parseInt("" + shopTiming.charAt(9) + shopTiming.charAt(10));
		// Set the closing time
		int closingTime = Integer.parseInt("" + shopTiming.charAt(6) + shopTiming.charAt(7));

		LocalDate today = LocalDate.now();
		String todayDate = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		System.out.println("Come inside this method------------------------------------------------------ aaya hai");
		
		//if the date is todays date then give the slot which greater then then current time
		if(todayDate.equals(date)) {
			
			System.out.println("Come inside this method------------------------------------------------------");
		
			// Set the time zone to Indian Standard Time (IST)
	        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));

	        // Add 5 minutes to the current time
	        LocalDateTime futureTime = now.plusMinutes(5);

	        // Format the future time
	        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
	        String currentTime = dtf.format(futureTime);
	        openingTime = Integer.parseInt("" + currentTime.charAt(0) + currentTime.charAt(1));
			startMinute = Integer.parseInt("" + currentTime.charAt(3) + currentTime.charAt(4)); 
		}
		
		
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
		
		System.out.println(slot1 +"-------------------------------------"+ slot2);
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

	// Through this method we filter on city
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
		int minPrice, maxPrice;
		int minDistance, maxDistance;
		if (request.getServiceName() == null) {
		}
		if (request.getPrice() == null) {

			minPrice = 0;
			maxPrice = 100000;
		} else {

			String priceRange[] = request.getPrice().split("-");
			minPrice = Integer.parseInt(priceRange[0].trim());
			maxPrice = Integer.parseInt(priceRange[1].trim());

		}
		if (request.getDistance() == null) {
			minDistance = 0;
			maxDistance = 10000000;
		} else {
			String distanceRange[] = request.getDistance().split("-");
			minDistance = Integer.parseInt(distanceRange[0].trim());
			maxDistance = Integer.parseInt(distanceRange[1].trim());
		}

		List<Object[]> shops = shopKeeperRepository.findShopByCityAndServiceNameAndServicePriceAndDistance(
				request.getCity(), request.getServiceName(), minPrice, maxPrice, minDistance, maxDistance);

		List<FilterResponse> responseList = new ArrayList<>();
		for (Object[] obj : shops) {
			FilterResponse filterResponse = new FilterResponse();
			filterResponse.setShopName((String) obj[0]);
			filterResponse.setShopId((String) obj[1]);
			filterResponse.setShopTiming((String) obj[2]);
			filterResponse.setLocation((String) obj[3] + ", " + (String) obj[4] + ", " + (String) obj[5]); // Set shop city, district and state
			filterResponse.setCoverImage((String) obj[6]);
			filterResponse.setServiceName((String) obj[7]);
			double price1 = (double) obj[8];
			// Explicit type casting double to int
			int roundedPrice = (int) price1;
			filterResponse.setServicePrice(roundedPrice);
			filterResponse.setServiceDuration((int) obj[9]);
			// calculate rating  by adding all the ratings and dividing it with total number of reviews
			filterResponse.setRating(feedbackRepository.getAverageRatingByShopId(filterResponse.getShopId()));
			responseList.add(filterResponse);

		}		
		return responseList;
	}
	
	public List<BookingDetailsResponse> getAllBookingDetails(String userId){
		
		List<BookingDetailsResponse> bookingDetails = new ArrayList<BookingDetailsResponse>();
		
		List<Object[]> objectList = transactionRepository.findBookingDetailsByUserId(userId);
		
		for(Object[] result :objectList) {
			
			BookingDetailsResponse bookingDetailsResponse = new BookingDetailsResponse();
			bookingDetailsResponse.setShopName((String)result[0]);
			bookingDetailsResponse.setShopAddress((String)result[1]);
			bookingDetailsResponse.setTime((String)result[2]);
			bookingDetailsResponse.setDate((String)result[3]);
			bookingDetailsResponse.setServiceName((String)result[4]);
			bookingDetailsResponse.setAmount((Integer)result[5]);
			bookingDetailsResponse.setOrderId((String)result[6]);
			
			bookingDetails.add(bookingDetailsResponse);
			
		} 
		
		return bookingDetails;
		
	}

}
