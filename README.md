# Portfolio Website - Asadbek Jumanazarov

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Multi-language Support**: English, Uzbek, Russian
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Powered by Framer Motion
- **Contact Form**: Functional contact form
- **CV Download**: Download CV in PDF format
- **Modern UI/UX**: Clean and professional design

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React i18next
- Lucide React Icons

## 📋 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Navbar.tsx     # Navigation component
│   ├── Hero.tsx       # Hero section
│   ├── Skills.tsx     # Skills section
│   ├── Projects.tsx   # Projects showcase
│   ├── Services.tsx   # Services section
│   ├── CV.tsx         # CV section
│   ├── Contact.tsx    # Contact form
│   └── Footer.tsx     # Footer component
├── contexts/          # React contexts
│   └── ThemeContext.tsx # Theme management
├── i18n/             # Internationalization
│   └── index.ts      # Language configuration
├── App.tsx           # Main App component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🌍 Languages

- **English** (EN)
- **Uzbek** (UZ) - Default
- **Russian** (RU)

## 🔐 Admin Panel

Bu loyiha Supabase backend bilan ishlaydigan admin panelga ega. Admin panel orqali barcha ma'lumotlarni boshqarishingiz mumkin.

### Admin Panelga Kirish

1. `/admin/login` sahifasiga kiring
2. Supabase da yaratilgan admin user email va password bilan kiring
3. Admin dashboard da quyidagilarni boshqarishingiz mumkin:
   - **Skills**: Ko'nikmalar qo'shish, tahrirlash, o'chirish
   - **Projects**: Loyihalar qo'shish, tahrirlash, o'chirish
   - **Services**: Xizmatlar qo'shish, tahrirlash, o'chirish
   - **Contact**: Aloqa ma'lumotlarini tahrirlash
   - **CV**: CV ma'lumotlarini tahrirlash

### Supabase Setup

Batafsil qo'llanma uchun `SUPABASE_SETUP.md` faylini ko'ring.

### Environment Variables

`.env` fayl yarating va quyidagilarni qo'shing:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎨 Customization

### Adding New Projects

Edit the `projects` array in `src/components/Projects.tsx` and add corresponding translations in `src/i18n/index.ts`.

### Modifying Colors

Update the color scheme in `tailwind.config.js` to match your preferred brand colors.

### Adding New Sections

Create new components in the `src/components/` directory and import them in `App.tsx`.

## 📞 Contact Information

- **Phone**: +998 90 003 37 23
- **Email**: kursant410@gmail.com
- **GitHub**: [GitHub Profile]
- **Telegram**: [Telegram Profile]
- **LinkedIn**: [LinkedIn Profile]

## 🚀 Deployment

### Vercel ga Deploy qilish

1. GitHub repository ga push qiling
2. [Vercel](https://vercel.com) ga kiring va project yarating
3. Environment variables qo'shing:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy qiling!

Batafsil qo'llanma uchun `DEPLOYMENT.md` faylini ko'ring.

### Build Command

```bash
npm run build
```

Build fayllar `dist` papkasida yaratiladi.

## 📄 License

© 2025 Asadbek Jumanazarov. All rights reserved.