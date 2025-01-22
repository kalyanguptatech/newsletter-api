const express = require('express');
const { NewsLetterModel } = require('../config/schema');

const newsletter = express.Router();

newsletter.post('/create',async(req,res)=>{
    try {
        const { title, content } = req.body;
        const newsletter = new NewsLetterModel({ title, content });
        await newsletter.save();
        res.status(201).json({ message: 'Newsletter created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error creating newsletter' });
      }
});

newsletter.get('/',async(req,res)=>{
    try {
        const newsletters = await Newsletter.find();
        res.status(200).json(newsletters);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching newsletters' });
      }
});

module.exports = newsletter ;