# Interview Prep Tutor

AI-assisted behavioral interview prep: pitch crafting, story bank, and BQ practice.

## Quick Start

```bash
cd web && npm run dev
```

## Directory Structure

```
interview-prep-tutor/
├── CLAUDE.md                  # AI coaching persona & instructions
├── README.md                  # This file
├── bq_categories.md           # BQ types → story index
├── resume/                    # Resume & analysis notes
├── pitch/
│   ├── general.md             # 2-min self introduction
│   ├── short.md               # 30-sec elevator pitch
│   └── companies/             # Company-specific pitches (gitignored)
├── stories/                   # STAR-format story bank
├── company_research/          # Per-company research notes
├── mock_sessions/             # Mock interview transcripts (gitignored)
├── .github/workflows/         # CI/CD workflows
└── web/                       # Review website (Vite + React + Tailwind)
```

## Privacy Note

The following directories are **gitignored** and will not be committed to version control:

- `pitch/companies/` — company-specific pitch variants
- `mock_sessions/` — mock interview transcripts

This keeps sensitive preparation materials private while keeping templates and reusable stories versioned.
