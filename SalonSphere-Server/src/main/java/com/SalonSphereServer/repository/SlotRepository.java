package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SalonSphereServer.entity.Slots;

@Repository
public interface SlotRepository extends JpaRepository<Slots, String> {
	
	@Query(value = "SELECT s.slot_time FROM slots s WHERE s.employee_id = :employeeId AND s.booking_date = :date", nativeQuery = true)
	List<String> findAllSlotTimeByEmployeeIdAndDate(@Param("employeeId") String employeeId, @Param("date") String date);

	

}
