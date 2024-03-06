package com.salonsphereserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.salonsphereserver.entity.Users;
import com.salonsphereserver.repository.UserRepository;

@Service
public class CustomUserDetailsServices  implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		Users user = userRepository.findByUserId(userId);
		if(user==null) {
			throw new RuntimeException("user not found");
		}
		return (UserDetails) user;
	}

}
