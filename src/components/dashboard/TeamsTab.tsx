
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Calendar, Users, Star, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock teams data
const teamsList = [
  {
    id: "1",
    name: "CodeCrusaders",
    event: "TechFest Hackathon 2025",
    date: "May 15, 2025",
    category: "Tech",
    members: [
      { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Team Leader", isCurrentUser: true },
      { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "Member" },
      { id: "3", name: "Alex Johnson", email: "alex.j@example.com", role: "Member" }
    ],
    status: "confirmed",
  },
  {
    id: "2",
    name: "Tech Tigers",
    event: "College Sports Tournament",
    date: "December 10, 2024",
    category: "Sports",
    members: [
      { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Member", isCurrentUser: true },
      { id: "5", name: "Mike Wilson", email: "mike.w@example.com", role: "Team Leader" },
      { id: "6", name: "Sarah Parker", email: "sarah.p@example.com", role: "Member" },
      { id: "7", name: "David Lee", email: "david.l@example.com", role: "Member" },
      { id: "8", name: "Emma Thompson", email: "emma.t@example.com", role: "Member" }
    ],
    status: "completed",
    result: "Runner-up"
  }
];

// Mock invitations
const invitations = [
  {
    id: "1",
    teamName: "WebWizards",
    event: "Web Development Challenge",
    invitedBy: "Priya Sharma",
    date: "June 10, 2025",
  }
];

const TeamsTab = () => {
  const [selectedTeam, setSelectedTeam] = useState<typeof teamsList[0] | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const { toast } = useToast();

  const handleViewTeam = (team: typeof teamsList[0]) => {
    setSelectedTeam(team);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message.",
        variant: "destructive",
      });
      return;
    }
    
    setContactLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: `Your message has been sent to the team members.`,
      });
      setMessageText("");
      setContactLoading(false);
      setContactModalOpen(false);
    }, 1000);
  };

  const handleAcceptInvitation = (invitationId: string) => {
    // Simulate accepting invitation
    toast({
      title: "Invitation Accepted",
      description: "You have joined the team.",
    });
    
    // In a real app, we would update the list after API call
  };

  const handleDeclineInvitation = (invitationId: string) => {
    // Simulate declining invitation
    toast({
      title: "Invitation Declined",
      description: "You have declined the team invitation.",
    });
    
    // In a real app, we would update the list after API call
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Teams</h1>
      
      {/* Team Invitations */}
      {invitations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Pending Invitations</h2>
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <Card key={invitation.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{invitation.teamName} - {invitation.event}</h3>
                      <p className="text-sm text-gray-600">
                        Invited by {invitation.invitedBy} for event on {invitation.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeclineInvitation(invitation.id)}
                      >
                        Decline
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAcceptInvitation(invitation.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Teams List */}
      {teamsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamsList.map((team) => (
            <Card key={team.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-campus-light-purple text-campus-purple">
                    {team.category}
                  </Badge>
                  {team.status === "confirmed" ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Active Team
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      Completed
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{team.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span>{team.event} • {team.date}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 pt-3">
                <div className="flex items-center gap-1 mb-3">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">{team.members.length} Members</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {team.members.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className={`text-xs ${member.isCurrentUser ? "bg-campus-purple text-white" : "bg-gray-200"}`}>
                        {member.name.split(" ").map(part => part[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {team.members.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                      +{team.members.length - 3}
                    </div>
                  )}
                </div>
                
                {team.result && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-100 rounded-md">
                    <p className="text-sm font-medium text-green-800">Result: {team.result}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewTeam(team)}
                >
                  View Team Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-600 mb-6">You're not part of any teams yet</p>
        </div>
      )}
      
      {/* Team Details Dialog */}
      <Dialog open={selectedTeam !== null} onOpenChange={(open) => !open && setSelectedTeam(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedTeam?.name}</DialogTitle>
            <DialogDescription>
              {selectedTeam?.event} • {selectedTeam?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2">
            <h4 className="text-sm text-gray-500 mb-3">Team Members</h4>
            <div className="space-y-3">
              {selectedTeam?.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`text-xs ${member.isCurrentUser ? "bg-campus-purple text-white" : "bg-gray-200"}`}>
                        {member.name.split(" ").map(part => part[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">
                        {member.name} {member.isCurrentUser && "(You)"}
                      </p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  {member.role === "Team Leader" && (
                    <Badge variant="outline" className="text-xs">
                      <Star size={10} className="mr-1" /> Leader
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            
            {selectedTeam?.status === "confirmed" && (
              <>
                <Separator className="my-4" />
                <Alert>
                  <AlertDescription className="text-sm">
                    Remember, teamwork makes the dream work! Reach out to your team members to coordinate for the event.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
          
          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => setSelectedTeam(null)}>
              Close
            </Button>
            {selectedTeam?.status === "confirmed" && (
              <Button onClick={() => {
                setContactModalOpen(true);
                setSelectedTeam(null);
              }}>
                <MessageSquare size={16} className="mr-2" /> Contact Team
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contact Team Dialog */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Your Team</DialogTitle>
            <DialogDescription>
              Send a message to all members of your team
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2">
            <Textarea
              placeholder="Write your message here..."
              className="min-h-[150px]"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setContactModalOpen(false)}
              disabled={contactLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={contactLoading}
            >
              {contactLoading ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamsTab;
