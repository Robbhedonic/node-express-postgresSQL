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

// Task 1: List all players, games and scores
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

app.listen(3000, () => {
console.log('Server is running on port 3000');
});