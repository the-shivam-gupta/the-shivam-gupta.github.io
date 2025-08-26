## Riku Sato — Portfolio

A responsive single‑page portfolio website built with HTML, CSS and JavaScript.

### Features

- Responsive layout with smooth scrolling navigation
- Intro splash screen with animated name
- Typed hero tagline using Typed.js
- Project cards with hover effects
- Skills section with icons
- Back‑to‑top button
- Contact form with inline validation and alerts

### Tech Stack

- HTML5, CSS3
- JavaScript (vanilla) + jQuery (for small interactions)
- Typed.js
- Font Awesome
- Google Fonts (Merriweather, Poppins)

### Getting Started

Option A: Open directly
1. Open `index.html` in your browser.

Option B: Serve locally
1. Open a terminal in the `portfolio` directory.
2. Using Node.js:
```bash
npx serve -s .
```
   or using Python:
```bash
python -m http.server 5500
```
3. Visit `http://localhost:5500` (or the URL shown by your server).

### Project Structure

- `index.html` — markup and inline scripts for the landing page
- `style.css` — all styles, animations and responsive rules
- `script.js` — scroll reveal, back‑to‑top, smooth navigation
- `public/` — icons, images, video, audio, and resume PDF

### Customization

- Name and tagline: update the hero text in `index.html`.
- Typed text: edit the `strings` array used by Typed.js in `index.html`.
- Resume link: place your resume at `public/RikuSatoresume.pdf` or change the `href` in `index.html`.
- Social links: update GitHub/LinkedIn/email URLs in `index.html`.
- Projects: replace links, titles, and descriptions in the Projects section of `index.html`.
- Skills: adjust icons and labels in the Skills section and assets in `public/`.

### Deployment

This is a static site. You can deploy it to any static hosting service, such as GitHub Pages, Netlify, or Vercel. Upload the contents of the `portfolio` directory.

### Feedback

Suggestions and improvements are welcome. If you find an issue, please open one or submit a PR. If you like the project, a star is appreciated.


