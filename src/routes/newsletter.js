const express = require('express');
const { client } = require('../config/database');

const newsletter = express.Router();

newsletter.get('/:newsletterId', async (req, res) => {
  const { newsletterId } = req.params; // Extract newsletterId from the URL parameters

  try {
    const result = await client.query(
      `DELETE FROM Newsletter WHERE id = $1 RETURNING *`,
      [newsletterId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "Newsletter not found" });
    }

    res.status(200).json({ msg: "Newsletter deleted successfully", deletedNewsletter: result.rows[0] });
  } catch (error) {
    console.error('Error deleting newsletter:', error.message);
    res.status(500).json({ msg: "Error while deleting newsletter" });
  }
});


newsletter.post('/create',async(req,res)=>{
    const { title ,content } = req.body;
    console.log(req.body);
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