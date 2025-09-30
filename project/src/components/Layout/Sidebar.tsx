import React from 'react';
import { 
  Home, 
  FolderOpen, 
  UserCheck, 
  Shield, 
  CheckCircle, 
  Verified,
  Brain,
  ChevronRight,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed?: boolean;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'satellites', label: 'Satellites', icon: MapPin },
  { id: 'map', label: 'Map', icon: MapPin },
  { id: 'kyc', label: 'Account KYC', icon: UserCheck },
  { id: 'acva', label: 'ACVA', icon: Shield },
  { id: 'validation', label: 'Validation', icon: CheckCircle },
  { id: 'verification', label: 'Verification', icon: Verified },
  { id: 'xai', label: 'XAI', icon: Brain }
];

export default function Sidebar({ activeSection, onSectionChange, collapsed = false }: SidebarProps) {
  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-nee-900 to-nee-800 text-white h-screen fixed left-0 top-0 shadow-2xl transition-all duration-300 transform z-40`}>
      <div className={`p-4 ${collapsed ? 'flex flex-col items-center' : 'p-6 flex items-center space-x-3 border-b border-nee-700'}`}>
        <img src="/logo.jpg" alt="NeeLedger" className={`${collapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-md object-cover shadow-sm`} />
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-nee-100">NeeLedger</h1>
            <p className="text-nee-300 text-sm mt-1">NCCR Admin Dashboard</p>
          </div>
        )}
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center py-4' : 'px-6 py-4 text-left'} transition-all duration-300 group ${
                isActive 
                        ? 'bg-nee-700 border-r-4 border-nee-400 text-white' 
                        : 'text-nee-200 hover:bg-nee-800 hover:text-white'
              }`}
              title={item.label}
            >
              <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} ${isActive ? 'text-nee-300' : 'text-nee-400'}`} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {isActive && !collapsed && (
                      <ChevronRight className="w-4 h-4 ml-auto text-nee-300" />
              )}
            </button>
          );
        })}
      </nav>
      
      {!collapsed && (
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-nee-800 rounded-lg p-4 border border-nee-700">
            <p className="text-nee-300 text-xs">Carbon Credit Management</p>
            <p className="text-white text-sm font-semibold mt-1">Admin Portal v2.0</p>
          </div>
        </div>
      )}
    </div>
  );
}