import React, { useEffect, useState, useRef } from 'react';
import DocumentViewer from '../Common/DocumentViewer';
import { mockProjects, mockACVAs } from '../../data/mockData';
import satsData from '../../data/customerSatellites.json';

type Item = {
  id: string;
  name?: string;
  coordinates: { lat: number; lng: number };
  country?: string;
  acva?: string;
  agencyName?: string;
  contact?: { email: string; phone: string };
};

export default function MapPage() {
  const [projects, setProjects] = useState<Item[]>([]);
  const [acvas, setAcvas] = useState<Item[]>([]);
  const [satellites, setSatellites] = useState<any[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [viewer, setViewer] = useState<{ title: string; content: string } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<any>(null);
  const clusterRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const load = async () => {
      // Use local data
      setProjects(mockProjects.map(p => ({ id: p.id, name: p.metadata.ownership, coordinates: p.metadata.coordinates, country: p.country, acva: p.timeline.find(t => t.acvaId)?.acvaId })));
      setAcvas(mockACVAs.map(a => ({ id: a.id, agencyName: a.agencyName, country: 'India', contact: a.contactInfo, coordinates: { lat: 20.5937, lng: 78.9629 } })));
      if (mockProjects.length > 0) setSelected({ id: mockProjects[0].id, name: mockProjects[0].metadata.ownership, coordinates: mockProjects[0].metadata.coordinates, country: mockProjects[0].country, acva: mockProjects[0].timeline.find(t => t.acvaId)?.acvaId });

      // Satellites from local data
      const list = satsData.customer_satellites || [];
      // map countries to approximate coordinates (centroids or capital cities)
      const countryLookup: Record<string, { lat: number; lng: number }> = {
        'India': { lat: 20.5937, lng: 78.9629 }
      };

      const withCoords = list.map((s: any) => {
        const coords = countryLookup[s.country] || { lat: 0, lng: 0 };
        return { ...s, coordinates: coords };
      });
      setSatellites(withCoords);
    };
    load();
    // initialize leaflet map once data loads
    let mounted = true;
    (async () => {
      try {
        await loadLeaflet();
        if (!mounted) return;
        const L = (window as any).L;
        if (!mapRef.current) {
          mapRef.current = L.map('nee-map', { center: [20.5937, 78.9629], zoom: 5, maxBounds: L.latLngBounds([[8.4, 68.7], [37.6, 97.25]]) });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(mapRef.current);
          // create cluster group (load markercluster assets first)
          try {
            await loadMarkerCluster();
            const mc = (window as any).L.markerClusterGroup;
            if (mc) {
              clusterRef.current = mc();
              mapRef.current.addLayer(clusterRef.current);
            }
          } catch (err) {
            // markercluster may not be available; ignore
          }
        }
      } catch (e) {
        console.warn('Leaflet failed to load', e);
      }
    })();

    return () => { mounted = false; };
  }, []);

  // update markers when datasets change
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current) return;
    // clear old markers
    try {
      if (clusterRef.current) {
        clusterRef.current.clearLayers();
      }
    } catch (e) {
      // ignore
    }
    markersRef.current.forEach((m: any) => m.remove());
    markersRef.current = [];

    const createDivIcon = (color: string, label?: string) => {
      return L.divIcon({
        html: `<div style="background:${color};width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 2px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600">${label || ''}</div>`,
        className: '',
        iconSize: [18, 18]
      });
    };

    const addMarkerToMap = (lat: number, lng: number, title: string, content: string, icon: any) => {
      const marker = L.marker([lat, lng], { icon }).bindPopup(`<strong>${title}</strong><br/>${content}`);
      markersRef.current.push(marker);
      if (clusterRef.current && typeof clusterRef.current.addLayer === 'function') {
        clusterRef.current.addLayer(marker);
      } else {
        marker.addTo(mapRef.current);
      }
      return marker;
    };

    const projIcon = createDivIcon('#0ea5a4', 'P');
    const acvaIcon = createDivIcon('#7c3aed', 'A');
    const satIcon = createDivIcon('#ef4444', 'S');

    projects.forEach((p) => addMarkerToMap(p.coordinates.lat, p.coordinates.lng, p.name || p.id, p.country || '', projIcon));
    acvas.forEach((a) => addMarkerToMap(a.coordinates.lat, a.coordinates.lng, a.agencyName || a.id, a.country || '', acvaIcon));
    satellites.forEach((s) => {
      if (s.coordinates && s.coordinates.lat !== 0) {
        addMarkerToMap(s.coordinates.lat, s.coordinates.lng, s.id, s.country || '', satIcon);
      }
    });

    if (selected && selected.coordinates) {
      mapRef.current.setView([selected.coordinates.lat, selected.coordinates.lng], 6);
    } else if (mapCenter) {
      mapRef.current.setView([mapCenter.lat, mapCenter.lng], 6);
    }
  }, [projects, acvas, satellites, selected, mapCenter]);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-nee-900">Map — Projects & ACVAs</h1>
        <p className="text-nee-700">Select a project or ACVA to center the map and view details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-3">Projects</h3>
            {projects.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className={`w-full text-left p-2 rounded hover:bg-nee-50 ${selected?.id === p.id ? 'bg-nee-50 border' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-nee-800">{p.name || p.id}</div>
                    <div className="text-xs text-gray-500">{p.country}</div>
                  </div>
                  <div className="text-xs text-gray-600">{p.coordinates.lat.toFixed(2)}, {p.coordinates.lng.toFixed(2)}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-3">ACVAs</h3>
            {acvas.map((a) => (
              <button key={a.id} onClick={() => setSelected(a)} className={`w-full text-left p-2 rounded hover:bg-nee-50 ${selected?.id === a.id ? 'bg-nee-50 border' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-nee-800">{a.agencyName || a.id}</div>
                    <div className="text-xs text-gray-500">{a.country}</div>
                  </div>
                  <div className="text-xs text-gray-600">{a.coordinates.lat.toFixed(2)}, {a.coordinates.lng.toFixed(2)}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-medium mb-3">Satellites</h3>
            {satellites.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-2 rounded hover:bg-nee-50">
                <div>
                      <div className="text-sm font-medium text-nee-800">{s.id}</div>
                      <div className="text-xs text-gray-500">{s.country}</div>
                </div>
                <div className="flex items-center gap-2">
                      <button onClick={() => setViewer({ title: `Satellite: ${s.id}`, content: `ID: ${s.id}\nCountry: ${s.country}\nLaunch Date: ${s.launch_date}\nMass: ${s.mass}\nLauncher: ${s.launcher}` })} className="text-nee-600 hover:text-nee-700 text-sm">Details</button>
                      <button onClick={() => { setMapCenter(s.coordinates); setSelected({ id: s.id, name: s.id, coordinates: s.coordinates }); }} className="text-nee-600 hover:text-nee-700 text-sm">View on Map</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border p-4 h-[70vh]">
            <div id="nee-map" className="w-full h-full rounded" style={{ minHeight: '420px' }} />
          </div>
        </div>
      </div>
      {viewer && (
        <DocumentViewer title={viewer.title} content={viewer.content} open={true} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}

// Leaflet loader & map initialization
function loadLeaflet(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).L) return resolve();
    // CSS
    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    // Script
    const sId = 'leaflet-js';
    if (document.getElementById(sId)) return resolve();
    const script = document.createElement('script');
    script.id = sId;
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load leaflet'));
    document.body.appendChild(script);
  });
}

// Load markercluster assets (optional) - returns a promise that resolves when loaded or immediately if already present
function loadMarkerCluster(): Promise<void> {
  return new Promise((resolve) => {
    const cssId = 'leaflet-markercluster-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
      document.head.appendChild(link);
      const link2 = document.createElement('link');
      link2.rel = 'stylesheet';
      link2.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
      document.head.appendChild(link2);
    }
    const sId = 'leaflet-markercluster-js';
    if ((window as any).L && (window as any).L.markerClusterGroup) return resolve();
    if (document.getElementById(sId)) return resolve();
    const script = document.createElement('script');
    script.id = sId;
    script.src = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js';
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

