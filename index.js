import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

app.get('/', (req, res) => {
res.send('Welcome to the Game World API!');
});

// task 1: List all players, games and scores
app.get('/players-scores', async (req, res) => {
try {
const query = `
SELECT
    p.name AS player_name,
    g.title AS game_title,
    s.score
FROM players p
JOIN scores s ON p.id = s.player_id
JOIN games g ON g.id = s.game_id
ORDER BY p.name, g.title;
`;

const result = await pool.query(query);
res.json(result.rows);
} catch (error) {
console.error('Error in /players-scores:', error.message);
res.status(500).json({ error: 'Internal server error' });
}
});

// task 2: Top 3 players by total score /top-players
app.get('/top-players', async (req, res) => {
try {
const query = `
SELECT
    p.name AS player_name,
    SUM(s.score) AS total_score
FROM players p
JOIN scores s ON p.id = s.player_id
GROUP BY p.id, p.name
ORDER BY total_score DESC
LIMIT 3;
`;

const result = await pool.query(query);
res.json(result.rows);
} catch (error) {
console.error('Error in /top-players:', error.message);
res.status(500).json({ error: 'Internal server error' });
}
});

// task 3: Players who have not played any games /inactive-players
app.get('/inactive-players', async (req, res) => {
try {
const query = `
SELECT
    p.name AS player_name,
    p.email,
    p.created_at
FROM players p
LEFT JOIN scores s ON p.id = s.player_id
WHERE s.id IS NULL
ORDER BY p.name;
`;

const result = await pool.query(query);
res.json(result.rows);
} catch (error) {
console.error('Error in /inactive-players:', error.message);
res.status(500).json({ error: 'Internal server error' });
}
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});

// task 4: Most popular genres by play count /popular-genres
app.get('/popular-genres', async (req, res) => {
  try {
    const query = `
      SELECT
        g.genre,
        COUNT(s.id) AS times_played
      FROM games g
      JOIN scores s ON g.id = s.game_id
      GROUP BY g.genre
      ORDER BY times_played DESC, g.genre;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in /popular-genres:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// task 5: Players joined in last 30 days /recent-players 
app.get('/recent-players', async (req, res) => {
  try {
    const query = `
      SELECT
        p.name AS player_name,
        p.email,
        p.created_at
      FROM players p
      WHERE p.created_at >= NOW() - INTERVAL '30 days'
      ORDER BY p.created_at DESC;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in /recent-players:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});