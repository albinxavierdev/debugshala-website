'use client';

import { useState, useEffect } from 'react';
import { ExpertSession } from '../../../types/database';
import { getExpertSessions, createExpertSession, updateExpertSession, deleteExpertSession, fetchLinkedInPost, uploadFile } from '../../../lib/api';

export default function ExpertSessionsAdmin() {
  const [sessions, setSessions] = useState<ExpertSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<Partial<ExpertSession> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [linkedinPostUrl, setLinkedinPostUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Fetch expert sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch all expert sessions
  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const data = await getExpertSessions();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching expert sessions:', error);
      alert('Unable to fetch expert sessions. Please make sure the expert_sessions table exists in your Supabase database.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter sessions based on search term
  const filteredSessions = sessions.filter(
    (session) =>
      session.expert_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for creating new session
  const handleAddNew = () => {
    setCurrentSession({
      expert_name: '',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      duration: 60,
      topics: [],
      image_url: '',
      is_recorded: false
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing session
  const handleEdit = (session: ExpertSession) => {
    setCurrentSession(session);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'topics') {
      setCurrentSession(prev => ({
        ...prev,
        topics: value.split(',').map(topic => topic.trim())
      }));
    } else if (name === 'is_recorded') {
      setCurrentSession(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setCurrentSession(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadFile('expert-sessions', 'images', file);
      if (imageUrl) {
        setCurrentSession(prev => ({
          ...prev,
          image_url: imageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Save session (create or update)
  const handleSave = async () => {
    if (!currentSession || !currentSession.expert_name || !currentSession.title) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (isEditing && currentSession.id) {
        // Update existing session
        const updatedSession = await updateExpertSession(currentSession.id, currentSession);
        if (updatedSession) {
          setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
        }
      } else {
        // Create new session
        const newSession = await createExpertSession(currentSession as Omit<ExpertSession, 'id' | 'created_at' | 'updated_at'>);
        if (newSession) {
          setSessions(prev => [...prev, newSession]);
        }
      }
      setIsModalOpen(false);
      setCurrentSession(null);
    } catch (error) {
      console.error('Error saving expert session:', error);
    }
  };

  // Delete session
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expert session?')) {
      try {
        const success = await deleteExpertSession(id);
        if (success) {
          setSessions(prev => prev.filter(session => session.id !== id));
        }
      } catch (error) {
        console.error('Error deleting expert session:', error);
      }
    }
  };

  // Import from LinkedIn
  const handleImport = async () => {
    if (!linkedinPostUrl) {
      alert('Please enter a LinkedIn post URL');
      return;
    }

    setIsImporting(true);
    try {
      // Fetch LinkedIn post data
      const postData = await fetchLinkedInPost(linkedinPostUrl);
      
      // Create new session from LinkedIn data
      const newSession: Partial<ExpertSession> = {
        expert_name: postData.author || 'Guest Expert',
        title: postData.content.split('\n')[0] || 'Expert Session',
        description: postData.content || '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        duration: 60,
        topics: [],
        image_url: 'https://placekitten.com/800/400', // Default image, would be extracted from the post
        linkedin_post_url: linkedinPostUrl,
        linkedin_post_id: postData.id,
        is_recorded: false
      };
      
      setCurrentSession(newSession);
      setIsImportModalOpen(false);
      setIsModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error importing from LinkedIn:', error);
      alert('Failed to import from LinkedIn. Please try again.');
    } finally {
      setIsImporting(false);
      setLinkedinPostUrl('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Expert Sessions Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Import from LinkedIn
          </button>
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 text-white px-4 py-2 rounded-md"
          >
            Add New Session
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search expert sessions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Session List */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      ) : filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={session.image_url || 'https://via.placeholder.com/400x200'}
                  alt={session.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{session.title}</h3>
                <p className="text-gray-600 mb-2">by {session.expert_name}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(session.date).toLocaleDateString()} at {session.time} ({session.duration} min)
                </p>
                <p className="text-sm mb-4 line-clamp-3">{session.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {session.topics.map((topic, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(session)}
                    className="text-[var(--primary)] hover:text-[var(--secondary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No expert sessions found.</p>
        </div>
      )}

      {/* Session Modal */}
      {isModalOpen && currentSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? 'Edit Expert Session' : 'Add New Expert Session'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expert Name *
                  </label>
                  <input
                    type="text"
                    name="expert_name"
                    value={currentSession.expert_name || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentSession.title || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentSession.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={currentSession.date || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={currentSession.time || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={currentSession.duration || 60}
                    onChange={handleInputChange}
                    min="15"
                    step="15"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topics (comma separated)
                </label>
                <input
                  type="text"
                  name="topics"
                  value={currentSession.topics?.join(', ') || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. React, JavaScript, Web Development"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Image
                </label>
                {currentSession.image_url && (
                  <div className="mb-2">
                    <img
                      src={currentSession.image_url}
                      alt="Preview"
                      className="h-40 object-cover rounded-md"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Post URL
                </label>
                <input
                  type="url"
                  name="linkedin_post_url"
                  value={currentSession.linkedin_post_url || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://www.linkedin.com/posts/..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Link
                </label>
                <input
                  type="url"
                  name="registration_link"
                  value={currentSession.registration_link || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://..."
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_recorded"
                    checked={currentSession.is_recorded || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[var(--primary)] rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">This session has been recorded</span>
                </label>
              </div>
              
              {currentSession.is_recorded && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recording URL
                  </label>
                  <input
                    type="url"
                    name="recording_url"
                    value={currentSession.recording_url || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-md hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Import from LinkedIn</h2>
              <p className="text-gray-600 mb-4">
                Enter a LinkedIn post URL to import session details.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Post URL
                </label>
                <input
                  type="url"
                  value={linkedinPostUrl}
                  onChange={(e) => setLinkedinPostUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://www.linkedin.com/posts/..."
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={isImporting}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-70 flex items-center"
                >
                  {isImporting ? (
                    <>
                      <span className="animate-spin mr-2">↻</span>
                      Importing...
                    </>
                  ) : (
                    'Import'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
