# Sailing Adventure - Croatia Promo Website

A mobile-first promotional website for sailing adventures in Croatia. Features an elegant, swipeable gallery of Croatian islands, boat specifications, and FAQ section.

## Features

- **Mobile-First Design**: Optimized for iOS and Android with safe-area support
- **PWA Ready**: Installable as a Progressive Web App with manifest and service worker support
- **Accessible**: Full ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Vanilla JavaScript, no dependencies, lazy loading ready
- **Interactive Gallery**: Swipeable lightbox with touch gestures
- **Tab Navigation**: Gallery, Boat Info, and FAQ sections
- **Responsive**: Adapts from mobile (320px) to desktop (1920px+)

## Tech Stack

- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern features (CSS Grid, Flexbox, CSS Variables, env() for notches)
- **Vanilla JavaScript**: No frameworks, no dependencies
- **PWA**: Web App Manifest, installable on mobile

## Project Structure

```
sailing-promo/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── css/
│   └── style.css      # All styles (mobile-first)
├── js/
│   └── app.js         # Tab navigation, gallery, FAQ logic
└── images/
    └── .gitkeep       # Placeholder (currently using gradient placeholders)
```

## Running Locally

### Option 1: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open http://localhost:8000

### Option 2: Node.js HTTP Server

```bash
npx serve .
```

### Option 3: VS Code Live Server

Install the "Live Server" extension and click "Go Live" in the status bar.

## Deploying

### Netlify

1. Drop the entire folder on [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your Git repository:
   ```bash
   # No build command needed - static site
   Base directory: /
   Publish directory: /
   ```

### Vercel

```bash
vercel --prod
```

Or connect your GitHub repository in the Vercel dashboard.

### Cloudflare Pages

1. Connect your Git repository
2. Build settings:
   - Build command: (leave empty)
   - Build output directory: `/`

## Browser Support

- **iOS Safari**: 12.2+ (for CSS env() safe-area-inset)
- **Chrome/Edge**: Last 2 versions
- **Firefox**: Last 2 versions
- **Samsung Internet**: Last 2 versions

## Customization

### Updating Telegram Link

Edit `index.html` line ~309:

```html
<a href="https://t.me/sailingcroatia" class="cta-button" ...>
```

Replace `sailingcroatia` with your actual Telegram username or group link.

### Changing Colors

Edit CSS variables in `css/style.css` (lines 7-18):

```css
:root {
  --color-primary: #2563EB;        /* Main blue accent */
  --color-primary-light: #3B82F6;  /* Hover state */
  --color-primary-dark: #1D4ED8;   /* Active state */
  --color-text: #1E293B;           /* Main text */
  /* ... */
}
```

### Adding Real Images

The gallery currently uses CSS gradients as placeholders. To add real images:

1. Add images to the `images/` folder
2. Update gallery cards in `index.html`:

```html
<div class="gallery-card"
  style="background-image: url('images/hvar.jpg'); background-size: cover;"
  data-img="images/hvar.jpg"
  ...>
```

## Performance Checklist

- [ ] Images optimized (WebP format, max 800px width for gallery)
- [ ] Favicon set (currently using emoji SVG)
- [ ] Manifest.json linked
- [ ] Meta tags for SEO and social sharing
- [ ] Safe-area-inset for iPhone notch support
- [ ] Accessibility tested with screen reader
- [ ] Tested on real iOS and Android devices

## Accessibility Features

- Semantic HTML5 elements (`<nav>`, `<section>`, `<button>`)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Focus indicators for keyboard users
- Proper heading hierarchy (h1, h2, h3)
- `aria-expanded` states for FAQ accordion
- `aria-live` regions for dynamic content
- Respects `prefers-reduced-motion` for animations

## License

MIT License - feel free to use for your own sailing adventures!

## Contact

For inquiries: [@sailingcroatia](https://t.me/sailingcroatia) on Telegram
