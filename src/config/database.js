const { Client } = require('pg');
const { DATABASE_URI } = require('./config');

const client = new Client({
  connectionString: DATABASE_URI,
});

// Connect to the database
const connectDB = async () => {
  try {
    await client.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
