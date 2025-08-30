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

## 📄 License

© 2025 Asadbek Jumanazarov. All rights reserved.