# 🛡️ Sahan Subasinghe | Cybersecurity Portfolio

> **Live Website:** [https://sahan2636.github.io/SKS-Portfolio/](https://sahan2636.github.io/SKS-Portfolio/)

A high-tech, cyber-defense styled interactive portfolio showcasing cybersecurity projects, cloud defense laboratories (Azure Sentinel, Zero Trust, Kali Linux, Python automated tooling), technical certifications, and operational leadership.

---

## 🚀 Quick Deployment to GitHub Pages

This repository is pre-configured for instant deployment with **GitHub Pages**:

### Option 1: GitHub Actions (Recommended)
1. Go to your repository settings on GitHub: `Settings` > `Pages`.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Any push to `main` (or `master`) will automatically trigger the included workflow (`.github/workflows/static.yml`) to build and deploy the site!

### Option 2: Deploy from Branch
1. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
2. Under **Branch**, select `main` (or `master`) and `/ (root)`.
3. Click **Save**.

---

## 📂 Project Structure

```text
├── index.html                  # Main portfolio entry point
├── 404.html                    # Custom cyber-themed 404 error page
├── favicon.svg                 # Cyber shield vector favicon
├── .nojekyll                   # Disables Jekyll processing for raw static delivery
├── .gitattributes              # Line ending normalization
├── .github/
│   └── workflows/
│       └── static.yml          # Automated GitHub Pages CI/CD workflow
├── css/
│   └── style.css               # Core design system & responsive styling
├── js/
│   └── main.js                 # Canvas animations, interactive terminal & audio FX
├── assets/
│   ├── avatar.jpg              # Professional profile headshot
│   ├── azure_lab.jpg           # Azure SOC & Sentinel lab architecture
│   ├── kali_lab.jpg            # Offensive security & network scanning demo
│   └── sahan_subasinghe_resume.pdf  # Downloadable resume
└── resume_preview.png          # Resume visual snapshot
```

---

## ✨ Features & Highlights

- 🛡️ **Cyberpunk & SOC Aesthetics:** Dark-themed UI with particle canvas, glowing radar grids, and smooth glassmorphism.
- 💻 **Interactive Cyber CLI / Terminal:** Embedded interactive shell (`help`, `whoami`, `skills`, `projects`, `contact`, `clear`, etc.).
- 🔊 **Sound FX & Audio Toggles:** Synthesized audio telemetry feedback on actions with a mute switch.
- 🎨 **Matrix & High-Tech Mode:** Dynamic theme switcher toggling between Neon Cyan/Blue and Matrix Green.
- 📱 **100% Responsive:** Optimized for desktops, laptops, tablets, and smartphones.
- 📄 **Direct Resume Download & Preview:** Integrated PDF download buttons and modal viewer.

---

## 💻 Local Development & Testing

You can preview the site locally using any static web server:

### Using Python:
```bash
# Python 3
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

### Using Node / npx:
```bash
npx serve .
```

---

## 👤 Author

**Sahan Subasinghe**
- **Degree:** Cyber Security Undergraduate at Edith Cowan University (ECU)
- **Focus:** Cloud Security (Microsoft Azure), Network Defense, Penetration Testing, Threat Intelligence
- **Email:** [sahankurulu.s@gmail.com](mailto:sahankurulu.s@gmail.com)
- **Phone:** +94 71 095 2075
