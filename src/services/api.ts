import axios from "axios";

// Configure base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  async (error) => {
    console.error("Response error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message
    });
    
    const originalRequest = error.config;
    
    // If unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // This would be a refresh token call in a real app
        const refreshToken = localStorage.getItem("refresh-token");
        
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        
        // Call refresh token endpoint - NOTE: Using axios directly here, not our configured instance
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });
        
        // Save new tokens
        const { token } = response.data;
        localStorage.setItem("auth-token", token);
        
        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out user
        localStorage.removeItem("auth-token");
        localStorage.removeItem("refresh-token");
        
        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  login: async (email: string, password: string) => {
    try {
      // Note: No API_BASE_URL here, just the relative path
      const response = await api.post("/auth/login", { email, password });
      
      // Save tokens if they exist in the response
      if (response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
      }
      if (response.data.refreshToken) {
        localStorage.setItem("refresh-token", response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      // Clear tokens on logout
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
      return response.data;
    } catch (error) {
      // Clear tokens even if the API call fails
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
      console.error("Logout error:", error);
      throw error;
    }
  },
};

// Events service
export const eventsService = {
  getAllEvents: async () => {
    try {
      const response = await api.get("/events");
      return response.data;
    } catch (error) {
      console.error("Get events error:", error);
      throw error;
    }
  },
  
  getEventById: async (id: string) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get event ${id} error:`, error);
      throw error;
    }
  },
  
  registerForEvent: async (eventId: string, registrationData: any) => {
    try {
      const response = await api.post(`/events/${eventId}/register`, registrationData);
      return response.data;
    } catch (error) {
      console.error(`Register for event ${eventId} error:`, error);
      throw error;
    }
  },
};

// User service
export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get("/users/profile");
      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },
  
  updateProfile: async (profileData: any) => {
    try {
      const response = await api.put("/users/profile", profileData);
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },
  
  getUserEvents: async () => {
    try {
      const response = await api.get("/users/events");
      return response.data;
    } catch (error) {
      console.error("Get user events error:", error);
      throw error;
    }
  },
  
  getUserTeams: async () => {
    try {
      const response = await api.get("/users/teams");
      return response.data;
    } catch (error) {
      console.error("Get user teams error:", error);
      throw error;
    }
  },
};

// Councils service
export const councilsService = {
  getAllCouncils: async () => {
    try {
      const response = await api.get("/councils");
      return response.data;
    } catch (error) {
      console.error("Get councils error:", error);
      throw error;
    }
  },
  
  getCouncilById: async (id: string) => {
    try {
      const response = await api.get(`/councils/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get council ${id} error:`, error);
      throw error;
    }
  },
  
  applyToCouncil: async (councilId: string, applicationData: any) => {
    try {
      const response = await api.post(`/councils/${councilId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error(`Apply to council ${councilId} error:`, error);
      throw error;
    }
  },
};

// Gallery service
export const galleryService = {
  getAllPhotos: async () => {
    try {
      const response = await api.get("/gallery");
      return response.data;
    } catch (error) {
      console.error("Get photos error:", error);
      throw error;
    }
  },
  
  getPhotosByCategory: async (category: string) => {
    try {
      const response = await api.get(`/gallery/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Get photos for category ${category} error:`, error);
      throw error;
    }
  },
  
  getPhotosByEvent: async (eventId: string) => {
    try {
      const response = await api.get(`/gallery/event/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Get photos for event ${eventId} error:`, error);
      throw error;
    }
  },
};

// Teams service
export const teamsService = {
  createTeam: async (teamData: any) => {
    try {
      const response = await api.post("/teams", teamData);
      return response.data;
    } catch (error) {
      console.error("Create team error:", error);
      throw error;
    }
  },
  
  getTeamById: async (teamId: string) => {
    try {
      const response = await api.get(`/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error(`Get team ${teamId} error:`, error);
      throw error;
    }
  },
  
  updateTeam: async (teamId: string, teamData: any) => {
    try {
      const response = await api.put(`/teams/${teamId}`, teamData);
      return response.data;
    } catch (error) {
      console.error(`Update team ${teamId} error:`, error);
      throw error;
    }
  },
  
  inviteToTeam: async (teamId: string, inviteData: any) => {
    try {
      const response = await api.post(`/teams/${teamId}/invite`, inviteData);
      return response.data;
    } catch (error) {
      console.error(`Invite to team ${teamId} error:`, error);
      throw error;
    }
  },
  
  respondToInvite: async (inviteId: string, responseStatus: string) => {
    try {
      const apiResponse = await api.post(`/teams/invite/${inviteId}/respond`, { response: responseStatus });
      return apiResponse.data;
    } catch (error) {
      console.error(`Respond to invite ${inviteId} error:`, error);
      throw error;
    }
  },
};

export default api;