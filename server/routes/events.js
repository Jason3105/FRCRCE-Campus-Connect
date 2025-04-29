
const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const { authenticateToken } = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await models.Event.find()
      .sort({ date: 1 });
    
    res.status(200).json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register for event
router.post('/:id/register', authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    
    // Check if event exists
    const event = await models.Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if registration deadline has passed
    if (new Date(event.registrationDeadline) < new Date()) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }
    
    // Check if user is already registered
    const existingRegistration = await models.Registration.findOne({
      event: eventId,
      user: userId
    });
    
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }
    
    const { teamName, teamMembers } = req.body;
    
    // Create a new team if teamName is provided
    let team = null;
    if (teamName) {
      team = new models.Team({
        name: teamName,
        event: eventId,
        members: [{ user: userId, role: 'leader' }],
        status: teamMembers && teamMembers.length > 0 ? 'forming' : 'complete'
      });
      
      // Add invites for team members
      if (teamMembers && teamMembers.length > 0) {
        team.invites = teamMembers.map(email => ({
          email,
          status: 'pending',
          invitedAt: Date.now()
        }));
      }
      
      await team.save();
    }
    
    // Create registration
    const registration = new models.Registration({
      event: eventId,
      user: userId,
      team: team ? team._id : null,
      status: 'confirmed',
      registrationDate: Date.now()
    });
    
    await registration.save();
    
    // Update event with registration
    event.registrations.push(registration._id);
    await event.save();
    
    // Update user with registration
    const user = await models.User.findById(userId);
    user.registeredEvents.push(eventId);
    if (team) {
      user.teams.push(team._id);
    }
    await user.save();
    
    res.status(201).json({
      message: 'Registration successful',
      registration,
      team
    });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
