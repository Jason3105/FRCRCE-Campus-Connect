
# CampusConnect Server

This is the backend server for CampusConnect application.

## Setup

1. Make sure MongoDB is installed and running on your machine or use a MongoDB Atlas cluster.
2. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/campusconnect
   JWT_SECRET=your_jwt_secret_key_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
   ```
   
   Replace the MongoDB URI with your connection string if using Atlas or a custom setup.
   
3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   # For development with auto-restart
   npm run dev
   
   # For production
   npm start
   ```

## API Routes

- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh-token`, `/api/auth/logout`
- **Users**: `/api/users/profile`, `/api/users/profile` (PUT), `/api/users/events`, `/api/users/teams`
- **Events**: `/api/events`, `/api/events/:id`, `/api/events/:id/register`
- **Councils**: `/api/councils`, `/api/councils/:id`, `/api/councils/:id/apply`
- **Teams**: `/api/teams`, `/api/teams/:id`, `/api/teams/:id/invite`
- **Gallery**: `/api/gallery`, `/api/gallery/category/:category`, `/api/gallery/event/:eventId`

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Error Handling

All API responses include appropriate status codes and descriptive messages for error conditions.
