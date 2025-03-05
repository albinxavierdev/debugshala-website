'use client';

import { useState, useEffect } from 'react';

interface Placement {
  id: string;
  studentName: string;
  company: string;
  role: string;
  batch: string;
  package: string;
  testimonial: string;
  photoUrl: string;
  instagramPostUrl: string;
  datePosted: string;
  featured: boolean;
}

export default function PlacementsAdmin() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Placement>>({
    studentName: '',
    company: '',
    role: '',
    batch: '',
    package: '',
    testimonial: '',
    photoUrl: '',
    instagramPostUrl: '',
    featured: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Simulate fetching placements
  useEffect(() => {
    // This would be replaced with actual API calls
    const mockPlacements: Placement[] = [
      {
        id: '1',
        studentName: 'Rahul Sharma',
        company: 'Google',
        role: 'Software Engineer',
        batch: '2023',
        package: '24 LPA',
        testimonial: 'DebugShala helped me crack Google interviews with their expert guidance and mock interviews.',
        photoUrl: '/images/placements/rahul.jpg',
        instagramPostUrl: 'https://instagram.com/p/abc123',
        datePosted: '2023-12-15',
        featured: true
      },
      {
        id: '2',
        studentName: 'Priya Patel',
        company: 'Microsoft',
        role: 'Data Scientist',
        batch: '2023',
        package: '18 LPA',
        testimonial: 'The data science course at DebugShala was instrumental in helping me get placed at Microsoft.',
        photoUrl: '/images/placements/priya.jpg',
        instagramPostUrl: 'https://instagram.com/p/def456',
        datePosted: '2023-11-20',
        featured: true
      },
      {
        id: '3',
        studentName: 'Amit Kumar',
        company: 'Amazon',
        role: 'Full Stack Developer',
        batch: '2022',
        package: '20 LPA',
        testimonial: 'The MERN stack training at DebugShala prepared me well for Amazon technical rounds.',
        photoUrl: '/images/placements/amit.jpg',
        instagramPostUrl: 'https://instagram.com/p/ghi789',
        datePosted: '2023-10-05',
        featured: false
      }
    ];
    
    setTimeout(() => {
      setPlacements(mockPlacements);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing placement
      setPlacements(prev => 
        prev.map(item => 
          item.id === formData.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Add new placement
      const newPlacement: Placement = {
        id: Date.now().toString(),
        datePosted: new Date().toISOString().split('T')[0],
        ...formData as Omit<Placement, 'id' | 'datePosted'>
      };
      
      setPlacements(prev => [newPlacement, ...prev]);
    }
    
    resetForm();
  };

  const handleEdit = (placement: Placement) => {
    setFormData(placement);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this placement?')) {
      setPlacements(prev => prev.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      company: '',
      role: '',
      batch: '',
      package: '',
      testimonial: '',
      photoUrl: '',
      instagramPostUrl: '',
      featured: false
    });
    setIsEditing(false);
  };

  const handleImportFromInstagram = (e) => {
    e.preventDefault();
    
    if (!importUrl) return;
    
    setIsImporting(true);
    
    // Simulate API fetch from Instagram
    setTimeout(() => {
      // This would be replaced with actual Instagram API integration
      const mockData = {
        studentName: 'Neha Gupta',
        company: 'Adobe',
        role: 'UI/UX Designer',
        testimonial: 'So happy to join Adobe after completing my design course at DebugShala!',
        photoUrl: '/images/placements/neha.jpg',
        instagramPostUrl: importUrl
      };
      
      setFormData(prev => ({
        ...prev,
        ...mockData
      }));
      
      setIsImporting(false);
      setImportUrl('');
    }, 2000);
  };

  // Filter placements based on search term
  const filteredPlacements = placements.filter(placement => 
    placement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    placement.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">Manage Placements</h1>
      
      {/* Import from Instagram */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Import from Instagram</h2>
        <form onSubmit={handleImportFromInstagram} className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor="importUrl" className="block text-sm font-medium text-gray-700 mb-1">Instagram Post URL</label>
            <input
              type="url"
              id="importUrl"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isImporting}
            className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {isImporting ? 'Importing...' : 'Import'}
          </button>
        </form>
      </div>
      
      {/* Add/Edit Placement Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">{isEditing ? 'Edit Placement' : 'Add New Placement'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <input
                type="text"
                id="batch"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">Package</label>
              <input
                type="text"
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <input
                type="url"
                id="photoUrl"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="instagramPostUrl" className="block text-sm font-medium text-gray-700 mb-1">Instagram Post URL</label>
              <input
                type="url"
                id="instagramPostUrl"
                name="instagramPostUrl"
                value={formData.instagramPostUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
              <textarea
                id="testimonial"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-[var(--primary)] border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">Featured Placement</label>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              {isEditing ? 'Update Placement' : 'Add Placement'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Placements List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Placements List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search placements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading placements...</div>
        ) : filteredPlacements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No placements found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlacements.map((placement) => (
                  <tr key={placement.id} className={placement.featured ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={placement.photoUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{placement.studentName}</div>
                          <div className="text-sm text-gray-500">Batch: {placement.batch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{placement.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{placement.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{placement.package}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{placement.datePosted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(placement)}
                        className="text-[var(--primary)] hover:text-[var(--secondary)] mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(placement.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
