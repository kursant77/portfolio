# Supabase Setup Guide

## 1. Supabase Project yaratish

1. [Supabase](https://supabase.com) ga kiring
2. Yangi project yarating
3. Project Settings > API dan `URL` va `anon public` key ni oling

## 2. Environment Variables

`.env` fayl yarating va quyidagilarni qo'shing:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Database Tables yaratish

Supabase SQL Editor da quyidagi SQL kodlarni ishga tushiring:

### Skills Table
```sql
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  github_url TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_uz TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Services Table
```sql
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_uz TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Contact Info Table
```sql
CREATE TABLE contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT,
  telegram_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### CV Info Table
```sql
CREATE TABLE cv_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  experience TEXT NOT NULL,
  projects_count TEXT NOT NULL,
  skills_count TEXT NOT NULL,
  cv_file_url TEXT NOT NULL,
  key_skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. Row Level Security (RLS) Policies

### Public Read Access (barcha jadvallar uchun)
```sql
-- Skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);

-- Contact Info
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read contact_info" ON contact_info FOR SELECT USING (true);

-- CV Info
ALTER TABLE cv_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read cv_info" ON cv_info FOR SELECT USING (true);

-- Contact Messages (faqat insert)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert messages" ON contact_messages FOR INSERT WITH CHECK (true);
```

### Admin Access (Authentication kerak)
```sql
-- Skills Admin
CREATE POLICY "Admin can manage skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- Projects Admin
CREATE POLICY "Admin can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Services Admin
CREATE POLICY "Admin can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Contact Info Admin
CREATE POLICY "Admin can manage contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');

-- CV Info Admin
CREATE POLICY "Admin can manage cv_info" ON cv_info FOR ALL USING (auth.role() = 'authenticated');
```

## 5. Storage Bucket va Policies Setup

### 5.1. Storage Bucket yaratish

1. Supabase Dashboard > Storage ga kiring
2. "Create a new bucket" tugmasini bosing
3. Bucket nomi: `portfolio-images`
4. Public bucket: **Yoqilgan** bo'lishi kerak (public files uchun)
5. File size limit: 10MB (yoki kerakli limit)
6. Allowed MIME types: `image/*, application/pdf` (yoki bo'sh qoldiring - barcha fayllar uchun)
7. "Create bucket" tugmasini bosing

### 5.2. Storage Policies (RLS) sozlash

Storage bucket yaratilgandan keyin, quyidagi SQL kodlarni Supabase SQL Editor da ishga tushiring:

```sql
-- Public read access (barcha foydalanuvchilar o'qishi mumkin)
CREATE POLICY "Public can view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-images');

-- Authenticated users can upload (admin panel uchun)
CREATE POLICY "Authenticated users can upload" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Authenticated users can update (admin panel uchun)
CREATE POLICY "Authenticated users can update" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Authenticated users can delete (admin panel uchun)
CREATE POLICY "Authenticated users can delete" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

**Yoki Supabase Dashboard orqali:**

1. Storage > `portfolio-images` bucket > Policies
2. "New Policy" tugmasini bosing
3. Har bir policy uchun:
   - **Policy name**: "Public can view images"
   - **Allowed operation**: SELECT
   - **Policy definition**: `bucket_id = 'portfolio-images'`
   - **Target roles**: `anon, authenticated`
   
   - **Policy name**: "Authenticated users can upload"
   - **Allowed operation**: INSERT
   - **Policy definition**: `bucket_id = 'portfolio-images' AND auth.role() = 'authenticated'`
   - **Target roles**: `authenticated`

   - **Policy name**: "Authenticated users can update"
   - **Allowed operation**: UPDATE
   - **Policy definition**: `bucket_id = 'portfolio-images' AND auth.role() = 'authenticated'`
   - **Target roles**: `authenticated`

   - **Policy name**: "Authenticated users can delete"
   - **Allowed operation**: DELETE
   - **Policy definition**: `bucket_id = 'portfolio-images' AND auth.role() = 'authenticated'`
   - **Target roles**: `authenticated`

### 5.3. Bucket Public qilish

1. Storage > `portfolio-images` bucket > Settings
2. "Public bucket" toggle ni **Yoqilgan** qiling
3. Saqlang

## 6. Authentication Setup

1. Supabase Dashboard > Authentication > Settings
2. Email auth yoqilgan bo'lishi kerak
3. Admin user yaratish:
   - Authentication > Users > Add User
   - Email va password kiriting
   - Bu user admin panelga kirish uchun ishlatiladi

## 7. Test Data

Test ma'lumotlarini qo'shish uchun:

```sql
-- Skills
INSERT INTO skills (name, level, icon, color) VALUES
('HTML', 95, 'Globe', 'from-orange-400 to-red-500'),
('CSS', 90, 'Palette', 'from-blue-400 to-blue-600'),
('JavaScript', 88, 'Code', 'from-yellow-400 to-yellow-600');

-- Contact Info
INSERT INTO contact_info (phone, email, github_url, telegram_url, linkedin_url) VALUES
('+998 90 003 37 23', 'kursant410@gmail.com', 'https://github.com', 'https://telegram.org', 'https://linkedin.com');
```

## 8. Icon Names

Skills va Services uchun icon nomlari Lucide React icon nomlari bo'lishi kerak:
- Code, Palette, Globe, Monitor, FileText, GraduationCap, Server, RefreshCw, MessageCircle, va boshqalar

To'liq ro'yxat: https://lucide.dev/icons/

