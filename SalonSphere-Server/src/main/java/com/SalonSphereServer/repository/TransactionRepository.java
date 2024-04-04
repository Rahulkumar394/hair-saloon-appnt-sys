package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SalonSphereServer.entity.Transactions;
import com.SalonSphereServer.response.BookingDetailsResponse;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, String> {

	 @Query(value = "SELECT\r\n"
	 		+ "    si.shop_name AS shopName,\r\n"
	 		+ "    si.address AS shopAddress,\r\n"
	 		+ "    s.slot_time AS slotTime,\r\n"
	 		+ "    s.booking_date AS slotDate,\r\n"
	 		+ "    s.service_name AS serviceName,\r\n"
	 		+ "    s.status,\r\n"
	 		+ "    t.amount,\r\n"
	 		+ "    t.order_id AS orderId,\r\n"
	 		+ "    se.employee_id AS empId,\r\n"
	 		+ "    se.employee_name AS empName,\r\n"
	 		+ "    si.shop_id AS shopId\r\n"
	 		+ "FROM\r\n"
	 		+ "    salonsphere.shop_employees se\r\n"
	 		+ "JOIN\r\n"
	 		+ "    salonsphere.slots s ON se.employee_id = s.employee_id\r\n"
	 		+ "JOIN\r\n"
	 		+ "    salonsphere.transactions t ON s.booking_id = t.booking_id\r\n"
	 		+ "JOIN\r\n"
	 		+ "    salonsphere.shop_information si ON se.shop_id = si.shop_id\r\n"
	 		+ "WHERE\r\n"
	 		+ "    t.user_id = :userId", nativeQuery = true)
	    List<Object[]> findBookingDetailsByUserId(@Param("userId") String userId);


	
}
