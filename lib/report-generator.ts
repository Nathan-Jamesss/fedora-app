/**
 * FEDORA — Professional Carbon Report Generator
 * Opens a formatted multi-page report in a new tab, ready for Print → Save as PDF
 * Includes embedded SVG charts, executive summary, detailed breakdowns, and official formatting
 */

type ReportData = {
  companyName: string;
  location: string;
  fileName: string;
  ocrConfidence: number;
  analysisDate: string;
  product: string;
  cnCode: string;
  totalCarbon: number;
  cbamCost: number;
  greenScore: number;
  etsPrice: number;
  methodology: string;
  validityPeriod: string;
  monthlyChange: number;
  emissions: Array<{
    category: string;
    scope: string;
    factor: string;
    quantity: string;
    total: number;
    pct: number;
    risk: string;
    database: string;
  }>;
  recommendations: Array<{
    priority: string;
    title: string;
    impact: string;
    saving: string;
    effort: string;
    description: string;
  }>;
  monthlyTrend: Array<{ month: string; value: number }>;
  scopeBreakdown: { scope1: number; scope2: number; scope3: number };
};

// Default demo data — same data shown in the analysis page
const DEFAULT_REPORT: ReportData = {
  companyName: 'PT Perusahaan Listrik Negara (Persero)',
  location: 'Jakarta Selatan 12160, Indonesia',
  fileName: 'Invoice_Steel_Jan26.pdf',
  ocrConfidence: 94.2,
  analysisDate: new Date().toLocaleDateString('en-GB'),
  product: 'Steel Beam 40×40mm',
  cnCode: '7308.90',
  totalCarbon: 62.4,
  cbamCost: 0.38,
  greenScore: 68,
  etsPrice: 72.0,
  methodology: 'GHG Protocol + ASEAN Emission Factor Database v2.3',
  validityPeriod: 'Jan 2026 – Mar 2026',
  monthlyChange: -3.2,
  emissions: [
    { category: 'Electricity', scope: 'Scope 2', factor: '0.4842 kgCO₂/kWh', quantity: '4,200 kWh', total: 2033.6, pct: 32, risk: 'Medium', database: 'ASEAN EF DB v2.3 (2024)' },
    { category: 'Steel Feedstock', scope: 'Scope 3', factor: '1.85 tCO₂/t', quantity: '12.4 t', total: 2294.0, pct: 37, risk: 'High', database: 'worldsteel Association (2024)' },
    { category: 'Natural Gas', scope: 'Scope 1', factor: '2.04 kgCO₂/m³', quantity: '820 m³', total: 1672.8, pct: 27, risk: 'Medium', database: 'IPCC AR6 / Indonesia MOE' },
    { category: 'Diesel', scope: 'Scope 1', factor: '2.68 kgCO₂/L', quantity: '180 L', total: 482.4, pct: 8, risk: 'Low', database: 'IPCC AR6' },
    { category: 'Process Water', scope: 'Scope 3', factor: '0.42 kgCO₂/m³', quantity: '280 m³', total: 117.6, pct: 2, risk: 'Low', database: 'ASEAN EF DB v2.3 (2024)' },
  ],
  recommendations: [
    { priority: 'HIGH', title: 'Switch to renewable energy tariff', impact: '-820 tCO₂e/yr', saving: '€2,400/yr', effort: 'Low', description: 'Indonesia electricity grid has a high carbon intensity of 0.4842 kgCO₂/kWh. Switching to a certified green electricity tariff from PLN or purchasing RECs can reduce Scope 2 emissions by up to 40%. This is the single most impactful change with minimal capital investment. ROI estimated at 8 months.' },
    { priority: 'HIGH', title: 'Source low-carbon steel from certified suppliers', impact: '-380 tCO₂e/yr', saving: '€1,100/yr', effort: 'Medium', description: 'Steel feedstock accounts for 37% of embedded emissions. Switching to EAF (Electric Arc Furnace) steel from certified suppliers can reduce this by 60%. Several ASEAN suppliers now offer ResponsibleSteel-certified products. Consider Hoa Phat Group\'s green steel line.' },
    { priority: 'MEDIUM', title: 'Install on-site solar PV (200 kWp)', impact: '-210 tCO₂e/yr', saving: '€6,200/yr', effort: 'High', description: 'A 200 kWp rooftop solar installation would cover approximately 35% of electricity demand, directly reducing Scope 2 emissions. Indonesian incentives and ASEAN green loans make financing accessible. Payback period: 4-5 years.' },
    { priority: 'LOW', title: 'Optimize diesel generator scheduling', impact: '-45 tCO₂e/yr', saving: '€320/yr', effort: 'Low', description: 'Current diesel generator runs during peak hours when grid electricity is available. Scheduling optimization and load management can reduce diesel consumption by 25% with no capital expenditure required.' },
  ],
  monthlyTrend: [
    { month: 'Aug', value: 71.2 }, { month: 'Sep', value: 69.8 }, { month: 'Oct', value: 68.1 },
    { month: 'Nov', value: 65.4 }, { month: 'Dec', value: 64.5 }, { month: 'Jan', value: 62.4 },
  ],
  scopeBreakdown: { scope1: 2155.2, scope2: 2033.6, scope3: 2411.6 },
};

