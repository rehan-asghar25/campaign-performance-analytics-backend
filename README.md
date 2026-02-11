Campaign Performance Analytics Backend

This project is part of a backend engineering learning and delivery journey.

Purpose

To ingest marketing campaign data via CSV uploads, process performance metrics, and expose analytics APIs with support for caching, compression, and content negotiation.

---

✅ Implemented Features

- CSV upload via `multipart/form-data`
- Bulk campaign data ingestion (8,000+ records tested)
- Campaign performance aggregation (totals & derived metrics)
- Content negotiation (JSON & CSV export)
- Cache-Control headers for report caching
- Clean layered architecture (Routes → Controllers → Services → Utils)
- Feature-branch based Git workflow

---

🚧 Upcoming Features

- HTTP compression (gzip / brotli)
- Custom middleware for analytics tracking
- Formal schema validation
- Extended campaign segmentation metrics

---

📊 API Endpoints

Upload Campaign Data

POST /campaigns/upload  
Content-Type: multipart/form-data  

---

Get Campaign Report

GET /campaigns/report  

Supports:
- application/json (default)
- text/csv via Accept header

---

🛠 Tech Stack

- Node.js
- Express.js
- Multer (file upload handling)
- Custom CSV parsing & aggregation logic

---

📌 Status

Core ingestion and reporting engine implemented.  
Currently enhancing performance and observability features.
