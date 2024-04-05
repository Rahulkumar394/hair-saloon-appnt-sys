package com.SalonSphereServer.common;

import com.SalonSphereServer.service.EmailService;

public class EmailContent {

    public static void registerMail(String emailAddress, String name) {
        Email email = new Email();
        email.setTo(emailAddress);
        email.setSubject("Welcome to SalonSphere - Your Ultimate Destination for Salon Appointments!");
        email.setContent(
                "<!DOCTYPE html>\r\n" + //
                        "<html lang=\"en\">\r\n" + //
                        "<head>\r\n" + //
                        "    <meta charset=\"UTF-8\">\r\n" + //
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n" + //
                        "    <title>Welcome to SalonSphere</title>\r\n" + //
                        "    <style>\r\n" + //
                        "        /* Style for the email content */\r\n" + //
                        "        body {\r\n" + //
                        "            font-family: Arial, sans-serif;\r\n" + //
                        "            background-color: #f4f4f4;\r\n" + //
                        "            margin: 0;\r\n" + //
                        "            padding: 0;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .container {\r\n" + //
                        "            max-width: 600px;\r\n" + //
                        "            margin: 0 auto;\r\n" + //
                        "            padding: 20px;\r\n" + //
                        "            background-color: #ffffff;\r\n" + //
                        "            border-radius: 10px;\r\n" + //
                        "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .logo {\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            margin-bottom: 20px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .logo img {\r\n" + //
                        "            width: 150px;\r\n" + //

                        "        }\r\n" + //
                        "\r\n" + //
                        "        h1 {\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            color: #333333;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        p {\r\n" + //
                        "            color: #666666;\r\n" + //
                        "            line-height: 1.6;\r\n" + //
                        "            margin-bottom: 20px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .button {\r\n" + //
                        "            display: inline-block;\r\n" + //
                        "            padding: 10px 20px;\r\n" + //
                        "            background-color: #4CAF50;\r\n" + //
                        "            color: white;\r\n" + //
                        "            text-decoration: none;\r\n" + //
                        "            border-radius: 5px;\r\n" + //
                        "        }\r\n" + //
                        "\r\n" + //
                        "        .footer {\r\n" + //
                        "            margin-top: 30px;\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            color: #999999;\r\n" + //
                        "        }\r\n" + //
                        "    </style>\r\n" + //
                        "</head>\r\n" + //
                        "<body>\r\n" + //
                        "    <div class=\"container\">\r\n" + //
                        "        <div class=\"logo\">\r\n" + //
                        "            <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAX3yPOIN1wkupftiTqSmnO-cWsKzVuaKBtAPjdOLaW7rK4EJ0SXoIsmrsmJhd8stR68&usqp=CAU\" alt=\"SalonSphere Logo\">\r\n"
                        + //
                        "        </div>\r\n" + //
                        "        <h1>Welcome to SalonSphere!</h1>\r\n" + //
                        "        <p>Dear " + name + ",</p>\r\n" + //
                        "        <p>Congratulations! You have successfully registered on SalonSphere, your ultimate destination for booking salon appointments conveniently.</p>\r\n"
                        + //
                        "        <p>With SalonSphere, you can:</p>\r\n" + //
                        "        <ul>\r\n" + //
                        "            <li>Book appointments with your favorite salons and stylists.</li>\r\n" + //
                        "            <li>View and manage your upcoming appointments.</li>\r\n" + //
                        "            <li>Receive updates and special offers from our partner salons.</li>\r\n" + //
                        "        </ul>\r\n" + //
                        "        <p>To get started, click the button below to log in to your SalonSphere account:</p>\r\n"
                        + //
                        "        <p><a href=\"http://localhost:4200/login\" class=\"button\">Log In to SalonSphere</a></p>\r\n"
                        + //
                        "        <p>If you have any questions or need assistance, please don't hesitate to contact our support team at salonsphere.woss@gmail.com.</p>\r\n"
                        + //
                        "        <p>Thank you for choosing SalonSphere!</p>\r\n" + //
                        "        <div class=\"footer\">\r\n" + //
                        "            <p>This email was sent by SalonSphere. &copy; 2024 SalonSphere. All rights reserved.</p>\r\n"
                        + //
                        "        </div>\r\n" + //
                        "    </div>\r\n" + //
                        "</body>\r\n" + //
                        "</html> ");

        // calling Email Service
        EmailService.sendEmail(email);
        System.out.println("user Tegitsered===================================");
    }

