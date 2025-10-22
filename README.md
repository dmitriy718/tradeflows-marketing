# TradeFlows Marketing Website

Professional marketing website for TradeFlows Pro trading platform.

## Features

- Modern React-based single-page application
- TF Shield logo with "TRADEFLOWS PRO" branding
- Responsive design with mobile navigation
- Interactive product tour and live trading simulator
- SEO optimized with meta tags and sitemap
- Integration with app.tradeflows.net

## Tech Stack

- React 18
- React Router
- Vite (build tool)
- CSS3 with modern animations

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is deployed to: https://tradeflows.net

To deploy:
1. Build the project: `npm run build`
2. Upload `dist/` contents to `/var/www/tradeflows.net/` on VPS
3. Reload nginx: `systemctl reload nginx`

## Project Structure

```
tradeflows-marketing/
├── public/          # Static assets (logos, images)
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── dist/            # Production build output
└── package.json     # Dependencies and scripts
```

## Version History

- **Oct 22, 2024**: Clean version with TF Shield logo deployed
- **Oct 17, 2024**: Interactive features and mobile navigation fixes
- **Oct 9, 2024**: Initial feature-complete version

## License

Copyright © 2024 TradeFlows Professional. All rights reserved.
