'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Download, FileText, Brain, TrendingDown, ChevronDown, ChevronRight, ShieldCheck, AlertTriangle } from 'lucide-react';

function Navbar() {
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,15,10,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={16} color="#052e16" /></div>
                <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
            </Link>
            <div style={{ display: 'flex', gap: 6 }}>
                {[['Upload', '/upload'], ['Dashboard', '/dashboard'], ['Reports', '/reports'], ['Compliance', '/compliance']].map(([l, h]) => (
                    <Link key={l} href={h as string} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, color: 'rgba(134,239,172,0.65)', textDecoration: 'none' }}>{l}</Link>
                ))}
            </div>
            <span style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, color: '#4ade80', background: 'rgba(34,197,94,0.08)', fontWeight: 600 }}>Analysis</span>
        </nav>
    );
}

function RingChart({ pct, color, label }: { pct: number; color: string; label: string }) {
    const r = 36, circ = 2 * Math.PI * r;
    return (
        <div style={{ textAlign: 'center' }}>
            <svg width={90} height={90} viewBox="0 0 90 90">
                <circle cx={45} cy={45} r={r} fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth={10} />
                <circle cx={45} cy={45} r={r} fill="none" stroke={color} strokeWidth={10}
                    strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeDashoffset={circ / 4}
                    style={{ transition: 'stroke-dasharray 1.2s ease' }} />
                <text x={45} y={49} textAnchor="middle" fill={color} fontSize="13" fontWeight="800">{pct}%</text>
            </svg>
            <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', marginTop: 2 }}>{label}</div>
        </div>
    );
}

const emissionDetails = [
    { category: 'Electricity', scope: 'Scope 2', factor: '0.4842 kgCO₂/kWh', qty: '4,200 kWh', total: 2033.6, pct: 32, risk: 'Medium' },
    { category: 'Steel Feedstock', scope: 'Scope 3', factor: '1.85 tCO₂/t', qty: '12.4 t', total: 2294.0, pct: 37, risk: 'High' },
    { category: 'Natural Gas', scope: 'Scope 1', factor: '2.04 kgCO₂/m³', qty: '820 m³', total: 1672.8, pct: 27, risk: 'Medium' },
    { category: 'Diesel', scope: 'Scope 1', factor: '2.68 kgCO₂/L', qty: '180 L', total: 482.4, pct: 8, risk: 'Low' },
    { category: 'Process Water', scope: 'Scope 3', factor: '0.42 kgCO₂/m³', qty: '280 m³', total: 117.6, pct: 2, risk: 'Low' },
];

const recommendations = [
    { priority: 'HIGH', title: 'Switch to renewable energy tariff', impact: '-820 tCO₂e/yr', saving: '€2,400/yr', effort: 'Low' },
    { priority: 'HIGH', title: 'Source low-carbon steel from certified suppliers', impact: '-380 tCO₂e/yr', saving: '€1,100/yr', effort: 'Medium' },
    { priority: 'MEDIUM', title: 'Install on-site solar (200 kWp)', impact: '-210 tCO₂e/yr', saving: '€6,200/yr', effort: 'High' },
    { priority: 'LOW', title: 'Optimize diesel generator scheduling', impact: '-45 tCO₂e/yr', saving: '€320/yr', effort: 'Low' },
];

