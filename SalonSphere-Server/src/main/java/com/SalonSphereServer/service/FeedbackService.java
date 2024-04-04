package com.SalonSphereServer.service;

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

        // Validation
        if (Validation.addressValidation(feedback.getReviewMessage())
                && (feedback.getRating() >= 0 && feedback.getRating() <= 5)) {

            // Setting Defult Value
            java.util.Date utilDate = new java.util.Date();// Create a java.util.Date object
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());// Convert java.util.Date to java.sql.Date
            feedback.setReviewDate(sqlDate);
            
            // setting likes value with Zero '0' at the time of adding feedback
            feedback.setLikes(0);
            feedback = feedbackRepository.save(feedback);
            if (feedback != null)
                return true;
        }
        return false;
    }
}
