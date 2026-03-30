'use client';

import { useState, useEffect, useCallback } from 'react';

interface Volunteer {
  name: string;
  submissions: number;
  referralLink: string;
}

export default function VolunteersAdminPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copiedLink, setCopiedLink] = useState('');
  const [createdLink, setCreatedLink] = useState('');

  const fetchVolunteers = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch('/api/volunteers/list');
      const data = await res.json();
      if (data.volunteers) {
        setVolunteers(data.volunteers);
      }
    } catch {
      console.error('Failed to fetch volunteers');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setLoading(true);
    setError('');
    setSuccess('');
    setCreatedLink('');

    try {
      const res = await fetch('/api/volunteers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create volunteer');
        return;
      }

      setSuccess(`Volunteer "${data.volunteer}" created successfully!`);
      setCreatedLink(data.referralLink);
      setNewName('');
      fetchVolunteers();
    } catch {
      setError('Failed to create volunteer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(link);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedLink(link);
      setTimeout(() => setCopiedLink(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                Volunteer Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">Create and manage volunteers for Happiness Index</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Create Volunteer Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-pink-100 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
            <span className="text-pink-500">✨</span>
            Create New Volunteer
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Volunteer Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter volunteer name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !newName.trim()}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Volunteer'
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              ❌ {error}
            </div>
          )}

          {/* Success Message with Link */}
          {success && createdLink && (
            <div className="mt-4 p-4 sm:p-5 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 font-semibold mb-3">✅ {success}</p>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs text-gray-500 mb-2 font-medium">Referral Link:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={createdLink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(createdLink)}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white text-sm font-bold rounded-lg hover:shadow-md transition-all duration-200 whitespace-nowrap"
                  >
                    {copiedLink === createdLink ? '✓ Copied!' : 'Copy URL'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Volunteers List */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-pink-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
            <span className="text-pink-500">📋</span>
            All Volunteers
            <span className="ml-auto text-sm font-normal text-gray-500">
              {volunteers.length} volunteer{volunteers.length !== 1 ? 's' : ''}
            </span>
          </h2>

          {listLoading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-pink-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🤝</div>
              <p className="text-gray-500 text-sm">No volunteers created yet. Create your first volunteer above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {volunteers.map((vol) => (
                <div
                  key={vol.name}
                  className="bg-gradient-to-r from-pink-50/50 to-red-50/50 rounded-xl p-4 sm:p-5 border border-pink-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Volunteer Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                          {vol.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="font-bold text-gray-800 truncate">{vol.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 ml-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full text-xs font-semibold text-pink-600 border border-pink-200">
                          📊 {vol.submissions} submission{vol.submissions !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Link & Copy */}
                    <div className="flex items-center gap-2 sm:ml-4">
                      <input
                        type="text"
                        value={vol.referralLink}
                        readOnly
                        className="flex-1 sm:w-64 px-3 py-2 bg-white rounded-lg text-xs text-gray-600 border border-gray-200 focus:outline-none truncate"
                      />
                      <button
                        onClick={() => copyToClipboard(vol.referralLink)}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
                          copiedLink === vol.referralLink
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-pink-500 to-red-600 text-white hover:shadow-md'
                        }`}
                      >
                        {copiedLink === vol.referralLink ? '✓ Copied!' : 'Copy URL'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}