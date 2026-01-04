# 🌟 Ade Naufal Rianto - Portfolio Website

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Network%20Engineer-0066cc?style=for-the-badge&logo=wifi&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel&logoColor=white)](https://wokding.github.io/ade-portfolio/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

**Professional portfolio showcasing 7+ years of network engineering expertise, certifications, and technical projects**

[View Demo](https://wokding.github.io/ade-portfolio/) • [Report Bug](https://github.com/wokding/ade-portfolio/issues) • [Request Feature](https://github.com/wokding/ade-portfolio/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Highlights](#-project-highlights)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Contact](#-contact)
- [License](#-license)

---

## 🎯 About

This is a modern, responsive portfolio website built to showcase my professional experience as a **Network Engineer** with expertise in:

- 🌐 Enterprise & Service Provider Networking
- 🔒 Network Security & High Availability
- 🛠️ Juniper Equipment (MX, EX, SRX Series)
- 📊 Network Monitoring & Documentation
- 🏅 Juniper Certifications (JNCIS-SP, JNCIA-Junos)

The portfolio features a clean, professional design with dark mode support, smooth animations, and comprehensive sections highlighting education, experience, certifications, and technical projects.

---

## ✨ Features

### 🎨 Design & UX
- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- 🌓 **Dark/Light Mode** - Toggle theme with persistent preference
- 🎭 **Smooth Animations** - Fade-in, scroll reveals, and transitions
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- ⚡ **Fast Loading** - Optimized assets and lazy loading

### 📱 Sections
- 👤 **Hero Section** - Professional introduction with quick actions
- 📝 **About & Cover Letter** - Detailed professional background
- 💼 **Experience Timeline** - 7+ years of career history
- 🎓 **Education** - Academic achievements with Cum Laude distinction
- 🏆 **Certifications** - Juniper & industry certifications
- 🛠️ **Technical Skills** - Categorized skill sets with filtering
- 🚀 **Projects & Achievements** - IoT, Web Development, Data Mining
- 📬 **Contact Form** - Integrated with Formspree for submissions

### 🎥 Interactive Elements
- 🎬 **Project Demos** - Video showcases hosted on GitHub Releases
- 🔍 **Modal Views** - Detailed project descriptions on click
- 🔽 **Lazy Loading** - On-demand video loading for performance
- 📊 **Filter System** - Category-based skill and project filtering
- 📄 **CV Download** - Direct PDF download link

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Styling
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=flat-square&logo=css3&logoColor=white)
![Responsive](https://img.shields.io/badge/Design-Responsive-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)

### Icons & Assets
![Lucide](https://img.shields.io/badge/Icons-Lucide-F56565?style=flat-square&logo=feather&logoColor=white)

### Deployment
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub%20Pages-222222?style=flat-square&logo=github&logoColor=white)
![GitHub Releases](https://img.shields.io/badge/Assets-GitHub%20Releases-181717?style=flat-square&logo=github&logoColor=white)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-Configured-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=flat-square&logo=git&logoColor=white)

---

## 🚀 Project Highlights

### 1️⃣ IoT-Based Smart Door Lock System
> **Arduino | C/C++ | Electronics**

<details>
<summary>📖 View Details</summary>

- Designed and implemented secure access control system
- Integrated multiple authentication methods (keypad, RFID)
- Developed firmware in C/C++ for microcontroller logic
- Real-time logging and monitoring capabilities
- [View Source Code →](https://github.com/wokding/arduino-doorlock-NEW)

</details>

### 2️⃣ Sales Information System (SIFO Penjualan)
> **PHP | MySQL | Web Development**

<details>
<summary>📖 View Details</summary>

- Full-featured POS and inventory management system
- Role-based access control for multiple user types
- Sales reporting with advanced filtering
- Responsive design with Bootstrap framework
- [View Source Code →](https://github.com/wokding/sifopenjualan)

</details>

### 3️⃣ Sales Data Mining Using Apriori Algorithm
> **Python | Data Mining | Business Intelligence**

<details>
<summary>📖 View Details</summary>

- Undergraduate thesis project - **Cum Laude** distinction
- Implemented Apriori algorithm for pattern discovery
- Analyzed pharmacy sales data for business insights
- Data visualization with Matplotlib/Seaborn
- Generated actionable recommendations for inventory optimization

</details>

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wokding/ade-portfolio.git
   cd ade-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_DOORLOCK_VIDEO_URL=https://github.com/wokding/ade-portfolio/releases/download/v1.0.0/doorlock-demo.mp4
   VITE_APRIORI_VIDEO_URL=https://github.com/wokding/ade-portfolio/releases/download/v1.0.0/apriori-demo.mp4
   VITE_SIFO_VIDEO_URL=https://github.com/wokding/ade-portfolio/releases/download/v1.0.0/sifo-demo.mp4
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173/ade-portfolio/
   ```

---

## 📦 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This automatically builds and deploys to GitHub Pages using `gh-pages`.

### Custom Domain Setup

To use a custom domain, add a `CNAME` file in the `public/` directory:
```
yourdomain.com
```

---

## 📧 Contact

**Ade Naufal Rianto**

[![Email](https://img.shields.io/badge/Email-adenaufalr%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:adenaufalr@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ade--naufal--rianto-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ade-naufal-rianto)
[![GitHub](https://img.shields.io/badge/GitHub-wokding-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/wokding)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-%2B62%20813%208543%206440-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://wa.me/6281385436440)

**Portfolio:** [wokding.github.io/ade-portfolio](https://wokding.github.io/ade-portfolio/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- Contact form powered by [Formspree](https://formspree.io/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Built with [React](https://react.dev/) & [Vite](https://vitejs.dev/)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by Ade Naufal Rianto**

[![GitHub followers](https://img.shields.io/github/followers/wokding?style=social)](https://github.com/wokding)
[![GitHub stars](https://img.shields.io/github/stars/wokding/ade-portfolio?style=social)](https://github.com/wokding/ade-portfolio/stargazers)

</div>
