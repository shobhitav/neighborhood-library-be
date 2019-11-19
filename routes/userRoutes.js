const express = require('express');

// server.put('/user/:id', db.updateUser);
// server.delete('/user/:id', db.deleteUser);

const router = express.Router();

// GETS ALL USERS
router.get('/', (res, req) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
      res.status(500).json(err.message);
    } else {
      res.status(200).json(result.rows);
    }
  })
});

// GETS USER BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM users WHERE id = $1', [ id ], (error, result) => {
    if (error) {
      res.status(500).json(err.message);
    } else {
      res.status(200).json(result.rows);
    }
  })
});

// ADDS USER
router.post('/add', (req, res) => {
  const user = req.body;

  // SQL placeholders
  let setCols = '';
  let setVals = '';

  // full SQL statement for client query
  const query = `INSERT INTO users (' ${setCols} ') VALUES (' ${setVals} ');`;

  // SET query SQL syntax via req.body sort
  // get key/value pairs from update for SET queries
  Object.entries(user).forEach(el => {
    // checks if last obj key is iterating
    if (el[0] !== Object.keys(user)[Object.keys(user).length - 1]) {
      // sets comma for list SQL syntax
      setCols += el[0] + ", ";
      setVals += "'" + el[1] + "', ";
    } else if (el[0] === 'email' || el[0] === 'name') {
      // no comma for last SET condition
      setCols += el[0];
      setVals += "'" + el[1] + "'";
    }
  });

  pool.query(query, (error, results) => {
    if(error) {
      res.status(500).json(error.message);
    }
    res.status(201).json({
      message: `User was created!`
    });
  });
});

// UPDATES USER
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // SET values placeholder
  let setQuery = '';

  // get key/value pairs from update for SET queries
  Object.entries(updates).forEach(el => {

    // SET command SQL syntax
    const phrase = " " + el[0] + " = '"+ el[1] + "'";

    // checks if last obj key is iterating
    if (el[0] !== Object.keys(updates)[Object.keys(updates).length - 1]) {
      // sets comma for SQL syntax
      setQuery += phrase + ', ';
    } else if (el[0] === 'email' || el[0] === 'name') {
      // no comma for last SET condition
      setQuery += phrase + ' ';
    }
  });

  // full SQL statement for client query
  const query = 'UPDATE users SET' + setQuery + 'WHERE id = ' + id  + ';';

  pool.query(query, (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    else if (result.rows.length > 0) {
      res.status(200).json(
        result.rows
      )
    }
    else {
      res.status(200).json({
        message: 'User account updated'
      })
    }
  });
});

// DELETES USER
router.delete('/:id' ,(req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {

    if (err) {
      res.status(500).json(err.message);
    }
    else if (result.rows.length > 0) {
      res.status(200).json(
        result.rows
      )
    }
    else {
      res.status(202).json({
        result: result.rows,
        message: 'User deleted'
      })
    }
  })
});