    public static void registerShop(String shopEmail, String shopName, String shopkeeperEmail) {
        Email email = new Email();
        email.setTo(shopEmail);
        email.setCc(shopkeeperEmail);
        email.setSubject("Welcome to SalonSphere - Your Ultimate Destination for Salon Appointments!");
        email.setContent(
                "<!DOCTYPE html>\r\n" + //
                        "<html lang=\"en\">\r\n" + //
                        "<head>\r\n" + //
                        "    <meta charset=\"UTF-8\">\r\n" + //
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n" + //
                        "    <title>SalonSphere Shop Registration</title>\r\n" + //
                        "    <style>\r\n" + //
                        "        /* Style for the email content */\r\n" + //
                        "        body {\r\n" + //
                        "            font-family: Arial, sans-serif;\r\n" + //
                        "            background-color: #f4f4f4;\r\n" + //
                        "            margin: 0;\r\n" + //
                        "            padding: 0;\r\n" + //
                        "        }\r\n" + //
                        "        .container {\r\n" + //
                        "            max-width: 600px;\r\n" + //
                        "            margin: 0 auto;\r\n" + //
                        "            padding: 20px;\r\n" + //
                        "            background-color: #ffffff;\r\n" + //
                        "            border-radius: 10px;\r\n" + //
                        "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n" + //
                        "        }\r\n" + //
                        "        .logo {\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            margin-bottom: 20px;\r\n" + //
                        "        }\r\n" + //
                        "        .logo img {\r\n" + //
                        "            width: 150px;\r\n" + //
                        "        }\r\n" + //
                        "        h1 {\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            color: #333333;\r\n" + //
                        "        }\r\n" + //
                        "        p {\r\n" + //
                        "            color: #666666;\r\n" + //
                        "            line-height: 1.6;\r\n" + //
                        "            margin-bottom: 20px;\r\n" + //
                        "        }\r\n" + //
                        "        .button {\r\n" + //
                        "            display: inline-block;\r\n" + //
                        "            padding: 10px 20px;\r\n" + //
                        "            background-color: #4CAF50;\r\n" + //
                        "            color: white;\r\n" + //
                        "            text-decoration: none;\r\n" + //
                        "            border-radius: 5px;\r\n" + //
                        "        }\r\n" + //
                        "        .footer {\r\n" + //
                        "            margin-top: 30px;\r\n" + //
                        "            text-align: center;\r\n" + //
                        "            color: #999999;\r\n" + //
                        "        }\r\n" + //
                        "    </style>\r\n" + //
                        "</head>\r\n" + //
                        "<body>\r\n" + //
                        "    <div class=\"container\">\r\n" + //
                        "        <div class=\"logo\">\r\n" + //
                        "            <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAX3yPOIN1wkupftiTqSmnO-cWsKzVuaKBtAPjdOLaW7rK4EJ0SXoIsmrsmJhd8stR68&usqp=CAU\" alt=\"SalonSphere Logo\">\r\n"
                        + //
                        "        </div>\r\n" + //
                        "        <h1>Welcome to SalonSphere!</h1>\r\n" + //
                        "        <p>Dear Shopkeeper,</p>\r\n" + //
                        "        <p>Congratulations! You have successfully applied for creating a shop on SalonSphere, your ultimate destination for salon appointment bookings.</p>\r\n"
                        + //
                        "        <p>Your application is currently under review. We will notify you once the verification process is completed.</p>\r\n"
                        + "<p>Here are some key features of SalonSphere for shopkeepers like you:</p>\r\n" + //
                        "        <ul>\r\n" + //
                        "            <li>Easy setup: Quickly set up your shop profile and services to start accepting appointments.</li>\r\n"
                        + //
                        "            <li>Increased visibility: Showcase your services to a wide audience of potential customers.</li>\r\n"
                        + //
                        "            <li>Appointment management: Manage your appointments efficiently and keep track of your schedule.</li>\r\n"
                        + //
                        "            <li>Customer engagement: Engage with your customers by sending updates, promotions, and special offers.</li>\r\n"
                        + //
                        "            <li>Reliable support: Our dedicated support team is here to assist you whenever you need help.</li>\r\n"
                        + //
                        "        </ul>\r\n" + //
                        "        <p>To get started, please log in to your SalonSphere account using the button below:</p>\r\n"
                        + //
                        "        <p><a href=\"http://localhost:4200/login\" class=\"button\">Log In to SalonSphere</a></p>"
                        + //
                        "        <p>In the meantime, feel free to explore SalonSphere and familiarize yourself with our platform.</p>\r\n"
                        + //
                        "        <p>If you have any questions or need assistance, please don't hesitate to contact our support team at woss.salonsphere@gmail.com.</p>\r\n"
                        + //
                        "        <p>Thank you for choosing SalonSphere!</p>\r\n" + //
                        "        <div class=\"footer\">\r\n" + //
                        "            <p>This email was sent by SalonSphere. &copy; 2024 SalonSphere. All rights reserved.</p>\r\n"
                        + //
                        "        </div>\r\n" + //
                        "    </div>\r\n" + //
                        "</body>\r\n" + //
                        "</html>");

        // calling Email Service
        EmailService.sendEmail(email);
    }

