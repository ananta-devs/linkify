require('dotenv').config();
const express = require("express");
const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDb() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        short_id VARCHAR(255) UNIQUE NOT NULL,
        long_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    client.release();
  } catch (e) {
    process.exit(1);
  }
}

initializeDb();

app.post("/api/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const shortId = nanoid(7);

  try {
    const query = 'INSERT INTO urls (short_id, long_url) VALUES ($1, $2) RETURNING *';
    const values = [shortId, longUrl];
    await pool.query(query, values);
    
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const query = 'SELECT long_url FROM urls WHERE short_id = $1';
    const result = await pool.query(query, [shortId]);

    if (result.rows.length > 0) {
      res.redirect(result.rows[0].long_url);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
