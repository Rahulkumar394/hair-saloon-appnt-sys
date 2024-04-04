package com.SalonSphereServer.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
public class Slots {
	
	@Id
	@Column(name = "booking_id")
	private String bookingId;
	
	@Column(name = "employee_id")
	private String employeeId;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "slot_duration")
	private int slotDuration;
	
	@Column(name = "slot_time")
	private String slotTime;
	
	@Column(name = "booking_date")
	private String bookingDate;

}
