
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ['computer', 'it', 'electronics', 'mechanical', 'civil'],
    required: true
  },
  year: {
    type: String,
    enum: ['fe', 'se', 'te', 'be'],
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'council_member', 'council_admin', 'admin'],
    default: 'student'
  },
  phone: String,
  rollNumber: String,
  bio: String,
  interests: [String],
  profileImage: String,
  registeredEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  councils: [{
    council: {
      type: Schema.Types.ObjectId,
      ref: 'Council'
    },
    role: {
      type: String,
      enum: ['member', 'executive', 'president', 'secretary', 'treasurer', 'coordinator']
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Event Schema
const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  council: {
    type: Schema.Types.ObjectId,
    ref: 'Council'
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  teamSize: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  rules: [String],
  prizes: [String],
  timeline: [{
    time: String,
    activity: String
  }],
  contactPerson: {
    name: String,
    position: String,
    email: String,
    phone: String
  },
  registrations: [{
    type: Schema.Types.ObjectId,
    ref: 'Registration'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Registration Schema
const registrationSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'completed'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  result: String,
  feedback: String,
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    url: String,
    issuedAt: Date
  }
});

// Team Schema
const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['leader', 'member'],
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  invites: [{
    email: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    invitedAt: {
      type: Date,
      default: Date.now
    },
    respondedAt: Date
  }],
  status: {
    type: String,
    enum: ['forming', 'complete', 'confirmed'],
    default: 'forming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Council Schema
const councilSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  acronym: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'creative', 'administrative'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['member', 'executive', 'president', 'secretary', 'treasurer', 'coordinator'],
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  faculty: {
    name: String,
    email: String,
    phone: String
  },
  yearFounded: Number,
  socialMedia: {
    instagram: String,
    facebook: String,
    linkedin: String,
    website: String
  },
  applications: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    position: String,
    message: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    reviewedAt: Date,
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Gallery Schema
const gallerySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  date: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export models
const models = {
  User: mongoose.model('User', userSchema),
  Event: mongoose.model('Event', eventSchema),
  Registration: mongoose.model('Registration', registrationSchema),
  Team: mongoose.model('Team', teamSchema),
  Council: mongoose.model('Council', councilSchema),
  Gallery: mongoose.model('Gallery', gallerySchema)
};

module.exports = models;