    public static boolean sendOTP(String emailAddress, String OTP) {
        Email email = new Email();
        email.setTo(emailAddress);
        email.setSubject("OTP for Account Validation");
        email.setContent(
            "<!DOCTYPE html>\r\n" + //
            "<html lang=\"en\">\r\n" + //
            "<head>\r\n" + //
            "    <meta charset=\"UTF-8\">\r\n" + //
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n" + //
            "    <title>OTP for Account Validation</title>\r\n" + //
            "    <style>\r\n" + //
            "        /* Style for the email content */\r\n" + //
            "        body {\r\n" + //
            "            font-family: Arial, sans-serif;\r\n" + //
            "            background-color: #f4f4f4;\r\n" + //
            "            margin: 0;\r\n" + //
            "            padding: 0;\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        .container {\r\n" + //
            "            max-width: 600px;\r\n" + //
            "            margin: 0 auto;\r\n" + //
            "            padding: 20px;\r\n" + //
            "            background-color: #ffffff;\r\n" + //
            "            border-radius: 10px;\r\n" + //
            "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        .logo {\r\n" + //
            "            text-align: center;\r\n" + //
            "            margin-bottom: 20px;\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        .logo img {\r\n" + //
            "            width: 150px;\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        h1 {\r\n" + //
            "            text-align: center;\r\n" + //
            "            color: #333333;\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        p {\r\n" + //
            "            color: #666666;\r\n" + //
            "            line-height: 1.6;\r\n" + //
            "            margin-bottom: 20px;\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        .button {\r\n" + //
            "            display: inline-block;\r\n" + //
            "            padding: 10px 20px;\r\n" + //
            "            background-color: #4CAF50;\r\n" + //
            "            color: white;\r\n" + //
            "            text-decoration: none;\r\n" + //
            "            border-radius: 5px;\r\n" + //
            "        }\r\n" + //
            "\r\n" + //
            "        .footer {\r\n" + //
            "            margin-top: 30px;\r\n" + //
            "            text-align: center;\r\n" + //
            "            color: #999999;\r\n" + //
            "        }\r\n" + //
            "    </style>\r\n" + //
            "</head>\r\n" + //
            "<body>\r\n" + //
            "    <div class=\"container\">\r\n" + //
            "        <div class=\"logo\">\r\n" + //
            "            <img src=\"https://yourlogo.com\" alt=\"Your Logo\">\r\n" + //
            "        </div>\r\n" + //
            "        <h1>OTP for Account Validation</h1>\r\n" + //
            "        <p>Dear User,</p>\r\n" + //
            "        <p>Your OTP for account validation is: <strong>" + OTP + "</strong></p>\r\n" + //
            "        <p>Please use this OTP to validate your account.</p>\r\n" + //
            "        <div class=\"footer\">\r\n" + //
            "            <p>This email was sent by YourAppName. &copy; 2024 YourAppName. All rights reserved.</p>\r\n" + //
            "        </div>\r\n" + //
            "    </div>\r\n" + //
            "</body>\r\n" + //
            "</html>"
        );
    
        // calling Email Service
        try{
            EmailService.sendEmail(email);
            return true;
        }catch(Exception e){
            System.out.println("Error Occured while sending otp");
        }
        System.out.println("OTP Sent===================================");
        return false;
    }

}
