"use client";
import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, Star, Filter, Search, Plus, ArrowRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'celebration' | 'community' | 'environmental' | 'sports' | 'cultural';
  attendees: number;
  maxAttendees?: number;
  isPopular: boolean;
  organizer: string;
  image?: string;
  rsvpStatus?: 'attending' | 'maybe' | 'not-attending';
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Independence Day Celebration",
    date: "15th August",
    time: "8:00 AM",
    location: "Community Park",
    description: "Flag hoisting, cultural performances, and breakfast for all residents. Come celebrate our nation's independence with patriotic fervor and community spirit.",
    category: 'celebration',
    attendees: 156,
    maxAttendees: 200,
    isPopular: true,
    organizer: "Cultural Committee",
    rsvpStatus: 'attending'
  },
  {
    id: 2,
    title: "Weekend Clean-Up Drive",
    date: "10th August",
    time: "7:00 AM",
    location: "Near Main Gate",
    description: "Join hands to keep our society clean and green. Gloves, bags, and refreshments will be provided. Let's make our community beautiful together!",
    category: 'community',
    attendees: 89,
    maxAttendees: 100,
    isPopular: false,
    organizer: "Green Committee",
    rsvpStatus: 'maybe'
  },
  {
    id: 3,
    title: "Monsoon Tree Plantation",
    date: "18th August",
    time: "9:00 AM",
    location: "Children's Play Area",
    description: "Plant a tree and make a difference! Open for all age groups. Each family will receive a sapling to plant and nurture. Creating a greener tomorrow starts today.",
    category: 'environmental',
    attendees: 67,
    maxAttendees: 80,
    isPopular: true,
    organizer: "Environment Club",
    rsvpStatus: 'attending'
  },
  {
    id: 4,
    title: "Summer Sports Tournament",
    date: "22nd August",
    time: "5:00 PM",
    location: "Community Sports Ground",
    description: "Annual sports tournament featuring badminton, table tennis, and swimming competitions. Prizes for winners and participation certificates for all.",
    category: 'sports',
    attendees: 45,
    maxAttendees: 60,
    isPopular: false,
    organizer: "Sports Committee"
  },
  {
    id: 5,
    title: "Classical Music Evening",
    date: "25th August",
    time: "7:00 PM",
    location: "Community Hall",
    description: "An enchanting evening of classical music featuring renowned artists from the city. Experience the beauty of traditional melodies in an intimate setting.",
    category: 'cultural',
    attendees: 78,
    maxAttendees: 120,
    isPopular: true,
    organizer: "Arts & Culture Society"
  }
];

export default function EventsPage() {
  const [events] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'celebration': return 'bg-red-100 text-red-800 border-red-200';
      case 'community': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'environmental': return 'bg-green-100 text-green-800 border-green-200';
      case 'sports': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cultural': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRSVPColor = (status?: string) => {
    switch (status) {
      case 'attending': return 'bg-green-500 text-white';
      case 'maybe': return 'bg-yellow-500 text-white';
      case 'not-attending': return 'bg-red-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getRSVPText = (status?: string) => {
    switch (status) {
      case 'attending': return 'Attending';
      case 'maybe': return 'Maybe';
      case 'not-attending': return 'Not Going';
      default: return 'RSVP';
    }
  };

  const getAttendancePercentage = (attendees: number, maxAttendees?: number) => {
    if (!maxAttendees) return 0;
    return Math.min((attendees / maxAttendees) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <Calendar className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Join local gatherings and activities in your society. Create memories and build connections with your neighbors.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/30 transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, locations, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none bg-white text-gray-800"
              >
                <option value="all">All Categories</option>
                <option value="celebration">Celebrations</option>
                <option value="community">Community</option>
                <option value="environmental">Environmental</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>

            {/* Add Event Button */}
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5 mr-2" />
              Add Event
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{filteredEvents.length}</p>
                <p className="text-gray-600 font-medium">Total Events</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {filteredEvents.filter(e => e.isPopular).length}
                </p>
                <p className="text-gray-600 font-medium">Popular Events</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {filteredEvents.filter(e => e.rsvpStatus === 'attending').length}
                </p>
                <p className="text-gray-600 font-medium">Attending</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredEvents.reduce((sum, event) => sum + event.attendees, 0)}
                </p>
                <p className="text-gray-600 font-medium">Total RSVPs</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {event.isPopular && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-red-400 text-white animate-pulse">
                            <Star className="w-3 h-3" />
                            POPULAR
                          </span>
                        )}
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                        {event.title}
                      </h2>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-3 mt-4 lg:mt-0">
                      <button className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${getRSVPColor(event.rsvpStatus)}`}>
                        {getRSVPText(event.rsvpStatus)}
                      </button>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">By {event.organizer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Attendance Bar */}
                  {event.maxAttendees && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium">Attendance</span>
                        <span>{event.attendees} / {event.maxAttendees} people</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${getAttendancePercentage(event.attendees, event.maxAttendees)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{event.attendees} attending</span>
                      </div>
                    </div>
                    
                    <button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}