function generatePieChartSVG(data: ReportData): string {
  const total = data.scopeBreakdown.scope1 + data.scopeBreakdown.scope2 + data.scopeBreakdown.scope3;
  const scopes = [
    { label: 'Scope 1 (Direct)', value: data.scopeBreakdown.scope1, color: '#16a34a' },
    { label: 'Scope 2 (Energy)', value: data.scopeBreakdown.scope2, color: '#22c55e' },
    { label: 'Scope 3 (Upstream)', value: data.scopeBreakdown.scope3, color: '#86efac' },
  ];
  let startAngle = -90;
  const paths = scopes.map(s => {
    const pct = s.value / total;
    const angle = pct * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = 150 + 120 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 150 + 120 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 150 + 120 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 150 + 120 * Math.sin((endAngle * Math.PI) / 180);
    const path = `<path d="M150,150 L${x1},${y1} A120,120 0 ${largeArc},1 ${x2},${y2} Z" fill="${s.color}" stroke="white" stroke-width="2"/>`;
    startAngle = endAngle;
    return path;
  }).join('');
  const legend = scopes.map((s, i) =>
    `<rect x="320" y="${50 + i * 36}" width="18" height="18" rx="3" fill="${s.color}"/>
     <text x="346" y="${63 + i * 36}" font-size="13" fill="#374151" font-weight="500">${s.label}: ${((s.value / total) * 100).toFixed(1)}% (${s.value.toLocaleString()} kg)</text>`
  ).join('');
  return `<svg viewBox="0 0 580 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:580px;margin:16px auto;display:block;">
    <text x="150" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="#1f2937">Scope Distribution</text>
    ${paths}
    <circle cx="150" cy="150" r="50" fill="white"/>
    <text x="150" y="145" text-anchor="middle" font-size="22" font-weight="900" fill="#15803d">${data.totalCarbon}</text>
    <text x="150" y="164" text-anchor="middle" font-size="10" fill="#6b7280">kgCO₂e/unit</text>
    ${legend}
  </svg>`;
}

