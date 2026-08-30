<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60" alt="React" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://vitejs.dev/logo.svg" width="60" alt="Vite" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" width="60" alt="Cloudflare" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="[[5%29.https://upload.wikimedia.org/wikipedia/commons/b/b2/YouTube_logo_%282013-201png](https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original)](https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original)" width="60" alt="YouTube" />
</div>

<h1 align="center">AutoTube Pipeline 🚀</h1>

<p align="center">
  <strong>A highly optimized, AI-powered YouTube publishing pipeline.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Backend-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare" />
  <img src="https://img.shields.io/badge/API-YouTube%20v3-FF0000?style=for-the-badge&logo=youtube" />
</p>

## ✨ Overview

AutoTube Pipeline is a self-hosted, serverless web application that takes your video file and transcript, uses a Large Language Model (LLM) to generate highly-optimized YouTube metadata (titles, descriptions, tags, and chapters), and seamlessly schedules the video upload via the YouTube Data API.

Instead of being locked into a specific AI provider, this pipeline is **LLM-agnostic**. You can configure *any* OpenAI-compatible API endpoint directly in your browser!

## 🌟 Key Features

- **🎨 Premium UI/UX:** Built with Tailwind CSS, featuring deep dark mode, neon glows, glassmorphism, and buttery-smooth micro-interactions.
- **🧠 Bring Your Own AI (BYOAI):** Configure any API URL and API Key in the browser's session storage. Use OpenAI, Anthropic (via proxies), local models (Ollama/LMStudio), or any compatible endpoint.
- **⚡ Edge Backend:** Powered entirely by Cloudflare Pages Functions (`/functions`). No Node.js server or Express required—everything runs at the edge.
- **📈 Metadata Review Dashboard:** Review multiple AI-generated title options and a rich text description with inferred timestamps before publishing.
- **🚀 One-Click Publishing:** Direct chunked uploads to YouTube with customizable visibility (Private/Schedule).

---

## 🛠️ Tech Stack & Architecture

| Category | Technology |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/) (Icons) |
| **Serverless Backend** | [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) (Edge Runtime) |
| **Integrations** | YouTube Data API v3, OpenAI-compatible REST APIs |

---

## 🚀 Getting Started & Building Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A YouTube Data API v3 token (OAuth credentials)
- An AI API Key (OpenAI, etc.)

### 1. Clone the Repository
```bash
git clone https://github.com/90renrocraftcracksblogspotcom/autotube-pipeline.git
cd autotube-pipeline
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Local Development
Run the Vite development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`. 
*(Note: To test Cloudflare Pages Functions locally, you may need to use [Wrangler](https://developers.cloudflare.com/workers/wrangler/): `npx wrangler pages dev dist`)*

### 4. Build for Production
To generate the static frontend assets into the `dist/` folder:
```bash
npm run build
```

---

## ☁️ Deployment (Cloudflare Pages)

This project is structured specifically for **Cloudflare Pages**.

1. Connect your GitHub repository to Cloudflare Pages.
2. Set the build command to `npm run build`.
3. Set the build output directory to `dist`.
4. Cloudflare will automatically detect the `/functions` directory at the root and deploy your Edge serverless backend!

---

## ⚙️ Configuration

Click the **Settings (⚙️)** icon in the top right corner of the dashboard to configure your API endpoint.
- **API URL:** E.g., `https://api.openai.com/v1/chat/completions` or `http://localhost:11434/v1/chat/completions` (for local models).
- **API Key:** Your secret token (stored securely only in your browser's `sessionStorage`).

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**. 
See the [LICENSE.txt](LICENSE.txt) file for detailed terms.
