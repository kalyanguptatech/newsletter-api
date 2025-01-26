const express = require('express');
const { client } = require('../config/database');
const emailService = require('../utils/emailService');

const emailHandler = express.Router();

emailHandler.post('/sendNewsletter', async (req, res) => {
    try {
        const { newsletterId } = req.body;

        // Fetch the newsletter
        const newsletterQuery = 'SELECT * FROM Newsletter WHERE id = $1';
        const newsletterResult = await client.query(newsletterQuery, [newsletterId]);

        if (newsletterResult.rowCount === 0) {
            return res.status(404).json({ error: 'Newsletter not found' });
        }
        const newsletter = newsletterResult.rows[0];

        // Fetch all subscribed subscribers
        const subscribersQuery = 'SELECT email FROM Subscriber WHERE isSubscribed = true';
        const subscribersResult = await client.query(subscribersQuery);

        const subscribers = subscribersResult.rows;

        // Send emails to all subscribers concurrently
        const emailPromises = subscribers.map((subscriber) => {
            return emailService.sendEmail(subscriber.email, newsletter.title, newsletter.content);
        });

        // Wait for all emails to be sent
        await Promise.all(emailPromises);

        // Update the newsletter's sentAt field
        const updateQuery = 'UPDATE Newsletter SET sentAt = NOW() WHERE id = $1';
        await client.query(updateQuery, [newsletterId]);

        res.status(200).json({ message: 'Newsletter sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending newsletter' });
    }
});

module.exports = emailHandler;
