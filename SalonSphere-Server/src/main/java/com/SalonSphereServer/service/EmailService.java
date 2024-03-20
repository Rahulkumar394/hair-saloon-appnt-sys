package com.SalonSphereServer.service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.SalonSphereServer.common.Email;

@Service
public class EmailService {

	public static boolean sendEmail(Email email) {

		boolean flag = false;
		String from = "salonsphere.woss@gmail.com";
		String host = "smtp.gmail.com";

		Properties properties = System.getProperties();

		// Set Host
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", 465);
		properties.put("mail.smtp.ssl.enable", "true");
		properties.put("mail.smtp.auth", "true");

		// Get the session object
		Session session = Session.getInstance(properties, new Authenticator() {

			@Override
			protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
				return new javax.mail.PasswordAuthentication("salonsphere.woss@gmail.com", "ukzh wxow wocl aaiv");
			}

		});

		session.setDebug(true);

		// Compose message
		MimeMessage mimeMessage = new MimeMessage(session);

		try {
			// Adding Sender
			mimeMessage.setFrom(from);

			// Adding Recipients
			mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(email.getTo()));
			mimeMessage.setRecipient(Message.RecipientType.CC, new InternetAddress(email.getCc()));

			// Adding subject to message
			mimeMessage.setSubject(email.getSubject());

			// Adding Message Text
			mimeMessage.setText(email.getMessage());

			Transport.send(mimeMessage);
			System.out.println("Sent Email Successfully...");

			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return flag;

	}

}
