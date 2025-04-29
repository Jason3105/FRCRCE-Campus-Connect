
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  AlarmClock,
  User,
  BookOpen,
  CheckCircle,
  Award,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Mock data for events - would come from an API in a real app
const events = [
  {
    id: "1",
    title: "TechFest Hackathon 2025",
    organizer: "Computer Science Association",
    date: "May 15, 2025",
    time: "9:00 AM - 10:00 PM",
    location: "Main Auditorium, FRCRCE",
    image: "https://www.sxsw.com/wp-content/uploads/2019/06/2019-Hackathon-Photo-by-Randy-and-Jackie-Smith.jpg",
    category: "Tech",
    teamSize: "2-4",
    minTeamSize: 2,
    maxTeamSize: 4,
    registrationDeadline: "2025-05-10",
    description: "Join us for the annual TechFest Hackathon where teams compete to build innovative solutions to real-world problems. This 24-hour coding marathon will test your technical skills, creativity, and teamwork.",
    rules: [
      "Teams must consist of 2-4 members",
      "All team members must be currently enrolled students",
      "Use of pre-built code is not allowed",
      "Projects must be original and created during the hackathon",
      "Each team will have 5 minutes to present their project to the judges"
    ],
    prizes: [
      "1st Place: ₹15,000 and internship opportunities",
      "2nd Place: ₹10,000",
      "3rd Place: ₹5,000",
      "Best UI/UX: ₹2,000"
    ],
    timeline: [
      { time: "09:00 AM", activity: "Registration & Breakfast" },
      { time: "10:00 AM", activity: "Opening Ceremony & Theme Announcement" },
      { time: "11:00 AM", activity: "Hacking Begins" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "06:00 PM", activity: "Dinner Break" },
      { time: "09:00 AM (Next Day)", activity: "Hacking Ends" },
      { time: "10:00 AM - 12:00 PM", activity: "Project Presentations & Judging" },
      { time: "12:30 PM", activity: "Award Ceremony" }
    ],
    contactPerson: {
      name: "Rahul Sharma",
      position: "Event Coordinator",
      email: "techhack@frcrce.ac.in",
      phone: "+91 9876543210"
    }
  },
  {
    id: "2",
    title: "BitNBuild Hackathon",
    organizer: "Google Developer Students Council",
    date: "June 2, 2025",
    time: "11:00 AM - 5:00 PM",
    location: "Conference Hall, FRCRCE",
    image: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/66bdd08f62ce0_bit-n-build-around-the-world-2024.webp",
    category: "Tech",
    teamSize: "3-5",
    minTeamSize: 3,
    maxTeamSize: 5,
    registrationDeadline: "2025-05-25",
    description: "BitnBuild Hackathon is a dynamic tech event that brings together developers, designers, and innovators to collaborate and build impactful software or hardware solutions within a limited time frame.",
    rules: [
      "Teams can consist of 2 to 4 members",
      "Participants are free to use any programming languages, frameworks, and tools",
      "Projects will be judged based on creativity, technical complexity, practicality, and overall presentation",
      "The hackathon is open to all students pursuing bachelor's degrees",
      "The hackathon will run for a span of 24 hours for the final round which will be held at FRCRCE"
    ],
    prizes: [
      "1st Place: ₹20,000 and mentorship",
      "2nd Place: ₹10,000",
      "3rd Place: ₹5,000"
    ],
    timeline: [
      { time: "09:00 AM", activity: "Registration & Breakfast" },
      { time: "10:00 AM", activity: "Opening Ceremony & Theme Announcement" },
      { time: "11:00 AM", activity: "Hacking Begins" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "06:00 PM", activity: "Dinner Break" },
      { time: "09:00 AM (Next Day)", activity: "Hacking Ends" },
      { time: "10:00 AM - 12:00 PM", activity: "Project Presentations & Judging" },
      { time: "12:30 PM", activity: "Award Ceremony" }
    ],
    contactPerson: {
      name: "Priya Patel",
      position: "Event Coordinator",
      email: "bizplan@frcrce.ac.in",
      phone: "+91 9876543211"
    }
  },
  {
    id: "5",
    title: "TEDx Annual Conference",
    organizer: "TEDxCRCE Council",
    date: "May 20-25, 2025",
    time: "11:00 AM - 5:00 PM",
    location: "Conference Hall, FRCRCE",
    image: "https://media.assettype.com/freepressjournal/2025-01-30/uuyir9v1/SpeakersGroup-1.png",
    category: "Tech",
    teamSize: "3-5",
    minTeamSize: 3,
    maxTeamSize: 5,
    registrationDeadline: "2025-05-25",
    description: "BitnBuild Hackathon is a dynamic tech event that brings together developers, designers, and innovators to collaborate and build impactful software or hardware solutions within a limited time frame.",
    rules: [
      "Teams can consist of 2 to 4 members",
      "Participants are free to use any programming languages, frameworks, and tools",
      "Projects will be judged based on creativity, technical complexity, practicality, and overall presentation",
      "The hackathon is open to all students pursuing bachelor's degrees",
      "The hackathon will run for a span of 24 hours for the final round which will be held at FRCRCE"
    ],
    prizes: [
      "1st Place: ₹20,000 and mentorship",
      "2nd Place: ₹10,000",
      "3rd Place: ₹5,000"
    ],
    timeline: [
      { time: "09:00 AM", activity: "Registration & Breakfast" },
      { time: "10:00 AM", activity: "Opening Ceremony & Theme Announcement" },
      { time: "11:00 AM", activity: "Hacking Begins" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "06:00 PM", activity: "Dinner Break" },
      { time: "09:00 AM (Next Day)", activity: "Hacking Ends" },
      { time: "10:00 AM - 12:00 PM", activity: "Project Presentations & Judging" },
      { time: "12:30 PM", activity: "Award Ceremony" }
    ],
    contactPerson: {
      name: "Priya Patel",
      position: "Event Coordinator",
      email: "bizplan@frcrce.ac.in",
      phone: "+91 9876543211"
    }
  },
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { toast } = useToast();
  
  // Find the event with the matching ID
  const event = events.find(event => event.id === id);
  
  // If event not found, display an error message
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/events">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate if registration is still open
  const isRegistrationOpen = new Date(event.registrationDeadline) > new Date();
  
  const handleRegister = () => {
    // Check if user is logged in
    const token = localStorage.getItem("auth-token");
    
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in or create an account to register for this event.",
        variant: "destructive",
      });
      return;
    }
    
    setShowRegistrationForm(true);
  };
  
  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Back button */}
        <div className="bg-white pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/events" className="inline-flex items-center text-campus-purple hover:text-campus-purple/80">
              <ChevronLeft size={20} />
              <span>Back to Events</span>
            </Link>
          </div>
        </div>

        {/* Event Hero */}
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="rounded-lg overflow-hidden mb-6">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-campus-light-purple text-campus-purple mb-4">
                      {event.category}
                    </Badge>
                    {isRegistrationOpen ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Registration Open
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                        Registration Closed
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h1>
                  <p className="text-gray-600 mb-6">Organized by {event.organizer}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-3 text-campus-purple" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-3 text-campus-purple" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-3 text-campus-purple" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={18} className="mr-3 text-campus-purple" />
                      <span>Team Size: {event.teamSize}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <AlarmClock size={18} className="mr-3 text-campus-purple" />
                      <span>Registration Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={!isRegistrationOpen || isRegistering}
                    onClick={handleRegister}
                  >
                    {isRegistering ? "Processing..." : isRegistrationOpen ? "Register Now" : "Registration Closed"}
                  </Button>
                  
                  {!isRegistrationOpen && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Registration ended on {new Date(event.registrationDeadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Description */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-600">{event.description}</p>
                  </CardContent>
                </Card>
                
                {/* Rules & Regulations */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Rules & Regulations</h2>
                    <ul className="space-y-2">
                      {event.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="mr-2 text-campus-purple flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Prizes */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Prizes</h2>
                    <ul className="space-y-2">
                      {event.prizes.map((prize, index) => (
                        <li key={index} className="flex items-start">
                          <Award size={18} className="mr-2 text-campus-purple flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{prize}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                {/* Timeline */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Event Timeline</h2>
                    <div className="space-y-4">
                      {event.timeline.map((item, index) => (
                        <div key={index}>
                          {index > 0 && <Separator className="my-3" />}
                          <div className="flex">
                            <Clock size={16} className="mr-3 text-campus-purple flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">{item.time}</p>
                              <p className="text-gray-600">{item.activity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Contact Person */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Person</h2>
                    <div className="flex items-start mb-4">
                      <User size={18} className="mr-3 text-campus-purple flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{event.contactPerson.name}</p>
                        <p className="text-gray-600">{event.contactPerson.position}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <p>Email: {event.contactPerson.email}</p>
                      <p>Phone: {event.contactPerson.phone}</p>
                    </div>
                    
                    <Alert className="mt-6">
                      <AlertTitle className="font-medium">Need Help?</AlertTitle>
                      <AlertDescription>
                        If you have any questions about this event, feel free to reach out to the contact person.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Registration Dialog */}
        <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register for {event.title}</DialogTitle>
            </DialogHeader>
            <EventRegistrationForm 
              eventId={event.id}
              eventTitle={event.title}
              minTeamSize={event.minTeamSize}
              maxTeamSize={event.maxTeamSize}
              onSuccess={handleRegistrationSuccess}
            />
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
