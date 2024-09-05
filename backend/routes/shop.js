require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const router = express.Router();


const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


router.get('/user', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('mysql connection error', err);
      res.status(500).send('Server error');
      return;
    }

    connection.query('SELECT * FROM user', (error, results) => {
      connection.release(); 
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
      } else {
        console.log('Fetched data:', results);
        res.json(results);
      }
    });
  });
});

router.post('/user', (req, res) => {
  const { username, price } = req.body; 

  console.log('Received data:', req.body);

  if (!username || !price) {
    res.status(400).send('Username and price are required.');
    return;
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('mysql connection error', err);
      res.status(500).send('Server error');
      return;
    }

    connection.query('INSERT INTO user (username, price) VALUES (?, ?)', [username, price], (error, results) => {
      connection.release();
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Server error');
      } else {
        console.log(`Inserted new user: ${username}`);
        res.sendStatus(201);
      }
    });
  });
});



router.delete('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('mysql connection error', err);
      res.status(500).send('Server error');
      return;
    }

    connection.query('DELETE FROM user WHERE id = ?', [userId], (error, results) => {
      connection.release(); 
      if (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Server error');
      } else {
        console.log(`Deleted user with id ${userId}`);
        res.sendStatus(204); 
      }
    });
  });
});

router.post('/survey', (req, res) => {
  const { username, satisfaction, intention, gender, ages, convenience } = req.body;

  console.log('Received survey data:', req.body);

  if (!username || satisfaction === undefined || intention === undefined || gender === undefined || ages === undefined || convenience === undefined ) {
    res.status(400).send('username, convenience, satisfaction, and intention are required.');
    return;
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('mysql connection error', err);
      res.status(500).send('Server error');
      return;
    }

    connection.query(
      'INSERT INTO survey (username, satisfaction, intention, gender, ages, convenience) VALUES (?, ?, ?, ?, ?, ?)',
      [username, satisfaction, intention, gender, ages, convenience ],
      (error, results) => {
        connection.release();
        if (error) {
          console.error('Error inserting survey data:', error);
          res.status(500).send('Server error');
        } else {
          console.log(`Inserted survey for user: ${username}`);
          res.sendStatus(201);
        }
      }
    );
  });
});

module.exports = router;
