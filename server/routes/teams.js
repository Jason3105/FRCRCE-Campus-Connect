
const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const { authenticateToken } = require('../middleware/auth');

// Create team
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, event, members = [] } = req.body;
    
    // Check if event exists
    const eventDoc = await models.Event.findById(event);
    if (!eventDoc) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Create team
    const team = new models.Team({
      name,
      event,
      members: [{ user: userId, role: 'leader', joinedAt: Date.now() }],
      status: 'forming',
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    
    // Add invites
    if (members.length > 0) {
      team.invites = members.map(email => ({
        email,
        status: 'pending',
        invitedAt: Date.now()
      }));
    }
    
    await team.save();
    
    // Update user
    await models.User.findByIdAndUpdate(userId, {
      $push: { teams: team._id }
    });
    
    res.status(201).json(team);
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get team by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const team = await models.Team.findById(req.params.id)
      .populate('event')
      .populate('members.user', 'name email department year');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    res.status(200).json(team);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send team invite
router.post('/:id/invite', authenticateToken, async (req, res) => {
  try {
    const teamId = req.params.id;
    const { email } = req.body;
    
    // Check if team exists
    const team = await models.Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    // Verify user is team leader
    const isLeader = team.members.some(m => 
      m.user.toString() === req.user.id && m.role === 'leader'
    );
    
    if (!isLeader) {
      return res.status(403).json({ message: 'Only team leader can send invites' });
    }
    
    // Check if invite already exists
    const existingInvite = team.invites.find(invite => invite.email === email);
    if (existingInvite) {
      return res.status(400).json({ message: 'Invite already sent to this email' });
    }
    
    // Add invite
    team.invites.push({
      email,
      status: 'pending',
      invitedAt: Date.now()
    });
    
    team.updatedAt = Date.now();
    await team.save();
    
    res.status(201).json({ message: 'Invite sent successfully' });
  } catch (error) {
    console.error('Team invite error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Respond to invite
router.post('/invite/:inviteId/respond', authenticateToken, async (req, res) => {
  try {
    const { inviteId } = req.params;
    const { response } = req.body;
    
    // Find team with this invite
    const team = await models.Team.findOne({
      'invites._id': inviteId
    });
    
    if (!team) {
      return res.status(404).json({ message: 'Invite not found' });
    }
    
    // Get invite
    const invite = team.invites.id(inviteId);
    
    // Check if invite exists and is pending
    if (!invite || invite.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid or already processed invite' });
    }
    
    // Check if user email matches invite email
    const user = await models.User.findById(req.user.id);
    if (user.email !== invite.email) {
      return res.status(403).json({ message: 'This invite is not for you' });
    }
    
    // Update invite status
    invite.status = response;
    invite.respondedAt = Date.now();
    
    // If accepted, add user to team
    if (response === 'accepted') {
      team.members.push({
        user: req.user.id,
        role: 'member',
        joinedAt: Date.now()
      });
      
      // Update user's teams
      await models.User.findByIdAndUpdate(req.user.id, {
        $push: { teams: team._id }
      });
    }
    
    // Check if all invites are processed
    const pendingInvites = team.invites.filter(i => i.status === 'pending');
    if (pendingInvites.length === 0) {
      team.status = 'complete';
    }
    
    team.updatedAt = Date.now();
    await team.save();
    
    res.status(200).json({ message: `Invite ${response}` });
  } catch (error) {
    console.error('Team invite response error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
