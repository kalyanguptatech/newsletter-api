const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "kb1225952@gmail.com", // Your Gmail address
        pass: "tqvd ihjz zoiu vyna", // App Password generated from Google
      },
    });

    const mailOptions = {
      from: "kb1225952@gmail.com", // Sender's email
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
