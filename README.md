<p align="center">
  <img src="https://img.shields.io/badge/FEDORA-Climate%20OS-22c55e?style=for-the-badge&labelColor=040a06" alt="Fedora Badge"/>
</p>

<h1 align="center">FEDORA</h1>
<h3 align="center">The Climate Operating System for ASEAN SMEs</h3>

<p align="center">
  <em>Helping ASEAN manufacturers keep their EU market access as carbon border taxes go live in 2026.</em><br/>
  <em>Upload a bill, get your footprint, generate your CBAM report — under an hour.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Framer_Motion-11.x-FF0055?logo=framer" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License"/>
</p>

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [What is Fedora?](#what-is-fedora)
- [System Architecture](#system-architecture)
- [Core Workflow](#core-workflow)
- [Feature Deep Dive](#feature-deep-dive)
  - [Landing Page](#1-landing-page)
  - [Upload & AI Analysis](#2-upload--ai-analysis)
  - [Dashboard Overview](#3-dashboard-overview)
  - [Batch & Yearly Analysis](#4-batch--yearly-analysis)
  - [Competitor Benchmarking](#5-competitor-benchmarking)
  - [Green Leaf Credits](#6-green-leaf-credits)
  - [In-Depth Analysis](#7-in-depth-analysis)
  - [Reports Management](#8-reports-management)
  - [CBAM Compliance Tracker](#9-cbam-compliance-tracker)
- [Page Routing Map](#page-routing-map)
- [Data Flow Architecture](#data-flow-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Problem Statement

The EU's **Carbon Border Adjustment Mechanism (CBAM)** goes into full enforcement in **January 2026**. ASEAN manufacturers exporting to the EU must now:

1. **Measure** embedded carbon emissions per unit of product
2. **Report** emissions using EU-approved MRV (Monitoring, Reporting, Verification) formats
3. **Pay** for CBAM certificates based on embedded emissions

**Without actual data**, EU importers use **default values** (worst-case carbon intensity), making ASEAN products up to **3x more expensive** than necessary and threatening supplier relationships.

> Most ASEAN SMEs lack the tools, expertise, and budget to comply. Fedora solves this.

---

## What is Fedora?

Fedora is a **Climate Operating System** that takes ASEAN SMEs from a **photo of an energy bill** to a **CBAM-compliant MRV report** in under an hour. No consultants. No European accounting tools. Built for the ASEAN factory floor.

```
Invoice Photo  -->  AI OCR  -->  Emission Mapping  -->  CBAM Report  -->  Green Finance
```

---

## System Architecture

```mermaid
graph TB
    subgraph Client["Frontend (Next.js App)"]
        LP["Landing Page"]
        UP["Upload Page"]
        DA["Dashboard"]
        BA["Batch Analysis"]
        CO["Competitors"]
        CR["Credits"]
        AN["Analysis"]
        RE["Reports"]
        CM["Compliance"]
    end

    subgraph Processing["AI Processing Pipeline"]
        OCR["OCR Engine"]
        EFM["Emission Factor Mapper"]
        AIA["AI Analyzer"]
        RPG["Report Generator"]
    end

    subgraph Data["Data Layer"]
        EFD["ASEAN Emission Factor DB"]
        CBD["CBAM Rates DB"]
        CDB["Competitor Benchmark DB"]
        UDB["User Upload History"]
    end

    subgraph External["External Integrations"]
        EU["EU CBAM Registry"]
        BNK["Green Finance Banks"]
        ISO["ISO Certification Bodies"]
    end

    LP --> UP
    UP -->|"Bill/Invoice"| OCR
    OCR -->|"Extracted Data"| EFM
    EFM -->|"Mapped Emissions"| AIA
    AIA -->|"Scope 1/2/3"| DA
    AIA --> AN
    AIA --> RPG
    RPG --> RE
    RE --> EU
    DA --> BA
    DA --> CO
    DA --> CR
    CR --> BNK
    CR --> ISO
    EFM --> EFD
    AIA --> CBD
    CO --> CDB
    BA --> UDB

    style Client fill:#0d1f12,stroke:#22c55e,color:#e2fdf0
    style Processing fill:#14532d,stroke:#4ade80,color:#e2fdf0
    style Data fill:#052e16,stroke:#86efac,color:#e2fdf0
    style External fill:#1c0a00,stroke:#f59e0b,color:#fef3c7
```

---

## Core Workflow

```mermaid
flowchart LR
    A["Upload Bill
    (Photo/PDF)"] --> B["AI OCR
    Extraction"]
    B --> C["ASEAN Emission
    Factor Mapping"]
    C --> D["Scope 1/2/3
    Calculation"]
    D --> E["CBAM Cost
    Estimation"]
    E --> F{"Choose Action"}

    F -->|"Generate"| G["MRV Report
    for EU Importer"]
    F -->|"Analyze"| H["In-Depth
    Analysis + AI Recs"]
    F -->|"Track"| I["Dashboard
    Monitoring"]
    F -->|"Compare"| J["Batch Analysis
    & Benchmarking"]

    G --> K["Submit to
    EU Importer"]
    H --> L["Download
    HTML Report"]
    I --> M["Green Leaf
    Credits"]
    J --> N["Competitor
    Ranking"]

    M --> O["Claim Rewards
    & Green Finance"]

    style A fill:#22c55e,stroke:#052e16,color:#052e16
    style B fill:#16a34a,stroke:#052e16,color:#052e16
    style C fill:#15803d,stroke:#052e16,color:#e2fdf0
    style D fill:#166534,stroke:#052e16,color:#e2fdf0
    style E fill:#14532d,stroke:#4ade80,color:#e2fdf0
    style F fill:#052e16,stroke:#86efac,color:#e2fdf0
```

---

## Feature Deep Dive

### 1. Landing Page

**Route:** `/`

A premium, animated hero section showcasing the Fedora platform with:

- **Animated SVG Background Paths** — flowing green path lines using Framer Motion
- **Floating Leaf Particles** — nature-themed SVG leaves with CSS animations
- **Letter-by-Letter Title Animation** — spring-animated "FEDORA" with green gradients
- **Cycling Subtitle** — rotating taglines that fade in/out
- **CBAM Alert Banner** — urgency-driven callout with enforcement date
- **GlowCard Feature Grid** — pointer-tracking spotlight cards for each feature
- **Before/After Comparison** — visual business impact of using Fedora
- **4-Step "How It Works"** — quick overview of the user journey
- **Stat Pills** — key metrics at a glance

---

### 2. Upload & AI Analysis

**Route:** `/upload`

```mermaid
flowchart TD
    A["User drops file
    (drag & drop / click)"] --> B{"File Type?"}
    B -->|"Image"| C["Send to OCR Engine"]
    B -->|"PDF"| C
    C --> D["Extract Line Items
    (quantities, suppliers, types)"]
    D --> E["Map to ASEAN
    Emission Factors"]
    E --> F["Calculate per-item
    CO2 emissions"]
    F --> G["Classify into
    Scope 1 / 2 / 3"]
    G --> H["Generate Scope Cards
    + Cost Estimate"]
    H --> I["Display Results
    with Line Item Table"]
    I --> J{"Next Step?"}
    J -->|"Deep dive"| K["Go to /analysis"]
    J -->|"Reports"| L["Go to /reports"]
    J -->|"Upload more"| A

    style A fill:#22c55e,stroke:#052e16,color:#052e16
    style H fill:#14532d,stroke:#4ade80,color:#e2fdf0
```

**Features:**
- Drag-and-drop upload zone with file type support (PNG, PDF, JPG, HEIC)
- Simulated AI processing pipeline with visual progress steps
- Scope 1/2/3 emission cards with color-coded values
- Extracted line-item table showing per-item emission factors
- CBAM cost estimation panel
- Quick links to deeper analysis and report generation

---

### 3. Dashboard Overview

**Route:** `/dashboard`

The main analytics hub with a persistent **sidebar navigation** for all dashboard sub-features:

- **KPI Cards** — Total emissions, CBAM exposure, Green Supplier Score, month trend
- **SVG Donut Chart** — Scope 1/2/3 breakdown with legends
- **SVG Bar Chart** — Monthly emissions trend over 6 months
- **CBAM Exposure Panel** — Certificate cost and EU ETS price tracking
- **Recent Reports Table** — Quick access to latest generated reports

**Sidebar Navigation:**
| Section | Route | Description |
|---------|-------|-------------|
| Overview | `/dashboard` | KPIs + charts |
| Batch & Yearly | `/dashboard/batch` | Multi-month upload & comparison |
| Competitors | `/dashboard/competitors` | Sector benchmarking |
| Green Credits | `/dashboard/credits` | Credit system & rewards |
| Upload Bill | `/upload` | Quick link |
| Analysis | `/analysis` | Quick link |
| Reports | `/reports` | Quick link |
| Compliance | `/compliance` | Quick link |

---

### 4. Batch & Yearly Analysis

**Route:** `/dashboard/batch`

```mermaid
flowchart TD
    A["Upload Multiple Bills
    (e.g., 6 months)"] --> B["AI processes
    each bill separately"]
    B --> C["Monthly Scope 1/2/3
    breakdown per file"]
    C --> D["Generate Comparison
    Table with deltas"]
    D --> E{"Visualization"}
    E --> F["Grouped Bar Chart
    (Month x Scope)"]
    E --> G["Line Chart: You vs
    Optimal vs Industry"]
    E --> H["KPI: 6-Month
    Reduction %"]
    F & G & H --> I["Download
    Batch Report (HTML)"]

    style A fill:#22c55e,stroke:#052e16,color:#052e16
    style I fill:#14532d,stroke:#4ade80,color:#e2fdf0
```

**Features:**
- Upload bills for multiple months at once
- File list table with per-month scope values and delta indicators
- **Grouped Bar Chart** — side-by-side Scope 1/2/3 + Total per month
- **Trajectory Line Chart** — your emissions vs optimal target vs industry average
- Reduction % KPI with AI insights
- Downloadable batch analysis HTML report

---

### 5. Competitor Benchmarking

**Route:** `/dashboard/competitors`

```mermaid
flowchart LR
    A["Your Company Data"] --> B["Benchmark Engine"]
    C["Industry Database
    (ASEAN Steel/Metals)"] --> B
    B --> D["Ranked Leaderboard
    with Green Scores"]
    B --> E["Radar Chart
    (You vs Leader)"]
    B --> F["Gap Analysis +
    Improvement Plan"]

    style B fill:#14532d,stroke:#4ade80,color:#e2fdf0
```

**Features:**
- **ASEAN Sector Leaderboard** — ranked table of competitors with Green Scores, emissions, and CBAM costs
- Medal indicators for top 3 positions
- Your position highlighted with gap-to-next-rank calculation
- **Radar Chart** — 6-axis comparison (Scope 1/2/3, Documentation, CBAM Cost, Green Score) vs the sector leader
- **Improvement Plan** — actionable items with estimated emission reduction and score boost
- Horizontal progress bars for visual score comparison

---

### 6. Green Leaf Credits

**Route:** `/dashboard/credits`

```mermaid
flowchart TD
    A["Verified Actions"] --> B["Earn Credits"]
    B --> C{"Credit Balance"}
    C -->|"500+"| D["Unlock: Green Loan Access"]
    C -->|"1000+"| E["Unlock: ISO Fast-Track"]
    C -->|"1500+"| F["Unlock: EU Buyer Directory"]
    C -->|"2000+"| G["Unlock: CBAM Pre-Calc"]
    C -->|"2500+"| H["Unlock: Carbon Roadmap"]

    A1["Monthly bill upload"] -->|"+50"| B
    A2["Reduce vs prev month"] -->|"+20/% reduction"| B
    A3["Share data with importer"] -->|"+80/report"| B
    A4["ISO verification"] -->|"+300 one-time"| B
    A5["12-mo continuous monitoring"] -->|"+500 yearly"| B

    style C fill:#14532d,stroke:#4ade80,color:#e2fdf0
    style D fill:#22c55e,stroke:#052e16,color:#052e16
    style E fill:#22c55e,stroke:#052e16,color:#052e16
    style F fill:#22c55e,stroke:#052e16,color:#052e16
```

**Features:**
- **Credit Progress Ring** — animated SVG showing credits earned vs next tier
- Tier system: Member → Bronze → Silver → Gold → Platinum
- **Rewards Marketplace** — claimable rewards with credit cost, category, and lock states
- **How to Earn** checklist — actionable credit-earning activities with completion state
- **ASEAN Credits Leaderboard** — company rankings by credit balance with tier badges
- Claim functionality with visual feedback

---

### 7. In-Depth Analysis

**Route:** `/analysis`

**Features:**
- KPI summary cards (emissions, CBAM cost, supply chain ratio)
- Scope distribution ring charts with detailed breakdowns
- **CBAM Calculation Section** — step-by-step certificate cost derivation
- **Emission Breakdown Table** — per-source emissions with risk levels (High/Medium/Low)
- **AI Recommendations** — expandable decarbonisation suggestions with ROI estimates
- **Downloadable HTML Report** — full analysis with charts, styled for printing

---

### 8. Reports Management

**Route:** `/reports`

**Features:**
- Filter tabs: All, CBAM MRV, Scope 2, Supply Chain, Verification
- Report table with ID, type, date, CO2e, importer, and status
- Status badges: Ready (green), Processing (amber), Verified (blue)
- Download actions per report
- Guidance section on using reports for EU importers and green finance applications

---

### 9. CBAM Compliance Tracker

**Route:** `/compliance`

```mermaid
flowchart TD
    A["Compliance Checklist
    (7 items)"] --> B["Calculate
    Readiness Score"]
    B --> C{"Score Level"}
    C -->|"< 40%"| D["Status: At Risk"]
    C -->|"40-70%"| E["Status: In Progress"]
    C -->|"> 70%"| F["Status: On Track"]

    G["CBAM Timeline"] --> H["Transitional Period
    (2023-2025)"]
    H --> I["Full Enforcement
    (Jan 2026)"]
    I --> J["Financial Obligations
    (Ongoing)"]

    K["ASEAN Exposure Map"] --> L["Country-level
    EU export volumes
    & risk ratings"]

    style B fill:#14532d,stroke:#4ade80,color:#e2fdf0
    style F fill:#22c55e,stroke:#052e16,color:#052e16
    style D fill:#7f1d1d,stroke:#ef4444,color:#fecaca
```

**Features:**
- **Readiness Score** — percentage-based compliance score with progress ring
- **Compliance Checklist** — 7-item actionable checklist with links to relevant pages
- **CBAM Timeline** — visual timeline from transitional to full enforcement
- **ASEAN Country Exposure Table** — per-country EU export volumes and risk ratings
- **Before/After Comparison** — business impact visualization of using Fedora

---

## Page Routing Map

```mermaid
graph TD
    ROOT["/"] --> UPLOAD["/upload"]
    ROOT --> DASH["/dashboard"]
    ROOT --> ANALYSIS["/analysis"]
    ROOT --> REPORTS["/reports"]
    ROOT --> COMPLIANCE["/compliance"]

    DASH --> BATCH["/dashboard/batch"]
    DASH --> COMP["/dashboard/competitors"]
    DASH --> CREDITS["/dashboard/credits"]

    UPLOAD -.->|"Results link"| ANALYSIS
    UPLOAD -.->|"Results link"| REPORTS
    ANALYSIS -.->|"Download"| REPORTS
    CREDITS -.->|"Rewards"| COMPLIANCE

    subgraph Sidebar["Dashboard Sidebar Layout"]
        DASH
        BATCH
        COMP
        CREDITS
    end

    style ROOT fill:#22c55e,stroke:#052e16,color:#052e16
    style Sidebar fill:#0d1f12,stroke:#4ade80,color:#e2fdf0
```

---

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant OCR as OCR Engine
    participant EF as Emission Factor DB
    participant AI as AI Analyzer
    participant RPT as Report Generator

    U->>FE: Upload bill (photo/PDF)
    FE->>OCR: Send for text extraction
    OCR-->>FE: Extracted line items
    FE->>EF: Query ASEAN emission factors
    EF-->>FE: Matched factors per item
    FE->>AI: Calculate Scope 1/2/3
    AI-->>FE: Emission breakdown + CBAM cost
    FE-->>U: Display results (cards, table, charts)

    U->>FE: Request report
    FE->>RPT: Generate MRV document
    RPT-->>FE: HTML report
    FE-->>U: Download report

    U->>FE: View batch analysis
    FE->>AI: Compare multiple months
    AI-->>FE: Trends + competitor benchmark
    FE-->>U: Charts + leaderboard
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **Next.js 16** | SSR, routing, React 19 |
| Language | **TypeScript 5** | Type-safe development |
| Styling | **Tailwind CSS 4** | Utility-first CSS |
| Animation | **Framer Motion 11** | Page transitions, path animations |
| UI Components | **shadcn/ui** | Button, card primitives |
| Icons | **Lucide React** | Consistent iconography |
| Charts | **Custom SVG** | Donut, bar, line, radar, ring charts |
| Effects | **Custom Components** | BackgroundPaths, GlowCard, floating leaves |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Nathan-Jamesss/fedora-app.git
cd fedora-app

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
fedora-app/
├── app/
│   ├── page.tsx                    # Landing page (animated hero)
│   ├── globals.css                 # Global styles + theme
│   ├── layout.tsx                  # Root layout
│   ├── upload/
│   │   └── page.tsx                # Upload & AI analysis
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar navigation layout
│   │   ├── page.tsx                # Dashboard overview (KPIs + charts)
│   │   ├── batch/
│   │   │   └── page.tsx            # Batch & yearly analysis
│   │   ├── competitors/
│   │   │   └── page.tsx            # Competitor benchmarking
│   │   └── credits/
│   │       └── page.tsx            # Green Leaf Credits system
│   ├── analysis/
│   │   └── page.tsx                # In-depth emission analysis
│   ├── reports/
│   │   └── page.tsx                # Reports management
│   └── compliance/
│       └── page.tsx                # CBAM compliance tracker
├── components/
│   └── ui/
│       ├── button.tsx              # shadcn Button (green themed)
│       ├── hero-1.tsx              # Hero section component
│       ├── background-paths.tsx    # Animated SVG path background
│       └── spotlight-card.tsx      # Pointer-tracking glow card
├── lib/
│   └── utils.ts                    # cn() utility
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is part of the **BU x Berkeley Climate Venture Competition 2026**.

---

<p align="center">
  <strong>FEDORA</strong> — The Climate OS for ASEAN SMEs<br/>
  <em>Measure. Report. Profit. Keep your EU market access.</em>
</p>
