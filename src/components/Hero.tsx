
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-10 lg:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in">
              <span className="block">Your College</span>
              <span className="block text-campus-purple">Event Hub</span>
            </h1>
            <p className="mt-3 text-lg text-gray-500 sm:mt-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Discover, register, and participate in exciting events organized by
              student councils across campus. Never miss an opportunity to showcase
              your talent or learn something new.
            </p>
            <div className="mt-6 sm:mt-8 sm:flex animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-md shadow">
                <Link to="/events">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Events
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-2xl shadow-xl">
              <img
                className="w-full h-full object-cover"
                src="https://media.assettype.com/freepressjournal/2024-09-13/k0ra7mdx/concert-crowd-music-fanclub-hand-using-cellphone-taking-video-record-live-stream41418-3380.avif"
                alt="Students participating in a college event"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-5 m-4 w-48 animate-scale-in">
              <div className="font-bold text-lg text-campus-purple">50+</div>
              <div className="text-sm text-gray-700">Events Happening This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
