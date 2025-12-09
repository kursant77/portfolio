# Installation Guide

## 1. Dependencies o'rnatish

Quyidagi komandalarni bajarishingiz kerak:

```bash
npm install @supabase/supabase-js react-router-dom
```

Yoki PowerShell da muammo bo'lsa:

```powershell
powershell -ExecutionPolicy Bypass -Command "npm install @supabase/supabase-js react-router-dom"
```

## 2. Environment Variables

`.env` fayl yarating (loyiha root papkasida):

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Supabase Setup

Batafsil qo'llanma uchun `SUPABASE_SETUP.md` faylini ko'ring.

## 4. Development Server

```bash
npm run dev
```

## 5. Admin Panel

Admin panelga kirish:
- URL: `http://localhost:5173/admin/login`
- Supabase da yaratilgan user email va password bilan kiring

## Qo'shimcha Ma'lumot

- Barcha ma'lumotlar Supabase database dan olinadi
- Admin panel orqali barcha ma'lumotlarni boshqarishingiz mumkin
- Public sahifalar avtomatik ravishda database dan ma'lumotlarni ko'rsatadi

