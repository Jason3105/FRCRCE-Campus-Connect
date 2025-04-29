
const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const { authenticateToken } = require('../middleware/auth');

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await models.User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updatedAt: Date.now(),
    };
    
    // Don't allow password updates through this endpoint
    delete updates.password;
    delete updates.email; // Email should not be changed through this endpoint
    delete updates.role; // Role should not be changed through this endpoint
    
    const user = await models.User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user events
router.get('/events', authenticateToken, async (req, res) => {
  try {
    const user = await models.User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const registrations = await models.Registration.find({ user: req.user.id })
      .populate('event')
      .populate({
        path: 'team',
        populate: {
          path: 'members.user',
          select: 'name email department year'
        }
      })
      .sort({ registrationDate: -1 });
    
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Get user events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user teams
router.get('/teams', authenticateToken, async (req, res) => {
  try {
    const user = await models.User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const teams = await models.Team.find({
      'members.user': req.user.id
    })
      .populate('event')
      .populate('members.user', 'name email department year')
      .sort({ createdAt: -1 });
    
    res.status(200).json(teams);
  } catch (error) {
    console.error('Get user teams error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
