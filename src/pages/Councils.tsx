
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Description } from "@radix-ui/react-toast";

// Mock councils data
const allCouncils = [
  {
    id: "1",
    name: "Google Developer Student Council",
    acronym: "GDSC",
    description: "Supported by Google, GDSC CRCE empowers students to learn, build, and grow by exploring cutting-edge technologies and collaborating on real-world projects.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyUQlSPeUL0Y08bbvH69EDxoDXVqNJ5m9cw&s",
    members: 45,
    events: 8,
    faculty: "Prof. Deepali Kayande",
    type: "technical",
    yearFounded: 2001,
    socialMedia: {
      instagram: "frcrce_csa",
      linkedin: "csafrcrce"
    }
  },
  {
    id: "2",
    name: "Literary Society",
    acronym: "LitSoc",
    description: "The Literary Society enhances creative writing, public speaking, and debate skills through competitions, workshops, and literary events that encourage student expression.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 30,
    events: 5,
    faculty: "Prof. Rashmi Thakur",
    type: "cultural",
    yearFounded: 2005,
    socialMedia: {
      instagram: "frcrce_litsoc",
    }
  },
  {
    id: "3",
    name: "Sports Council",
    acronym: "SC",
    description: "The Sports Council organizes intra and inter-college sports tournaments, promotes physical fitness, and manages college sports teams for competitions at various levels.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 35,
    events: 6,
    faculty: "Prof. Aruna Singavi",
    type: "sports",
    yearFounded: 2000,
    socialMedia: {
      instagram: "frcrce_sports",
    }
  },
  {
    id: "4",
    name: "Fine Arts Society",
    acronym: "FAS",
    description: "The Fine Arts Society provides a platform for students to showcase their talents in performing arts, visual arts, and more through cultural festivals and creative workshops.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 40,
    events: 7,
    faculty: "Prof. Sudha Kumar",
    type: "cultural",
    yearFounded: 2003,
    socialMedia: {
      instagram: "frcrce_fas",
    }
  },
  {
    id: "5",
    name: "Computer Science Association",
    acronym: "CSA",
    description: "The Computer Science Association (CSA) promotes technical knowledge and innovation among computer engineering students through workshops, technical talks, coding competitions, and industry visits.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 38,
    events: 4,
    faculty: "Prof. Rajiv Menon",
    type: "technical",
    yearFounded: 2010,
    socialMedia: {
      instagram: "frcrce_mclub",
      linkedin: "frcrcemclub"
    }
  },
  {
    id: "6",
    name: "Photography Club",
    acronym: "PC",
    description: "The Photography Club nurtures visual storytelling through photo walks, exhibitions, and workshops, helping students develop their creative eye and technical photography skills.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    members: 25,
    events: 3,
    faculty: "Prof. Vijay Sharma",
    type: "creative",
    yearFounded: 2012,
    socialMedia: {
      instagram: "frcrce_photoclub",
    }
  },
];

const Councils = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("all");
  
  // Get unique council types for tabs
  const councilTypes = ["all", ...new Set(allCouncils.map(council => council.type))];
  
  // Filter councils based on search and type
  const filteredCouncils = allCouncils.filter((council) => {
    const matchesSearch = 
      council.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      council.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      council.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeType === "all" || council.type === activeType;
    
    return matchesSearch && matchesType;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Councils Header */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Councils</h1>
            <p className="text-lg text-gray-600">
              Explore the various student-led councils at FRCRCE and get involved in campus activities
            </p>
          </div>
        </div>
        
        {/* Search */}
        <div className="bg-white py-6 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search councils..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeType} onValueChange={setActiveType} className="w-full">
              <TabsList className="flex flex-wrap gap-2">
                {councilTypes.map(type => (
                  <TabsTrigger 
                    key={type} 
                    value={type} 
                    className="capitalize"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Councils List */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCouncils.length > 0 ? (
              <>
                <p className="text-gray-600 mb-8">Showing {filteredCouncils.length} councils</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCouncils.map((council) => (
                    <Card key={council.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={council.image} 
                          alt={council.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-campus-light-purple text-campus-purple capitalize mb-2">
                            {council.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{council.name} ({council.acronym})</CardTitle>
                        <CardDescription>Est. {council.yearFounded}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {council.description}
                        </p>
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            <span>{council.members} Members</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            <span>{council.events} Events/Year</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link to={`/councils/${council.id}`} className="w-full">
                          <Button className="w-full">
                            Learn More
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">No councils found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setActiveType("all");
                }}>
                  View All Councils
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Councils;
