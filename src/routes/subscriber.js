const express = require('express');
const {client} = require('../config/database');

const subscriber = express.Router();

subscriber.post('/subscribe',async (req,res)=>{
    const { email , name } = req.body;
    try {
        const result = await client.query(
          `INSERT INTO Subscriber (email, name) VALUES ($1, $2) RETURNING *`,
          [email, name]
        );
        res.status(200).json(result.rows[0]);
      } catch (error) {
        console.error('Error adding subscriber:', error.message);
        res.status(500).json({msg:'error while adding subscriber'});
      }
})

subscriber.get('/',async(req,res)=>{
    try {
        const result = await client.query(`SELECT * FROM Subscriber`);
        res.status(200).json(result.rows);
        return;
      } catch (error) {
        console.error('Error fetching subscribers:', error.message);
        res.status(404).json({msg:"Error while fetching subscribers"});
      }
})

subscriber.post('/unsubscribe',async(req,res)=>{
    try {
        const { email } = req.body;

        // Update the subscription status in the PostgreSQL database
        const query = 'UPDATE subscribers SET is_subscribed = $1 WHERE email = $2 RETURNING *';
        const values = [false, email];

        const result = await client.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subscriber not found' });
        }

        res.status(200).json({ message: 'Successfully unsubscribed', subscriber: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error unsubscribing' });
    }
})

module.exports = subscriber;