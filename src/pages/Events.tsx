
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "TechFest Hackathon 2025",
    organizer: "Computer Science Association",
    date: "May 15, 2025",
    time: "9:00 AM - 10:00 PM",
    image: "https://www.sxsw.com/wp-content/uploads/2019/06/2019-Hackathon-Photo-by-Randy-and-Jackie-Smith.jpg",
    category: "Tech",
    teamSize: "2-4",
    registrationDeadline: "2025-05-10",
  },
  {
    id: "2",
    title: "BitNBuild Hackathon",
    organizer: "Google Developer Students Council",
    date: "June 2, 2025",
    time: "11:00 AM - 5:00 PM",
    image: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/66bdd08f62ce0_bit-n-build-around-the-world-2024.webp",
    category: "Tech",
    teamSize: "3-5",
    registrationDeadline: "2025-05-25",
  },
  {
    id: "3",
    title: "Euphoria",
    organizer: "Student Council",
    date: "April 30, 2025",
    time: "6:00 PM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Cultural",
    teamSize: "Individual/Group",
    registrationDeadline: "2025-04-25",
  },
  {
    id: "4",
    title: "CRMD Debate",
    organizer: "Student Council",
    date: "May 5, 2025",
    time: "2:00 PM - 6:00 PM",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEzpfzbMwWlMQ/feedshare-shrink_800/feedshare-shrink_800/0/1725085517482?e=2147483647&v=beta&t=0goKz2KUVSHWGDg-6llICOCWN6Tdxhr2kba6aCCcy8o",
    category: "Academic",
    teamSize: "2-3",
    registrationDeadline: "2025-05-01",
  },
  {
    id: "5",
    title: "TEDx Annual Conference",
    organizer: "TEDxCRCE Council",
    date: "May 20-25, 2025",
    time: "All Day",
    image: "https://media.assettype.com/freepressjournal/2025-01-30/uuyir9v1/SpeakersGroup-1.png",
    category: "Academic",
    teamSize: "5-7",
    registrationDeadline: "2025-05-15",
  },
  {
    id: "6",
    title: "Photography Workshop",
    organizer: "Film Club",
    date: "April 28, 2025",
    time: "10:00 AM - 12:00 PM",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    category: "Workshop",
    teamSize: "Individual",
    registrationDeadline: "2025-04-25",
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // Filter events based on search term and category
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || event.category === category;
    
    return matchesSearch && matchesCategory;
  });

  // Sort events based on sortBy value
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setSortBy("newest");
  };

  // Get unique categories for filter
  const categories = [...new Set(allEvents.map(event => event.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Events Header */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-lg text-gray-600">
              Browse and register for exciting events happening around your campus
            </p>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white py-6 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" className="flex gap-2" onClick={resetFilters}>
                  <FilterX size={18} />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events List */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sortedEvents.length > 0 ? (
              <>
                <p className="text-gray-600 mb-8">Showing {sortedEvents.length} events</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedEvents.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">No events found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters}>View All Events</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
