package com.SalonSphereServer.entity;

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
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "shop_employees")
public class ShopEmployees {

	@Id
	@Column(name = "employee_id")
	private String employeeId;
	
	@Column(name = "employee_name", nullable = false)
	private String employeeName;
	
	@Column(name = "shop_id", nullable = false)
	private String shopId;
	
	@Column(name = "is_leave")
	private boolean isLeave;	

	@OneToMany(mappedBy = "employeeId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EmployeeService> services;

	
}
