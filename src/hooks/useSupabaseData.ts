import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Skill, Project, Service, ContactInfo, CVInfo, AboutSection } from '../types/database';
import { cache } from '../utils/cache';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<Skill[]>('skills');
      if (cached) {
        setSkills(cached);
        setLoading(false);
        // Fetch in background to update cache
        Promise.resolve(
          supabase
            .from('skills')
            .select('*')
            .order('created_at', { ascending: false })
        )
          .then(({ data, error: apiError }) => {
            if (!apiError && data) {
              setSkills(data);
              cache.set('skills', data);
            }
          })
          .catch((err: unknown) => {
            if (import.meta.env.DEV) {
              console.error('Error fetching skills in background:', err);
            }
          });
        return; // Return immediately with cached data
      }

      // If no cache, or initial fetch
      const { data, error: apiError } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });

      if (apiError) throw apiError;

      if (data) {
        setSkills(data);
        cache.set('skills', data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching skills:', err);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch skills'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, error, refetch: fetchSkills };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<Project[]>('projects');
      if (cached) {
        setProjects(cached);
        setLoading(false);
        // Fetch in background to update cache
        Promise.resolve(
          supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
        )
          .then(({ data, error: apiError }) => {
            if (!apiError && data) {
              setProjects(data);
              cache.set('projects', data);
            }
          })
          .catch((err: unknown) => {
            if (import.meta.env.DEV) {
              console.error('Error fetching projects in background:', err);
            }
          });
        return; // Return immediately with cached data
      }

      // If no cache, or initial fetch
      const { data, error: apiError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (apiError) throw apiError;

      if (data) {
        setProjects(data);
        cache.set('projects', data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching projects:', err);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<Service[]>('services');
      if (cached) {
        setServices(cached);
        setLoading(false);
        // Fetch in background to update cache
        Promise.resolve(
          supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false })
        )
          .then(({ data, error: apiError }) => {
            if (!apiError && data) {
              setServices(data);
              cache.set('services', data);
            }
          })
          .catch((err: unknown) => {
            if (import.meta.env.DEV) {
              console.error('Error fetching services in background:', err);
            }
          });
        return; // Return immediately with cached data
      }

      // If no cache, or initial fetch
      const { data, error: apiError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (apiError) throw apiError;

      if (data) {
        setServices(data);
        cache.set('services', data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching services:', err);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContactInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<ContactInfo>('contact_info');
      if (cached) {
        setContactInfo(cached);
        setLoading(false);
        // Fetch in background to update cache
        Promise.resolve(
          supabase
            .from('contact_info')
            .select('*')
            .limit(1)
            .single()
        )
          .then(({ data, error: apiError }) => {
            if (!apiError && data) {
              setContactInfo(data);
              cache.set('contact_info', data);
            }
          })
          .catch((err: unknown) => {
            if (import.meta.env.DEV) {
              console.error('Error fetching contact info in background:', err);
            }
          });
        return; // Return immediately with cached data
      }

      // If no cache, or initial fetch
      const { data, error: apiError } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (apiError) throw apiError;

      if (data) {
        setContactInfo(data);
        cache.set('contact_info', data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching contact info:', err);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch contact info'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  return { contactInfo, loading, error, refetch: fetchContactInfo };
}

export function useCVInfo() {
  const [cvInfo, setCvInfo] = useState<CVInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCVInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<CVInfo>('cv_info');
      if (cached) {
        setCvInfo(cached);
        setLoading(false);
        // Fetch in background to update cache
        Promise.resolve(
          supabase
            .from('cv_info')
            .select('*')
            .limit(1)
            .single()
        )
          .then(({ data, error: apiError }) => {
            if (!apiError && data) {
              setCvInfo(data);
              cache.set('cv_info', data);
            }
          })
          .catch((err: unknown) => {
            if (import.meta.env.DEV) {
              console.error('Error fetching CV info in background:', err);
            }
          });
        return; // Return immediately with cached data
      }

      // If no cache, or initial fetch
      const { data, error: apiError } = await supabase
        .from('cv_info')
        .select('*')
        .limit(1)
        .single();

      if (apiError) throw apiError;

      if (data) {
        setCvInfo(data);
        cache.set('cv_info', data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching CV info:', err);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch CV info'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCVInfo();
  }, [fetchCVInfo]);

  return { cvInfo, loading, error, refetch: fetchCVInfo };
}

export function useAboutSection() {
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAboutData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<AboutSection>('about_section');
      if (cached) {
        setAboutData(cached);
        setLoading(false);
        // Fetch in background to update cache
        Promise.resolve(
          supabase
            .from('about_section')
            .select('*')
            .limit(1)
            .single()
        )
          .then(({ data, error: apiError }) => {
            if (!apiError && data) {
              setAboutData(data);
              cache.set('about_section', data);
            }
          })
          .catch((err: unknown) => {
            if (import.meta.env.DEV) {
              console.error('Error fetching about section in background:', err);
            }
          });
        return; // Return immediately with cached data
      }

      // If no cache, or initial fetch
      const { data, error: apiError } = await supabase
        .from('about_section')
        .select('*')
        .limit(1)
        .single();

      if (apiError) throw apiError;

      if (data) {
        setAboutData(data);
        cache.set('about_section', data);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error fetching about section:', err);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch about section'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  return { aboutData, loading, error, refetch: fetchAboutData };
}
