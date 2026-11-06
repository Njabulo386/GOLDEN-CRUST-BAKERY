# Golden Crust Bakery Website

## Student Information
- Name: Njabulo Zondi
- Student number: ST10534338
- Subject: Web Development (WEDE5020) POE
- Live site: [Paste your Netlify / GitHub Pages link here]

## Project Overview
A five-page responsive website for Golden Crust Bakery, a fictional family bakery with three Johannesburg branches (Melville, Rosebank, Fourways). One proposal was written and approved for this organisation. The site was built in three parts: HTML structure (Part 1), CSS and responsive design (Part 2) and JavaScript, SEO and forms (Part 3).

## Website Goals and Objectives
- Generate online enquiries for custom cakes and catering.
- Improve local search visibility and traffic.
- Give clear product, price and branch information.
- KPIs: 1 500 visitors per month, 60 enquiries per month, bounce rate below 50%, mobile load under 3 seconds.

## Key Features and Functionality
- Shared navigation, header and footer on all pages
- Hero, gallery with lightbox, FAQ accordion (index.html)
- Tabs for mission, vision and values (about.html)
- Products loaded dynamically with search, filter and sort (products.html)
- Enquiry form with validation, cost estimate and availability (enquiry.html)
- Contact form with validation, AJAX submit and mailto fallback, plus Leaflet map with 3 branches (contact.html)

## Timeline and Milestones
| Week | Milestone |
|---|---|
| 1 | Proposal, research, folder structure, HTML pages (Part 1) |
| 2-3 | CSS and responsive design (Part 2) |
| 4-5 | JavaScript, SEO, forms, deployment (Part 3) |

## Sitemap
![Sitemap](docs/sitemap.png)

Folder structure: `index.html, about.html, products.html, enquiry.html, contact.html, css/, js/, images/, docs/, robots.txt, sitemap.xml`

## Part 1 Details
Semantic HTML5 (header, nav, main, footer), five linked pages, commented and indented code, original images (no licensing needed), proposal in `docs/`.

## Part 2 Details
- External stylesheet `css/style.css` linked on all pages, with a CSS reset and base styles
- Typography scale, Flexbox and Grid layouts, hover/focus/active states
- Breakpoints: desktop, tablet (max 992px), mobile (max 600px); relative units (rem, em, %)
- Responsive images using `srcset`, `sizes` and `<picture>`

**Responsive screenshot evidence:** add desktop, tablet and mobile screenshots here (browser DevTools).
<!-- ![Desktop](docs/screenshot-desktop.png) ![Tablet](docs/screenshot-tablet.png) ![Mobile](docs/screenshot-mobile.png) -->

## Part 3 Details
- JavaScript: accordion, tabs, lightbox, reveal animation, dynamic product search/filter/sort, DOM manipulation
- SEO: unique titles and meta descriptions, keywords, one h1 per page, alt text, descriptive file names, canonical links, internal links, mobile-friendly, `robots.txt`, `sitemap.xml`; local SEO via branch names
- Off-page SEO plan: Google Business Profile, local directory backlinks, Instagram and Facebook promotion
- Security: `_headers` file (nosniff, frame deny, referrer policy), HTML escaping of user input, `rel="noopener"` on external links
- Forms: HTML5 attributes plus JavaScript validation (SA phone format, email, dates, character lengths), error messages, AJAX submission
- Deployment: Netlify (or GitHub Pages). Replace the placeholder live-site link above.

## Changelog
| Date | Part | Change |
|---|---|---|
| [date] | 1 | Created proposal, folder structure and five HTML pages |
| [date] | 2 | Added external stylesheet, layout and responsive breakpoints |
| [date] | 3 | Added JavaScript features, SEO files, validated forms and deployment |
| [date] | Feedback | Add an entry here for every correction made after lecturer feedback, with detail |

## References
- Google (n.d.) *SEO starter guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 6 November 2026).
- Leaflet (n.d.) *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com (Accessed: 6 November 2026).
- Mozilla Developer Network (n.d.) *HTML: HyperText Markup Language*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML (Accessed: 6 November 2026).
- Netlify (n.d.) *Netlify docs*. Available at: https://docs.netlify.com (Accessed: 6 November 2026).
- OpenStreetMap contributors (n.d.) *OpenStreetMap*. Available at: https://www.openstreetmap.org (Accessed: 6 November 2026).
- Images: all illustrations were created by the student for this project (original work).
