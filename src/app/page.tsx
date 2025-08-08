"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// TypeScript interfaces
interface Feature {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  hasNotification?: boolean;
}

interface Stat {
  value: string;
  label: string;
}

interface LoginFormData {
  communityCode?: string;
  apartmentNumber?: string;
  email?: string;
  password: string;
}

// Component data
const features: Feature[] = [
  {
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    title: "Announcements",
    description: "Important community updates and notices",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    hasNotification: true
  },
  {
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "Events",
    description: "Community gatherings and activities",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    title: "Buy/Sell/Rent",
    description: "Community marketplace for residents",
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    title: "Contacts",
    description: "Important community contacts",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  }
];

const stats: Stat[] = [
  { value: "24/7", label: "Always Updated" },
  { value: "Secure", label: "Community Only" },
  { value: "Easy", label: "Simple to Use" }
];

// SVG Icon Component
interface IconProps {
  path: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ path, className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
  </svg>
);

// Feature Card Component
interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => (
  <div className="text-center p-6 hover-lift">
    <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 relative`}>
      <Icon path={feature.icon} className={`w-8 h-8 ${feature.iconColor}`} />
      {feature.hasNotification && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full pulse-dot"></div>
      )}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
    <p className="text-gray-600 text-sm">{feature.description}</p>
  </div>
);

// Stat Component
interface StatProps {
  stat: Stat;
}

const StatComponent: React.FC<StatProps> = ({ stat }) => (
  <div className="glass-effect p-6 rounded-2xl hover-lift">
    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
    <div className="text-purple-200">{stat.label}</div>
  </div>
);

// Login Modal Component
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'user' | 'admin';
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    communityCode: '',
    apartmentNumber: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${type} login:`, formData);
    // Handle login logic here
    onClose();
    router.push("/home"); // Redirect after admin login
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isAdmin = type === 'admin';

  return (
    <div 
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center min-h-screen px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md scale-in">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${isAdmin ? 'bg-purple-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon 
                path={isAdmin 
                  ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  : "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                }
                className={`w-8 h-8 ${isAdmin ? 'text-purple-600' : 'text-blue-600'}`}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isAdmin ? 'Admin Access' : 'Welcome Resident'}
            </h2>
            <p className="text-gray-600">
              {isAdmin ? 'Manage your community board' : 'Sign in to your community board'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isAdmin && (
              <>
                <input
                  type="text"
                  name="communityCode"
                  placeholder="Community Code"
                  value={formData.communityCode || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
                <input
                  type="text"
                  name="apartmentNumber"
                  placeholder="Apartment/House Number"
                  value={formData.apartmentNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </>
            )}
            
            {isAdmin && (
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            )}
            
            <input
              type="password"
              name="password"
              placeholder={isAdmin ? "Admin Password" : "Password"}
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 ${isAdmin ? 'focus:ring-purple-500' : 'focus:ring-blue-500'} focus:border-transparent outline-none`}
              required
            />
            
            <button
              type="submit"
              className={`w-full ${isAdmin ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-semibold transition-colors`}
            >
              {isAdmin ? 'Access Admin Panel' : 'Sign In'}
            </button>
            
            <div className="text-center">
              <a href="#" className={`${isAdmin ? 'text-purple-600' : 'text-blue-600'} text-sm hover:underline`}>
                {isAdmin ? 'Forgot password?' : 'Need access? Contact your admin'}
              </a>
            </div>
          </form>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full text-gray-600 py-2 font-medium hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage: NextPage = () => {
  const router = useRouter();
  const [headerBg, setHeaderBg] = useState<string>("rgba(255, 255, 255, 0.1)");
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setHeaderBg("rgba(102, 126, 234, 0.95)");
      } else {
        setHeaderBg("rgba(255, 255, 255, 0.1)");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Head>
        <title>NoticeNest - Your Digital Community Board</title>
        <meta name="description" content="Stay connected with your neighbors through announcements, events, and community updates - all in one place." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .fade-in-delayed {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
        }
        
        .fade-in-delayed-2 {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .floating {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .modal-backdrop {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
        }
        
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect transition-all duration-300" style={{ background: headerBg }}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Icon path="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </div>
            <span className="text-xl font-bold text-white">NoticeNest</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push("/auth/login")}
              className="text-white hover:text-purple-200 transition-colors px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              User Login
            </button>
            <button
              onClick={() => setAdminModalOpen(true)}
              className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-all hover:scale-105"
            >
              Admin Login
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen gradient-bg flex items-center justify-center">
        {/* Background Decoration */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full floating"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full floating" style={{ animationDelay: '-2s' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Community&apos;s
              <span className="block text-yellow-300">Digital Notice Board</span>
            </h1>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Stay connected with your neighbors through announcements, events, and community updates - all in one place.
            </p>
          </div>
          
          <div className="fade-in-delayed flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setUserModalOpen(true)}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-xl"
            >
              Join Your Community
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Learn More
            </button>
          </div>
          
          {/* Simple Stats */}
          <div className="fade-in-delayed-2 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <StatComponent key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything Your Community Needs</h2>
            <p className="text-xl text-gray-600">Simple tools to keep everyone connected and informed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Icon path="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </div>
            <span className="text-2xl font-bold">NoticeNest</span>
          </div>
          <p className="text-gray-400 mb-6">Connecting communities, one notice at a time.</p>
          <p className="text-gray-500 text-sm">&copy; 2024 NoticeNest. Made with ❤️ for communities.</p>
        </div>
      </footer>

      {/* Login Modals */}
      <LoginModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        type="user"
      />
      
      <LoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        type="admin"
      />
    </div>
  );
};

export default LandingPage;