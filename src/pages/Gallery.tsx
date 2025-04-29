
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryCarousel from "@/components/GalleryCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Mock gallery data - would come from an API in a real app
const galleryImages = [
  {
    id: "1",
    title: "Hackathon 2024",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "technical",
    event: "BitNBuild 2024",
    description: "Students showcasing their coding skills during the 24-hour hackathon",
    date: "March 15, 2024"
  },
  {
    id: "2",
    title: "Cultural Dance Performance",
    url: "https://i.ytimg.com/vi/FN8Huxy_2Dc/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGD4gUyhlMA8=&rs=AOn4CLA28KWUvpCLKZZCf3GvYsqjuZmSuw",
    thumbnail: "https://i.ytimg.com/vi/FN8Huxy_2Dc/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGD4gUyhlMA8=&rs=AOn4CLA28KWUvpCLKZZCf3GvYsqjuZmSuw",
    category: "cultural",
    event: "Crescendo 2024",
    description: "Traditional dance performance during the annual cultural festival",
    date: "February 25, 2024"
  },
  {
    id: "3",
    title: "TEDxCRCE",
    url: "https://www.campustimespune.com/wp-content/uploads/2021/10/TEDxCRCE-banner-620x330.jpg",
    thumbnail: "https://www.campustimespune.com/wp-content/uploads/2021/10/TEDxCRCE-banner-620x330.jpg",
    category: "academic",
    event: "TEDx Annual Conderence",
    description: "Annual TEDx conference featuring speakers from various fields",
    date: "January 31st, 2025"
  },
  {
    id: "3",
    title: "TEDxCRCE",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkpdOkTpdl7l7dMb3sVemKiySa7VvF1GkDw&s",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkpdOkTpdl7l7dMb3sVemKiySa7VvF1GkDw&s",
    category: "academic",
    event: "TEDx Annual Conderence",
    description: "Annual TEDx conference featuring speakers from various fields",
    date: "January 31st, 2025"
  },
  {
    id: "4",
    title: "Business Plan Presentation",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "technical",
    event: "E-Cell Summit",
    description: "Students presenting their business ideas to industry experts",
    date: "April 5, 2024"
  },
  {
    id: "5",
    title: "Workshop on IoT",
    url: "https://images.unsplash.com/photo-1581092921461-eab10e6d42b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581092921461-eab10e6d42b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "technical",
    event: "Tech Week",
    description: "Hands-on workshop on Internet of Things and embedded systems",
    date: "March 28, 2024"
  },
  {
    id: "6",
    title: "Literary Club Poetry Reading",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "cultural",
    event: "Literary Festival",
    description: "Students participating in the annual poetry reading session",
    date: "February 10, 2024"
  },
  {
    id: "7",
    title: "Art Exhibition",
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "cultural",
    event: "Fine Arts Exhibition",
    description: "Annual art exhibition showcasing student artwork",
    date: "April 15, 2024"
  },
  {
    id: "8",
    title: "College Annual Day",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "campus",
    event: "Annual Day Celebration",
    description: "Celebrating achievements at the college's annual day function",
    date: "May 2, 2024"
  },
  {
    id: "9",
    title: "Graduation Ceremony",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "campus",
    event: "Graduation Day",
    description: "Class of 2024 graduation ceremony",
    date: "June 10, 2024"
  },
  {
    id: "10",
    title: "Robotics Competition",
    url: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "technical",
    event: "Robo Wars",
    description: "Inter-college robotics competition",
    date: "March 5, 2024"
  },
  {
    id: "11",
    title: "Guest Lecture",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "technical",
    event: "Industry Connect",
    description: "Guest lecture by industry expert on emerging technologies",
    date: "April 25, 2024"
  },
  {
    id: "12",
    title: "College Festival",
    url: "https://i.ytimg.com/vi/Ww1kD3JBCkE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXyhPMA8=&rs=AOn4CLAhYoQ7e_BAjszeqb7rtqvuIoed4w",
    thumbnail: "https://i.ytimg.com/vi/Ww1kD3JBCkE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXyhPMA8=&rs=AOn4CLAhYoQ7e_BAjszeqb7rtqvuIoed4w",
    category: "cultural",
    event: "Crescendo 2024",
    description: "Main stage performance during the annual cultural festival",
    date: "February 26, 2024"
  },
  {
    id: "1",
    title: "Hackathon 2024",
    url: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/gallery/66bdd77cdff29_5c75baef-82f8-476e-ba5d-cd531234a365.jpeg?d=600x600",
    thumbnail: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/gallery/66bdd77cdff29_5c75baef-82f8-476e-ba5d-cd531234a365.jpeg?d=600x600",
    category: "technical",
    event: "BitNBuild 2024",
    description: "Students showcasing their coding skills during the 24-hour hackathon",
    date: "March 15, 2024"
  }
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  
  // Get unique categories for the tabs
  const categories = ["all", ...new Set(galleryImages.map(img => img.category))];
  
  // Filter images based on search and category
  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch = 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || image.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Group images by event
  const eventGroups = filteredImages.reduce((groups: Record<string, any[]>, image) => {
    if (!groups[image.event]) {
      groups[image.event] = [];
    }
    groups[image.event].push(image);
    return groups;
  }, {});
  
  // Handle image click
  const handleImageClick = (image: any) => {
    setCurrentImage(image);
    setIsCarouselOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Gallery Header */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
            <p className="text-lg text-gray-600">
              Explore moments from various events and activities at FRCRCE
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
                placeholder="Search gallery photos..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.keys(eventGroups).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(eventGroups).map(([event, images]) => (
                  <div key={event} className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">{event}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image) => (
                        <div 
                          key={image.id} 
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleImageClick(image)}
                        >
                          <img 
                            src={image.thumbnail} 
                            alt={image.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">No images found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}>
                  View All Images
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Image Carousel */}
        <GalleryCarousel
          images={
            currentImage ? 
              eventGroups[currentImage.event] || [currentImage] : 
              []
          }
          currentImage={currentImage}
          isOpen={isCarouselOpen}
          onOpenChange={setIsCarouselOpen}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
