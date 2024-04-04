package com.SalonSphereServer.dto;

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
public class BookedSlot {

    private String bookingId;

    private String employeeId;

    private String employeeName;

    private String serviceName;

    private int slotDuration;

    private String slotTime;

    private String bookingDate;

}
