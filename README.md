# AutoTube Pipeline

AutoTube Pipeline is a self-hosted web application designed to take a video and its transcript, use an LLM to generate highly optimized metadata, and schedule the upload directly to YouTube via their API.

## Features
- **Sleek UI**: Inspired by modern tools, featuring dark mode, neon glows, and glassmorphism.
- **Customizable AI Backend**: Instead of forcing a specific API, you can connect *any* OpenAI-compatible API URL and your own API key right from the browser session.
- **Automated YouTube Pipeline**: Easily draft SEO-friendly titles and descriptions, then push straight to YouTube.

## Tech Stack
- Frontend: React (Vite) + TypeScript + Tailwind CSS
- Backend: Cloudflare Pages Functions (Edge-compatible)

## Setup
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the local development server

## License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. For more details, see the [LICENSE.txt](LICENSE.txt) file in this repository.
