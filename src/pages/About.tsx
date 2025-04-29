
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  School, 
  GraduationCap, 
  Library, 
  Trophy, 
  Users, 
  Building2, 
  Globe, 
  Calendar, 
  MapPin,
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="w-full h-[50vh] overflow-hidden">
            <img 
              src="https://images.shiksha.com/mediadata/images/1510316011php8xTQBX.jpeg" height="h-full"
              alt="FRCRCE Campus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Fr. Conceicao Rodrigues College of Engineering</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Excellence in Engineering Education since 1984
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Legacy of Excellence</h2>
                <p className="text-gray-600 mb-4">
                  Fr. Conceicao Rodrigues College of Engineering (FRCRCE), established in 1984, has consistently been among the top engineering institutions in Mumbai. Affiliated with the University of Mumbai and approved by AICTE, the college offers undergraduate and postgraduate programs in engineering.
                </p>
                <p className="text-gray-600 mb-4">
                  Located in Bandra, one of Mumbai's most vibrant suburbs, FRCRCE was founded by the Society of the Congregation of Franciscan Brothers with the objective of imparting quality technical education to all strata of society, and to create technically competent and ethically strong professionals.
                </p>
                <p className="text-gray-600">
                  The institution is recognized for its strong emphasis on academic excellence, industry-relevant curriculum, and focus on holistic development through extensive co-curricular and extracurricular activities.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <GraduationCap className="mr-2 text-campus-purple mt-1" />
                    <div>
                      <h3 className="font-medium">Established</h3>
                      <p className="text-gray-600">1984</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="mr-2 text-campus-purple mt-1" />
                    <div>
                      <h3 className="font-medium">Students</h3>
                      <p className="text-gray-600">1200+</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <School className="mr-2 text-campus-purple mt-1" />
                    <div>
                      <h3 className="font-medium">Campus Area</h3>
                      <p className="text-gray-600">5+ Acres</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Trophy className="mr-2 text-campus-purple mt-1" />
                    <div>
                      <h3 className="font-medium">NAAC Grade</h3>
                      <p className="text-gray-600">A Grade</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <img 
                  src="https://images.shiksha.com/mediadata/images/1510316011php8xTQBX.jpeg" 
                  alt="Students at FRCRCE" 
                  className="rounded-lg shadow-lg w-full"
                />
                
                <div className="grid grid-cols-2 gap-6">
                  <img 
                    src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="FRCRCE Library" 
                    className="rounded-lg shadow-md w-full h-40 object-cover"
                  />
                  <img 
                    src="https://lh3.googleusercontent.com/proxy/P4EEIGegXYCwl9PuCKrdB-CHEqEuDzbVx5_lSj_lDFCIxdJ_NeFfyXMd9Yks3U3_lOgFuTYGJR4GP7hkOJZBnM4CUfIvoCyvnaWherquDmOrxEEy" 
                    alt="Laboratory at FRCRCE" 
                    className="rounded-lg shadow-md w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision & Mission */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Vision & Mission</h2>
              <p className="text-lg text-gray-600 mt-2">Driving excellence and innovation in engineering education</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 text-campus-purple">
                    <Globe size={24} />
                    <h3 className="text-xl font-bold ml-2">Our Vision</h3>
                  </div>
                  <p className="text-gray-600">
                    To be a leading institution offering quality technical education, producing competent and socially responsible engineers contributing towards the betterment of society.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 text-campus-purple">
                    <CheckCircle size={24} />
                    <h3 className="text-xl font-bold ml-2">Our Mission</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="min-w-[20px] h-5 flex items-center justify-center mr-2">•</div>
                      <span>To create technically competent professionals with ethical values</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-[20px] h-5 flex items-center justify-center mr-2">•</div>
                      <span>To provide quality education addressing the needs of the industry</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-[20px] h-5 flex items-center justify-center mr-2">•</div>
                      <span>To promote research and innovation culture among the students and faculty</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-[20px] h-5 flex items-center justify-center mr-2">•</div>
                      <span>To inculcate entrepreneurial skills and develop responsible citizens</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Departments & Programs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Departments & Programs</h2>
              <p className="text-lg text-gray-600 mt-2">Offering industry-relevant technical education across disciplines</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Computer Engineering",
                  icon: <Building2 className="text-campus-purple" size={24} />,
                  description: "Focuses on computer systems, algorithms, software development, and emerging technologies like AI and machine learning."
                },
                {
                  title: "Information Technology",
                  icon: <Globe className="text-campus-purple" size={24} />,
                  description: "Covers IT infrastructure, web technologies, data science, cybersecurity, and business information systems."
                },
                {
                  title: "Electronics & Telecommunication",
                  icon: <Library className="text-campus-purple" size={24} />,
                  description: "Specializes in electronic circuits, signal processing, communication systems, and embedded systems."
                },
                {
                  title: "Mechanical Engineering",
                  icon: <School className="text-campus-purple" size={24} />,
                  description: "Covers thermodynamics, manufacturing, CAD/CAM, robotics, and mechanical design principles."
                },
                {
                  title: "Artificial Intelligence & Data Science",
                  icon: <GraduationCap className="text-campus-purple" size={24} />,
                  description: "Latest program focusing on AI algorithms, machine learning, data analysis, and intelligent systems."
                },
                {
                  title: "M.E. in Computer Engineering",
                  icon: <Trophy className="text-campus-purple" size={24} />,
                  description: "Postgraduate program specializing in advanced computing concepts and research."
                }
              ].map((department, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {department.icon}
                      <h3 className="text-lg font-bold ml-2">{department.title}</h3>
                    </div>
                    <p className="text-gray-600">{department.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Campus Life */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Campus Life</h2>
              <p className="text-lg text-gray-600 mt-2">Vibrant student activities beyond academics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-1">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Student Councils</h3>
                  <p className="text-gray-600">
                    FRCRCE has numerous student-led councils and associations that organize technical and cultural events throughout the academic year.
                  </p>
                  <Link to="/councils">
                    <Button className="flex items-center">
                      <span>Explore Councils</span>
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-xl font-bold text-gray-900">Major Events</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Calendar className="mr-2 text-campus-purple" size={18} />
                      <span>CRESCENDO - Annual Cultural Festival</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="mr-2 text-campus-purple" size={18} />
                      <span>REACTOR - Technical Symposium</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="mr-2 text-campus-purple" size={18} />
                      <span>E-CELL SUMMIT - Entrepreneurship Event</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="mr-2 text-campus-purple" size={18} />
                      <span>SPORTS WEEK - Annual Sports Competitions</span>
                    </li>
                  </ul>
                  
                  <Link to="/events">
                    <Button variant="outline" className="flex items-center">
                      <span>View All Events</span>
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Cultural Event" 
                    className="rounded-lg shadow-md h-48 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Technical Workshop" 
                    className="rounded-lg shadow-md h-48 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Group Discussion" 
                    className="rounded-lg shadow-md h-48 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Sports Event" 
                    className="rounded-lg shadow-md h-48 object-cover"
                  />
                </div>
                
                <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex items-start">
                      <div className="bg-campus-light-purple p-2 rounded-full text-campus-purple mr-3">
                        <Library size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">Modern Library</h4>
                        <p className="text-sm text-gray-600">With 50,000+ books, journals, and e-resources</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-campus-light-purple p-2 rounded-full text-campus-purple mr-3">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">State-of-art Labs</h4>
                        <p className="text-sm text-gray-600">Well-equipped laboratories for all departments</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-campus-light-purple p-2 rounded-full text-campus-purple mr-3">
                        <Users size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">Auditorium</h4>
                        <p className="text-sm text-gray-600">300+ seating capacity for events</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-campus-light-purple p-2 rounded-full text-campus-purple mr-3">
                        <Trophy size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">Sports Complex</h4>
                        <p className="text-sm text-gray-600">Indoor and outdoor sports facilities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              <p className="text-lg text-gray-600 mt-2">Get in touch with Fr. Conceicao Rodrigues College of Engineering</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4111257499494!2d72.81979007432748!3d19.046776682127697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9410786e093%3A0x978d91da1902210b!2sFr.%20Conceicao%20Rodrigues%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1712516212850!5m2!1sen!2sin" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0, borderRadius: "0.5rem" }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FRCRCE Location"
                ></iframe>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-3 text-campus-purple flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <address className="not-italic text-gray-600">
                      Fr. Conceicao Rodrigues College of Engineering,<br />
                      Father Agnel Ashram, Bandstand,<br />
                      Bandra (W), Mumbai - 400 050,<br />
                      Maharashtra, India
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-3 text-campus-purple flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 22 2640 4706 / 2641 7551</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-3 text-campus-purple flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@frcrce.ac.in</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Contact Us</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
