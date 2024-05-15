package com.SalonSphereServer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.SalonSphereServer.entity.ShopInformation;

@Repository
public interface ShopkeeperRepository extends JpaRepository<ShopInformation, String> {

	// Through this method we can get all the shopkeepers in the database which are
	// not deleted i.e., their isDeleted flag is Zero
	@Query(value = "SELECT * FROM shop_information where user_id=? and isdelete=0;", nativeQuery = true)
	public List<ShopInformation> findByUserId(String userId);

	// Through this method we marks shop as delete in database so that it will not
	// show up on the screen but still remains in the database.
	@Transactional
	@Modifying
	@Query("UPDATE ShopInformation s SET s.isDelete = :isDelete WHERE s.shopId = :shopId")
	void updateIsDeleteById(@Param("shopId") String shopId, @Param("isDelete") boolean isDelete);

	// Through this method we get shop Infromation by shop id
	public ShopInformation findByShopId(String shopId);
	
	public ShopInformation findByShopEmail(String shopEmail);

	// Through this method we find all pending shops i.e., those who have not been
	// verified yet
	@Query(value = "SELECT si.state, si.district, si.shop_name, si.shop_email, u.first_name, u.last_name, u.email FROM shop_information si \r\n"
			+ "	         JOIN user_information u ON si.user_id = u.user_id \r\n"
			+ "	         WHERE si.status = 'Pending'", nativeQuery = true)
	List<Object[]> findPendingShopsDetails();

	// Through this method we get all the shops count which status is accepted
	long countByUserIdAndStatusAndIsDelete(String userId, String status, boolean isDelete);

	// Through this method we update the status of the shop to Accepted or rejected
	// from Pending
	@Modifying
	@Transactional
	@Query("UPDATE ShopInformation e SET e.status = :status WHERE e.shopEmail = :shopEmail")
	void updateStatusByShopEmail(String shopEmail, String status);

	@Query(value = "SELECT s.* FROM shop_information s INNER JOIN user_information u ON s.user_id = u.user_id WHERE s.user_id = :userId AND (LOWER(s.shop_name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.address) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.shop_city) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.shop_email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.shop_contact_no) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.status) LIKE LOWER(CONCAT('%', :keyword, '%')))", nativeQuery = true)
	List<ShopInformation> search(@Param("keyword") String keyword, @Param("userId") String userId);

	// Through this method we get shopOwner email by shopEmail
	@Query(value = "SELECT u.email FROM user_information u WHERE u.user_id = (SELECT s.user_id FROM shop_information s WHERE s.shop_email = :shopEmail)", nativeQuery = true)
	String getOwnerEmailByShopEmail(@Param("shopEmail") String shopEmail);

	// ***************CODE FOR FILTERING*******************************
	// This method help to filering by shopCity
	@Query(value = "SELECT * FROM shop_information WHERE district = :shopDistrict AND status = 'accepted'", nativeQuery = true)
	List<ShopInformation> findShopByCity(@Param("shopDistrict") String shopDistrict);

	// Through this methode we get all shops details like
	// (shopname,serviceName,servicePrice and serviceDuration) by shop_city,
	// serviceName,servicePriceRange like (100-200) and distance like(100m-200m)
	@Query(value = "SELECT sh.shop_name, sh.shop_id, sh.shop_timing,sh.shop_city, sh.district, sh.state, sh.shop_cover_image, si.service_name, si.service_price, si.service_duration "
			+
			"FROM shop_information sh " +
			"INNER JOIN service_information si ON sh.shop_id = si.shop_id " +
			"WHERE sh.district = :city AND (:serviceName IS NULL OR si.service_name = :serviceName) " +
			"AND si.service_price BETWEEN :minPrice AND :maxPrice " +
			"AND si.service_duration BETWEEN :minDistance AND :maxDistance ORDER BY si.service_price ASC", nativeQuery = true)
	List<Object[]> findShopByCityAndServiceNameAndServicePriceAndDistance(@Param("city") String city,
			@Param("serviceName") String serviceName, @Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice,
			@Param("minDistance") int minDistance, @Param("maxDistance") int maxDistance);

	// ************** FOR FILTERING ENDS HERE*********************************

	// Custom query method to check if a shop exists based on shop ID
	boolean existsByShopId(String shopId);

	// if you delete then talk to me (Rahul Kumar)
	// void deleteByIsDeleteAndCreateDateBefore(boolean isDelete, Date date);

}
