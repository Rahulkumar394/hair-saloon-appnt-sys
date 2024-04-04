package com.SalonSphereServer.response;

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
@ToString
@Builder
public class BookingDetailsResponse {
    private String shopName;
    private String shopAddress;
    private String orderId;
    private int amount;
    private String date;
    private String time;
    private String serviceName;
    private String status;
    private String empId;
    private String shopId;
    private String empName;
}
