"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

// TypeScript interfaces
interface FeatureCard {
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

interface MockNotification {
  type: string;
  typeColor: string;
  borderColor: string;
  title: string;
  description: string;
  timeAgo: string;
}

interface NavLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: string[];
}

// Component data
const features: FeatureCard[] = [
  {
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    title: "Announcements",
    description: "Important community updates, maintenance schedules, and society notices in one place.",
    bgColor: "from-blue-50 to-blue-100",
    iconColor: "bg-blue-500",
    hasNotification: true
  },
  {
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "Local Events",
    description: "Community festivals, meetings, workshops, and social gatherings organized by residents.",
    bgColor: "from-purple-50 to-purple-100",
    iconColor: "bg-purple-500"
  },
  {
    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    title: "Buy/Sell/Rent",
    description: "Community marketplace for residents to buy, sell, or rent items within the society.",
    bgColor: "from-green-50 to-green-100",
    iconColor: "bg-green-500"
  },
  {
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    title: "Important Contacts",
    description: "Emergency numbers, maintenance contacts, and key community personnel information.",
    bgColor: "from-orange-50 to-orange-100",
    iconColor: "bg-orange-500"
  }
];

const stats: Stat[] = [
  { value: "500+", label: "Active Residents" },
  { value: "1.2K", label: "Monthly Posts" },
  { value: "24/7", label: "Always Updated" }
];

const mockNotifications: MockNotification[] = [
  {
    type: "ANNOUNCEMENT",
    typeColor: "text-blue-600",
    borderColor: "border-blue-500",
    title: "Water Supply Maintenance",
    description: "Scheduled maintenance on Sunday, 8 AM - 12 PM",
    timeAgo: "2 hours ago"
  },
  {
    type: "EVENT",
    typeColor: "text-purple-600",
    borderColor: "border-purple-500",
    title: "Community Yoga Session",
    description: "Join us for morning yoga in the common area",
    timeAgo: "1 day ago"
  },
  {
    type: "FOR SALE",
    typeColor: "text-green-600",
    borderColor: "border-green-500",
    title: "Furniture Set - Like New",
    description: "Moving out sale - Contact Apt 304",
    timeAgo: "3 days ago"
  }
];

const footerSections: FooterSection[] = [
  {
    title: "Features",
    links: ["Announcements", "Events Calendar", "Community Marketplace", "Contact Directory"]
  },
  {
    title: "Support",
    links: ["Help Center", "Admin Guide", "Community Guidelines", "Contact Support"]
  }
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
  feature: FeatureCard;
}

const FeatureCardComponent: React.FC<FeatureCardProps> = ({ feature }) => (
  <div className={`card-hover bg-gradient-to-br ${feature.bgColor} p-8 rounded-2xl`}>
    <div className={`w-14 h-14 ${feature.iconColor} rounded-xl flex items-center justify-center mb-6 ${feature.hasNotification ? 'notification-dot' : ''}`}>
      <Icon path={feature.icon} className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
    <p className="text-gray-600">{feature.description}</p>
  </div>
);

// Stat Component
interface StatProps {
  stat: Stat;
}

const StatComponent: React.FC<StatProps> = ({ stat }) => (
  <div className="glass-effect p-6 rounded-2xl">
    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
    <div className="text-purple-200">{stat.label}</div>
  </div>
);

// Notification Component
interface NotificationProps {
  notification: MockNotification;
}

const NotificationComponent: React.FC<NotificationProps> = ({ notification }) => (
  <div className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${notification.borderColor}`}>
    <div className="flex items-center justify-between mb-2">
      <span className={`text-sm font-semibold ${notification.typeColor}`}>{notification.type}</span>
      <span className="text-xs text-gray-500">{notification.timeAgo}</span>
    </div>
    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
    <p className="text-sm text-gray-600">{notification.description}</p>
  </div>
);

// Main Landing Page Component
const LandingPage: NextPage = () => {
  const [headerBg, setHeaderBg] = useState<string>("rgba(255, 255, 255, 0.1)");

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setHeaderBg("rgba(102, 126, 234, 0.95)");
      } else {
        setHeaderBg("rgba(255, 255, 255, 0.1)");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string): void => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <Head>
        <title>NoticeNest - Digital Community Board</title>
        <meta name="description" content="Stay connected, informed, and engaged with NoticeNest - the modern digital notice board for your residential community." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
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
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: -3s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        .pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .notification-dot {
          position: relative;
        }
        
        .notification-dot::after {
          content: '';
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect transition-all duration-300" style={{ background: headerBg }}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Icon path="M15 17h5l-5 5v-5zM9 7H4l5-5v5zM12 8v8m-4-4h8" />
            </div>
            <span className="text-xl font-bold text-white">NoticeNest</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/announcements"
              className="text-yellow-300 font-semibold text-lg hover:text-yellow-400 transition-colors"
            >
              Announcements
            </a>
            <a
              href="/events"
              className="text-yellow-300 font-semibold text-lg hover:text-yellow-400 transition-colors"
            >
              Events
            </a>
            <a
              href="/marketplace"
              className="text-yellow-300 font-semibold text-lg hover:text-yellow-400 transition-colors"
            >
              Marketplace
            </a>
            <a
              href="#community"
              className="text-yellow-300 font-semibold text-lg hover:text-yellow-400 transition-colors"
            >
              About
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen gradient-bg hero-pattern flex items-center justify-center overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full floating"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full floating-delayed"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white bg-opacity-10 rounded-full floating"></div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Community&apos;s
              <span className="block text-yellow-300">Digital Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Stay connected, informed, and engaged with NoticeNest - the modern digital notice board for your residential community.
            </p>
          </div>
          
          <div className="fade-in-delayed flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg">
              Explore Community Board
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Learn More
            </button>
          </div>
          
          {/* Stats */}
          <div className="fade-in-delayed-2 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StatComponent key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything Your Community Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamlined communication and organization tools designed specifically for residential communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCardComponent key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section id="community" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for <span className="text-gradient">Modern Communities</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, secure, and effective digital communication</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
                    <p className="text-gray-600">Only authorized community members can access and post content, ensuring privacy and security.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon path="M13 10V3L4 14h7v7l9-11h-7z" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">Instant updates and notifications keep everyone informed in real-time across all devices.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon path="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Manage</h3>
                    <p className="text-gray-600">Simple admin controls make it easy for community leaders to moderate and organize content.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-effect p-8 rounded-3xl">
                <div className="space-y-6">
                  {mockNotifications.map((notification, index) => (
                    <NotificationComponent key={index} notification={notification} />
                  ))}
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold text-sm pulse-slow">
                Live Updates!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect Your Community?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of residents already using NoticeNest to stay informed and engaged.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
              onClick={() => signIn("google", { callbackUrl: "/home" })}
            >
              Get Started Today
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Icon path="M15 17h5l-5 5v-5zM9 7H4l5-5v5zM12 8v8m-4-4h8" />
                </div>
                <span className="text-xl font-bold">NoticeNest</span>
              </div>
              <p className="text-gray-400">Connecting communities through digital innovation.</p>
            </div>
            
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div id="contact">
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 hello@noticenest.com</p>
                <p>📞 +91 98765 43210</p>
                <p>📍 Your Local Community</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NoticeNest. Built with ❤️ for communities everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;