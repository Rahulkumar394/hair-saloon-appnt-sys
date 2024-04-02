package com.SalonSphereServer.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		
		System.out.println("/////////////////////////////////////////////////////"+slot);
		Slots slots = slotRepository.save(slot);
		if(slots != null) {
			return slots.getBookingId();
		}
		
		return null;
	}

}
