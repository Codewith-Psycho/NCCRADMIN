import { Bell, Share2, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage account and application settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold mb-3 flex items-center space-x-2"><User className="w-5 h-5 text-nee-700" /><span>Profile</span></h2>
          <div className="space-y-3">
            <label className="text-sm text-gray-600">Display name</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="Admin" />

            <label className="text-sm text-gray-600">Email</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="spearsh29workin@gmail.com" />

            <button className="mt-4 inline-flex items-center px-4 py-2 bg-nee-600 text-white rounded">Save profile</button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold mb-3 flex items-center space-x-2"><Bell className="w-5 h-5 text-nee-700" /><span>Notifications</span></h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked readOnly />
              <span className="text-sm">Email notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" />
              <span className="text-sm">In-app notifications</span>
            </label>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border md:col-span-2">
          <h2 className="text-lg font-semibold mb-3 flex items-center space-x-2"><Share2 className="w-5 h-5 text-nee-700" /><span>Integrations</span></h2>
          <p className="text-sm text-gray-600">Configure third-party integrations, API keys and webhooks.</p>
          <div className="mt-4">
            <button className="inline-flex items-center px-4 py-2 bg-nee-600 text-white rounded">Manage integrations</button>
          </div>
        </section>
      </div>
    </div>
  );
}