function generateAndDownloadReport() {
    const now = new Date().toLocaleDateString('en-GB');
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Fedora Carbon Analysis Report</title>
<style>
  body{font-family:Arial,sans-serif;background:#fff;color:#1a1a1a;margin:0;padding:40px;}
  h1{color:#15803d;font-size:28px;margin-bottom:4px;}
  h2{color:#166534;font-size:18px;border-bottom:2px solid #dcfce7;padding-bottom:8px;margin-top:32px;}
  .badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;}
  .green{background:#dcfce7;color:#15803d;}
  .orange{background:#fff7ed;color:#c2410c;}
  .red{background:#fef2f2;color:#b91c1c;}
  table{width:100%;border-collapse:collapse;margin-top:16px;font-size:13px;}
  th{background:#f0fdf4;color:#166534;text-align:left;padding:10px 12px;border-bottom:2px solid #bbf7d0;}
  td{padding:10px 12px;border-bottom:1px solid #f0fdf4;}
  tr:hover td{background:#f0fdf4;}
  .kpi{display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 24px;margin:8px;min-width:140px;text-align:center;}
  .kpi-val{font-size:28px;font-weight:900;color:#15803d;}
  .kpi-lbl{font-size:11px;color:#4ade80;text-transform:uppercase;letter-spacing:0.06em;}
  .rec{background:#f0fdf4;border-left:4px solid #22c55e;padding:12px 16px;margin:8px 0;border-radius:0 8px 8px 0;}
  footer{margin-top:48px;padding-top:20px;border-top:1px solid #dcfce7;font-size:11px;color:#6b7280;}
</style>
</head>
<body>
<h1>🌿 FEDORA — Carbon Analysis Report</h1>
<p style="color:#6b7280;font-size:13px;">Nguyen Steel Co. · Ho Chi Minh City, Vietnam · Generated: ${now}</p>
<p style="color:#6b7280;font-size:13px;">Source: Invoice_Steel_Jan26.pdf · OCR Confidence: 94.2%</p>

<div style="margin:24px 0;">
  <div class="kpi"><div class="kpi-val">62.4</div><div class="kpi-lbl">kgCO₂e / unit</div></div>
  <div class="kpi"><div class="kpi-val">€0.38</div><div class="kpi-lbl">CBAM cost / unit</div></div>
  <div class="kpi"><div class="kpi-val">68</div><div class="kpi-lbl">Green Score / 100</div></div>
  <div class="kpi"><div class="kpi-val">-3.2%</div><div class="kpi-lbl">vs last month</div></div>
</div>

<h2>1. Emission Breakdown by Source</h2>
<table>
  <thead><tr><th>Category</th><th>Scope</th><th>Emission Factor</th><th>Quantity</th><th>CO₂e (kg)</th><th>% of Total</th></tr></thead>
  <tbody>
    <tr><td>Electricity</td><td>Scope 2</td><td>0.4842 kgCO₂/kWh</td><td>4,200 kWh</td><td>2,033.6</td><td>32%</td></tr>
    <tr><td>Steel Feedstock</td><td>Scope 3</td><td>1.85 tCO₂/t</td><td>12.4 t</td><td>2,294.0</td><td>37%</td></tr>
    <tr><td>Natural Gas</td><td>Scope 1</td><td>2.04 kgCO₂/m³</td><td>820 m³</td><td>1,672.8</td><td>27%</td></tr>
    <tr><td>Diesel</td><td>Scope 1</td><td>2.68 kgCO₂/L</td><td>180 L</td><td>482.4</td><td>8%</td></tr>
    <tr><td>Process Water</td><td>Scope 3</td><td>0.42 kgCO₂/m³</td><td>280 m³</td><td>117.6</td><td>2%</td></tr>
    <tr style="font-weight:700;background:#f0fdf4;"><td colspan="4">TOTAL</td><td>6,600.4</td><td>100%</td></tr>
  </tbody>
</table>

<h2>2. CBAM Compliance Summary</h2>
<table>
  <thead><tr><th>Metric</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Product</td><td>Steel Beam 40×40mm</td></tr>
    <tr><td>CN Code</td><td>7308.90</td></tr>
    <tr><td>Embedded Carbon (per unit)</td><td>62.4 kgCO₂e</td></tr>
    <tr><td>EU ETS Carbon Price</td><td>€72.00 / tCO₂e</td></tr>
    <tr><td>CBAM Certificate Cost (per unit)</td><td>€0.38</td></tr>
    <tr><td>MRV Methodology</td><td>GHG Protocol + ASEAN Emission Factor DB v2.3</td></tr>
    <tr><td>Report Validity</td><td>Jan 2026 – Mar 2026</td></tr>
  </tbody>
</table>

<h2>3. AI Decarbonization Recommendations</h2>
<div class="rec"><strong style="color:#15803d;">[HIGH PRIORITY]</strong> Switch to renewable energy tariff — saves 820 tCO₂e/yr, €2,400/yr</div>
<div class="rec"><strong style="color:#15803d;">[HIGH PRIORITY]</strong> Source low-carbon steel from certified suppliers — saves 380 tCO₂e/yr, €1,100/yr</div>
<div class="rec"><strong style="color:#77b73a;">[MEDIUM]</strong> Install on-site solar 200 kWp — saves 210 tCO₂e/yr, €6,200/yr</div>
<div class="rec"><strong style="color:#aab73a;">[LOW]</strong> Optimize diesel generator scheduling — saves 45 tCO₂e/yr, €320/yr</div>

<h2>4. Emission Factor Sources</h2>
<table>
  <thead><tr><th>Source</th><th>Factor</th><th>Database</th></tr></thead>
  <tbody>
    <tr><td>Vietnam national grid electricity</td><td>0.4842 kgCO₂/kWh</td><td>ASEAN EF DB v2.3 (2024)</td></tr>
    <tr><td>Natural gas combustion</td><td>2.04 kgCO₂/m³</td><td>IPCC AR6 / Vietnam MOE</td></tr>
    <tr><td>Diesel combustion</td><td>2.68 kgCO₂/L</td><td>IPCC AR6</td></tr>
    <tr><td>Steel (basic oxygen furnace)</td><td>1.85 tCO₂/t</td><td>worldsteel 2024</td></tr>
  </tbody>
</table>

<footer>
  <p><strong>FEDORA</strong> · The Climate Operating System for ASEAN SMEs · fedora.app</p>
  <p>BU × Berkeley Climate Venture Competition · 2026 · This report is generated using ASEAN-specific emission factors and GHG Protocol methodology.</p>
  <p>To print as PDF: File → Print → Save as PDF in your browser.</p>
</footer>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `fedora-carbon-analysis-${Date.now()}.html`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
}

export default function AnalysisPage() {
    const [openRec, setOpenRec] = useState<string | null>(null);

    return (
        <main style={{ minHeight: '100vh', background: '#070f0a', paddingTop: 80 }}>
            <Navbar />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
                {/* Header + download */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><Brain size={11} /> In-Depth Analysis</div>
                        <h1 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#e2fdf0', marginBottom: 6 }}>Emission Analysis Report</h1>
                        <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14 }}>Invoice_Steel_Jan26.pdf · Nguyen Steel Co. · Jan 8, 2026 · OCR confidence: 94.2%</p>
                    </div>
                    <button
                        onClick={generateAndDownloadReport}
                        className="btn-primary"
                        style={{ padding: '14px 28px', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 24px rgba(34,197,94,0.25)' }}>
                        <Download size={16} /> Download Full Report
                    </button>
                </div>

                {/* Top KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
                    {[
                        { l: 'Total Embedded Carbon', v: '62.4', u: 'kgCO₂e / unit', c: '#4ade80' },
                        { l: 'Scope 1 (Direct)', v: '12.4', u: 'kgCO₂e / unit', c: '#22c55e' },
                        { l: 'Scope 2 (Energy)', v: '31.8', u: 'kgCO₂e / unit', c: '#86efac' },
                        { l: 'Scope 3 (Indirect)', v: '18.2', u: 'kgCO₂e / unit', c: '#a7f3d0' },
                    ].map(({ l, v, u, c }) => (
                        <div key={l} className="glass" style={{ padding: '20px' }}>
                            <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{l}</div>
                            <div style={{ fontSize: 32, fontWeight: 900, color: c }}>{v} <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(134,239,172,0.4)' }}>{u}</span></div>
                        </div>
                    ))}
                </div>

                {/* Scope ring charts + CBAM */}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, marginBottom: 20 }}>
                    <div className="glass" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 14, marginBottom: 4, textAlign: 'center' }}>Scope Distribution</div>
                        <div style={{ display: 'flex', gap: 24 }}>
                            <RingChart pct={20} color="#22c55e" label="Scope 1" />
                            <RingChart pct={51} color="#4ade80" label="Scope 2" />
                            <RingChart pct={29} color="#86efac" label="Scope 3" />
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '24px', background: 'rgba(245,158,11,0.04)', borderColor: 'rgba(245,158,11,0.18)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                            <AlertTriangle size={18} color="#f59e0b" />
                            <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: 15 }}>CBAM Certificate Calculation</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
                            {[['Embedded Carbon', '62.4 kgCO₂e/unit'], ['EU ETS Price', '€72.00 / tCO₂e'], ['Certificate Cost', '€0.38 / unit']].map(([l, v]) => (
                                <div key={l}>
                                    <div style={{ fontSize: 11, color: 'rgba(253,230,138,0.4)', marginBottom: 4 }}>{l}</div>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24' }}>{v}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid rgba(245,158,11,0.12)', paddingTop: 14 }}>
                            <div style={{ fontSize: 12, color: 'rgba(253,230,138,0.5)', marginBottom: 6 }}>MRV Methodology: GHG Protocol + ASEAN Emission Factor DB v2.3</div>
                            <div style={{ fontSize: 12, color: 'rgba(253,230,138,0.5)' }}>Report validity: Jan 2026 – Mar 2026 · CN Code: 7308.90 (Steel beam)</div>
                        </div>
                    </div>
                </div>

                {/* Detailed emission breakdown table */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden', marginBottom: 20 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileText size={15} color="#4ade80" /> Detailed Emission Breakdown
                    </div>
                    <table className="data-table">
                        <thead><tr><th>Source</th><th>Scope</th><th>Factor (ASEAN)</th><th>Quantity</th><th>CO₂e (kg)</th><th>% Share</th><th>Risk</th><th>Bar</th></tr></thead>
                        <tbody>
                            {emissionDetails.map(r => (
                                <tr key={r.category}>
                                    <td style={{ color: '#e2fdf0', fontWeight: 500 }}>{r.category}</td>
                                    <td>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                                            background: r.scope === 'Scope 1' ? 'rgba(34,197,94,0.12)' : r.scope === 'Scope 2' ? 'rgba(74,222,128,0.12)' : 'rgba(134,239,172,0.12)',
                                            color: r.scope === 'Scope 1' ? '#22c55e' : r.scope === 'Scope 2' ? '#4ade80' : '#86efac'
                                        }}>
                                            {r.scope}
                                        </span>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.factor}</td>
                                    <td>{r.qty}</td>
                                    <td style={{ fontWeight: 700, color: '#4ade80' }}>{r.total.toLocaleString()}</td>
                                    <td style={{ color: 'rgba(167,243,208,0.7)' }}>{r.pct}%</td>
                                    <td>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                                            background: r.risk === 'High' ? 'rgba(239,68,68,0.1)' : r.risk === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                                            color: r.risk === 'High' ? '#ef4444' : r.risk === 'Medium' ? '#f59e0b' : '#22c55e'
                                        }}>
                                            {r.risk}
                                        </span>
                                    </td>
                                    <td style={{ width: 100 }}>
                                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${r.pct * 2.7}%`, maxWidth: '100%' }} /></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* AI Recommendations */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden', marginBottom: 20 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Brain size={15} color="#4ade80" /> AI Decarbonization Recommendations
                    </div>
                    <div style={{ padding: '16px' }}>
                        {recommendations.map(r => (
                            <div key={r.title} className="glass-flat" style={{ padding: '14px 18px', marginBottom: 8, cursor: 'pointer' }}
                                onClick={() => setOpenRec(openRec === r.title ? null : r.title)}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{
                                        fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 999,
                                        background: r.priority === 'HIGH' ? 'rgba(239,68,68,0.1)' : r.priority === 'MEDIUM' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                                        color: r.priority === 'HIGH' ? '#ef4444' : r.priority === 'MEDIUM' ? '#f59e0b' : '#22c55e'
                                    }}>
                                        {r.priority}
                                    </span>
                                    <span style={{ flex: 1, fontWeight: 600, color: '#e2fdf0', fontSize: 14 }}>{r.title}</span>
                                    <div style={{ display: 'flex', gap: 16, marginRight: 8 }}>
                                        <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 700 }}>{r.impact}</span>
                                        <span style={{ fontSize: 12, color: '#86efac' }}>{r.saving}</span>
                                        <span style={{ fontSize: 12, color: 'rgba(134,239,172,0.4)' }}>Effort: {r.effort}</span>
                                    </div>
                                    {openRec === r.title ? <ChevronDown size={14} color="#4ade80" /> : <ChevronRight size={14} color="rgba(134,239,172,0.4)" />}
                                </div>
                                {openRec === r.title && (
                                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(74,222,128,0.1)', fontSize: 13, color: 'rgba(167,243,208,0.7)', lineHeight: 1.7 }}>
                                        Implementing this action would reduce your embedded carbon by {r.impact} annually, lowering your CBAM certificate costs and improving your Green Supplier Score.
                                        ROI estimated at 18 months. Connect to a green finance partner for subsidized implementation.
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="glass" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <div style={{ fontWeight: 700, color: '#e2fdf0', marginBottom: 4 }}>Ready to generate your CBAM report?</div>
                        <div style={{ fontSize: 13, color: 'rgba(134,239,172,0.5)' }}>Export-ready MRV document for your EU importer in one click.</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={generateAndDownloadReport} className="btn-primary" style={{ padding: '12px 24px', fontSize: 14 }}>
                            <Download size={15} /> Download Full Analysis
                        </button>
                        <Link href="/reports" style={{ padding: '12px 24px', border: '1px solid rgba(74,222,128,0.25)', color: '#86efac', borderRadius: 999, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ShieldCheck size={14} /> Generate CBAM Report
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
