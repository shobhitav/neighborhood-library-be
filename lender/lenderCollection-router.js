const express = require('express');
const lenderCollection = require('./lenderCollection-model.js');
// const validateToken = require('../auth/validate.js');

const router = express.Router();

// READ
router.get('/:lender_id',async (req, res) => {
    const { lender_id } = req.params;
  
    try {
      const collection = await lenderCollection.findBooksByLenderId(lender_id);
      res.status(200).json(collection);
    } catch (err) {
      res.status(500).json({ message: `Failed to get book collection for the lender ${lender_id}:` + err });
    }
  });

// CREATE
router.post('/', async (req, res) => {
  const lenderBookData = req.body;

  try {
    const collection = await lenderCollection.addBook(lenderBookData);
    res.status(201).json(collection);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book to collection:' + err });
  }
});

// UPDATE Availibilty flag
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [bookFound] = await lenderCollection.findBookById(id);

    if (bookFound) {
      const collection = await lenderCollection.toggleAvailability(bookFound);
      res.status(200).json(collection);
    } else {
      res.status(404).json({ message: `Could not find book for lender collection id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to update book for lender collection id ${id}:` + err });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [bookFound] = await lenderCollection.findBookById(id);

    if (bookFound) {
      const collection = await lenderCollection.removeBook(bookFound);
      res.status(200).json(collection);
    } else {
      res.status(404).json({ message: `Could not find book for lender collection id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to delete book for lender collection id ${id}:` + err });
  }
});

module.exports = router;