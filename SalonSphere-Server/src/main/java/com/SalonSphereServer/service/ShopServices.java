package com.SalonSphereServer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SalonSphereServer.common.Validation;
import com.SalonSphereServer.dto.ShopServiceDTO;
import com.SalonSphereServer.entity.ServiceInformation;
import com.SalonSphereServer.repository.ShopServicesRepository;

@Service
public class ShopServices {
	@Autowired
	private ShopServicesRepository servicesRepository;

	// adding service to the shop
	public boolean addShopServices(@NonNull List<ServiceInformation> serviceInformation) {

		List<ServiceInformation> serviceInformationList = new ArrayList<>();
		for (ServiceInformation serviceInformation2 : serviceInformation) {
			// Validation Check
			System.out.println("=validation=>" + Validation.firstNameValidation(serviceInformation2.getServiceName()));
			if (Validation.firstNameValidation(serviceInformation2.getServiceName())
					&& (serviceInformation2.getServicePrice() > 0)) {

				// Setting some Defualt value
				// Create a java.util.Date object
				java.util.Date utilDate = new java.util.Date();

				// Convert java.util.Date to java.sql.Date
				java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

				serviceInformation2.setCreateDate(sqlDate);
				serviceInformation2.setModifyDate(sqlDate);

				System.out.println("====in loop===" + serviceInformation2);
				serviceInformationList.add(serviceInformation2);
			}
		}
		List<ServiceInformation> sInformation = servicesRepository.saveAll(serviceInformationList);
		if (!sInformation.isEmpty())
			return true;
		return false;
	}

	// updating services
	public boolean updateService(ServiceInformation serviceInformation) {
		// Retrieve the service from the database
		ServiceInformation existingService = servicesRepository.findById(serviceInformation.getServiceId())
				.orElse(null);

		// Update the service fields excluding serviceId
		if (existingService != null && (Validation.firstNameValidation(serviceInformation.getServiceName())
				&& (serviceInformation.getServicePrice() > 0))) {

			existingService.setServiceName(serviceInformation.getServiceName());
			existingService.setServicePrice(serviceInformation.getServicePrice());
			existingService.setShopId(serviceInformation.getShopId());
			existingService.setServiceDuration(serviceInformation.getServiceDuration());
			existingService.setCreateDate(serviceInformation.getCreateDate());

			// Create a java.util.Date object
			java.util.Date utilDate = new java.util.Date();

			// Convert java.util.Date to java.sql.Date
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

			existingService.setModifyDate(sqlDate);

			// Save the updated service
			servicesRepository.save(existingService);
			return true;
		}
		return false;
	}

	// Through this method we marked as delete by setting the isActive field to
	// false in Service table
	@Transactional
	public void deleteService(int id) {
		servicesRepository.updateIsDeleteById(true, id);
		return;
	}

	// through this method we show all services
	public List<ShopServiceDTO> showServices(String shopId) {

		List<ShopServiceDTO> serviceList = new ArrayList<>();
		List<ServiceInformation> sList = servicesRepository.findAllServicesByShopId(shopId);
		for (ServiceInformation s : sList) {
			ShopServiceDTO temp = new ShopServiceDTO();
			temp.setServiceId(s.getServiceId());
			temp.setServiceName(s.getServiceName());
			temp.setServicePrice(s.getServicePrice());
			temp.setServiceDuration(s.getServiceDuration());

			serviceList.add(temp);
		}
		return serviceList;
	}

	// getting service info based on serviceid
	public ShopServiceDTO getService(int serviceId) {

		Optional<ServiceInformation> dto = servicesRepository.findById(serviceId);
		ShopServiceDTO serviceDTO = new ShopServiceDTO();
		ServiceInformation sdto = dto.get();
		serviceDTO.setServiceId(serviceId);
		serviceDTO.setServiceName(sdto.getServiceName());
		serviceDTO.setServicePrice(sdto.getServicePrice());
		serviceDTO.setServiceDuration(sdto.getServiceDuration());
		serviceDTO.setCreateDate(sdto.getCreateDate());
		return serviceDTO;
	}

	// Getting all service name alog with service id in particular shop based on
	// shopid.
	public Map<Integer, String> getAllServiceNameByShopId(String shopId) {
		List<Object[]> resultList = servicesRepository.findServiceIdAndNameByShopId(shopId);
		Map<Integer, String> serviceMap = new HashMap<>();
		for (Object[] result : resultList) {
			Integer serviceId = (Integer) result[0];
			String serviceName = (String) result[1];
			serviceMap.put(serviceId, serviceName);
		}
		return serviceMap;
	}
}
