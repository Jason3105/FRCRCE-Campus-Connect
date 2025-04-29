
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/dashboard/ProfileTab";
import MyEventsTab from "@/components/dashboard/MyEventsTab";
import TeamsTab from "@/components/dashboard/TeamsTab";
import CouncilsTab from "@/components/dashboard/CouncilsTab";
import {
  User,
  LogOut,
  Calendar,
  Users,
  Settings,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campus-purple mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  const tabItems = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "my-events", label: "My Events", icon: <Calendar size={16} /> },
    { id: "teams", label: "My Teams", icon: <Users size={16} /> },
    { id: "councils", label: "Councils", icon: <Award size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block w-64 bg-white border-r">
          <DashboardSidebar 
            user={user} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />
        </div>
        
        {/* Mobile tabs */}
        <div className="md:hidden bg-white border-b sticky top-16 z-10">
          <div className="px-4 py-3">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full overflow-x-auto"
            >
              <TabsList className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto px-1 py-1">
                {tabItems.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
                <TabsTrigger value="logout" className="flex items-center gap-1 text-red-600" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-grow p-6">
          <div className="max-w-6xl mx-auto">
            {/* Active Tab Content */}
            {activeTab === "profile" && <ProfileTab user={user} />}
            {activeTab === "my-events" && <MyEventsTab />}
            {activeTab === "teams" && <TeamsTab />}
            {activeTab === "councils" && <CouncilsTab />}
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <p className="text-gray-600">Settings panel is currently under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
