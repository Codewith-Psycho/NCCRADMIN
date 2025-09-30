import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function ProjectsPage({ projects, onSelectProject }: ProjectsPageProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      p.id.toLowerCase().includes(q) ||
      p.accountId.toLowerCase().includes(q) ||
      (p.country && p.country.toLowerCase().includes(q))
    );
  }, [projects, query]);

  const handleViewDetails = (project: Project) => {
    onSelectProject(project);
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nee-50 via-nee-100 to-nee-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>
        <div className="mb-4 flex items-center space-x-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-nee-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by id, account or country"
              className="pl-10 pr-4 py-2 rounded-lg border border-nee-200 bg-white text-sm shadow-sm w-full"
            />
          </div>
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-nee-700">{filtered.length}</span> of {projects.length}
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-nee-200 text-left text-sm font-semibold text-nee-900">Ownership</th>
                <th className="px-6 py-3 border-b border-nee-200 text-left text-sm font-semibold text-nee-900">Account ID</th>
                <th className="px-6 py-3 border-b border-nee-200 text-left text-sm font-semibold text-nee-900">Country</th>
                <th className="px-6 py-3 border-b border-nee-200 text-left text-sm font-semibold text-nee-900">Time of Registration</th>
                <th className="px-6 py-3 border-b border-nee-200 text-left text-sm font-semibold text-nee-900">Number of Cycles</th>
                <th className="px-6 py-3 border-b border-nee-200 text-center text-sm font-semibold text-nee-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-nee-50 cursor-pointer">
                  <td className="px-6 py-4 border-b border-nee-200 text-sm text-nee-900">{p.metadata.ownership}</td>
                  <td className="px-6 py-4 border-b border-nee-200 text-sm text-nee-900">{p.accountId}</td>
                  <td className="px-6 py-4 border-b border-nee-200 text-sm text-nee-900">{p.country}</td>
                  <td className="px-6 py-4 border-b border-nee-200 text-sm text-nee-900">{p.startDate}</td>
                  <td className="px-6 py-4 border-b border-nee-200 text-sm text-nee-900">{p.timeline.length}</td>
                  <td className="px-6 py-4 border-b border-nee-200 text-center text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(p);
                      }}
                      className="text-nee-600 hover:text-nee-700 font-semibold"
                    >
                      Details
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
