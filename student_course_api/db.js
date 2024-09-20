import pg from 'pg'; // Import pg module for PostgreSQL
const { Pool } = pg; // Destructure to get the Pool class from the pg module
 
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'connections',
  password: 'Alok@0027',
  port: 5432,
});
 
const db = {
  query: (text, params) => pool.query(text, params),
};
 
export default db;
