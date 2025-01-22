const { client } = require('./database');

// Function to create tables
const createTables = async () => {
  try {
    // Create the Subscriber table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Subscriber (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255),
        subscribedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isSubscribed BOOLEAN DEFAULT TRUE
      );
    `);

    // Create the Newsletter table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Newsletter (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        sentAt TIMESTAMP DEFAULT NULL
      );
    `);

    console.log('Tables have been created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
};

module.exports = { createTables };
