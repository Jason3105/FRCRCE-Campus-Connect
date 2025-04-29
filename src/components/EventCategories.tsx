
import { Code, Briefcase, Music, Brain, Activity, Award } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Technical",
    icon: Code,
    color: "bg-blue-100 text-blue-800",
    description: "Hackathons, coding competitions, and workshops",
    count: 15,
  },
  {
    name: "Business",
    icon: Briefcase,
    color: "bg-green-100 text-green-800",
    description: "Case studies, entrepreneurship events, and seminars",
    count: 8,
  },
  {
    name: "Cultural",
    icon: Music,
    color: "bg-purple-100 text-purple-800",
    description: "Dance, music, art exhibitions, and performances",
    count: 12,
  },
  {
    name: "Academic",
    icon: Brain,
    color: "bg-amber-100 text-amber-800",
    description: "Quizzes, debates, and educational competitions",
    count: 10,
  },
  {
    name: "Sports",
    icon: Activity,
    color: "bg-red-100 text-red-800",
    description: "Tournaments, matches, and athletic events",
    count: 6,
  },
  {
    name: "Miscellaneous",
    icon: Award,
    color: "bg-teal-100 text-teal-800",
    description: "Charity events, social gatherings, and more",
    count: 9,
  },
];

const EventCategories = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Events by Category</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover events across various domains and interests at your campus
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/events?category=${category.name}`}
              key={category.name}
              className="group block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`${category.color} p-3 rounded-lg`}>
                  <category.icon size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-campus-purple transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} events</p>
                </div>
              </div>
              <p className="text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
