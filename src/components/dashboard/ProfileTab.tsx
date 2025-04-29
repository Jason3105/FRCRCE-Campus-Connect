
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, BookOpen, GraduationCap, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  year?: string;
}

interface ProfileTabProps {
  user: UserProfile;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    department: user.department || "",
    year: user.year || "",
    phone: "",
    bio: "",
    rollNumber: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call the API to update the user profile
      const updatedUser = await userService.updateProfile({
        name: profile.name,
        department: profile.department,
        year: profile.year,
        phone: profile.phone,
        bio: profile.bio,
        rollNumber: profile.rollNumber,
        interests: profile.interests,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button 
          variant={editMode ? "outline" : "default"} 
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Card */}
      {!editMode ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="bg-campus-purple text-white text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                {user.department && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-gray-500" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium capitalize">
                        {user.department === 'computer' ? 'Computer Engineering' :
                         user.department === 'it' ? 'Information Technology' :
                         user.department === 'electronics' ? 'Electronics Engineering' :
                         user.department === 'mechanical' ? 'Mechanical Engineering' :
                         user.department === 'civil' ? 'Civil Engineering' : user.department}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {user.year && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-gray-500" size={18} />
                    <div>
                      <p className="text-sm text-gray-500">Year of Study</p>
                      <p className="font-medium">
                        {user.year === 'fe' ? 'First Year (FE)' :
                         user.year === 'se' ? 'Second Year (SE)' :
                         user.year === 'te' ? 'Third Year (TE)' :
                         user.year === 'be' ? 'Fourth Year (BE)' : user.year}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Edit Profile Form
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={profile.department} 
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer">Computer Engineering</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="electronics">Electronics Engineering</SelectItem>
                      <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Select 
                    value={profile.year} 
                    onValueChange={(value) => handleSelectChange("year", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fe">First Year (FE)</SelectItem>
                      <SelectItem value="se">Second Year (SE)</SelectItem>
                      <SelectItem value="te">Third Year (TE)</SelectItem>
                      <SelectItem value="be">Fourth Year (BE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input 
                    id="rollNumber"
                    name="rollNumber"
                    value={profile.rollNumber}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  value={profile.interests}
                  onChange={handleChange}
                  placeholder="E.g., Coding, Robotics, Design (optional)"
                />
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileTab;
