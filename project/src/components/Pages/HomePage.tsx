import React from 'react';
import { TrendingUp, Leaf, Award, Shield, ArrowRight } from 'lucide-react';
import { DashboardStats } from '../../types';

interface HomePageProps {
  stats: DashboardStats;
  onNavigateToProjects: () => void;
}

export default function HomePage({ stats, onNavigateToProjects }: HomePageProps) {
  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Carbon Removed',
      value: `${stats.totalCarbonRemoved.toLocaleString()} tonnes`,
      icon: Leaf,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Credits Issued',
      value: stats.totalCreditsIssued.toLocaleString(),
      icon: Award,
      color: 'bg-nee-500',
      bgColor: 'bg-nee-50',
      textColor: 'text-nee-700'
    },
    {
      title: 'Buffer Credits',
      value: stats.totalBufferCredits.toLocaleString(),
      icon: Shield,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    }
  ];

  return (
  <div className="min-h-screen bg-gradient-to-br from-nee-50 via-nee-100 to-nee-200">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-6">
            <h1 className="text-5xl font-bold mb-6">NeeLedger</h1>
            <p className="text-xl mb-4 leading-relaxed">
              Leading the future of carbon credit management through innovative blockchain technology and AI-powered verification systems.
            </p>
            <p className="text-lg opacity-90 leading-relaxed">
              Empowering sustainable development by connecting project developers with verified carbon removal initiatives worldwide.
            </p>
            <p className="text-lg opacity-90 mt-2">
              Transparent, secure, and scientifically rigorous carbon credit solutions for a greener tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nee-900 mb-4">Platform Statistics</h2>
            <p className="text-nee-700 text-lg">Real-time insights into our carbon credit ecosystem</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  onClick={onNavigateToProjects}
                  className={`${stat.bgColor} rounded-xl p-6 border border-nee-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className={`w-5 h-5 ${stat.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <h3 className="text-nee-700 text-sm font-medium mb-2">{stat.title}</h3>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-nee-900 mb-6">Why Choose NeeLedger?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="bg-nee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-nee-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Blockchain Security</h4>
              <p className="text-gray-600">Immutable records and transparent transactions powered by smart contracts</p>
            </div>
            <div className="p-6">
              <div className="bg-nee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-nee-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Verified Credits</h4>
              <p className="text-gray-600">Rigorous validation and verification by accredited third-party agencies</p>
            </div>
            <div className="p-6">
              <div className="bg-nee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-nee-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Real Impact</h4>
              <p className="text-gray-600">Measurable carbon removal with satellite monitoring and AI verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
  <footer className="bg-nee-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-nee-200">
            <div>
              <p className="font-medium">Email</p>
              <p>spearsh29workin@gmail.com</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p>+91 8851958484</p>
            </div>
            <div>
              <p className="font-medium">Address</p>
              <p>Usar College, Delhi</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-nee-800">
            <p>&copy; 2024 NeeLedger (NCCR). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}