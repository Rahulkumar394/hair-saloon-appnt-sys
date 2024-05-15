package com.SalonSphereServer.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.entity.Slots;
import com.SalonSphereServer.repository.SlotRepository;

@Service
public class StatusUpdaterService {
	
	@Autowired
	private SlotRepository slotRepository;
	
	@Scheduled(fixedRate = 1000000)
    public void updateStatus() {
        List<Slots> slots = slotRepository.findAllByStatus("NOT COMPLETED");
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        for (Slots slot : slots) {
            LocalDate slotDate = LocalDate.parse(slot.getBookingDate()); // Assuming slot.getDate() returns a string in 'yyyy-MM-dd' format
            LocalTime startTime = LocalTime.parse(slot.getSlotTime().split("-")[0]); // Assuming slot.getSlotTiming() returns a string in 'HH:mm-HH:mm' format

            if (currentDate.isEqual(slotDate) || currentDate.isAfter(slotDate)) {
                if (currentTime.isAfter(startTime)) {
                    slot.setStatus("COMPLETED");
                    slotRepository.save(slot);
                }
            }
        }
    }
}
