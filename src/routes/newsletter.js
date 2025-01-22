const express = require('express');
const { client } = require('../config/database');

const newsletter = express.Router();

newsletter.post('/create',async(req,res)=>{
    const { title ,content } = req.body;
    try {
        const result = await client.query(
          `INSERT INTO Newsletter (title, content) VALUES ($1, $2) RETURNING *`,
          [title, content]
        );
        res.status(200).json(result.rows[0]);
      } catch (error) {
        console.error('Error adding newsletter:', error.message);
        res.status(500).json({msg:"error while adding newsletter"})
      }
});

newsletter.get('/',async(req,res)=>{
    try {
        const result = await client.query(`SELECT * FROM Newsletter`);
        res.json(result.rows);
        return;
      } catch (error) {
        console.error('Error fetching newsletters:', error.message);
        res.status(500).json({msg:"error fetching newslettes"});
        return;
      }
});

module.exports = newsletter ;