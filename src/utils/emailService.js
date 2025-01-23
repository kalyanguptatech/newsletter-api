const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "contactdevplexity@gmail.com", // Your Gmail address
        pass: "rxyk gneq xhfi wboo", // App Password generated from Google
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
