'use client';

import { useState, useEffect } from 'react';
import { SiteSettings } from '../../../types/database';
import { getSiteSettings, updateSiteSettings, uploadFile } from '../../../lib/api';

export default function SiteSettings() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    site_name: '',
    tagline: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    social_links: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    },
    appearance: {
      primary_color: '#2196F3',
      secondary_color: '#26C6DA',
      logo_url: ''
    },
    features: {
      enable_ai_chatroom: true,
      enable_enrollment: true,
      show_testimonials: true,
      show_expert_sessions: true
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch site settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const data = await getSiteSettings();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  // Handle input changes for general fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle social link changes
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [name]: value
      }
    }));
  };

  // Handle appearance changes
  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [name]: value
      }
    }));
  };

  // Handle feature toggle changes
  const handleFeatureToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked
      }
    }));
  };

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const logoUrl = await uploadFile('site-settings', 'logos', file);
      if (logoUrl) {
        setSettings(prev => ({
          ...prev,
          appearance: {
            ...prev.appearance,
            logo_url: logoUrl
          }
        }));
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedSettings = await updateSiteSettings(settings);
      if (updatedSettings) {
        setSettings(updatedSettings);
        setSuccessMessage('Settings saved successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Site Settings</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'general'
                ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General Information
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'social'
                ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'appearance'
                ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'features'
                ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {/* General Information */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input
                  type="text"
                  name="site_name"
                  value={settings.site_name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={settings.tagline || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={settings.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  name="contact_email"
                  value={settings.contact_email || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={settings.contact_phone || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={settings.address || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          )}
          
          {/* Social Links */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={settings.social_links?.facebook || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://facebook.com/..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={settings.social_links?.twitter || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://twitter.com/..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  value={settings.social_links?.instagram || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://instagram.com/..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={settings.social_links?.linkedin || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://linkedin.com/company/..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube</label>
                <input
                  type="url"
                  name="youtube"
                  value={settings.social_links?.youtube || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://youtube.com/channel/..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          )}
          
          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                <div className="flex mt-1">
                  <input
                    type="color"
                    name="primary_color"
                    value={settings.appearance?.primary_color || '#2196F3'}
                    onChange={handleAppearanceChange}
                    className="h-10 w-10 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    name="primary_color"
                    value={settings.appearance?.primary_color || '#2196F3'}
                    onChange={handleAppearanceChange}
                    className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                <div className="flex mt-1">
                  <input
                    type="color"
                    name="secondary_color"
                    value={settings.appearance?.secondary_color || '#26C6DA'}
                    onChange={handleAppearanceChange}
                    className="h-10 w-10 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    name="secondary_color"
                    value={settings.appearance?.secondary_color || '#26C6DA'}
                    onChange={handleAppearanceChange}
                    className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                {settings.appearance?.logo_url && (
                  <div className="mt-2 mb-4">
                    <img
                      src={settings.appearance.logo_url}
                      alt="Site Logo"
                      className="h-16 object-contain"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-900">Preview</h3>
                <div className="mt-2 p-4 border rounded-md">
                  <div
                    className="h-20 rounded-md flex items-center justify-center mb-2"
                    style={{
                      background: `linear-gradient(to right, ${settings.appearance?.primary_color || '#2196F3'}, ${
                        settings.appearance?.secondary_color || '#26C6DA'
                      })`
                    }}
                  >
                    <span className="text-white font-bold text-xl">Gradient Preview</span>
                  </div>
                  <div className="flex space-x-2">
                    <div
                      className="h-10 w-10 rounded-md"
                      style={{ backgroundColor: settings.appearance?.primary_color || '#2196F3' }}
                    ></div>
                    <div
                      className="h-10 w-10 rounded-md"
                      style={{ backgroundColor: settings.appearance?.secondary_color || '#26C6DA' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Features */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enable_ai_chatroom"
                  name="enable_ai_chatroom"
                  checked={settings.features?.enable_ai_chatroom || false}
                  onChange={handleFeatureToggle}
                  className="h-4 w-4 text-[var(--primary)] rounded"
                />
                <label htmlFor="enable_ai_chatroom" className="ml-2 block text-sm text-gray-900">
                  Enable AI Chatroom
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enable_enrollment"
                  name="enable_enrollment"
                  checked={settings.features?.enable_enrollment || false}
                  onChange={handleFeatureToggle}
                  className="h-4 w-4 text-[var(--primary)] rounded"
                />
                <label htmlFor="enable_enrollment" className="ml-2 block text-sm text-gray-900">
                  Enable Course Enrollment
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show_testimonials"
                  name="show_testimonials"
                  checked={settings.features?.show_testimonials || false}
                  onChange={handleFeatureToggle}
                  className="h-4 w-4 text-[var(--primary)] rounded"
                />
                <label htmlFor="show_testimonials" className="ml-2 block text-sm text-gray-900">
                  Show Testimonials Section
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show_expert_sessions"
                  name="show_expert_sessions"
                  checked={settings.features?.show_expert_sessions || false}
                  onChange={handleFeatureToggle}
                  className="h-4 w-4 text-[var(--primary)] rounded"
                />
                <label htmlFor="show_expert_sessions" className="ml-2 block text-sm text-gray-900">
                  Show Expert Sessions Section
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Save Button */}
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
