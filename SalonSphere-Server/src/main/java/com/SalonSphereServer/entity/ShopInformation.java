package com.SalonSphereServer.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "shop_information")
public class ShopInformation {

    @Id
    @Column(name = "shop_id")
    private String shopId;

    @Column(name = "shop_name", nullable = false)
    private String shopName;

    // @ManyToOne
    // @JoinColumn(name = "user_id")
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "pincode", nullable = false)
    private int pincode;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "landmark")
    private String landmark;

    @Column(name = "address")
    private String address;

    @Column(name = "licence_no")
    private String licenceNo;

    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @Column(name = "modify_date", nullable = false)
    private Date modifyDate;

    @Column(name = "isdelete", nullable = false)
    private boolean isDelete;

    @Column(name = "is_active", nullable = false)
    private boolean shopStatus;

    @Column(name = "license_document")
    private String licenseDocument;

    @Column(name = "shop_cover_image")
    private String coverImage;

    @Column(name = "shop_email", unique = true)
    private String shopEmail;

    @Column(name = "shop_contact_no", unique = true)
    private String shopContactNo;

    @Column(name = "shop_city", nullable = false)
    private String shopCity;

    @Column(name = "status", nullable = false)
    private String status;

    // shop opening and closing timing format(10:00-18:00)
    @Column(name = "shop_timing", nullable = false)
    private String shopTiming;

    @OneToMany(mappedBy = "shopId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ServiceInformation> services;
    
    @OneToMany(mappedBy = "shopId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Feedback> feedbacks;
    
    public List<ServiceInformation> getServices() {
        return services;
    }
    
    public void setServices(List<ServiceInformation> services) {
        this.services = services;
    }

}