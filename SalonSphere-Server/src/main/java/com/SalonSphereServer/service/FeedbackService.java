package com.SalonSphereServer.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalonSphereServer.common.Validation;
import com.SalonSphereServer.entity.Feedback;
import com.SalonSphereServer.repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Through this method we can add feedback in the database
    public boolean addFeedBack(Feedback feedback) {

        System.out.println("=====Adding new feedback inside feedback Service:====\n " + feedback);
        System.out.println((Validation.addressValidation(feedback.getReviewMessage())));
        System.out.println((feedback.getRating() >= 0 && feedback.getRating() <= 5));

        // Validation
        if ((feedback.getRating() >= 0 && feedback.getRating() <= 5)) {
        	

            // Setting Defult Value
            // Create a java.util.Date object
            java.util.Date utilDate = new java.util.Date();

            // Convert java.util.Date to java.sql.Date
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
            feedback.setReviewDate(sqlDate);

            // setting likes value with Zero '0' at the time of adding feedback
            feedback.setLikes(0);
            Feedback fb = feedbackRepository.save(feedback);

            if (fb != null)
                return true;
        }
        return false;
    }
}