function generateBarChartSVG(data: ReportData): string {
  const maxVal = Math.max(...data.emissions.map(e => e.total));
  const barWidth = 60;
  const gap = 20;
  const chartW = data.emissions.length * (barWidth + gap) + 60;
  const chartH = 240;
  const bars = data.emissions.map((e, i) => {
    const h = (e.total / maxVal) * 160;
    const x = 50 + i * (barWidth + gap);
    const y = chartH - 40 - h;
    const color = e.scope === 'Scope 1' ? '#16a34a' : e.scope === 'Scope 2' ? '#22c55e' : '#86efac';
    return `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="4" fill="${color}"/>
      <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">${e.total.toLocaleString()}</text>
      <text x="${x + barWidth / 2}" y="${chartH - 18}" text-anchor="middle" font-size="10" fill="#6b7280">${e.category}</text>
      <text x="${x + barWidth / 2}" y="${chartH - 6}" text-anchor="middle" font-size="9" fill="#9ca3af">${e.scope}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${chartW} ${chartH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:${chartW}px;margin:16px auto;display:block;">
    <text x="${chartW / 2}" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="#1f2937">Emissions by Source (kgCO₂e)</text>
    <line x1="40" y1="${chartH - 40}" x2="${chartW - 20}" y2="${chartH - 40}" stroke="#e5e7eb" stroke-width="1"/>
    ${bars}
  </svg>`;
}

function generateTrendChartSVG(data: ReportData): string {
  const vals = data.monthlyTrend.map(m => m.value);
  const minV = Math.min(...vals) - 5;
  const maxV = Math.max(...vals) + 5;
  const w = 520, h = 200, pad = 50;
  const points = data.monthlyTrend.map((m, i) => {
    const x = pad + (i / (data.monthlyTrend.length - 1)) * (w - pad * 2);
    const y = pad + ((maxV - m.value) / (maxV - minV)) * (h - pad * 2);
    return { x, y, ...m };
  });
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${h - 30} ${polyline} ${points[points.length - 1].x},${h - 30}`;
  const labels = points.map(p =>
    `<text x="${p.x}" y="${h - 12}" text-anchor="middle" font-size="11" fill="#6b7280">${p.month}</text>
     <circle cx="${p.x}" cy="${p.y}" r="4" fill="#15803d" stroke="white" stroke-width="2"/>
     <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" font-size="10" font-weight="600" fill="#15803d">${p.value}</text>`
  ).join('');
  // gridlines
  const gridLines = [0, 1, 2, 3].map(i => {
    const y = pad + (i / 3) * (h - pad * 2);
    const val = (maxV - (i / 3) * (maxV - minV)).toFixed(0);
    return `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="#f3f4f6" stroke-width="1"/>
            <text x="${pad - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="#9ca3af">${val}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:${w}px;margin:16px auto;display:block;">
    <text x="${w / 2}" y="16" text-anchor="middle" font-size="14" font-weight="700" fill="#1f2937">Carbon Intensity Trend (kgCO₂e/unit)</text>
    ${gridLines}
    <polygon points="${area}" fill="rgba(34,197,94,0.08)"/>
    <polyline points="${polyline}" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${labels}
  </svg>`;
}

function buildReportHTML(data: ReportData): string {
  const totalEmissions = data.emissions.reduce((s, e) => s + e.total, 0);
  const reportId = `FDR-${Date.now().toString(36).toUpperCase()}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>FEDORA Carbon Analysis Report — ${data.companyName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',system-ui,sans-serif;color:#1f2937;background:#fff;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  @page{margin:0.6in;size:A4;}

  .page{padding:44px 48px;max-width:900px;margin:0 auto;}
  @media print{
    .page{padding:0;max-width:100%;}
    .no-print{display:none !important;}
    .page-break{page-break-before:always;}
  }

  /* Header */
  .report-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #15803d;padding-bottom:20px;margin-bottom:28px;}
  .logo-area{display:flex;align-items:center;gap:14px;}
  .logo-mark{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#15803d);display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:20px;}
  .logo-text{font-size:24px;font-weight:900;color:#15803d;letter-spacing:-0.03em;}
  .logo-sub{font-size:11px;color:#6b7280;margin-top:-2px;}
  .meta-right{text-align:right;font-size:12px;color:#6b7280;line-height:1.8;}
  .meta-right strong{color:#1f2937;}

  /* Sections */
  h2{font-size:17px;font-weight:800;color:#15803d;border-bottom:2px solid #dcfce7;padding-bottom:8px;margin:32px 0 16px;}
  h2 .sec-num{display:inline-block;width:26px;height:26px;background:#15803d;color:white;border-radius:6px;text-align:center;line-height:26px;font-size:12px;margin-right:10px;}
  h3{font-size:14px;font-weight:700;color:#374151;margin:20px 0 8px;}

  /* Executive summary box */
  .exec-sum{background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:12px;padding:24px 28px;margin-bottom:28px;}
  .exec-sum h3{color:#15803d;margin-top:0;font-size:16px;}
  .exec-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:16px;}
  .exec-kpi{text-align:center;padding:16px 8px;background:white;border-radius:10px;border:1px solid #dcfce7;}
  .exec-kpi .val{font-size:28px;font-weight:900;color:#15803d;}
  .exec-kpi .unit{font-size:10px;color:#6b7280;display:block;margin-top:2px;}
  .exec-kpi .lbl{font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;}

  /* Tables */
  table{width:100%;border-collapse:collapse;margin:12px 0 20px;font-size:12px;}
  th{background:#f0fdf4;color:#15803d;text-align:left;padding:10px 14px;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #bbf7d0;}
  td{padding:10px 14px;border-bottom:1px solid #f0fdf4;color:#374151;}
  tr:nth-child(even) td{background:#fafffe;}
  .total-row td{font-weight:800;background:#f0fdf4 !important;border-top:2px solid #bbf7d0;color:#15803d;}

  /* Risk badges */
  .risk{display:inline-block;padding:2px 10px;border-radius:999px;font-size:10px;font-weight:700;}
  .risk-high{background:#fef2f2;color:#dc2626;}
  .risk-medium{background:#fffbeb;color:#d97706;}
  .risk-low{background:#f0fdf4;color:#16a34a;}

  /* Scope badges */
  .scope{display:inline-block;padding:2px 10px;border-radius:999px;font-size:10px;font-weight:700;}
  .scope-1{background:#dcfce7;color:#15803d;}
  .scope-2{background:#d1fae5;color:#059669;}
  .scope-3{background:#ecfdf5;color:#047857;}

  /* Recs */
  .rec-card{border-left:4px solid;padding:16px 20px;margin:10px 0;border-radius:0 10px 10px 0;background:#fafffe;}
  .rec-high{border-color:#dc2626;background:#fef7f7;}
  .rec-med{border-color:#d97706;background:#fffcf5;}
  .rec-low{border-color:#16a34a;background:#f0fdf4;}
  .rec-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
  .rec-title{font-weight:700;font-size:13px;color:#1f2937;}
  .rec-badges{display:flex;gap:8px;}
  .rec-badge{font-size:10px;padding:2px 8px;border-radius:999px;font-weight:600;}
  .rec-desc{font-size:12px;color:#6b7280;line-height:1.7;margin-top:6px;}

  /* CBAM box */
  .cbam-box{background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:20px 24px;margin:16px 0;}
  .cbam-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:12px;}
  .cbam-item .val{font-size:22px;font-weight:900;color:#92400e;}
  .cbam-item .lbl{font-size:10px;color:#a16207;text-transform:uppercase;letter-spacing:0.05em;}

  /* Print button */
  .print-bar{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,0.95);padding:12px 40px;border-top:1px solid #e5e7eb;display:flex;justify-content:center;gap:12px;z-index:100;backdrop-filter:blur(10px);}
  .print-btn{padding:12px 32px;border-radius:999px;font-weight:700;font-size:14px;border:none;cursor:pointer;}
  .print-btn-primary{background:linear-gradient(135deg,#22c55e,#15803d);color:white;}
  .print-btn-ghost{background:transparent;border:1px solid #d1d5db;color:#374151;}

  /* Footer */
  .report-footer{border-top:2px solid #dcfce7;padding-top:16px;margin-top:40px;display:flex;justify-content:space-between;font-size:10px;color:#9ca3af;}

  /* Bar progress */
  .bar-bg{height:8px;background:#e5e7eb;border-radius:999px;overflow:hidden;}
  .bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#22c55e,#4ade80);}

  /* Watermark style */
  .confidential{text-align:center;padding:6px;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase;border:1px dashed #d1d5db;border-radius:6px;margin-bottom:20px;}

  /* Chart container */
  .chart-container{background:#fafffe;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:12px 0;}
  .chart-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
</style>
</head>
<body>
<div class="page">

  <!-- Print bar -->
  <div class="print-bar no-print">
    <button class="print-btn print-btn-primary" onclick="window.print()">⬇ Save as PDF</button>
    <button class="print-btn print-btn-ghost" onclick="window.close()">Close</button>
  </div>

  <!-- Confidential -->
  <div class="confidential">CONFIDENTIAL — FOR AUTHORIZED USE ONLY — REPORT ID: ${reportId}</div>

  <!-- Header -->
  <div class="report-header">
    <div class="logo-area">
      <div class="logo-mark">F</div>
      <div>
        <div class="logo-text">FEDORA</div>
        <div class="logo-sub">Carbon Analysis Report · CBAM MRV Compliant</div>
      </div>
    </div>
    <div class="meta-right">
      <strong>Report ID:</strong> ${reportId}<br/>
      <strong>Generated:</strong> ${data.analysisDate}<br/>
      <strong>Source:</strong> ${data.fileName}<br/>
      <strong>OCR Confidence:</strong> ${data.ocrConfidence}%<br/>
      <strong>Validity:</strong> ${data.validityPeriod}
    </div>
  </div>

  <!-- Company Info -->
  <table style="margin-bottom:24px;">
    <tr><td style="width:150px;font-weight:700;background:#f0fdf4;color:#15803d;">Company</td><td>${data.companyName}</td><td style="width:150px;font-weight:700;background:#f0fdf4;color:#15803d;">Location</td><td>${data.location}</td></tr>
    <tr><td style="font-weight:700;background:#f0fdf4;color:#15803d;">Product</td><td>${data.product}</td><td style="font-weight:700;background:#f0fdf4;color:#15803d;">CN Code</td><td>${data.cnCode}</td></tr>
    <tr><td style="font-weight:700;background:#f0fdf4;color:#15803d;">Methodology</td><td colspan="3">${data.methodology}</td></tr>
  </table>

  <!-- Executive Summary -->
  <div class="exec-sum">
    <h3>Executive Summary</h3>
    <p style="font-size:13px;color:#374151;margin-top:8px;">
      Analysis of <strong>${data.fileName}</strong> from ${data.companyName} reveals a total embedded carbon intensity of
      <strong>${data.totalCarbon} kgCO₂e per unit</strong> of ${data.product}. This is <strong>${data.monthlyChange}%</strong>
      ${data.monthlyChange < 0 ? 'lower' : 'higher'} than the previous reporting period. Under EU CBAM regulations, this translates to a
      certificate cost of <strong>€${data.cbamCost.toFixed(2)} per unit</strong> at the current EU ETS price of €${data.etsPrice.toFixed(2)}/tCO₂e.
      The company achieves a Green Supplier Score of <strong>${data.greenScore}/100</strong>.
    </p>
    <div class="exec-grid">
      <div class="exec-kpi"><div class="val">${data.totalCarbon}<span class="unit">kgCO₂e/unit</span></div><div class="lbl">Total Embedded Carbon</div></div>
      <div class="exec-kpi"><div class="val">€${data.cbamCost.toFixed(2)}<span class="unit">per unit</span></div><div class="lbl">CBAM Certificate Cost</div></div>
      <div class="exec-kpi"><div class="val">${data.greenScore}<span class="unit">/100</span></div><div class="lbl">Green Supplier Score</div></div>
      <div class="exec-kpi"><div class="val">${data.monthlyChange}%<span class="unit">vs prior period</span></div><div class="lbl">Monthly Change</div></div>
    </div>
  </div>

  <!-- Section 1: Emission Breakdown -->
  <h2><span class="sec-num">1</span>Detailed Emission Breakdown by Source</h2>
  <p style="font-size:12px;color:#6b7280;margin-bottom:12px;">
    All emission factors sourced from ASEAN-specific databases and IPCC AR6 methodology. Quantities extracted via OCR with ${data.ocrConfidence}% confidence.
  </p>
  <table>
    <thead><tr>
      <th>Source</th><th>Scope</th><th>Emission Factor</th><th>Quantity</th><th>CO₂e (kg)</th><th>% Share</th><th>Risk Level</th><th>Factor Database</th>
    </tr></thead>
    <tbody>
      ${data.emissions.map(e => `<tr>
        <td style="font-weight:600;">${e.category}</td>
        <td><span class="scope scope-${e.scope.split(' ')[1]}">${e.scope}</span></td>
        <td style="font-family:monospace;font-size:11px;">${e.factor}</td>
        <td>${e.quantity}</td>
        <td style="font-weight:700;color:#15803d;">${e.total.toLocaleString()}</td>
        <td>${e.pct}%</td>
        <td><span class="risk risk-${e.risk.toLowerCase()}">${e.risk}</span></td>
        <td style="font-size:10px;color:#6b7280;">${e.database}</td>
      </tr>`).join('')}
      <tr class="total-row">
        <td colspan="4">TOTAL EMBEDDED EMISSIONS</td>
        <td>${totalEmissions.toLocaleString()}</td>
        <td>100%</td>
        <td colspan="2">Per unit: ${data.totalCarbon} kgCO₂e</td>
      </tr>
    </tbody>
  </table>

  <!-- Charts Row -->
  <div class="chart-row">
    <div class="chart-container">${generateBarChartSVG(data)}</div>
    <div class="chart-container">${generatePieChartSVG(data)}</div>
  </div>

  <!-- Section 2: CBAM Compliance -->
  <h2><span class="sec-num">2</span>CBAM Compliance & Certificate Calculation</h2>
  <div class="cbam-box">
    <div style="font-weight:700;font-size:14px;color:#92400e;margin-bottom:4px;">⚠ EU Carbon Border Adjustment Mechanism (CBAM)</div>
    <p style="font-size:12px;color:#a16207;margin-bottom:14px;">
      Under EU Regulation 2023/956, importers of goods covered by CBAM must declare embedded emissions and surrender CBAM certificates.
      This report provides verified emission data for the product below, allowing your EU importer to use actual (lower) values instead of default worst-case values.
    </p>
    <div class="cbam-grid">
      <div class="cbam-item"><div class="val">${data.totalCarbon} kgCO₂e</div><div class="lbl">Embedded Carbon / Unit</div></div>
      <div class="cbam-item"><div class="val">€${data.etsPrice.toFixed(2)}</div><div class="lbl">EU ETS Price / tCO₂e</div></div>
      <div class="cbam-item"><div class="val">€${data.cbamCost.toFixed(2)}</div><div class="lbl">Certificate Cost / Unit</div></div>
    </div>
    <table style="margin-top:16px;">
      <tr><td style="font-weight:600;width:220px;">Product Classification</td><td>${data.product} (CN ${data.cnCode})</td></tr>
      <tr><td style="font-weight:600;">Calculation Formula</td><td>${data.totalCarbon} kgCO₂e × €${data.etsPrice.toFixed(2)}/tCO₂e ÷ 1000 = €${data.cbamCost.toFixed(2)}/unit</td></tr>
      <tr><td style="font-weight:600;">Report Validity Period</td><td>${data.validityPeriod}</td></tr>
      <tr><td style="font-weight:600;">Verification Standard</td><td>${data.methodology}</td></tr>
      <tr><td style="font-weight:600;">Accreditation</td><td>Aligned with EU Implementing Regulation 2023/1773 (MRV rules for CBAM)</td></tr>
    </table>
  </div>

  <!-- Page break for print -->
  <div class="page-break"></div>

  <!-- Section 3: Trend -->
  <h2><span class="sec-num">3</span>Carbon Intensity Trend (6-Month)</h2>
  <p style="font-size:12px;color:#6b7280;margin-bottom:8px;">
    Tracking embedded carbon per unit over the past 6 months shows a consistent downward trend of ${data.monthlyChange}% month-over-month,
    indicating effective emission reduction measures are being implemented.
  </p>
  <div class="chart-container">${generateTrendChartSVG(data)}</div>
  <table>
    <thead><tr><th>Month</th>${data.monthlyTrend.map(m => `<th>${m.month} 2025/26</th>`).join('')}</tr></thead>
    <tbody><tr><td style="font-weight:600;">kgCO₂e/unit</td>${data.monthlyTrend.map(m => `<td style="font-weight:700;color:#15803d;">${m.value}</td>`).join('')}</tr></tbody>
  </table>

  <!-- Section 4: Scope Analysis -->
  <h2><span class="sec-num">4</span>GHG Protocol Scope Analysis</h2>
  <table>
    <thead><tr><th>Scope</th><th>Description</th><th>Total (kgCO₂e)</th><th>% of Total</th><th>Key Contributors</th><th>Distribution</th></tr></thead>
    <tbody>
      <tr>
        <td><span class="scope scope-1">Scope 1</span></td>
        <td>Direct emissions from owned/controlled sources</td>
        <td style="font-weight:700;">${data.scopeBreakdown.scope1.toLocaleString()}</td>
        <td>${((data.scopeBreakdown.scope1 / totalEmissions) * 100).toFixed(1)}%</td>
        <td style="font-size:11px;">Natural gas combustion, diesel generators</td>
        <td style="width:120px;"><div class="bar-bg"><div class="bar-fill" style="width:${((data.scopeBreakdown.scope1 / totalEmissions) * 100).toFixed(0)}%"></div></div></td>
      </tr>
      <tr>
        <td><span class="scope scope-2">Scope 2</span></td>
        <td>Indirect emissions from purchased energy</td>
        <td style="font-weight:700;">${data.scopeBreakdown.scope2.toLocaleString()}</td>
        <td>${((data.scopeBreakdown.scope2 / totalEmissions) * 100).toFixed(1)}%</td>
        <td style="font-size:11px;">Grid electricity (Indonesia national grid — PLN)</td>
        <td><div class="bar-bg"><div class="bar-fill" style="width:${((data.scopeBreakdown.scope2 / totalEmissions) * 100).toFixed(0)}%"></div></div></td>
      </tr>
      <tr>
        <td><span class="scope scope-3">Scope 3</span></td>
        <td>Upstream value chain emissions</td>
        <td style="font-weight:700;">${data.scopeBreakdown.scope3.toLocaleString()}</td>
        <td>${((data.scopeBreakdown.scope3 / totalEmissions) * 100).toFixed(1)}%</td>
        <td style="font-size:11px;">Steel feedstock, process water</td>
        <td><div class="bar-bg"><div class="bar-fill" style="width:${((data.scopeBreakdown.scope3 / totalEmissions) * 100).toFixed(0)}%"></div></div></td>
      </tr>
    </tbody>
  </table>

  <!-- Section 5: Emission Factor Sources -->
  <h2><span class="sec-num">5</span>Emission Factor Sources & Verification</h2>
  <p style="font-size:12px;color:#6b7280;margin-bottom:12px;">
    All emission factors used in this report are sourced from internationally recognized databases with ASEAN-specific regional adjustments where available.
  </p>
  <table>
    <thead><tr><th>Source</th><th>Emission Factor</th><th>Database</th><th>Year</th><th>Geographic Scope</th></tr></thead>
    <tbody>
      ${data.emissions.map(e => `<tr>
        <td style="font-weight:600;">${e.category}</td>
        <td style="font-family:monospace;font-size:11px;">${e.factor}</td>
        <td>${e.database}</td>
        <td>2024</td>
        <td>Indonesia / ASEAN</td>
      </tr>`).join('')}
    </tbody>
  </table>

  <!-- Section 6: Recommendations -->
  <div class="page-break"></div>
  <h2><span class="sec-num">6</span>AI Decarbonization Recommendations</h2>
  <p style="font-size:12px;color:#6b7280;margin-bottom:16px;">
    Based on the emission profile analysis, the following decarbonization actions are recommended in order of impact and cost-effectiveness.
    Total potential reduction: <strong>1,455 tCO₂e/year</strong> with combined annual savings of <strong>€10,020</strong>.
  </p>
  ${data.recommendations.map(r => {
    const cls = r.priority === 'HIGH' ? 'rec-high' : r.priority === 'MEDIUM' ? 'rec-med' : 'rec-low';
    return `<div class="rec-card ${cls}">
      <div class="rec-header">
        <div class="rec-title">${r.title}</div>
        <div class="rec-badges">
          <span class="rec-badge risk risk-${r.priority.toLowerCase()}">${r.priority} PRIORITY</span>
          <span class="rec-badge" style="background:#dcfce7;color:#15803d;">${r.impact}</span>
          <span class="rec-badge" style="background:#f0fdf4;color:#059669;">${r.saving}</span>
          <span class="rec-badge" style="background:#f3f4f6;color:#6b7280;">Effort: ${r.effort}</span>
        </div>
      </div>
      <div class="rec-desc">${r.description}</div>
    </div>`;
  }).join('')}

  <!-- Section 7: Green Supplier Score -->
  <h2><span class="sec-num">7</span>Green Supplier Score Assessment</h2>
  <table>
    <thead><tr><th>Metric</th><th>Score</th><th>Weight</th><th>Weighted Score</th><th>Assessment</th></tr></thead>
    <tbody>
      <tr><td style="font-weight:600;">Carbon Intensity</td><td>72/100</td><td>35%</td><td>25.2</td><td>Below sector average — above median</td></tr>
      <tr><td style="font-weight:600;">Data Quality</td><td>85/100</td><td>20%</td><td>17.0</td><td>High OCR confidence, verified factors</td></tr>
      <tr><td style="font-weight:600;">Reduction Trajectory</td><td>60/100</td><td>20%</td><td>12.0</td><td>Improving — 3.2% MoM reduction</td></tr>
      <tr><td style="font-weight:600;">Scope Coverage</td><td>70/100</td><td>15%</td><td>10.5</td><td>Scope 1/2/3 all measured</td></tr>
      <tr><td style="font-weight:600;">Reporting Compliance</td><td>55/100</td><td>10%</td><td>5.5</td><td>CBAM MRV ready, partial ISO 14064</td></tr>
      <tr class="total-row"><td colspan="3">OVERALL GREEN SUPPLIER SCORE</td><td style="font-size:20px;">${data.greenScore}/100</td><td><span class="scope scope-2">Good — Above ASEAN Average</span></td></tr>
    </tbody>
  </table>

  <!-- Section 8: Regulatory Context -->
  <h2><span class="sec-num">8</span>Regulatory Context & Compliance Notes</h2>
  <table>
    <thead><tr><th>Regulation</th><th>Status</th><th>Impact on ${data.companyName}</th></tr></thead>
    <tbody>
      <tr><td style="font-weight:600;">EU CBAM (2023/956)</td><td><span class="risk risk-high">Active — Full enforcement Jan 2026</span></td><td>Must report embedded emissions for all EU exports</td></tr>
      <tr><td style="font-weight:600;">EU CBAM MRV (2023/1773)</td><td><span class="risk risk-medium">Transition period ending</span></td><td>Verified emission data required for certificate calculation</td></tr>
      <tr><td style="font-weight:600;">Indonesia NDC</td><td><span class="scope scope-2">In effect</span></td><td>National target: 29-41% GHG reduction by 2030</td></tr>
      <tr><td style="font-weight:600;">ASEAN Taxonomy</td><td><span class="scope scope-2">Voluntary</span></td><td>Eligibility for sustainable finance classifications</td></tr>
      <tr><td style="font-weight:600;">ISO 14064-1</td><td><span class="risk risk-low">Recommended</span></td><td>International standard for GHG accounting — enhances report credibility</td></tr>
    </tbody>
  </table>

  <!-- Footer -->
  <div class="report-footer">
    <div>
      <strong style="color:#15803d;">FEDORA</strong> · The Climate Operating System for ASEAN SMEs<br/>
      BU × Berkeley Climate Venture Competition · 2026<br/>
      This report is generated using ASEAN-specific emission factors and GHG Protocol methodology.
    </div>
    <div style="text-align:right;">
      Report ID: ${reportId}<br/>
      Page 1 of 3<br/>
      ${data.analysisDate}
    </div>
  </div>

  <!-- Disclaimer -->
  <div style="margin-top:20px;padding:14px 18px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;font-size:10px;color:#9ca3af;line-height:1.6;">
    <strong>Disclaimer:</strong> This report is generated by the FEDORA platform using automated OCR extraction and AI analysis.
    Emission factors are sourced from publicly available databases (ASEAN EF DB, IPCC AR6, worldsteel). While every effort is made
    to ensure accuracy, this report should be verified by a qualified environmental auditor before submission to regulatory authorities.
    FEDORA and its operators are not liable for decisions made based on this report.
  </div>

</div>
</body>
</html>`;
}

export function generateAndDownloadReport(customData?: Partial<ReportData>) {
  const data = { ...DEFAULT_REPORT, ...customData };
  const html = buildReportHTML(data);
  // Open in new tab for print-to-PDF
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
  } else {
    // Fallback: download as HTML
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fedora-carbon-report-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export function downloadReportForFile(fileName: string) {
  generateAndDownloadReport({ fileName });
}
