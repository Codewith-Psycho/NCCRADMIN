import { useState } from 'react';
import { Shield, MapPin, Phone, Mail, FileText, Eye, CheckCircle, XCircle, Pause } from 'lucide-react';

// Move helpers to module scope so multiple components can use them
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Suspended':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'Pending':
      return <Shield className="w-4 h-4 text-yellow-500" />;
    case 'Suspended':
      return <Pause className="w-4 h-4 text-red-500" />;
    default:
      return <XCircle className="w-4 h-4 text-gray-400" />;
  }
};
import DocumentViewer from '../Common/DocumentViewer';
import { ACVA } from '../../types';

interface ACVAPageProps {
  acvas: ACVA[];
}

export default function ACVAPage({ acvas }: ACVAPageProps) {
  const [selectedACVA, setSelectedACVA] = useState<ACVA | null>(null);
  const [viewer, setViewer] = useState<{ title: string; content: string } | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending':
        return <Shield className="w-4 h-4 text-yellow-500" />;
      case 'Suspended':
        return <Pause className="w-4 h-4 text-red-500" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (selectedACVA) {
    return (
      <ACVADetailPage 
        acva={selectedACVA} 
        onBack={() => setSelectedACVA(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ACVA Management</h1>
        <p className="text-gray-600">Manage Accredited Carbon Validation Agencies</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ACVA ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Agency Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Country/Region</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Projects Assigned</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {acvas.map((acva) => (
                <tr key={acva.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{acva.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-nee-500 mr-2" />
                      <span className="font-medium text-gray-800">{acva.agencyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      {acva.country}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {acva.projectsAssigned.length} projects
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(acva.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(acva.status)}`}>
                        {acva.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {acva.contactInfo.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {acva.contactInfo.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setViewer({ title: `ACVA - ${acva.agencyName}`, content: formatACVADetails(acva) })}
                      className="inline-flex items-center px-3 py-1.5 bg-nee-600 text-white text-sm font-medium rounded-lg hover:bg-nee-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {viewer && (
        <DocumentViewer title={viewer.title} content={viewer.content} open={true} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}

function ACVADetailPage({ acva, onBack }: { acva: ACVA; onBack: () => void }) {
  const [acvaStatus, setACVAStatus] = useState(acva.status);
  const [viewer, setViewer] = useState<{ title: string; content: string } | null>(null);

  const handleStatusChange = (newStatus: 'Active' | 'Suspended') => {
    setACVAStatus(newStatus);
    console.log(`ACVA ${acva.id} status changed to ${newStatus}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-nee-600 hover:text-nee-700 mb-4"
        >
          ← Back to ACVA List
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ACVA Details: {acva.agencyName}</h1>
        <p className="text-gray-600">Comprehensive ACVA profile and management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Agency Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">ACVA ID</p>
                <p className="font-medium text-gray-800">{acva.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Agency Name</p>
                <p className="font-medium text-gray-800">{acva.agencyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country/Region</p>
                <p className="font-medium text-gray-800">{acva.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Projects Assigned</p>
                <p className="font-medium text-gray-800">{acva.projectsAssigned.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">{acva.contactInfo.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">{acva.contactInfo.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Accreditation Documents</h3>
            <div className="space-y-3">
              {acva.accreditationDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-800">{doc}</span>
                  </div>
                  <button onClick={() => setViewer({ title: `Document - ${doc}`, content: doc })} className="text-nee-600 hover:text-nee-700 text-sm font-medium">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Projects</h3>
            <div className="space-y-2">
              {acva.projectsAssigned.map((projectId, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">{projectId}</span>
                  <button onClick={() => { window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'projects' })); alert(`Navigated to Projects - project id: ${projectId}`); }} className="text-nee-600 hover:text-nee-700 text-sm font-medium">
                    View Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Management */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Management</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                <div className="flex items-center">
                  {getStatusIcon(acvaStatus)}
                  <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(acvaStatus)}`}>
                    {acvaStatus}
                  </span>
                </div>
              </div>
              
              {acvaStatus === 'Active' && (
                <button
                  onClick={() => handleStatusChange('Suspended')}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Suspend ACVA
                </button>
              )}
              
              {acvaStatus === 'Suspended' && (
                <button
                  onClick={() => handleStatusChange('Active')}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate ACVA
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Validations Completed</span>
                <span className="font-medium text-gray-800">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verifications Completed</span>
                <span className="font-medium text-gray-800">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Response Time</span>
                <span className="font-medium text-gray-800">3.2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-green-600">96.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewer && (
        <DocumentViewer title={viewer.title} content={viewer.content} open={true} onClose={() => setViewer(null)} />
      )}
      {/* Global ACVA viewer for list */}
      {/* The list-level viewer is inserted by the parent component via state; keep fallback here */}
    </div>
  );
}

// Helper to create an HTML-ish content block for the DocumentViewer
function formatACVADetails(acva: ACVA) {
  return `ACVA ID: ${acva.id}\nAgency: ${acva.agencyName}\nCountry: ${acva.country}\n\nContact:\n  Email: ${acva.contactInfo.email}\n  Phone: ${acva.contactInfo.phone}\n\nAccreditation Documents:\n${acva.accreditationDocs.map((d)=>' - '+d).join('\n')}\n\nProjects Assigned:\n${acva.projectsAssigned.join('\n')}`;
}