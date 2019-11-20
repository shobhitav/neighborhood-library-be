const express = require('express');
const borrowerWishlist = require('./borrowerWishlist-model.js');
// const validateToken = require('../auth/validate.js');

const router = express.Router();

// READ
router.get('/:borrower_id',async (req, res) => {
    const { borrower_id } = req.params;
  
    try {
      const wishlist = await borrowerWishlist.findBooksByBorrowerId(borrower_id);
      res.status(200).json(wishlist);
    } catch (err) {
      res.status(500).json({ message: `Failed to get book wishlist for the borrower ${borrower_id}:` + err });
    }
  });

// CREATE
router.post('/', async (req, res) => {
  const borrowerBookData = req.body;

  try {
    const wishlist = await borrowerWishlist.addBook(borrowerBookData);
    res.status(201).json([wishlist]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book to wishlist:' + err });
  }
});

// UPDATE Request to Borrow flag
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [bookFound] = await borrowerWishlist.findBookById(id);

    if (bookFound) {
      const wishlist = await borrowerWishlist.toggleRequestToBorrow(bookFound);
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: `Could not find book for borrower wishlist id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to update book for borrower wishlist id ${id}:` + err });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [bookFound] = await borrowerWishlist.findBookById(id);

    if (bookFound) {
      const wishlist = await borrowerWishlist.removeBook(bookFound);
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: `Could not find book for borrower wishlist id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to delete book from borrower wishlistid ${id}:` + err });
  }
});

module.exports = router;