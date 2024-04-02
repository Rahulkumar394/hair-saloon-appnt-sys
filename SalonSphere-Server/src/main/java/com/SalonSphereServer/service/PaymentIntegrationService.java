package com.SalonSphereServer.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.entity.Transactions;
import com.SalonSphereServer.repository.TransactionRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class PaymentIntegrationService {
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	public String createNewOrder(int payment) throws Exception{
		
		//create object of RazorpayClient and pass the Key_id and secret_id
		RazorpayClient razorpay = new RazorpayClient("rzp_test_t5MFB53rHNJP1w", "1dH3fMnmJT9n63GyR9fjERtk");
		
		//create JSON object and add some details about payment
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount",payment*100);
		orderRequest.put("currency","INR");
		orderRequest.put("receipt", "receipt#1");
		
		//create the order
		Order order = razorpay.Orders.create(orderRequest);
		return order.toString();
	}
	

	public boolean saveTransaction(Transactions transactions) {
		
		Transactions transaction = transactionRepository.save(transactions);
		
		return transaction !=null;
	}

}
