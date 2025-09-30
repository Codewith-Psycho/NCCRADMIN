import { useState } from 'react';
import { FileText, Calendar, CheckCircle, XCircle, Clock, Eye, ArrowLeft } from 'lucide-react';
import DocumentViewer from '../Common/DocumentViewer';
import { Validation } from '../../types';

interface ValidationPageProps {
  validations: Validation[];
}

export default function ValidationPage({ validations }: ValidationPageProps) {
  const [selectedValidation, setSelectedValidation] = useState<Validation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (selectedValidation) {
    return (
      <ValidationDetailPage 
        validation={selectedValidation} 
        onBack={() => setSelectedValidation(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Validation Management</h1>
        <p className="text-gray-600">Review and approve project validation reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Account ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Start Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ACVA Assigned</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submission Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {validations.map((validation) => (
                <tr key={`${validation.projectId}-${validation.submissionDate}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{validation.projectId}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{validation.accountId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(validation.startDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nee-100 text-nee-800">
                      {validation.acvaId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(validation.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(validation.status)}`}>
                        {validation.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(validation.submissionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedValidation(validation)}
                      className="inline-flex items-center px-3 py-1.5 bg-nee-600 text-white text-sm font-medium rounded-lg hover:bg-nee-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ValidationDetailPage({ validation, onBack }: { validation: Validation; onBack: () => void }) {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [viewerOpen, setViewerOpen] = useState<{ title: string; content: string } | null>(null);

  const handleApprove = () => {
    console.log('Approving validation for project:', validation.projectId);
    // Here you would call the blockchain smart contract
    setDecision('approve');
  };

  const handleReject = () => {
    console.log('Rejecting validation for project:', validation.projectId);
    // Here you would call the blockchain smart contract
    setDecision('reject');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-nee-600 hover:text-nee-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Validations
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Validation Review: {validation.projectId}</h1>
        <p className="text-gray-600">Compare Project Design Document with Validation Report</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Project Design Document */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-500" />
            Project Design Document (PDD)
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Submitted by Account Holder</p>
              <p className="font-medium text-gray-800">{validation.pddDocument}</p>
                <button onClick={() => setViewerOpen({ title: `PDD - ${validation.projectId}`, content: validation.pddDocument })} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                View PDD
              </button>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Document Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600">Project ID:</span>
                  <span className="text-blue-800">{validation.projectId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Account ID:</span>
                  <span className="text-blue-800">{validation.accountId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Start Date:</span>
                  <span className="text-blue-800">{new Date(validation.startDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Report */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-nee-500" />
            Validation Report
          </h3>
          <div className="space-y-4">
            {validation.validationReport ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <CheckCircle className="w-12 h-12 text-nee-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Submitted by ACVA</p>
                <p className="font-medium text-gray-800">{validation.validationReport}</p>
                <button onClick={() => setViewerOpen({ title: `Validation Report - ${validation.projectId}`, content: validation.validationReport || 'No report' })} className="mt-4 inline-flex items-center px-4 py-2 bg-nee-600 text-white text-sm font-medium rounded-lg hover:bg-nee-700 transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  View Report
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-yellow-300 rounded-lg p-8 text-center">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-yellow-600 mb-2">Awaiting ACVA Submission</p>
                <p className="text-gray-600">Validation report not yet submitted</p>
              </div>
            )}
            <div className="bg-nee-50 rounded-lg p-4">
              <h4 className="font-medium text-nee-800 mb-2">ACVA Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-nee-600">ACVA ID:</span>
                  <span className="text-nee-800">{validation.acvaId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nee-600">Submission Date:</span>
                  <span className="text-nee-800">{new Date(validation.submissionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nee-600">Status:</span>
                  <span className={`font-medium ${
                    validation.status === 'Approved' ? 'text-green-600' :
                    validation.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {validation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Panel */}
      {validation.status === 'Pending' && validation.validationReport && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Validation Decision</h3>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <p>Review both documents and make a decision:</p>
              <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                <li>✅ Approve: Project is sanctioned and moves to verification cycle</li>
                <li>❌ Reject: Project rejected, account can re-upload corrected PDD</li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleReject}
                className="inline-flex items-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="inline-flex items-center px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </button>
            </div>
          </div>
          
          {decision && (
            <div className={`mt-4 p-4 rounded-lg ${
              decision === 'approve' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${decision === 'approve' ? 'text-green-800' : 'text-red-800'}`}>
                {decision === 'approve' 
                  ? '✅ Validation approved! Project sanctioned and logged on blockchain.' 
                  : '❌ Validation rejected! Account holder can re-submit corrected PDD.'
                }
              </p>
            </div>
          )}
          {viewerOpen && (
            <DocumentViewer title={viewerOpen.title} content={viewerOpen.content} open={true} onClose={() => setViewerOpen(null)} />
          )}
        </div>
      )}
    </div>
  );
}