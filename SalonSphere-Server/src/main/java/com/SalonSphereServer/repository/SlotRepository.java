package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SalonSphereServer.dto.BookedSlot;
import com.SalonSphereServer.entity.Slots;

@Repository
public interface SlotRepository extends JpaRepository<Slots, String> {

	@Query(value = "select s.slot_time from slots s where employee_id = :employeeId", nativeQuery = true)
	List<String> findAllSlotTimeByEmployeeId(@Param("employeeId") String employeeId);

	// @Query("SELECT s FROM Slots s JOIN s.employeeId e WHERE e.shopId = :shopId
	// ORDER BY s.slotTime ASC")
	// List<Slots> findAllSlotsByShopIdSortedByTimeAsc(@Param("shopId") String
	// shopId);

	@Query("SELECT NEW com.SalonSphereServer.dto.BookedSlot(s.bookingId, s.employeeId, e.employeeName, s.serviceName, s.slotDuration, s.slotTime, s.bookingDate) "
			+
			"FROM Slots s JOIN ShopEmployees e ON s.employeeId = e.employeeId " +
			"WHERE e.shopId = :shopId " +
			"ORDER BY s.slotTime ASC")
	List<BookedSlot> findAllBookedSlotsByShopIdSortedByTimeAsc(@Param("shopId") String shopId);
}
