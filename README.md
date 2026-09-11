# Devotion — Bootstrap 5 Mega Menu Header

A responsive header/navigation component built with **Bootstrap 5**, matching the
reference layout (About Us, Services, E-Shop/E-Commerce Solutions, Technology,
Portfolio, Resources) plus **Home** and **Careers** links.

## Files
```
devotion-header/
├── index.html      → header markup + demo page
├── css/style.css   → custom theme (color, font, mega-menu styling)
├── js/script.js     → hover-to-open behavior on desktop
└── README.md
```

## Tech
- Bootstrap 5.3.3 (via CDN)
- Bootstrap Icons 1.11.3 (via CDN)
- Google Font: **Poppins**
- Primary color: **#b38f51**

## How to use
1. Unzip the folder.
2. Open `index.html` in any browser (internet connection needed the first time,
   to load Bootstrap/Poppins/icons from their CDNs).
3. Copy the `<header>...</header>` block plus `css/style.css` and `js/script.js`
   into your own project, and update the `<a href="#">` links to your real pages.

## Notes
- On desktop (≥992px) menus open on hover; on mobile/tablet they use Bootstrap's
  standard collapsible navbar with tap-to-open dropdowns.
- The "E-Shop/E-Commerce Solutions" menu is a larger mega-panel grouped into
  Operations & Logistics, Sales & Marketing, Finance & Analytics, and Customer
  Support sections, matching the reference design.
- All colors are driven by CSS variables at the top of `style.css` — change
  `--gold` there to re-theme the whole header.
