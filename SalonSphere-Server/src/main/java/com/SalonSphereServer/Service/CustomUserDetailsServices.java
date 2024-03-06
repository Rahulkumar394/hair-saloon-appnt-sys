package com.SalonSphereServer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.entity.Users;
import com.SalonSphereServer.repository.UserRepository;

@Service
public class CustomUserDetailsServices  implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user=userRepository.findByEmail(email);
		return user;		
	}
}
