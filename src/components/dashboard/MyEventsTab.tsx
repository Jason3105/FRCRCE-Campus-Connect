
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { userService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface EventRegistration {
  id: string;
  status: string;
  registrationDate: string;
  event: {
    id: string;
    title: string;
    date: string;
    time: {
      startTime: string;
      endTime: string;
    };
    location: string;
    image: string;
    category: string;
    status: string;
  };
  team?: {
    id: string;
    name: string;
    members: Array<{
      user: {
        id: string;
        name: string;
        email: string;
      };
      role: string;
    }>;
  };
  result?: string;
  certificate?: {
    issued: boolean;
    url?: string;
  };
}

const MyEventsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventRegistration[]>([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Fetch user events
  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true);
        const userEvents = await userService.getUserEvents();
        setEvents(userEvents);
      } catch (error) {
        console.error("Failed to fetch user events:", error);
        toast({
          title: "Error loading events",
          description: "There was a problem fetching your events.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [isAuthenticated, toast]);

  // Filter events based on active tab
  const filteredEvents = events.filter((registration) => {
    const eventDate = new Date(registration.event.date);
    const now = new Date();
    
    if (activeTab === "upcoming") {
      return eventDate >= now && registration.event.status !== "completed";
    }
    
    if (activeTab === "past") {
      return eventDate < now || registration.event.status === "completed";
    }
    
    return true; // "all" tab
  });

  // Render loading skeletons
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Events</h1>
        </div>
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full relative">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600">No {activeTab} events found</h3>
              <p className="text-gray-500 mt-2">
                {activeTab === "upcoming" ? "You haven't registered for any upcoming events." :
                 activeTab === "past" ? "You don't have any past events." : "You haven't registered for any events yet."}
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="/events">Browse Events</a>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((registration) => (
                <Card key={registration.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img 
                      src={registration.event.image} 
                      alt={registration.event.title} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={registration.event.status === "upcoming" ? "default" : 
                              registration.event.status === "ongoing" ? "secondary" : "outline"}>
                        {registration.event.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{registration.event.title}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mt-1">
                            {registration.event.category}
                          </Badge>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={
                          registration.status === "confirmed" ? "default" :
                          registration.status === "pending" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {registration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {format(new Date(registration.event.date), "MMMM d, yyyy")}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {registration.event.time.startTime} - {registration.event.time.endTime}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{registration.event.location}</span>
                      </div>
                      
                      {/* Team information if available */}
                      {registration.team && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="font-medium">Team: {registration.team.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {registration.team.members.length} team members
                          </p>
                        </div>
                      )}
                      
                      {/* Result information if available */}
                      {registration.result && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="font-medium">Result: {registration.result}</p>
                          {registration.certificate?.issued && (
                            <Button variant="link" className="p-0 h-auto text-xs" asChild>
                              <a href={registration.certificate.url} target="_blank" rel="noopener noreferrer">
                                View Certificate
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button size="sm" className="w-full" asChild>
                        <a href={`/events/${registration.event.id}`}>View Details</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEventsTab;
