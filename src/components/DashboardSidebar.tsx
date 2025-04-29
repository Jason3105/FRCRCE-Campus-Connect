
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  Users,
  Settings,
  LogOut,
  Award,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  year?: string;
}

interface DashboardSidebarProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const DashboardSidebar = ({ 
  user, 
  activeTab, 
  setActiveTab, 
  onLogout 
}: DashboardSidebarProps) => {
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={18} />,
    },
    {
      id: "my-events",
      label: "My Events",
      icon: <Calendar size={18} />,
    },
    {
      id: "teams",
      label: "My Teams",
      icon: <Users size={18} />,
    },
    {
      id: "councils",
      label: "Councils",
      icon: <Award size={18} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* User info section */}
      <div className="p-6 flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src="" />
          <AvatarFallback className="bg-campus-purple text-white text-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-lg">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        {user.department && user.year && (
          <p className="text-xs text-gray-500 mt-1 capitalize">
            {user.department} Engineering • {user.year === 'fe' ? '1st Year' : 
              user.year === 'se' ? '2nd Year' : 
              user.year === 'te' ? '3rd Year' : '4th Year'}
          </p>
        )}
      </div>
      
      <Separator />
      
      {/* Navigation */}
      <div className="flex-grow py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              activeTab === item.id ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
      
      <Separator />
      
      {/* Logout button */}
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut size={18} className="mr-3" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
