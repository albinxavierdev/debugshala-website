'use client';

import { useState, useEffect } from 'react';
import { Workshop } from '../../../types/database';
import { getWorkshops, createWorkshop, updateWorkshop, deleteWorkshop, fetchLinkedInPost, uploadFile } from '../../../lib/api';

export default function WorkshopsAdmin() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<Partial<Workshop> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [linkedinPostUrl, setLinkedinPostUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Fetch workshops on mount
  useEffect(() => {
    fetchWorkshops();
  }, []);

  // Fetch all workshops
  const fetchWorkshops = async () => {
    setIsLoading(true);
    try {
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter workshops based on search term
  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for creating new workshop
  const handleAddNew = () => {
    setCurrentWorkshop({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: 120,
      location: '',
      image_url: '',
      is_recorded: false
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing workshop
  const handleEdit = (workshop: Workshop) => {
    setCurrentWorkshop(workshop);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'is_recorded') {
      setCurrentWorkshop(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setCurrentWorkshop(prev => ({
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
      const imageUrl = await uploadFile('workshops', 'images', file);
      if (imageUrl) {
        setCurrentWorkshop(prev => ({
          ...prev,
          image_url: imageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Save workshop (create or update)
  const handleSave = async () => {
    if (!currentWorkshop || !currentWorkshop.title || !currentWorkshop.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (isEditing && currentWorkshop.id) {
        // Update existing workshop
        const updatedWorkshop = await updateWorkshop(currentWorkshop.id, currentWorkshop);
        if (updatedWorkshop) {
          setWorkshops(prev => prev.map(w => w.id === updatedWorkshop.id ? updatedWorkshop : w));
        }
      } else {
        // Create new workshop
        const newWorkshop = await createWorkshop(currentWorkshop as Omit<Workshop, 'id' | 'created_at' | 'updated_at'>);
        if (newWorkshop) {
          setWorkshops(prev => [...prev, newWorkshop]);
        }
      }
      setIsModalOpen(false);
      setCurrentWorkshop(null);
    } catch (error) {
      console.error('Error saving workshop:', error);
    }
  };

  // Delete workshop
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      try {
        const success = await deleteWorkshop(id);
        if (success) {
          setWorkshops(prev => prev.filter(workshop => workshop.id !== id));
        }
      } catch (error) {
        console.error('Error deleting workshop:', error);
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
      
      // Create new workshop from LinkedIn data
      const newWorkshop: Partial<Workshop> = {
        title: postData.content.split('\n')[0] || 'Workshop',
        description: postData.content || '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 120,
        location: 'DebugShala Campus',
        image_url: 'https://placekitten.com/800/400', // Default image, would be extracted from the post
        linkedin_post_url: linkedinPostUrl,
        linkedin_post_id: postData.id,
        is_recorded: false
      };
      
      setCurrentWorkshop(newWorkshop);
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
        <h1 className="text-2xl font-bold">Workshops & College Sessions Management</h1>
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
            Add New Workshop
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search workshops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Workshop List */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      ) : filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={workshop.image_url || 'https://via.placeholder.com/400x200'}
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{workshop.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(workshop.date).toLocaleDateString()} at {workshop.time} ({workshop.duration} min)
                </p>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Location: {workshop.location}
                </p>
                <p className="text-sm mb-4 line-clamp-3">{workshop.description}</p>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(workshop)}
                    className="text-[var(--primary)] hover:text-[var(--secondary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workshop.id)}
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
          <p className="text-gray-500">No workshops found.</p>
        </div>
      )}

      {/* Workshop Modal */}
      {isModalOpen && currentWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? 'Edit Workshop' : 'Add New Workshop'}
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workshop Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentWorkshop.title || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentWorkshop.description || ''}
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
                    value={currentWorkshop.date || ''}
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
                    value={currentWorkshop.time || ''}
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
                    value={currentWorkshop.duration || 120}
                    onChange={handleInputChange}
                    min="30"
                    step="30"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={currentWorkshop.location || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  placeholder="e.g., DebugShala Campus, Virtual Meeting, etc."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workshop Image
                </label>
                {currentWorkshop.image_url && (
                  <div className="mb-2">
                    <img
                      src={currentWorkshop.image_url}
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
                  value={currentWorkshop.linkedin_post_url || ''}
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
                  value={currentWorkshop.registration_link || ''}
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
                    checked={currentWorkshop.is_recorded || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[var(--primary)] rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">This workshop has been recorded</span>
                </label>
              </div>
              
              {currentWorkshop.is_recorded && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recording URL
                  </label>
                  <input
                    type="url"
                    name="recording_url"
                    value={currentWorkshop.recording_url || ''}
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
                Enter a LinkedIn post URL to import workshop details.
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
