"use client";
import React, { useState, useEffect } from "react";
import { Bell, Calendar, Clock, Search, Filter, Star, AlertCircle, CheckCircle, Info } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  category: 'maintenance' | 'safety' | 'general' | 'event';
  isNew: boolean;
  author: string;
  readCount: number;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Emergency Water Supply Maintenance",
    description: "Water supply will be interrupted on Sunday from 8 AM to 12 PM due to emergency maintenance work on the main pipeline. Please store water in advance. Alternative water tanker will be arranged if needed.",
    date: "2025-08-05",
    priority: 'high',
    category: 'maintenance',
    isNew: true,
    author: 'Maintenance Team',
    readCount: 45
  },
  {
    id: 2,
    title: "Mandatory Fire Safety Drill",
    description: "A comprehensive fire safety drill will be conducted on Monday at 10 AM. All residents must participate. Fire exits will be tested and evacuation procedures will be practiced.",
    date: "2025-08-03",
    priority: 'high',
    category: 'safety',
    isNew: true,
    author: 'Safety Committee',
    readCount: 67
  },
  {
    id: 3,
    title: "New Security Agency Transition",
    description: "A new security agency 'SecureGuard Solutions' will take over from next week. Please cooperate during the transition period and update your visitor passes accordingly.",
    date: "2025-08-01",
    priority: 'medium',
    category: 'general',
    isNew: false,
    author: 'Management',
    readCount: 89
  },
  {
    id: 4,
    title: "Community Diwali Celebration 2024",
    description: "Join us for the annual Diwali celebration in the community hall on November 12th at 7 PM. Cultural performances, dinner, and fireworks display planned. Registration required.",
    date: "2025-07-28",
    priority: 'low',
    category: 'event',
    isNew: false,
    author: 'Cultural Committee',
    readCount: 156
  },
  {
    id: 5,
    title: "Parking Rules Update",
    description: "New parking guidelines are now in effect. Visitor parking is limited to 4 hours. Long-term violations will result in towing. Please display parking permits clearly.",
    date: "2025-07-25",
    priority: 'medium',
    category: 'general',
    isNew: false,
    author: 'Parking Committee',
    readCount: 234
  }
];

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = announcements;

    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(announcement => announcement.category === selectedCategory);
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter(announcement => announcement.priority === selectedPriority);
    }

    setFilteredAnnouncements(filtered);
  }, [searchTerm, selectedCategory, selectedPriority, announcements]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-400 bg-green-50 text-green-800';
      default: return 'border-blue-400 bg-blue-50 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'safety': return 'bg-red-100 text-red-800 border-red-200';
      case 'general': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Bell className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Community Announcements
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and important information from your community
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/20 transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                <option value="maintenance">Maintenance</option>
                <option value="safety">Safety</option>
                <option value="general">General</option>
                <option value="event">Events</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{filteredAnnouncements.length}</p>
                <p className="text-gray-600">Total Announcements</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {filteredAnnouncements.filter(a => a.priority === 'high').length}
                </p>
                <p className="text-gray-600">High Priority</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {filteredAnnouncements.filter(a => a.isNew).length}
                </p>
                <p className="text-gray-600">New This Week</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No announcements found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {announcement.isNew && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-pulse">
                            NEW
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                          {getPriorityIcon(announcement.priority)}
                          {announcement.priority.toUpperCase()}
                        </span>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(announcement.category)}`}>
                          {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {announcement.title}
                      </h2>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(announcement.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          By {announcement.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          {announcement.readCount} views
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {announcement.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <button className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200">
                        <Star className="w-4 h-4 mr-2" />
                        Mark Important
                      </button>
                      <button className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200">
                        Share
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Posted {formatDate(announcement.date)}
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
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
};

export default AnnouncementsPage;