
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Send, Clock } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock councils data
const councilsList = [
  {
    id: "1",
    name: "Computer Science Association",
    acronym: "CSA",
    description: "The Computer Science Association (CSA) promotes technical knowledge and innovation among computer engineering students.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 45,
    events: 8,
    applyStatus: null, // null = not applied, "pending", "approved", "rejected"
  },
  {
    id: "2",
    name: "Literary Society",
    acronym: "LitSoc",
    description: "The Literary Society enhances creative writing, public speaking, and debate skills through competitions and workshops.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 30,
    events: 5,
    applyStatus: "pending",
  },
  {
    id: "3",
    name: "Sports Council",
    acronym: "SC",
    description: "The Sports Council organizes intra and inter-college sports tournaments and promotes physical fitness.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 35,
    events: 6,
    applyStatus: null,
  },
  {
    id: "4",
    name: "Fine Arts Society",
    acronym: "FAS",
    description: "The Fine Arts Society provides a platform for students to showcase their talents in performing arts, visual arts, and more.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 40,
    events: 7,
    applyStatus: "approved",
  },
];

// User's council memberships
const myCouncils = [
  {
    id: "4",
    name: "Fine Arts Society",
    acronym: "FAS",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    role: "Member",
    joinedDate: "2024-01-15",
  },
];

const CouncilsTab = () => {
  const [selectedCouncil, setSelectedCouncil] = useState<typeof councilsList[0] | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applicationText, setApplicationText] = useState("");
  const [position, setPosition] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleApplySubmit = () => {
    if (!applicationText.trim() || !position.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: `Your application to ${selectedCouncil?.name} has been submitted successfully.`,
      });
      setApplicationText("");
      setPosition("");
      setSubmitting(false);
      setApplyDialogOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Councils</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Councils</TabsTrigger>
          <TabsTrigger value="my">My Councils</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {councilsList.map((council) => (
              <Card key={council.id} className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={council.image} 
                    alt={council.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{council.name} ({council.acronym})</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className="line-clamp-2 mb-4">
                    {council.description}
                  </CardDescription>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span>{council.members} Members</span>
                    </div>
                    <div>
                      {council.events} Events per year
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {council.applyStatus === null ? (
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setSelectedCouncil(council);
                        setApplyDialogOpen(true);
                      }}
                    >
                      <Send size={16} className="mr-2" />
                      Apply to Join
                    </Button>
                  ) : council.applyStatus === "pending" ? (
                    <Button variant="outline" className="w-full" disabled>
                      <Clock size={16} className="mr-2" />
                      Application Pending
                    </Button>
                  ) : council.applyStatus === "approved" ? (
                    <Badge className="w-full flex justify-center py-2 bg-green-100 text-green-800 hover:bg-green-100">
                      Already a Member
                    </Badge>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Application Rejected - Apply Again
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="my">
          {myCouncils.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCouncils.map((council) => (
                <Card key={council.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={council.image} 
                      alt={council.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{council.name} ({council.acronym})</CardTitle>
                    </div>
                    <CardDescription className="mt-2">
                      <Badge variant="outline" className="bg-campus-light-purple text-campus-purple">
                        {council.role}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-gray-600">
                      Joined on {new Date(council.joinedDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button className="flex-1" variant="outline">
                      View Activities
                    </Button>
                    <Button className="flex-1">
                      Council Portal
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">You're not part of any councils yet</h3>
              <p className="text-gray-600 mb-6">Apply to join a council to get involved in campus activities</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="applications">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Track Your Applications</h3>
            <p className="text-gray-600 mb-6">You can see the status of your council applications here</p>
            {councilsList.filter(c => c.applyStatus === "pending").length > 0 ? (
              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {councilsList.filter(c => c.applyStatus === "pending").map((council) => (
                  <Card key={council.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{council.name}</p>
                        <p className="text-sm text-gray-600">Applied on: {new Date().toLocaleDateString()}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Button asChild>
                <Link to="/councils">View All Councils</Link>
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Apply to Council Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to {selectedCouncil?.name}</DialogTitle>
            <DialogDescription>
              Tell us why you want to join and what skills you bring to the council.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position Interested In</Label>
              <Input 
                id="position" 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="E.g., General Member, Event Coordinator, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="application">Why do you want to join?</Label>
              <Textarea
                id="application"
                placeholder="Describe your reasons for joining and any relevant experience or skills..."
                className="min-h-[150px]"
                value={applicationText}
                onChange={(e) => setApplicationText(e.target.value)}
              />
              <p className="text-xs text-gray-500">Your application will be reviewed by the council admins. This process may take 1-2 weeks.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setApplyDialogOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApplySubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CouncilsTab;
