
import { Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  image: string;
  category: string;
  teamSize: string;
  registrationDeadline: string;
}

const EventCard = ({
  id,
  title,
  organizer,
  date,
  time,
  image,
  category,
  teamSize,
  registrationDeadline,
}: EventCardProps) => {
  // Calculate if registration is still open
  const isRegistrationOpen = new Date(registrationDeadline) > new Date();

  return (
    <Card className="overflow-hidden event-card">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-campus-light-purple text-campus-purple">
            {category}
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
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm text-gray-500">Organized by {organizer}</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2 mt-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-2" />
            <span>Team size: {teamSize}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/events/${id}`} className="w-full">
          <Button className="w-full" disabled={!isRegistrationOpen}>
            {isRegistrationOpen ? "Register Now" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
