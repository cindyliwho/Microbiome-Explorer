# 🦠 Microbiome Explorer

An interactive web dashboard for exploring bacterial diversity across human samples. Select a test subject to visualize their unique microbial profile — including the most abundant bacterial species, full sample distributions, and hygiene patterns.

🔗 **[Live Demo → microbiome-explorer.netlify.app](https://microbiome-explorer.netlify.app/)**

![Dashboard Screenshot](Screenshot.png) 

---

## Features

- **Subject Selector** — Dropdown to browse individual test subject profiles
- **Top 10 OTUs Bar Chart** — Horizontal bar chart showing the 10 most abundant bacterial species (Operational Taxonomic Units) per sample
- **Bubble Chart** — Full sample visualization where bubble size = abundance and color = OTU ID
- **Wash Frequency Gauge** — Gauge chart displaying the subject's weekly belly button washing frequency
- **Demographic Panel** — Displays subject metadata including age, ethnicity, location, and gender

All charts update dynamically on subject selection with smooth Plotly rendering.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Data Loading** | D3.js |
| **Visualization** | Plotly.js |
| **Layout & Styling** | HTML5, CSS3, Bootstrap |
| **Logic** | Vanilla JavaScript |
| **Hosting** | Netlify (auto-deploys from GitHub) |

---
## Data

The dashboard uses the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels. The research found that a small handful of microbial species (OTUs) were present in more than 70% of people, while the rest were relatively rare.

The dataset contains:
- **`names`** — List of anonymized test subject IDs
- **`metadata`** — Demographics per subject (age, gender, ethnicity, location, wash frequency)
- **`samples`** — OTU IDs, bacterial labels, and abundance values per subject

Data is fetched from a hosted JSON endpoint at runtime, with a local `samples.json` included as a fallback.

---

## Performance Optimization

- **Data caching** — The dataset is fetched once on page load and cached in memory, eliminating redundant network requests on every dropdown change
- **Responsive charts** — All Plotly visualizations are configured with `{ responsive: true }` for proper scaling across screen sizes
- **Transparent backgrounds** — Charts use `rgba(0,0,0,0)` backgrounds to blend seamlessly with the card-based UI
