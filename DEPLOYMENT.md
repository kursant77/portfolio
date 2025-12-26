# Vercel Deployment Guide

Bu qo'llanma websaytni Vercel ga deploy qilish uchun batafsil ko'rsatmalar beradi.

## 📋 Talablar

- GitHub, GitLab yoki Bitbucket account
- Vercel account (https://vercel.com)
- Supabase project (ma'lumotlar uchun)

## 🚀 Deployment Qadamlari

### 1. GitHub Repository yaratish

Agar hali repository yaratmagan bo'lsangiz:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kursant77/portfolio.git
git push -u origin main
```

### 2. Vercel Account yaratish

1. [Vercel](https://vercel.com) ga kiring
2. "Sign Up" tugmasini bosing
3. GitHub/GitLab/Bitbucket orqali ro'yxatdan o'ting

### 3. Vercel da Project yaratish

1. Vercel Dashboard > "Add New Project"
2. GitHub repository ni tanlang
3. Project sozlamalarini tekshiring:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (avtomatik)
   - **Output Directory**: `dist` (avtomatik)
   - **Install Command**: `npm install` (avtomatik)

### 4. Environment Variables sozlash

Vercel Dashboard > Project Settings > Environment Variables ga kiring va quyidagilarni qo'shing:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Muhim**: Har bir environment (Production, Preview, Development) uchun alohida qo'shing.

### 5. Deploy qilish

1. "Deploy" tugmasini bosing
2. Vercel avtomatik ravishda:
   - Dependencies o'rnatadi
   - Build qiladi
   - Deploy qiladi
3. Bir necha daqiqadan keyin websayt tayyor bo'ladi!

## 🔧 Vercel CLI orqali Deploy

Agar CLI orqali deploy qilmoqchi bo'lsangiz:

```bash
# Vercel CLI o'rnatish
npm i -g vercel

# Login qilish
vercel login

# Deploy qilish
vercel

# Production ga deploy qilish
vercel --prod
```

## 🌐 Custom Domain sozlash

1. Vercel Dashboard > Project Settings > Domains
2. "Add Domain" tugmasini bosing
3. Domain nomini kiriting (masalan: `yourdomain.com`)
4. DNS sozlamalarini domain provider da sozlang:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`

## 🔄 Automatic Deployments

Vercel avtomatik ravishda:
- **Production**: `main` yoki `master` branch ga push qilganda
- **Preview**: Boshqa branch ga push qilganda

## 📝 Environment Variables

Production uchun environment variables:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Quyidagilarni qo'shing:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `your_anon_key` | Production, Preview, Development |

## 🐛 Muammolarni hal qilish

### Build xatoliklari

Agar build xatolik bersa:

1. Local da build qilib ko'ring:
   ```bash
   npm run build
   ```

2. Build loglarini tekshiring:
   - Vercel Dashboard > Deployments > Build Logs

### Routing muammolari

Agar routing ishlamasa, `vercel.json` faylini tekshiring. SPA routing uchun rewrite rules to'g'ri sozlangan bo'lishi kerak.

### Environment Variables muammolari

Agar environment variables ishlamasa:

1. Vercel Dashboard da to'g'ri sozlanganligini tekshiring
2. Redeploy qiling (Settings > Redeploy)
3. Browser console da xatoliklarni tekshiring

## 📊 Performance Monitoring

Vercel avtomatik ravishda:
- **Analytics**: Visitor statistics
- **Speed Insights**: Performance metrics
- **Logs**: Real-time logs

## 🔐 Security

- Environment variables Vercel da shifrlangan saqlanadi
- HTTPS avtomatik yoqilgan
- DDoS protection mavjud

## 📚 Qo'shimcha Resurslar

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Documentation](https://supabase.com/docs)

## ✅ Deployment Checklist

- [ ] GitHub repository yaratildi
- [ ] Vercel account yaratildi
- [ ] Project Vercel ga qo'shildi
- [ ] Environment variables sozlandi
- [ ] Build muvaffaqiyatli yakunlandi
- [ ] Websayt ishlayapti
- [ ] Custom domain sozlandi (ixtiyoriy)
- [ ] SSL sertifikat aktiv (avtomatik)

## 🎉 Tayyor!

Deployment muvaffaqiyatli yakunlangandan keyin, websayt global internetda mavjud bo'ladi!

**Deployment URL**: `https://your-project.vercel.app`

