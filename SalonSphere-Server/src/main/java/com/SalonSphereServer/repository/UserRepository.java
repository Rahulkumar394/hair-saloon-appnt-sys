package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.SalonSphereServer.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    public Users findByEmail(String email);

    public List<Users> findByRole(String role);

    

}
