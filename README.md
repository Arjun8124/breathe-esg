# Breathe ESG

A full-stack data normalization tool for ESG (Environmental, Social, Governance) reporting. Upload CSV files from different sources — SAP, utility bills, travel logs — and the app normalizes them into a single schema, flags suspicious entries, and lets you approve or reject records through a clean dashboard.

**Live:** [breathe-esg-wheat.vercel.app](https://breathe-esg-wheat.vercel.app)  
**Backend API:** [breathe-esg-vkx3.onrender.com](https://breathe-esg-vkx3.onrender.com)

## How It Works

1. **Upload** a CSV file and pick the source type (SAP / Utility / Travel)
2. The backend **parses and normalizes** each row into a common format
3. Records with odd values (negative quantities, unknown travel modes) get **flagged as suspicious**
4. **Review** records on the dashboard — approve, reject, or delete them

## Screenshots

![Upload & Pending Records](screenshots/dashboard.png)

![Approved & Rejected Records](screenshots/records.png)

## Tech Stack

| Layer    | Tech                                  |
|----------|---------------------------------------|
| Frontend | React 19, Vite, Axios                |
| Backend  | FastAPI, SQLAlchemy, Pandas           |
| Database | PostgreSQL                            |
| Hosting  | Vercel (frontend), Render (backend)   |

## Project Structure

```
breathe-esg/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/   # Dashboard, upload, record tables
│       └── api/          # Axios API client
└── backend/           # FastAPI server
    ├── routes/           # REST endpoints
    ├── services/         # Normalization logic per source type
    ├── models.py         # SQLAlchemy models
    └── database.py       # DB connection setup
```

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate        # or source .venv/bin/activate on mac/linux
pip install -r requirements.txt
```

Create a `.env` file with your Postgres connection string:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
```

Then run:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend points to the deployed backend by default. To use your local backend, update the `baseURL` in `src/api/api.js`.

## API Overview

All routes are under `/records`.

| Method   | Endpoint                    | Description                 |
|----------|-----------------------------|-----------------------------|
| `POST`   | `/records/upload/{source}`  | Upload a CSV file           |
| `GET`    | `/records`                  | Get all normalized records  |
| `GET`    | `/records/pending`          | Get pending records         |
| `GET`    | `/records/suspicious`       | Get flagged records         |
| `PATCH`  | `/records/{id}/approve`     | Approve a record            |
| `PATCH`  | `/records/{id}/reject`      | Reject a record             |
| `DELETE` | `/records/{id}`             | Delete a record             |
| `DELETE` | `/records/clear`            | Wipe all records            |
