CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    release_date DATE
);

CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(id),
    game_id INT REFERENCES games(id),
    score INT,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO players (name, email, created_at) VALUES
('Alice', 'alice@example.com', CURRENT_TIMESTAMP - INTERVAL '40 days'),
('Bob', 'bob@example.com', CURRENT_TIMESTAMP - INTERVAL '20 days'),
('Charlie', 'charlie@example.com', CURRENT_TIMESTAMP - INTERVAL '5 days'),
('Diana', 'diana@example.com', CURRENT_TIMESTAMP - INTERVAL '10 days');

INSERT INTO games (title, genre) VALUES
('Elden Ring', 'Action RPG'),
('Cyberpunk 2077', 'Action RPG'),
('Stardew Valley', 'Simulation'),
('The Witcher 3', 'Action RPG'),
('Hades', 'Roguelike');

INSERT INTO scores (player_id, game_id, score, played_at) VALUES
(1, 1, 950, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(1, 2, 880, CURRENT_TIMESTAMP - INTERVAL '3 days'),
(2, 1, 920, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(2, 3, 1000, CURRENT_TIMESTAMP - INTERVAL '4 days'),
(3, 4, 890, CURRENT_TIMESTAMP - INTERVAL '5 hours'),
(3, 5, 760, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(4, 2, 910, CURRENT_TIMESTAMP - INTERVAL '10 days');