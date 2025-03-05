'use client';

import { useState, useEffect } from 'react';
import { BehindTheScenes } from '../../../types/database';
import { getBehindTheScenesItems, createBehindTheScenesItem, updateBehindTheScenesItem, deleteBehindTheScenesItem, fetchInstagramPost, uploadFile } from '../../../lib/api';

export default function BehindTheScenesAdmin() {
  const [items, setItems] = useState<BehindTheScenes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<BehindTheScenes> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [instagramPostUrl, setInstagramPostUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Fetch behind the scenes items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all behind the scenes items
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await getBehindTheScenesItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching behind the scenes items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter items based on search term
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for creating new item
  const handleAddNew = () => {
    setCurrentItem({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      image_url: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing item
  const handleEdit = (item: BehindTheScenes) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadFile('behind-scenes', 'images', file);
      if (imageUrl) {
        setCurrentItem(prev => ({
          ...prev,
          image_url: imageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Save item (create or update)
  const handleSave = async () => {
    if (!currentItem || !currentItem.title || !currentItem.image_url) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (isEditing && currentItem.id) {
        // Update existing item
        const updatedItem = await updateBehindTheScenesItem(currentItem.id, currentItem);
        if (updatedItem) {
          setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        }
      } else {
        // Create new item
        const newItem = await createBehindTheScenesItem(currentItem as Omit<BehindTheScenes, 'id' | 'created_at' | 'updated_at'>);
        if (newItem) {
          setItems(prev => [...prev, newItem]);
        }
      }
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error saving behind the scenes item:', error);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this behind the scenes item?')) {
      try {
        const success = await deleteBehindTheScenesItem(id);
        if (success) {
          setItems(prev => prev.filter(item => item.id !== id));
        }
      } catch (error) {
        console.error('Error deleting behind the scenes item:', error);
      }
    }
  };

  // Import from Instagram
  const handleImport = async () => {
    if (!instagramPostUrl) {
      alert('Please enter an Instagram post URL');
      return;
    }

    setIsImporting(true);
    try {
      // Fetch Instagram post data
      const postData = await fetchInstagramPost(instagramPostUrl);
      
      // Create new item from Instagram data
      const newItem: Partial<BehindTheScenes> = {
        title: postData.caption?.split('\n')[0] || 'Behind the Scenes',
        description: postData.caption || '',
        date: new Date().toISOString().split('T')[0],
        image_url: postData.media_url || 'https://placekitten.com/800/800',
        instagram_post_url: instagramPostUrl,
        instagram_post_id: postData.id
      };
      
      setCurrentItem(newItem);
      setIsImportModalOpen(false);
      setIsModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error importing from Instagram:', error);
      alert('Failed to import from Instagram. Please try again.');
    } finally {
      setIsImporting(false);
      setInstagramPostUrl('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Behind the Scenes Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
          >
            Import from Instagram
          </button>
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 text-white px-4 py-2 rounded-md"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search behind the scenes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Items Grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src={item.image_url || 'https://via.placeholder.com/400x400'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm mb-4 line-clamp-3">{item.description}</p>
                
                {item.instagram_post_url && (
                  <div className="mb-3">
                    <a
                      href={item.instagram_post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 text-sm hover:underline flex items-center"
                    >
                      <span>View on Instagram</span>
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[var(--primary)] hover:text-[var(--secondary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
          <p className="text-gray-500">No behind the scenes items found.</p>
        </div>
      )}

      {/* Item Modal */}
      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? 'Edit Behind the Scenes' : 'Add New Behind the Scenes'}
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentItem.title || ''}
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
                  value={currentItem.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={currentItem.date || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image *
                </label>
                {currentItem.image_url && (
                  <div className="mb-2">
                    <img
                      src={currentItem.image_url}
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
                  Instagram Post URL
                </label>
                <input
                  type="url"
                  name="instagram_post_url"
                  value={currentItem.instagram_post_url || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://www.instagram.com/p/..."
                />
              </div>
              
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
              <h2 className="text-xl font-bold mb-4">Import from Instagram</h2>
              <p className="text-gray-600 mb-4">
                Enter an Instagram post URL to import behind the scenes content.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Post URL
                </label>
                <input
                  type="url"
                  value={instagramPostUrl}
                  onChange={(e) => setInstagramPostUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://www.instagram.com/p/..."
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
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-70 flex items-center"
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
