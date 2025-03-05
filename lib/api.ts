import supabase from './supabase';
import { 
  SiteSettings, 
  Placement, 
  ExpertSession, 
  Workshop, 
  BehindTheScenes 
} from '../types/database';

// Site Settings API
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }

  return data as SiteSettings;
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings | null> => {
  const { data, error } = await supabase
    .from('site_settings')
    .update(settings)
    .eq('id', settings.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating site settings:', error);
    return null;
  }

  return data as SiteSettings;
};

// Placements API
export const getPlacements = async (): Promise<Placement[]> => {
  const { data, error } = await supabase
    .from('placements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching placements:', error);
    return [];
  }

  return data as Placement[];
};

export const getPlacement = async (id: string): Promise<Placement | null> => {
  const { data, error } = await supabase
    .from('placements')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching placement:', error);
    return null;
  }

  return data as Placement;
};

export const createPlacement = async (placement: Omit<Placement, 'id' | 'created_at' | 'updated_at'>): Promise<Placement | null> => {
  const { data, error } = await supabase
    .from('placements')
    .insert([placement])
    .select()
    .single();

  if (error) {
    console.error('Error creating placement:', error);
    return null;
  }

  return data as Placement;
};

export const updatePlacement = async (id: string, placement: Partial<Placement>): Promise<Placement | null> => {
  const { data, error } = await supabase
    .from('placements')
    .update(placement)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating placement:', error);
    return null;
  }

  return data as Placement;
};

export const deletePlacement = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('placements')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting placement:', error);
    return false;
  }

  return true;
};

// Expert Sessions API
export const getExpertSessions = async (): Promise<ExpertSession[]> => {
  try {
    const { data, error } = await supabase
      .from('expert_sessions')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching expert sessions:', error);
      throw error;
    }

    return data as ExpertSession[] || [];
  } catch (error) {
    console.error('Error fetching expert sessions:', error);
    throw error;
  }
};

export const getExpertSession = async (id: string): Promise<ExpertSession | null> => {
  const { data, error } = await supabase
    .from('expert_sessions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching expert session:', error);
    return null;
  }

  return data as ExpertSession;
};

export const createExpertSession = async (session: Omit<ExpertSession, 'id' | 'created_at' | 'updated_at'>): Promise<ExpertSession | null> => {
  const { data, error } = await supabase
    .from('expert_sessions')
    .insert([session])
    .select()
    .single();

  if (error) {
    console.error('Error creating expert session:', error);
    return null;
  }

  return data as ExpertSession;
};

export const updateExpertSession = async (id: string, session: Partial<ExpertSession>): Promise<ExpertSession | null> => {
  const { data, error } = await supabase
    .from('expert_sessions')
    .update(session)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating expert session:', error);
    return null;
  }

  return data as ExpertSession;
};

export const deleteExpertSession = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('expert_sessions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting expert session:', error);
    return false;
  }

  return true;
};

// Workshops API
export const getWorkshops = async (): Promise<Workshop[]> => {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }

  return data as Workshop[];
};

export const getWorkshop = async (id: string): Promise<Workshop | null> => {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching workshop:', error);
    return null;
  }

  return data as Workshop;
};

export const createWorkshop = async (workshop: Omit<Workshop, 'id' | 'created_at' | 'updated_at'>): Promise<Workshop | null> => {
  const { data, error } = await supabase
    .from('workshops')
    .insert([workshop])
    .select()
    .single();

  if (error) {
    console.error('Error creating workshop:', error);
    return null;
  }

  return data as Workshop;
};

export const updateWorkshop = async (id: string, workshop: Partial<Workshop>): Promise<Workshop | null> => {
  const { data, error } = await supabase
    .from('workshops')
    .update(workshop)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating workshop:', error);
    return null;
  }

  return data as Workshop;
};

export const deleteWorkshop = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('workshops')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting workshop:', error);
    return false;
  }

  return true;
};

// Behind The Scenes API
export const getBehindTheScenesItems = async (): Promise<BehindTheScenes[]> => {
  const { data, error } = await supabase
    .from('behind_the_scenes')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching behind the scenes items:', error);
    return [];
  }

  return data as BehindTheScenes[];
};

export const getBehindTheScenesItem = async (id: string): Promise<BehindTheScenes | null> => {
  const { data, error } = await supabase
    .from('behind_the_scenes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching behind the scenes item:', error);
    return null;
  }

  return data as BehindTheScenes;
};

export const createBehindTheScenesItem = async (item: Omit<BehindTheScenes, 'id' | 'created_at' | 'updated_at'>): Promise<BehindTheScenes | null> => {
  const { data, error } = await supabase
    .from('behind_the_scenes')
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error('Error creating behind the scenes item:', error);
    return null;
  }

  return data as BehindTheScenes;
};

export const updateBehindTheScenesItem = async (id: string, item: Partial<BehindTheScenes>): Promise<BehindTheScenes | null> => {
  const { data, error } = await supabase
    .from('behind_the_scenes')
    .update(item)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating behind the scenes item:', error);
    return null;
  }

  return data as BehindTheScenes;
};

export const deleteBehindTheScenesItem = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('behind_the_scenes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting behind the scenes item:', error);
    return false;
  }

  return true;
};

// Storage API for file uploads
export const uploadFile = async (bucket: string, path: string, file: File): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;
  
  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Social Media API integrations
export const fetchInstagramPost = async (postUrl: string): Promise<any> => {
  // This would typically use Instagram Graph API
  // For demo purposes, we'll just parse the URL and return mock data
  const postId = postUrl.split('/').pop()?.split('?')[0];
  
  // In a real implementation, you'd use the Instagram Graph API to fetch the post data
  // For now, we'll simulate a successful response
  return {
    id: postId,
    media_type: 'IMAGE',
    media_url: 'https://placekitten.com/800/800',
    caption: 'Instagram post about placements or behind the scenes',
    timestamp: new Date().toISOString()
  };
};

export const fetchLinkedInPost = async (postUrl: string): Promise<any> => {
  // This would typically use LinkedIn API
  // For demo purposes, we'll just parse the URL and return mock data
  const postId = postUrl.split('/').pop()?.split('?')[0];
  
  // In a real implementation, you'd use the LinkedIn API to fetch the post data
  // For now, we'll simulate a successful response
  return {
    id: postId,
    content: 'LinkedIn post about expert sessions or workshops',
    author: 'DebugShala',
    timestamp: new Date().toISOString()
  };
};
