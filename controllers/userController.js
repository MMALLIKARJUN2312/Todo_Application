const userModel = require('../models/userModel');

const getUserProfile = (req, res) => {
  const userId = req.userId;

  userModel.getUserById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json({ user });
    })
    .catch(err => res.status(500).json({ message: 'Error retrieving user profile', error: err }));
};

const updateUserProfile = (req, res) => {
  const userId = req.userId;
  const { name, email, password } = req.body;

  userModel.updateUser(userId, { name, email, password })
    .then(updatedUser => {
      res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    })
    .catch(err => res.status(500).json({ message: 'Error updating profile', error: err }));
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
