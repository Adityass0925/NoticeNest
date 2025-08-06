"use client";
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MapPin, Clock, Star, Heart, MessageCircle, Phone, Mail } from 'lucide-react';

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Items', color: 'bg-purple-100 text-purple-700' },
    { id: 'sell', name: 'For Sale', color: 'bg-green-100 text-green-700' },
    { id: 'rent', name: 'For Rent', color: 'bg-blue-100 text-blue-700' },
    { id: 'services', name: 'Services', color: 'bg-orange-100 text-orange-700' },
    { id: 'wanted', name: 'Wanted', color: 'bg-pink-100 text-pink-700' }
  ];

  const listings = [
    {
      id: 1,
      title: "Mountain Bike - Excellent Condition",
      price: "₹2,000",
      type: "sell",
      seller: "Rahul Kumar",
      location: "Flat 102, A Block",
      contact: { phone: "+91 98765 43210", email: "rahul.k@email.com" },
      description: "Well-maintained mountain bike, perfect for city rides. Recently serviced.",
      posted: "2 hours ago",
      rating: 4.8,
      image: "🚴‍♂️"
    },
    {
      id: 2,
      title: "Looking for 1BHK Apartment",
      price: "₹8,000-12,000/month",
      type: "rent",
      seller: "Meera Sharma",
      location: "Tower B",
      contact: { phone: "+91 87654 32109", email: "meera.sharma@email.com" },
      description: "Young professional seeking furnished 1BHK within the society.",
      posted: "5 hours ago",
      rating: 4.9,
      image: "🏠"
    },
    {
      id: 3,
      title: "Home Tutoring Services",
      price: "₹500/hour",
      type: "services",
      seller: "Dr. Priya Patel",
      location: "Flat 205, C Block",
      contact: { phone: "+91 76543 21098", email: "priya.patel@email.com" },
      description: "Mathematics and Science tutoring for classes 8-12. 10+ years experience.",
      posted: "1 day ago",
      rating: 5.0,
      image: "📚"
    },
    {
      id: 4,
      title: "Sofa Set - 3+2 Seater",
      price: "₹15,000",
      type: "sell",
      seller: "Amit Gupta",
      location: "Flat 308, A Block",
      contact: { phone: "+91 65432 10987", email: "amit.g@email.com" },
      description: "Comfortable sofa set in great condition. Moving sale.",
      posted: "3 days ago",
      rating: 4.7,
      image: "🛋️"
    },
    {
      id: 5,
      title: "Car Washing Service",
      price: "₹200 per wash",
      type: "services",
      seller: "Ravi Singh",
      location: "Ground Floor",
      contact: { phone: "+91 54321 09876", email: "ravi.singh@email.com" },
      description: "Professional car cleaning service at your doorstep.",
      posted: "1 week ago",
      rating: 4.6,
      image: "🚗"
    },
    {
      id: 6,
      title: "Looking for Baby Stroller",
      price: "Up to ₹3,000",
      type: "wanted",
      seller: "Neha Agarwal",
      location: "Flat 401, B Block",
      contact: { phone: "+91 43210 98765", email: "neha.agarwal@email.com" },
      description: "Need a good condition baby stroller for 6-month-old.",
      posted: "4 days ago",
      rating: 4.8,
      image: "👶"
    }
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (type: string) => {
    const category = categories.find(cat => cat.id === type);
    return category ? category.color : 'bg-gray-100 text-gray-700';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-white shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Community Marketplace
            </h1>
            <p className="text-xl text-purple-100 mb-8 animate-fade-in-delay">
              Buy, sell, rent, and connect with your neighbors
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-slide-up">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for items, services, or needs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-xl focus:ring-4 focus:ring-purple-200 focus:outline-none transition-all duration-300 hover:shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-float-delay"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-white opacity-10 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-up-delay">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                selectedCategory === category.id
                  ? `${category.color} shadow-lg transform scale-105`
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 animate-slide-up-delay-2">
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Plus className="w-5 h-5" />
            Post New Listing
          </button>
          <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 hover:scale-105">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing, index) => (
            <div
              key={listing.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-card-appear"
              style={isClient ? { animationDelay: `${index * 100}ms` } : {}}
            >
              {/* Card Header */}
              <div className="relative p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl bg-gradient-to-br from-purple-100 to-blue-100 p-3 rounded-xl">
                      {listing.image}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(listing.type)}`}>
                        {categories.find(cat => cat.id === listing.type)?.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-200 ${
                        favorites.has(listing.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                  {listing.title}
                </h2>
                
                <p className="text-2xl font-bold text-green-600 mb-3">
                  {listing.price}
                </p>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {listing.description}
                </p>

                {/* Seller Info */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {listing.seller.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{listing.seller}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {listing.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{listing.rating}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {listing.posted}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 hover:scale-110">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 hover:scale-110">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200 hover:scale-110">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes card-appear {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.3s both;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.5s both;
        }
        
        .animate-card-appear {
          animation: card-appear 0.6s ease-out both;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}