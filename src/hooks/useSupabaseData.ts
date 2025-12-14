import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Skill, Project, Service, ContactInfo, CVInfo } from '../types/database';
import { cache } from '../utils/cache';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSkills = useCallback(async () => {
<<<<<<< HEAD
=======
    // Check cache first
    const cached = cache.get<Skill[]>('skills');
    if (cached) {
      setSkills(cached);
      setLoading(false);
      // Fetch in background to update cache
      supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            setSkills(data);
            cache.set('skills', data);
          }
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('Error fetching skills:', error);
          }
        });
      return;
    }

>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<Skill[]>('skills');
      if (cached) {
        setSkills(cached);
        setLoading(false);
        // Fetch in background to update cache
        const { data, error: apiError } = await supabase
          .from('skills')
          .select('*')
          .order('created_at', { ascending: false });

        if (apiError) throw apiError;
        if (data) {
          setSkills(data);
          cache.set('skills', data);
        }
        return;
      }

      const { data, error: apiError } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });

      if (apiError) throw apiError;

      if (data) {
        setSkills(data);
        cache.set('skills', data);
      }
<<<<<<< HEAD
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch skills'));
=======
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching skills:', error);
      }
>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
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
<<<<<<< HEAD
=======
    // Check cache first
    const cached = cache.get<Project[]>('projects');
    if (cached) {
      setProjects(cached);
      setLoading(false);
      // Fetch in background to update cache
      supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            setProjects(data);
            cache.set('projects', data);
          }
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('Error fetching projects:', error);
          }
        });
      return;
    }

>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<Project[]>('projects');
      if (cached) {
        setProjects(cached);
        setLoading(false);
        // Fetch in background to update cache
        const { data, error: apiError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (apiError) throw apiError;
        if (data) {
          setProjects(data);
          cache.set('projects', data);
        }
        return;
      }

      const { data, error: apiError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (apiError) throw apiError;

      if (data) {
        setProjects(data);
        cache.set('projects', data);
      }
<<<<<<< HEAD
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
=======
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching projects:', error);
      }
>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
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
<<<<<<< HEAD
=======
    // Check cache first
    const cached = cache.get<Service[]>('services');
    if (cached) {
      setServices(cached);
      setLoading(false);
      // Fetch in background to update cache
      supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            setServices(data);
            cache.set('services', data);
          }
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('Error fetching services:', error);
          }
        });
      return;
    }

>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<Service[]>('services');
      if (cached) {
        setServices(cached);
        setLoading(false);
        // Fetch in background to update cache
        const { data, error: apiError } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (apiError) throw apiError;
        if (data) {
          setServices(data);
          cache.set('services', data);
        }
        return;
      }

      const { data, error: apiError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (apiError) throw apiError;

      if (data) {
        setServices(data);
        cache.set('services', data);
      }
<<<<<<< HEAD
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
=======
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching services:', error);
      }
>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
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
<<<<<<< HEAD
=======
    // Check cache first
    const cached = cache.get<ContactInfo>('contact_info');
    if (cached) {
      setContactInfo(cached);
      setLoading(false);
      // Fetch in background to update cache
      supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setContactInfo(data);
            cache.set('contact_info', data);
          }
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('Error fetching contact info:', error);
          }
        });
      return;
    }

>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<ContactInfo>('contact_info');
      if (cached) {
        setContactInfo(cached);
        setLoading(false);
        // Fetch in background to update cache
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
        return;
      }

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
<<<<<<< HEAD
    } catch (err) {
      console.error('Error fetching contact info:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch contact info'));
=======
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching contact info:', error);
      }
>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
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
<<<<<<< HEAD
=======
    // Check cache first
    const cached = cache.get<CVInfo>('cv_info');
    if (cached) {
      setCvInfo(cached);
      setLoading(false);
      // Fetch in background to update cache
      supabase
        .from('cv_info')
        .select('*')
        .limit(1)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setCvInfo(data);
            cache.set('cv_info', data);
          }
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('Error fetching CV info:', error);
          }
        });
      return;
    }

>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<CVInfo>('cv_info');
      if (cached) {
        setCvInfo(cached);
        setLoading(false);
        // Fetch in background to update cache
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
        return;
      }

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
<<<<<<< HEAD
    } catch (err) {
      console.error('Error fetching CV info:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch CV info'));
=======
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching CV info:', error);
      }
>>>>>>> 59da6ca4d660c6e9bc8ba040161ae194dacbc7a8
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCVInfo();
  }, [fetchCVInfo]);

  return { cvInfo, loading, error, refetch: fetchCVInfo };
}
