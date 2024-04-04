package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SalonSphereServer.entity.ShopEmployees;

@Repository
public interface ShopEmployeeRepository  extends JpaRepository<ShopEmployees, String>{
	
	@Query(value = "SELECT e FROM ShopEmployees e WHERE e.shopId = :shopId")
    List<ShopEmployees> findShopEmployeesByShopId(@Param("shopId") String shopId);

    @Modifying
    @Query(value = "DELETE e FROM shop_employees e WHERE e.employee_id = :employeeId ",nativeQuery = true)
    void DeleteByEmployeeId(String employeeId);
}
