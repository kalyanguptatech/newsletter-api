const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "newsletter@devplexity.com", 
        pass: "786004@Devplexity", 
      },
    });
    const mailOptions = {
      from: "contactdevplexity@gmail.com", // Sender's email
      to, // Recipient email
      subject, // Email subject
      text: content, // Email body (text format)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
