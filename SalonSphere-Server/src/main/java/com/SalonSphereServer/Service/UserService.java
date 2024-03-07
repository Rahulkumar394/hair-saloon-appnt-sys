package com.SalonSphereServer.Service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.Entity.Users;
import com.SalonSphereServer.Repository.UserRepository;
import com.SalonSphereServer.common.Validation;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	// Registring new user in database
	public boolean registerUser(Users user) {
		Users findUser = userRepository.findByEmail(user.getEmail());

		// if findUser is equal to null that means there is no such email in the
		// database so we
		if (findUser == null) {

			// Write code for validation
			if (Validation.emailValidation(user.getEmail())
					&& Validation.contactNumberValidation(user.getContactNumber())
					&& Validation.firstNameValidation(user.getFirstName())
					&& Validation.lastNameValidation(user.getLastName())
					&& Validation.passwordValidation(user.getPassword())) {
				// Setting default values
				user.setUserId(UUID.randomUUID().toString());
				user.setIsDeleted(false);
				user.setPassword(passwordEncoder.encode(user.getPassword()));

				// Create a java.util.Date object
				java.util.Date utilDate = new java.util.Date();
				System.out.println("printinfg Date=============");

				// Convert java.util.Date to java.sql.Date
				java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
				
				
				System.out.println("printinfg Date="+sqlDate);

				user.setCreatedDate(sqlDate);
				user.setModifyDate(sqlDate);

				System.out.println("printinfg Date=============");
				// Save in the database
				findUser = userRepository.save(user);
				return true;
			}
		}
		return false;
	}
}
