import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Skill, Project, Service, ContactInfo, CVInfo } from '../types/database';
import { cache } from '../utils/cache';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
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
        .catch((error) => console.error('Error fetching skills:', error));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setSkills(data);
        cache.set('skills', data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, refetch: fetchSkills };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
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
        .catch((error) => console.error('Error fetching projects:', error));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setProjects(data);
        cache.set('projects', data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, refetch: fetchProjects };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
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
        .catch((error) => console.error('Error fetching services:', error));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setServices(data);
        cache.set('services', data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, refetch: fetchServices };
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContactInfo = useCallback(async () => {
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
        .catch((error) => console.error('Error fetching contact info:', error));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();
      
      if (!error && data) {
        setContactInfo(data);
        cache.set('contact_info', data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  return { contactInfo, loading, refetch: fetchContactInfo };
}

export function useCVInfo() {
  const [cvInfo, setCvInfo] = useState<CVInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCVInfo = useCallback(async () => {
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
        .catch((error) => console.error('Error fetching CV info:', error));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cv_info')
        .select('*')
        .limit(1)
        .single();
      
      if (!error && data) {
        setCvInfo(data);
        cache.set('cv_info', data);
      }
    } catch (error) {
      console.error('Error fetching CV info:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCVInfo();
  }, [fetchCVInfo]);

  return { cvInfo, loading, refetch: fetchCVInfo };
}

