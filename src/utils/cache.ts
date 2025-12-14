// Simple cache utility for Supabase data
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const cache = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;
      
      const parsed: CacheItem<T> = JSON.parse(item);
      const now = Date.now();
      
      // Check if cache is expired
      if (now - parsed.timestamp > CACHE_DURATION) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
      
      return parsed.data;
    } catch {
      return null;
    }
  },
  
  set<T>(key: string, data: T): void {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch {
      // Ignore errors
    }
  },
  
  clear(key?: string): void {
    if (key) {
      localStorage.removeItem(`cache_${key}`);
    } else {
      // Clear all cache
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('cache_')) {
          localStorage.removeItem(k);
        }
      });
    }
  },
};

