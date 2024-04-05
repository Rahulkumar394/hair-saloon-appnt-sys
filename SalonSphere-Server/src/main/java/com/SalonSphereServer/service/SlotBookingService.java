package com.SalonSphereServer.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.dto.BookedSlot;
import com.SalonSphereServer.entity.Slots;
import com.SalonSphereServer.repository.SlotRepository;
import com.SalonSphereServer.request.SlotBookingRequest;

@Service
public class SlotBookingService {

	@Autowired
	private SlotRepository slotRepository;

	public String bookSlot(SlotBookingRequest request) {

		Slots slot = new Slots();
		slot.setBookingId(UUID.randomUUID().toString());
		slot.setBookingDate(request.getDate());
		slot.setEmployeeId(request.getEmpId());
		slot.setServiceName(request.getServiceName());
		slot.setSlotDuration(request.getServiceTime());
		slot.setSlotTime(request.getSlotTime());

		System.out.println("/////////////////////////////////////////////////////" + slot);
		slot.setStatus("NOT COMPLETED");
		
		System.out.println("/////////////////////////////////////////////////////"+slot);
		Slots slots = slotRepository.save(slot);

		return slots.getBookingId();
		
	}

	public List<BookedSlot> findAllBookedSlotsByShopIdSortedByTimeAsc(String shopId) {
		List<Object[]> listBookedSlots = slotRepository.findAllBookedSlotsByShopIdSortedByTimeAsc(shopId);
		List<BookedSlot> responseBookedSlots = new ArrayList<>();
		for (Object[] result : listBookedSlots) {
			BookedSlot bookedSlot = new BookedSlot();
			// s.bookingId, s.employeeId, e.employeeName, s.serviceName, s.slotDuration,
			// s.slotTime, s.bookingDate
			bookedSlot.setBookingId((String) result[0]);
			bookedSlot.setEmployeeId((String) result[1]);
			bookedSlot.setEmployeeName((String) result[2]);
			bookedSlot.setServiceName((String) result[3]);
			bookedSlot.setSlotDuration((Integer) result[4]);
			bookedSlot.setSlotTime((String) result[5]);
			bookedSlot.setBookingDate((String) result[6]);

			responseBookedSlots.add(bookedSlot);
		}
		return responseBookedSlots;
	}
}
