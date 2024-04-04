package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.SalonSphereServer.entity.ShopInformation;
import com.SalonSphereServer.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    public Users findByUserId(String userId);

    @Query("SELECT u FROM Users u WHERE u.email = :email AND u.isDeleted = false")
    Users findByEmail(@Param("email") String email);

    public List<Users> findByRole(String role);

    @Query(name = "SELECT Count(user_id) from shop_information where user_id= ? and isdelete = 0 and status = 'accepted' ", nativeQuery = true)
    public int findNumberOfShopsByUserId(String userId);

    @Query("SELECT s FROM ShopInformation s " +
            "WHERE LOWER(s.shopName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(s.address) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(s.shopCity) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ShopInformation> searchShopsByKeyword(@Param("keyword") String keyword);

    @Query("SELECT u FROM Users u WHERE u.userId = ?1")
    Users getUserInfo(String userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Users u SET u.profile = :profileName WHERE u.userId = :userId")
    void updateProfileByUserId(@Param("userId") String userId, @Param("profileName") String profileName);

    // Marking the user as deleted as soft delete
    @Transactional
    @Modifying
    @Query("UPDATE Users u SET u.isDeleted = :isDelete WHERE u.userId = :userId")
    Integer updateIsDeleteById(@Param("userId") String userId, @Param("isDelete") boolean isDelete);

}
