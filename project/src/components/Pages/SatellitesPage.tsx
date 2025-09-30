import { useEffect, useState } from 'react';
import DocumentViewer from '../Common/DocumentViewer';

interface Satellite {
  id: string;
  country: string;
  launch_date: string;
  mass: string;
  launcher: string;
}

export default function SatellitesPage() {
  const [sats, setSats] = useState<Satellite[]>([]);
  const [query, setQuery] = useState('');
  const [viewer, setViewer] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetch('/api/satellites')
      .then((r) => r.json())
      .then((data) => setSats(data.customer_satellites || []))
      .catch(() => setSats([]));
  }, []);

  const filtered = sats.filter(s => s.id.toLowerCase().includes(query.toLowerCase()) || s.country.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Satellites</h1>
        <p className="text-gray-600">List of customer satellites imported from the backend</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by id or country" className="px-3 py-2 border rounded w-96" />
        <div className="text-sm text-gray-500">{filtered.length} results</div>
      </div>

      <div className="bg-white border rounded shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Country</th>
              <th className="px-4 py-3 text-left">Launch Date</th>
              <th className="px-4 py-3 text-left">Mass (kg)</th>
              <th className="px-4 py-3 text-left">Launcher</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.country}</td>
                <td className="px-4 py-3">{s.launch_date}</td>
                <td className="px-4 py-3">{s.mass}</td>
                <td className="px-4 py-3">{s.launcher}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setViewer({ title: `Satellite: ${s.id}`, content: formatSat(s) })} className="text-nee-600 hover:text-nee-700">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewer && (
        <DocumentViewer open={true} title={viewer.title} content={viewer.content} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}

function formatSat(s: Satellite) {
  return `ID: ${s.id}\nCountry: ${s.country}\nLaunch Date: ${s.launch_date}\nMass: ${s.mass}\nLauncher: ${s.launcher}`;
}
