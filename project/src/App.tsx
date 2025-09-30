import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import SatellitesPage from './components/Pages/SatellitesPage';
import {
  mockStats,
  mockProjects,
  mockAccounts,
  mockACVAs,
  mockValidations,
  mockVerifications
} from './data/mockData';
import { Verification, Project } from './types';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('projects');

  // Add state to hold selected project for details page
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync activeSection with current path
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/projects')) {
      setActiveSection('projects');
    } else if (path.startsWith('/satellites')) {
      setActiveSection('satellites');
    } else if (path.startsWith('/map')) {
      setActiveSection('map');
    } else if (path.startsWith('/kyc')) {
      setActiveSection('kyc');
    } else if (path.startsWith('/acva')) {
      setActiveSection('acva');
    } else if (path.startsWith('/validation')) {
      setActiveSection('validation');
    } else if (path.startsWith('/verification')) {
      setActiveSection('verification');
    } else if (path.startsWith('/xai')) {
      setActiveSection('xai');
    } else if (path.startsWith('/settings')) {
      setActiveSection('settings');
    } else if (path === '/' || path === '/home') {
      setActiveSection('home');
    }
  }, [location]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications);
  const [view, setView] = useState<'verification' | 'approved'>('verification');
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);

  // Handler to select project and navigate to details page
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveSection('projectDetails');
  };

  // Handler to go back to projects list
  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveSection('projects');
  };

  const handleUpdateVerification = (updatedVerifications: Verification[]) => {
    setVerifications(updatedVerifications);
  };

  const handleReview = (verification: Verification) => {
    setSelectedVerification(verification);
    setView('verification');
  };

  return (
    <div className="min-h-screen bg-nee-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} collapsed={isSidebarCollapsed} />
      {!isSidebarCollapsed && (
        <div onClick={() => setIsSidebarCollapsed(true)} className="fixed inset-0 bg-black/20 z-30 md:hidden" />
      )}
      <div className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {activeSection !== 'home' && (
          <Header
            onToggleSidebar={() => setIsSidebarCollapsed((s) => !s)}
            collapsed={isSidebarCollapsed}
            onNavigate={(s) => setActiveSection(s)}
          />
        )}
        <main className={activeSection === 'home' ? '' : 'pt-0'}>
          <div className="w-full px-6">
            <Routes>
              <Route path="/" element={<HomePage stats={mockStats} onNavigateToProjects={() => setActiveSection('projects')} />} />
              <Route path="/projects" element={<ProjectsPage projects={mockProjects} onSelectProject={handleSelectProject} />} />
              <Route path="/projects/:projectId" element={<ProjectDetailsPage project={selectedProject!} onBack={handleBackToProjects} />} />
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
              <Route path="/satellites" element={<SatellitesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/projectDetails" element={<ProjectDetailsPage project={selectedProject!} onBack={handleBackToProjects} />} />
            </Routes>
            {activeSection === 'verification' && (
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