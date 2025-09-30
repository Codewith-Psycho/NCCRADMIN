import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import MapPage from './MapPage';
import DocumentViewer from '../Common/DocumentViewer';
import { Project } from '../../types';

interface ProjectDetailsPageProps {
  project?: Project;
  onBack: () => void;
}

export default function ProjectDetailsPage({ project, onBack }: ProjectDetailsPageProps) {
  const [docViewer, setDocViewer] = useState<{ title: string; content: string } | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">No project selected.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nee-50 via-nee-100 to-nee-200">
      <div className="bg-nee-50 border-b border-nee-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className="flex items-center text-nee-600 hover:text-nee-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-nee-900">Project Details - {project.id}</h1>
          <p className="text-nee-700 mt-1">Detailed information about the carbon credit project</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-6">
          <div className="w-full h-auto min-h-[24rem]">
            {/* Embed MapPage with project region centered */}
            <MapPage />
          </div>
          <div className="w-full overflow-visible max-h-full">
            <h3 className="text-lg font-semibold mb-2 break-words">Project Metadata</h3>
            <div className="text-sm text-gray-700 space-y-1 break-words">
              <div><strong>Project ID:</strong> {project.id}</div>
              <div><strong>Account ID:</strong> {project.accountId}</div>
              <div><strong>Country:</strong> {project.country}</div>
              <div><strong>Time of Registration:</strong> {project.startDate || 'N/A'}</div>
              <div><strong>Number of Cycles:</strong> {project.timeline.length || 'N/A'}</div>
              {/* Add more metadata fields as needed */}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 break-words">Description</h3>
          <div className="text-sm text-gray-700 break-words">
            <div><strong>Ownership:</strong> {project.metadata.ownership}</div>
            <div><strong>Methodology:</strong> {project.metadata.methodology}</div>
            <div><strong>Area:</strong> {project.metadata.area} hectares</div>
            <div><strong>Credits Issued in Verifications:</strong></div>
            <ul className="list-disc list-inside ml-4">
              {project.timeline
                .filter(t => t.creditsIssued && t.creditsIssued > 0)
                .map((t, idx) => (
                  <li key={idx}>{t.event}: {t.creditsIssued} credits</li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 break-words">Timeline</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 max-h-[20rem] overflow-auto break-words">
            {project.timeline && project.timeline.length > 0 ? (
              project.timeline.map((event, idx) => (
                <li key={idx} className="break-words">
                  <strong>{event.date}:</strong> {event.event}
                </li>
              ))
            ) : (
              <li>No timeline data available.</li>
            )}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 break-words">Documents</h3>
          <div className="space-y-2 max-h-[24rem] overflow-auto break-words">
            {project.metadata.documentation && project.metadata.documentation.length > 0 ? (
              project.metadata.documentation.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 break-words"
                  onClick={() => setDocViewer({ title: `${project.id} • ${doc}`, content: doc })}>
                  <span className="text-sm text-blue-600 underline break-words">{doc}</span>
                  <button onClick={(e) => { e.stopPropagation(); setDocViewer({ title: `${project.id} • ${doc}`, content: doc }); }} className="text-sm text-blue-700 hover:text-blue-900">View</button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 break-words">No documents available.</p>
            )}
          </div>
        </div>

        {docViewer && (
          <DocumentViewer
            title={docViewer.title}
            content={docViewer.content}
            open={true}
            onClose={() => setDocViewer(null)}
          />
        )}
      </div>
    </div>
  );
}
