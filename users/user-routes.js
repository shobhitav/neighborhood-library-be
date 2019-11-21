const express = require('express');
const User = require('./user-models.js');

const router = express.Router();

// Get user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = await User.getUserById(id);

    if (userInfo.length > 0) {
      res.status(200).json(userInfo[0]);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const info = req.body;

  try {
    const updateUser = await User.updateUser(info, id);

    if (updateUser) {
      res.status(204);
    }
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})

module.exports = router;