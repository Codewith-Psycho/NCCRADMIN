import React, { useState, useRef, useEffect } from 'react';
import { mockProjects } from '../../data/mockData';
import { X } from 'lucide-react';

export default function NotificationPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={(e) => { e.stopPropagation(); setOpen((s) => !s); }} className="relative p-2 rounded-md hover:bg-nee-50 transition-colors">
        <span className="sr-only">Open notifications</span>
        <div className="w-6 h-6 rounded-full bg-nee-300 flex items-center justify-center text-white">🔔</div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-neon smooth-slide z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="font-semibold text-nee-800">Recent Projects</div>
            <button onClick={() => setOpen(false)} className="p-1 text-nee-500 hover:text-nee-700">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 max-h-64 overflow-auto">
            {mockProjects.map((p) => (
              <div key={p.id} className="flex items-start space-x-3 py-2 border-b last:border-b-0">
                <div className="w-10 h-10 bg-nee-50 rounded-lg flex items-center justify-center text-nee-700 font-semibold">{p.id.split('-')[1]}</div>
                <div className="flex-1">
                  <div className="font-medium text-nee-800">{p.id} • {p.country}</div>
                  <div className="text-sm text-gray-500">Credits: {p.creditsIssued.toLocaleString()} • Risk: {p.riskAssessment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
