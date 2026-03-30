// ============================================================
// FILE: app/admin/volunteers/page.tsx
// COPY THIS FILE to your Next.js project at the path above
// ============================================================

'use client';

import { useState, useEffect, useCallback } from 'react';

interface Volunteer {
  name: string;
  submissions: number;
  referralLink: string;
}

const avatarColors = [
  'bg-indigo-600',
  'bg-violet-600',
  'bg-blue-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-cyan-600',
  'bg-fuchsia-600',
  'bg-teal-600',
  'bg-orange-600',
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'submissions'>('name');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const totalSubmissions = volunteers.reduce((sum, v) => sum + v.submissions, 0);
  const topVolunteer = volunteers.length > 0
    ? volunteers.reduce((max, v) => (v.submissions > max.submissions ? v : max), volunteers[0])
    : null;

  const filteredVolunteers = volunteers
    .filter((v) => v.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'submissions') return b.submissions - a.submissions;
      return a.name.localeCompare(b.name);
    });

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
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 leading-tight">Happiness Index</h1>
                <p className="text-[11px] text-gray-500 -mt-0.5">Volunteer Management</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg h-9 px-4 text-sm shadow-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Volunteer
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Volunteers</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{volunteers.length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Submissions</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{totalSubmissions}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg / Volunteer</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {volunteers.length > 0 ? (totalSubmissions / volunteers.length).toFixed(1) : '0'}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Top Performer</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 truncate max-w-[120px]">
                  {topVolunteer ? topVolunteer.name : '—'}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Create Volunteer Panel (Collapsible) */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-5 sm:px-6 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Create New Volunteer</h2>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter volunteer name..."
                    className="w-full h-10 px-3 text-sm border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg transition-colors text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !newName.trim()}
                  className="inline-flex items-center justify-center gap-2 h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}

              {success && createdLink && (
                <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-700 font-medium text-sm mb-2.5 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {success}
                  </p>
                  <div className="flex items-center gap-2 bg-white rounded-md p-2 border border-emerald-200">
                    <input
                      type="text"
                      value={createdLink}
                      readOnly
                      className="flex-1 h-8 px-2 bg-transparent border-0 text-xs text-gray-600 focus:outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(createdLink)}
                      className={`h-8 px-3 text-xs font-medium rounded-md transition-colors ${
                        copiedLink === createdLink
                          ? 'bg-emerald-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {copiedLink === createdLink ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-5 sm:px-6 py-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-sm font-semibold text-gray-900">All Volunteers</h2>
                <span className="inline-flex items-center px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-md">
                  {filteredVolunteers.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="h-8 pl-9 pr-3 w-44 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'submissions')}
                    className="h-8 pl-3 pr-8 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="submissions">Sort by Submissions</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="divide-y divide-gray-100">
            {listLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="animate-spin h-8 w-8 text-indigo-500 mb-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-sm text-gray-500">Loading volunteers...</p>
              </div>
            ) : filteredVolunteers.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  {searchQuery ? 'No volunteers match your search' : 'No volunteers yet'}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {searchQuery ? 'Try a different search term' : 'Click "Add Volunteer" to create your first one'}
                </p>
              </div>
            ) : (
              <>
                {/* Table Header Row */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 sm:px-6 py-2.5 bg-gray-50/50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-4">Volunteer</div>
                  <div className="col-span-2 text-center">Submissions</div>
                  <div className="col-span-4">Referral Link</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {filteredVolunteers.map((vol, index) => (
                  <div
                    key={vol.name}
                    className="group px-5 sm:px-6 py-3.5 hover:bg-indigo-50/30 transition-colors duration-150"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      {/* Volunteer Info */}
                      <div className="sm:col-span-4 flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-lg ${getAvatarColor(vol.name)} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                            {vol.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">{vol.name}</h3>
                          <p className="text-xs text-gray-500">#{index + 1} · Active</p>
                        </div>
                      </div>

                      {/* Submissions */}
                      <div className="sm:col-span-2 flex sm:justify-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                          vol.submissions >= 20
                            ? 'bg-emerald-100 text-emerald-700'
                            : vol.submissions >= 5
                            ? 'bg-blue-100 text-blue-700'
                            : vol.submissions > 0
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {vol.submissions}
                        </span>
                      </div>

                      {/* Referral Link */}
                      <div className="sm:col-span-4">
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-md px-3 py-1.5 border border-gray-200 group-hover:border-gray-300 transition-colors">
                          <span className="text-xs text-gray-500 truncate flex-1 font-mono">{vol.referralLink}</span>
                          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="sm:col-span-2 flex justify-end">
                        <button
                          onClick={() => copyToClipboard(vol.referralLink)}
                          className={`inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-medium rounded-md transition-all duration-200 ${
                            copiedLink === vol.referralLink
                              ? 'bg-emerald-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                          }`}
                        >
                          {copiedLink === vol.referralLink ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy URL
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-xs text-gray-400">Happiness Index · Volunteer Management Console</p>
        </div>
      </div>
    </div>
  );
}
