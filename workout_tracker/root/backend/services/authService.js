const pool = require('../databse/db');

const newUser = async (name, email, hashedPassword) =>
  await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );

const existingUser = async (email) =>
  await pool.query('SELECT * FROM users WHERE email=$1', [email]);

module.exports = { newUser, existingUser };
