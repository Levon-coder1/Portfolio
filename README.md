# Asher Jay Portfolio

Multi-page, responsive portfolio and gadget catalog with an iOS-style liquid glass vibe (white, orange, cream, black).

## Pages
- **Home**: Overview and quick links.
- **Projects**: Case-study cards.
- **Gadgets**: Catalog fed from `data/products.json`; each product links to its own detail page.
- **Product detail**: Dedicated page per gadget (driven by `slug` query param) with similar items.
- **Search**: Search and filter (category + price) across the catalog with shareable query params and all categories represented.
- **Socials**: Profile link placeholders by platform.
- **Hub**: Demo blog cards (phones, laptops, gadgets), delivery timing panel, and a glass suggestion box.
- **Contact**: Basic mailto form.

## Data & assets
- Gadget data lives in [`data/products.json`](data/products.json) with 10 sample products across phones, laptops, tablets, gaming, wearables, audio, cameras, consoles, monitors, and drones.
- Image placeholders live under [`images/gadgets`](images/gadgets). Replace with your own assets while keeping filenames or updating the JSON paths.

## Running locally
Open any of the HTML files in a browser. For fetch() to work locally, use a simple server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Responsiveness & navigation
- Sticky glass navigation with a hamburger menu below 900px.
- Grids collapse to single columns on small screens; typography uses `clamp()` for scaling.
- Dedicated product pages (not popups) and separate search results ensure clean mobile layouts.
