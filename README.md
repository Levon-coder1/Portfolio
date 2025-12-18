# Asher Jay Portfolio

Multi-page, responsive portfolio and gadget catalog with a glossy white/orange/cream/black theme.

## Pages
- **Home**: Overview and quick links.
- **Projects**: Case-study cards.
- **Gadgets**: Catalog fed from `data/products.json`; each product links to its own detail page.
- **Product detail**: Dedicated page per gadget (driven by `slug` query param) with similar items.
- **Search**: Search and filter (category + price) across the catalog with shareable query params.
- **Socials**: Profile link placeholders by platform.
- **Hub**: Blog, maps, and suggestions placeholders.
- **Contact**: Basic mailto form.

## Data & assets
- Gadget data lives in [`data/products.json`](data/products.json). Edit or add products there without touching markup.
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
