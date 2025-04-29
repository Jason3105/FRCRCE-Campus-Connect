
import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedEvents";
import EventCategories from "@/components/EventCategories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarClock, Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedEvents />
        
        {/* Stats Section */}
        <div className="bg-campus-purple py-12 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CalendarClock size={48} />
                </div>
                <h3 className="text-4xl font-bold mb-2">200+</h3>
                <p className="text-lg opacity-80">Events Hosted Yearly</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users size={48} />
                </div>
                <h3 className="text-4xl font-bold mb-2">5,000+</h3>
                <p className="text-lg opacity-80">Student Participants</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Trophy size={48} />
                </div>
                <h3 className="text-4xl font-bold mb-2">50+</h3>
                <p className="text-lg opacity-80">Student Councils</p>
              </div>
            </div>
          </div>
        </div>
        
        <EventCategories />
        
        {/* Call to Action */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Participate?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Sign up now to start registering for events, create teams, and showcase your talents!
              </p>
              <div className="flex justify-center space-x-4">
                <a href="/register" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-campus-purple hover:bg-campus-dark-purple md:py-4 md:text-lg md:px-10">
                  Get Started
                </a>
                <a href="/events" className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-campus-purple bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Browse Events
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
