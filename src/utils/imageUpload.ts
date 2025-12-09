import { supabase } from '../lib/supabase';

export const uploadImage = async (file: File, folder: string = 'images'): Promise<string | null> => {
  try {
    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      // If bucket doesn't exist, return local preview URL
      return getImagePreview(file);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Image upload error:', error);
    // Fallback to local preview
    return getImagePreview(file);
  }
};

// For local file preview (before upload)
export const getImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

