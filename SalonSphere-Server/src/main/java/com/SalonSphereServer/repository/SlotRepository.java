package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SalonSphereServer.entity.Slots;

@Repository
public interface SlotRepository extends JpaRepository<Slots, String> {

	@Query(value = "select s.slot_time from slots s where employee_id = :employeeId", nativeQuery = true)
	List<String> findAllSlotTimeByEmployeeId(@Param("employeeId") String employeeId);

	@Query(value = "SELECT s.slot_time FROM slots s WHERE s.employee_id = :employeeId AND s.booking_date = :date", nativeQuery = true)
	List<String> findAllSlotTimeByEmployeeIdAndDate(@Param("employeeId") String employeeId, @Param("date") String date);


	// It takes shopId and returns List of all bookings for that particular Shop
	@Query("SELECT s.bookingId, s.employeeId, e.employeeName, s.serviceName, s.slotDuration, s.slotTime, s.bookingDate "
			+
			"FROM Slots s JOIN ShopEmployees e ON s.employeeId = e.employeeId " +
			"WHERE e.shopId = :shopId " +
			"ORDER BY s.slotTime ASC")
	List<Object[]> findAllBookedSlotsByShopIdSortedByTimeAsc(@Param("shopId") String shopId);
}
