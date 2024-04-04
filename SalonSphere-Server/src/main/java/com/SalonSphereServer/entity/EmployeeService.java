package com.SalonSphereServer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "employee_service")
public class EmployeeService {

    @Id
    @Column(name = "emp_ser_id")
    private String empSerId;

    @Column(name = "employee_id", nullable = false)
    private String employeeId;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Column(name = "service_id", nullable = false)
    private int serviceId;

}
