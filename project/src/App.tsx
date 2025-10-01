import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import HomePage from './components/Pages/HomePage';
import ProjectsPage from './components/Pages/ProjectsPage';
import ProjectDetailsPage from './components/Pages/ProjectDetailsPage';
import KYCPage from './components/Pages/KYCPage';
import ACVAPage from './components/Pages/ACVAPage';
import ValidationPage from './components/Pages/ValidationPage';
import VerificationPage from './components/Pages/VerificationPage';
import ApprovedVerificationsPage from './components/Pages/ApprovedVerificationsPage';
import XAIPage from './components/Pages/XAIPage';
import MapPage from './components/Pages/MapPage';
import SettingsPage from './components/Pages/SettingsPage';
import DocumentsPage from './components/Pages/DocumentsPage';
import GlobalPDFLinkInterceptor from './components/Common/GlobalPDFLinkInterceptor';
import {
  mockStats,
  mockProjects,
  mockAccounts,
  mockACVAs,
  mockValidations,
  mockVerifications
} from './data/mockData';
import { Verification } from './types';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications);
  const [view, setView] = useState<'verification' | 'approved'>('verification');

  const handleUpdateVerification = (updatedVerifications: Verification[]) => {
    setVerifications(updatedVerifications);
  };

  const handleReview = (verification: Verification) => {
    console.log("Reviewing:", verification);
    setView('verification');
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // Handler for sidebar navigation change
  const handleSectionChange = (section: string) => {
    navigate(section === 'home' ? '/' : `/${section}`);
  };

  return (
    <div className="min-h-screen bg-nee-50">
      <GlobalPDFLinkInterceptor />
      <Sidebar collapsed={isSidebarCollapsed} activeSection={location.pathname.substring(1) || 'home'} onSectionChange={handleSectionChange} />
      {!isSidebarCollapsed && (
        <div onClick={() => setIsSidebarCollapsed(true)} className="fixed inset-0 bg-black/20 z-30 md:hidden" />
      )}
      <div className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {!isHomePage && (
          <Header
            onToggleSidebar={() => setIsSidebarCollapsed((s) => !s)}
            collapsed={isSidebarCollapsed}
          />
        )}
        <main className={isHomePage ? '' : 'pt-0'}>
          <div className="w-full px-6">
            <Routes>
              <Route path="/" element={<HomePage stats={mockStats} onNavigateToProjects={() => navigate('/projects')} />} />
              <Route path="/home" element={<HomePage stats={mockStats} onNavigateToProjects={() => navigate('/projects')} />} />
              <Route path="/projects" element={<ProjectsPage projects={mockProjects} onSelectProject={() => {}} />} />
              <Route path="/projects/:projectId" element={<ProjectDetailsPage onBack={() => window.history.back()} />} />
              <Route path="/kyc" element={<KYCPage accounts={mockAccounts} />} />
              <Route path="/acva" element={<ACVAPage acvas={mockACVAs} />} />
              <Route path="/validation" element={<ValidationPage validations={mockValidations} />} />
              <Route path="/verification" element={
                view === 'verification' ? (
                  <VerificationPage verifications={verifications} onUpdateVerification={handleUpdateVerification} />
                ) : (
                  <ApprovedVerificationsPage verifications={verifications} onReview={handleReview} />
                )
              } />
              <Route path="/xai" element={<XAIPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              {/* PDF demo route removed from main navigation */}
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            {location.pathname.startsWith('/verification') && (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setView('verification')}
                  className={`px-4 py-2 rounded ${view === 'verification' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Verification Management
                </button>
                <button
                  onClick={() => setView('approved')}
                  className={`px-4 py-2 rounded ${view === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Approved Verifications
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppWrapper;
