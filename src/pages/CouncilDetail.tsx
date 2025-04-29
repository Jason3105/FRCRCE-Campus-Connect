
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  Calendar,
  Users,
  Award,
  Clock,
  MapPin,
  ExternalLink,
  Instagram,
  Linkedin,
  UserPlus,
  Check,
  Star,
  FileText
} from "lucide-react";

// Mock council data - would come from an API in a real app
const allCouncils = [
  {
    id: "1",
    name: "Google Developer Student Council",
    acronym: "GDSC",
    description: "Supported by Google, GDSC CRCE empowers students to learn, build, and grow by exploring cutting-edge technologies and collaborating on real-world projects.",
    image: "https://avatars.githubusercontent.com/u/111590529?v=4",
    members: 45,
    events: 8,
    faculty: "Prof. Deepali Kayande",
    type: "technical",
    yearFounded: 2001,
    socialMedia: {
      instagram: "frcrce_gdsc",
      linkedin: "gdscfrcrce"
    },
    team: [
      {
        id: "m1",
        name: "Anish Patel",
        role: "President",
        department: "Computer Engineering",
        year: "BE",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "m2",
        name: "Kriti Sharma",
        role: "Secretary",
        department: "Computer Engineering",
        year: "BE",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "m3",
        name: "Rohan Mehta",
        role: "Treasurer",
        department: "Computer Engineering",
        year: "TE",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "m4",
        name: "Neha Gupta",
        role: "Technical Head",
        department: "Computer Engineering",
        year: "TE",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    pastEvents: [
      {
        id: "pe1",
        title: "Hackathon 2024",
        date: "March 15, 2024",
        description: "24-hour coding competition with over 200 participants from various colleges",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      },
      {
        id: "pe2",
        title: "Tech Workshop Series",
        date: "February 5-7, 2024",
        description: "Three-day workshop covering AI, cloud computing, and cybersecurity",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      },
      {
        id: "pe3",
        title: "Industry Expert Talk",
        date: "January 20, 2024",
        description: "Panel discussion with tech leaders from Google, Microsoft and Amazon",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      }
    ],
    upcomingEvents: [
      {
        id: "ue1",
        title: "Code Sprint Challenge",
        date: "May 25, 2025",
        description: "Competitive coding contest with prizes worth ₹50,000",
        registrationOpen: true,
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      },
      {
        id: "ue2",
        title: "Web Development Bootcamp",
        date: "June 10-12, 2025",
        description: "Intensive 3-day bootcamp on modern web technologies",
        registrationOpen: true,
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      }
    ],
    openPositions: [
      {
        id: "pos1",
        title: "Event Coordinator",
        responsibilities: "Coordinate technical events, manage event logistics, and contribute to event planning",
        requirements: "Computer Engineering, TE/BE student with good organizational skills"
      },
      {
        id: "pos2",
        title: "Technical Team Member",
        responsibilities: "Assist in conducting workshops, create technical content, and help with coding competitions",
        requirements: "Any department, SE/TE student with programming knowledge"
      }
    ]
  },
  // More mock data for other councils would be here
];

const CouncilDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    year: "",
    department: "",
    position: "",
    experience: "",
    motivation: "",
    agreeToTerms: false
  });
  const { toast } = useToast();

  // Find the council by ID from our mock data
  const council = allCouncils.find(c => c.id === id);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setApplicationData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  // Handle application submission
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);

    // In a real app, this would send data to a backend
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. We'll get back to you soon.",
      });
      setIsApplying(false);
    }, 1500);
  };

  if (!council) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Council Not Found</h1>
            <p className="text-gray-600 mb-6">The council you're looking for doesn't exist or has been removed.</p>
            <Link to="/councils">
              <Button>Back to Councils</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Back button */}
        <div className="bg-white pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/councils" className="inline-flex items-center text-campus-purple hover:text-campus-purple/80">
              <ChevronLeft size={20} />
              <span>Back to Councils</span>
            </Link>
          </div>
        </div>

        {/* Council Hero */}
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={council.image} 
                    alt={council.name} 
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="bg-campus-light-purple text-campus-purple capitalize">
                      {council.type}
                    </Badge>
                    <span className="ml-2 text-gray-500">Est. {council.yearFounded}</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{council.name} ({council.acronym})</h1>
                  <p className="text-lg text-gray-600 mb-4">{council.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <Users size={18} className="mr-2 text-campus-purple" />
                      <span>{council.members} Members</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-campus-purple" />
                      <span>{council.events} Events/Year</span>
                    </div>
                    <div className="flex items-center">
                      <Award size={18} className="mr-2 text-campus-purple" />
                      <span>Faculty: {council.faculty}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <UserPlus size={16} />
                          Apply to Join
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Apply to {council.acronym}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleApplicationSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={applicationData.name} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={applicationData.email} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="year" className="text-sm font-medium">Year</label>
                              <Input 
                                id="year" 
                                name="year" 
                                value={applicationData.year} 
                                onChange={handleInputChange} 
                                required 
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="department" className="text-sm font-medium">Department</label>
                              <Input 
                                id="department" 
                                name="department" 
                                value={applicationData.department} 
                                onChange={handleInputChange} 
                                required 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="position" className="text-sm font-medium">Position</label>
                            <Input 
                              id="position" 
                              name="position" 
                              value={applicationData.position} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="experience" className="text-sm font-medium">Relevant Experience</label>
                            <Textarea 
                              id="experience" 
                              name="experience" 
                              value={applicationData.experience} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="motivation" className="text-sm font-medium">Why do you want to join?</label>
                            <Textarea 
                              id="motivation" 
                              name="motivation" 
                              value={applicationData.motivation} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="terms" 
                              checked={applicationData.agreeToTerms}
                              onCheckedChange={handleCheckboxChange}
                            />
                            <label htmlFor="terms" className="text-sm">
                              I agree to the terms and responsibilities of being a council member
                            </label>
                          </div>
                          
                          <Button type="submit" className="w-full" disabled={isApplying}>
                            {isApplying ? "Submitting..." : "Submit Application"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    
                    {council.socialMedia.instagram && (
                      <a 
                        href={`https://instagram.com/${council.socialMedia.instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-campus-purple hover:text-campus-purple/80"
                      >
                        <Instagram size={18} className="mr-1" />
                        <span>@{council.socialMedia.instagram}</span>
                      </a>
                    )}
                    
                    {council.socialMedia.linkedin && (
                      <a 
                        href={`https://linkedin.com/company/${council.socialMedia.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-campus-purple hover:text-campus-purple/80"
                      >
                        <Linkedin size={18} className="mr-1" />
                        <span>{council.socialMedia.linkedin}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Council Tabs */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="join">Open Positions</TabsTrigger>
              </TabsList>
              
              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {council.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{council.description}</p>
                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold text-lg">Mission</h3>
                      <p className="text-gray-600">
                        To foster a community of tech enthusiasts at FRCRCE by providing platforms for learning, innovation, and career development in computer science and related fields.
                      </p>
                      
                      <h3 className="font-semibold text-lg">Vision</h3>
                      <p className="text-gray-600">
                        To be the leading technical association that bridges the gap between academic learning and industry requirements, empowering students to excel in the ever-evolving tech landscape.
                      </p>
                      
                      <h3 className="font-semibold text-lg">Activities</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Technical workshops and hands-on sessions</li>
                        <li>Coding competitions and hackathons</li>
                        <li>Industry expert talks and panel discussions</li>
                        <li>Project exhibitions and demonstrations</li>
                        <li>Technical paper presentations</li>
                        <li>Career guidance and interview preparation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Team Tab */}
              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{council.acronym} Team {new Date().getFullYear()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {council.team.map((member) => (
                        <div key={member.id} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-campus-purple font-medium">{member.role}</p>
                          <p className="text-sm text-gray-500">{member.department}, {member.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar size={20} className="mr-2 text-campus-purple" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {council.upcomingEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-2 pb-0">
                            <div className="flex items-center mb-2 text-sm">
                              <Clock size={14} className="mr-1 text-campus-purple" />
                              <span>{event.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                          </CardContent>
                          <CardFooter className="p-4">
                            <Button variant="outline" className="w-full" asChild>
                              <Link to={`/events/${event.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Past Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock size={20} className="mr-2 text-campus-purple" />
                      Past Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {council.pastEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="flex items-center mb-2 text-sm">
                              <Calendar size={14} className="mr-1 text-campus-purple" />
                              <span>{event.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Join Tab */}
              <TabsContent value="join" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserPlus size={20} className="mr-2 text-campus-purple" />
                      Open Positions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {council.openPositions.map((position) => (
                        <div key={position.id} className="border rounded-lg p-6">
                          <h3 className="font-semibold text-lg mb-2">{position.title}</h3>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-sm text-gray-500 uppercase">Responsibilities:</h4>
                            <p className="text-gray-700">{position.responsibilities}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-sm text-gray-500 uppercase">Requirements:</h4>
                            <p className="text-gray-700">{position.requirements}</p>
                          </div>
                          
                          <Button className="mt-2">Apply Now</Button>
                        </div>
                      ))}
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-dashed flex flex-col items-center text-center">
                        <FileText size={36} className="text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium mb-1">General Applications</h3>
                        <p className="text-gray-600 mb-4">Don't see a position that fits you? We're always looking for passionate students to join our team.</p>
                        <Button variant="outline">Submit General Application</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CouncilDetail;
