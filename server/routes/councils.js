
const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const { authenticateToken } = require('../middleware/auth');

// Get all councils
router.get('/', async (req, res) => {
  try {
    const councils = await models.Council.find()
      .populate('faculty', 'name email')
      .sort({ name: 1 });
    
    res.status(200).json(councils);
  } catch (error) {
    console.error('Get councils error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get council by ID
router.get('/:id', async (req, res) => {
  try {
    const council = await models.Council.findById(req.params.id)
      .populate('members.user', 'name email department year profileImage')
      .populate('events');
    
    if (!council) {
      return res.status(404).json({ message: 'Council not found' });
    }
    
    res.status(200).json(council);
  } catch (error) {
    console.error('Get council error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Apply to council
router.post('/:id/apply', authenticateToken, async (req, res) => {
  try {
    const councilId = req.params.id;
    const userId = req.user.id;
    
    // Check if council exists
    const council = await models.Council.findById(councilId);
    if (!council) {
      return res.status(404).json({ message: 'Council not found' });
    }
    
    // Check if user has already applied
    const existingApplication = council.applications.find(app => 
      app.user && app.user.toString() === userId && app.status === 'pending'
    );
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this council' });
    }
    
    const { position, message } = req.body;
    
    // Add application
    council.applications.push({
      user: userId,
      position,
      message,
      status: 'pending',
      appliedAt: Date.now()
    });
    
    await council.save();
    
    res.status(201).json({
      message: 'Application submitted successfully',
      applicationStatus: 'pending'
    });
  } catch (error) {
    console.error('Council application error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
