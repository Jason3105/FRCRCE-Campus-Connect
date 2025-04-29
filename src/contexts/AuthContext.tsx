
import React, { createContext, useState, useEffect, useContext } from "react";
import { authService, userService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  year?: string;
}

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
  department: string;
  year: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth-token");
      const storedUser = localStorage.getItem("user");
      
      if (token) {
        try {
          // Try to get the user profile with the stored token
          const userProfile = await userService.getProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
          
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(userProfile));
        } catch (error) {
          console.error("Failed to get user profile:", error);
          // Clear tokens if authentication fails
          localStorage.removeItem("auth-token");
          localStorage.removeItem("refresh-token");
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        }
      } else if (storedUser) {
        try {
          // If we have stored user but no token, we might need to refresh
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Call the actual login API
      const response = await authService.login(email, password);
      console.log("Login response:", response);
      
      // Store tokens
      localStorage.setItem("auth-token", response.token);
      if (response.refreshToken) {
        localStorage.setItem("refresh-token", response.refreshToken);
      }
      
      // Store user in localStorage too
      localStorage.setItem("user", JSON.stringify(response.user));
      
      // Set user state
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to login";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    }
  };

  const register = async (userData: RegisterUserData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Call the register API
      const response = await authService.register({
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        department: userData.department,
        year: userData.year
      });
      
      // Store tokens and user info
      localStorage.setItem("auth-token", response.token);
      if (response.refreshToken) {
        localStorage.setItem("refresh-token", response.refreshToken);
      }
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration successful",
        description: "Welcome to CampusConnect!",
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to register";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Call the logout API
      await authService.logout();
      
      // Clear local storage
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("user");
      
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
