const express = require('express');

const emailHanlder = express.Router();

emailHanlder.post('/sendNewsletter',async(req,res)=>{
    try {
        const { newsletterId } = req.body;
        const newsletter = await Newsletter.findById(newsletterId);
        const subscribers = await Subscriber.find({ isSubscribed: true });
    
        subscribers.forEach((subscriber) => {
          emailService.sendEmail(subscriber.email, newsletter.title, newsletter.content);
        });
    
        newsletter.sentAt = new Date();
        await newsletter.save();
    
        res.status(200).json({ message: 'Newsletter sent successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error sending newsletter' });
      }
})

module.exports = emailHanlder;