const express = require('express');
const { SubscriberModel } = require('../config/schema');

const subscriber = express.Router();

subscriber.post('/subscribe',async (req,res)=>{
    try {
        const { email, name } = req.body;
        const subscriber = new SubscriberModel({ email, name });
        await subscriber.save();
        res.status(201).json({ message: 'Subscriber added successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error adding subscriber' });
      }
})

subscriber.get('/',async(req,res)=>{
    try {
        const subscribers = await SubscriberModel.find({ isSubscribed: true });
        res.status(200).json(subscribers);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching subscribers' });
      }
})

subscriber.post('/unsubscribe',async(req,res)=>{
    try {
        const { email } = req.body;
        await SubscriberModel.findOneAndUpdate({ email }, { isSubscribed: false });
        res.status(200).json({ message: 'Successfully unsubscribed' });
      } catch (error) {
        res.status(500).json({ error: 'Error unsubscribing' });
      }
})

module.exports = subscriber;