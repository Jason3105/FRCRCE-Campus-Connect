
/**
 * Express server for CampusConnect
 * This would be implemented as a separate project connected to MongoDB
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const models = require('./models/schema');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Generate auth tokens
const generateTokens = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  const refreshToken = jwt.sign(
    { id: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  return { token, refreshToken };
};

/* Routes */

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, department, year } = req.body;
    
    // Check if user already exists
    const existingUser = await models.User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new models.User({
      name,
      email,
      password: hashedPassword,
      department,
      year,
      role: 'student'
    });
    
    const savedUser = await user.save();
    
    // Generate tokens
    const { token, refreshToken } = generateTokens(savedUser);
    
    res.status(201).json({
      token,
      refreshToken,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        department: savedUser.department,
        year: savedUser.year
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await models.User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate tokens
    const { token, refreshToken } = generateTokens(user);
    
    res.status(200).json({
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        year: user.year
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    
    // Find user
    const user = await models.User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate new access token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ token });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // In a real implementation, you would invalidate the refresh token
  // For this example, we'll just send a success response
  res.status(200).json({ message: 'Logged out successfully' });
});

// User routes
app.get('/api/users/profile', authenticateToken, async (req, res) => {
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

app.put('/api/users/profile', authenticateToken, async (req, res) => {
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

app.get('/api/users/events', authenticateToken, async (req, res) => {
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

app.get('/api/users/teams', authenticateToken, async (req, res) => {
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

// Event routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await models.Event.find()
      .sort({ date: 1 });
    
    res.status(200).json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/events/:id', async (req, res) => {
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

app.post('/api/events/:id/register', authenticateToken, async (req, res) => {
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

// Council routes
app.get('/api/councils', async (req, res) => {
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

app.get('/api/councils/:id', async (req, res) => {
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

app.post('/api/councils/:id/apply', authenticateToken, async (req, res) => {
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
      app.user.toString() === userId && app.status === 'pending'
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

// Team routes
app.post('/api/teams', authenticateToken, async (req, res) => {
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

app.get('/api/teams/:id', authenticateToken, async (req, res) => {
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

app.post('/api/teams/:id/invite', authenticateToken, async (req, res) => {
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

// Gallery routes
app.get('/api/gallery', async (req, res) => {
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

app.get('/api/gallery/category/:category', async (req, res) => {
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

app.get('/api/gallery/event/:eventId', async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
