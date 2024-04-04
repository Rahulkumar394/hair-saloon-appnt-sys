package com.SalonSphereServer.entity;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_information")
public class Users implements UserDetails {

	@Id
	@Column(name = "user_id")
	private String userId;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "contact_number", unique = true, nullable = false)
	private String contactNumber;

	@Column(name = "email", unique = true, nullable = false)
	private String email;

	@Column(name = "user_role")
	private String role;

	@Column(name = "password")
	private String password;

	@Column(name = "date_created")
	private Date createdDate;

	@Column(name = "date_modify")
	private Date modifyDate;

	@Column(name = "isdeleted")
	private boolean isDeleted;

	@Column(name = "profile_image")
	private String profile;

	public Users() {
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getRole() {
		return role;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Users(String userId, String firstName, String lastName, String contactNumber, String email, String password,
			Date createdDate, Date modifyDate, boolean isDeleted, String role,String profile) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.contactNumber = contactNumber;
		this.email = email;
		this.password = password;
		this.createdDate = createdDate;
		this.modifyDate = modifyDate;
		this.isDeleted = isDeleted;
		this.role = role;
		this.profile = profile;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", contactNumber="
				+ contactNumber + ", email=" + email + ", role=" + role + ", password=" + password + ", createdDate="
				+ createdDate + ", modifyDate=" + modifyDate + ", isDeleted=" + isDeleted + ", profile=" + profile
				+ "]";
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(this.role);
		return Arrays.asList(simpleGrantedAuthority);
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}