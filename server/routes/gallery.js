
const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const { authenticateToken } = require('../middleware/auth');

// Get all gallery photos
router.get('/', async (req, res) => {
  try {
    const photos = await models.Gallery.find()
      .populate('event', 'title')
      .populate('uploadedBy', 'name')
      .sort({ uploadedAt: -1 });
    
    res.status(200).json(photos);
  } catch (error) {
    console.error('Get gallery photos error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get gallery photos by category
router.get('/category/:category', async (req, res) => {
  try {
    const photos = await models.Gallery.find({ category: req.params.category })
      .populate('event', 'title')
      .populate('uploadedBy', 'name')
      .sort({ uploadedAt: -1 });
    
    res.status(200).json(photos);
  } catch (error) {
    console.error('Get gallery photos by category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get gallery photos by event
router.get('/event/:eventId', async (req, res) => {
  try {
    const photos = await models.Gallery.find({ event: req.params.eventId })
      .populate('event', 'title')
      .populate('uploadedBy', 'name')
      .sort({ uploadedAt: -1 });
    
    res.status(200).json(photos);
  } catch (error) {
    console.error('Get gallery photos by event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
