package com.SalonSphereServer.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FilterResponseByCity {
    private String shopName;
    private String location;
    private String coverImage;
    private String shopId;
    private String shopTiming;
    private double rating;
    private String shopEmail;
}