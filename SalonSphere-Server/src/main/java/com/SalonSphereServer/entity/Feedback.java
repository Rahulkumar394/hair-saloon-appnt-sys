package com.SalonSphereServer.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "review_message")
    private String reviewMessage;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @Column(name = "shop-Id", nullable = false)
    private String shopId;

    @Column(name = "review_date", nullable = false)
    private Date reviewDate;

    @Column(name = "rating", nullable = false)    
    private int rating;

    @Column(name = "likes")
    private int likes;

    @Column(name = "employee_name")
    private String employeeName;

    @Column(name = "employee_id")
    private String employeeId;

     

}