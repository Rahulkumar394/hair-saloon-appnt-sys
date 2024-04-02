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

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity
public class Transactions {
	
	@Id
	@Column(name ="order_id")
	private String orderId;
	
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "amount")
	private int amount;
	
	@Column(name = "payment_id")
	private String paymentId;
	
	@Column(name = "payment_signature")
	private String paymentSignature;
	
	@Column(name = "booking_id")
	private String bookingId;
	

}
