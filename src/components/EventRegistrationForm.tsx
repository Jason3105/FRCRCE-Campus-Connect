
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Plus, X, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
}

interface RegistrationFormProps {
  eventId: string;
  eventTitle: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  onSuccess: () => void;
}

const EventRegistrationForm = ({
  eventId,
  eventTitle,
  minTeamSize = 1,
  maxTeamSize = 4,
  onSuccess
}: RegistrationFormProps) => {
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState<TeamMember>({
    id: "leader",
    name: "",
    email: "",
    department: "",
    year: ""
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Add team member
  const addTeamMember = () => {
    if (teamMembers.length < maxTeamSize - 1) {
      setTeamMembers([
        ...teamMembers,
        {
          id: `member-${Date.now()}`,
          name: "",
          email: "",
          department: "",
          year: ""
        }
      ]);
    } else {
      toast({
        title: "Team size limit reached",
        description: `You cannot add more than ${maxTeamSize - 1} team members for this event.`,
        variant: "destructive"
      });
    }
  };

  // Remove team member
  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // Handle team leader input changes
  const handleTeamLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamLeader({ ...teamLeader, [name]: value });
  };

  // Handle team member input changes
  const handleTeamMemberChange = (id: string, field: string, value: string) => {
    setTeamMembers(
      teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!teamName) {
      toast({
        title: "Team name required",
        description: "Please enter a team name",
        variant: "destructive"
      });
      return;
    }
    
    if (!teamLeader.name || !teamLeader.email) {
      toast({
        title: "Team leader information required",
        description: "Please enter name and email for the team leader",
        variant: "destructive"
      });
      return;
    }

    if (teamMembers.length < minTeamSize - 1) {
      toast({
        title: "More team members required",
        description: `This event requires a minimum of ${minTeamSize} participants (including team leader)`,
        variant: "destructive"
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Agreement required",
        description: "You must agree to the event rules and guidelines",
        variant: "destructive"
      });
      return;
    }

    const invalidMembers = teamMembers.filter(member => !member.name || !member.email);
    if (invalidMembers.length > 0) {
      toast({
        title: "Incomplete team member information",
        description: "Please provide name and email for all team members",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Prepare registration data
    const registrationData = {
      eventId,
      teamName,
      teamLeader,
      teamMembers,
      additionalInfo,
      registrationDate: new Date().toISOString()
    };

    // In a real app, send data to API
    console.log("Submitting registration:", registrationData);

    // Simulate API call
    setTimeout(() => {
      // Store in localStorage for demo purposes
      const existingRegistrations = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
      localStorage.setItem(
        "eventRegistrations",
        JSON.stringify([...existingRegistrations, registrationData])
      );
      
      setLoading(false);
      toast({
        title: "Registration successful!",
        description: `Your team "${teamName}" has been registered for ${eventTitle}`,
      });
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Name */}
      <div className="space-y-2">
        <Label htmlFor="teamName">Team Name *</Label>
        <Input
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter your team name"
          required
        />
      </div>

      {/* Team Leader */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-campus-purple" />
            <h3 className="font-semibold">Team Leader Information</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="leaderName">Full Name *</Label>
            <Input
              id="leaderName"
              name="name"
              value={teamLeader.name}
              onChange={handleTeamLeaderChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaderEmail">Email *</Label>
            <Input
              id="leaderEmail"
              name="email"
              type="email"
              value={teamLeader.email}
              onChange={handleTeamLeaderChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaderDepartment">Department</Label>
            <Input
              id="leaderDepartment"
              name="department"
              value={teamLeader.department}
              onChange={handleTeamLeaderChange}
              placeholder="E.g., Computer Engineering"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaderYear">Year of Study</Label>
            <Input
              id="leaderYear"
              name="year"
              value={teamLeader.year}
              onChange={handleTeamLeaderChange}
              placeholder="E.g., TE, BE"
            />
          </div>
        </div>
      </Card>

      {/* Team Members */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-campus-purple" />
            <h3 className="font-semibold">Team Members</h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTeamMember}
            className="flex items-center"
            disabled={teamMembers.length >= maxTeamSize - 1}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Member
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          {minTeamSize === maxTeamSize
            ? `This event requires exactly ${minTeamSize} participants (including team leader).`
            : `This event requires ${minTeamSize}-${maxTeamSize} participants (including team leader).`}
        </p>

        {teamMembers.length === 0 ? (
          <div className="text-center py-6 border border-dashed rounded-md bg-gray-50">
            <p className="text-gray-500">No team members added yet</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTeamMember}
              className="mt-2"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Team Member
            </Button>
          </div>
        ) : (
          teamMembers.map((member, index) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Team Member #{index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500"
                  onClick={() => removeTeamMember(member.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`member-${member.id}-name`}>Full Name *</Label>
                  <Input
                    id={`member-${member.id}-name`}
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(member.id, "name", e.target.value)}
                    placeholder="Enter member's full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`member-${member.id}-email`}>Email *</Label>
                  <Input
                    id={`member-${member.id}-email`}
                    type="email"
                    value={member.email}
                    onChange={(e) => handleTeamMemberChange(member.id, "email", e.target.value)}
                    placeholder="Enter member's email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`member-${member.id}-department`}>Department</Label>
                  <Input
                    id={`member-${member.id}-department`}
                    value={member.department}
                    onChange={(e) => handleTeamMemberChange(member.id, "department", e.target.value)}
                    placeholder="E.g., Computer Engineering"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`member-${member.id}-year`}>Year of Study</Label>
                  <Input
                    id={`member-${member.id}-year`}
                    value={member.year}
                    onChange={(e) => handleTeamMemberChange(member.id, "year", e.target.value)}
                    placeholder="E.g., TE, BE"
                  />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
        <Textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Any specific requirements, questions, or information you'd like to share with the organizers"
          rows={4}
        />
      </div>

      {/* Terms Agreement */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="termsAgreement"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
        />
        <label
          htmlFor="termsAgreement"
          className="text-sm font-medium leading-none"
        >
          I agree to abide by all event rules and guidelines
        </label>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          "Register for this Event"
        )}
      </Button>
    </form>
  );
};

export default EventRegistrationForm;
