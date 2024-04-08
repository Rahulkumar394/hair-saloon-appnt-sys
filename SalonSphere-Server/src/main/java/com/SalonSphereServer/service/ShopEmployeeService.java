package com.SalonSphereServer.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.common.Validation;
import com.SalonSphereServer.entity.EmployeeService;
import com.SalonSphereServer.entity.ShopEmployees;
import com.SalonSphereServer.repository.ShopEmployeeRepository;
import com.SalonSphereServer.repository.ShopkeeperRepository;

@Service
public class ShopEmployeeService {

    @Autowired
    private ShopEmployeeRepository shopEmployeeRepository;
    @Autowired
    private ShopkeeperRepository shopkeeperRepository;

    // Through this method we add employee in salon
    public boolean addEmp(ShopEmployees emp) {
        boolean exists = shopkeeperRepository.existsById(emp.getShopId());
        // Validation Employe
        if (exists && Validation.firstNameValidation(emp.getEmployeeName())) {

            // Setting random UUid to employee
            String empId = UUID.randomUUID().toString();

            // Getting all the services in the list
            List<EmployeeService> empList = emp.getServices();

            // iterating to add employeeId
            for (EmployeeService empservice : empList) {
                empservice.setEmployeeId(empId);
                empservice.setEmpSerId(UUID.randomUUID().toString());
            }
            // setting employeeId to the ShopEmployees object
            emp.setEmployeeId(empId);

            // setting updated service list that contains employeeId
            emp.setServices(empList);
            ShopEmployees isAdd = shopEmployeeRepository.save(emp);
            if (isAdd != null)
                return true;
        }
        return false;
    }
    
    // Through this method we find all employee in particular shop by shopId
    public  List<ShopEmployees> showAllEmpByShopId(String shopId) {        
        List<ShopEmployees> listOfEmps=shopEmployeeRepository.findShopEmployeesByShopId(shopId);
        return listOfEmps;
    }

    // This method give  us the details of a specific employee by employeeId
    public ShopEmployees showEmpByEmpId(String empId){
       Optional<ShopEmployees> optional= shopEmployeeRepository.findById(empId);
       ShopEmployees emps=optional.get() ;
       return  emps;
    }

    // public Slots showSlotsByShopId(String ShopId){
        
    // }
}
