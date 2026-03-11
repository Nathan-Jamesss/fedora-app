'use client';
import Link from 'next/link';
import { Leaf, BarChart3, TrendingUp, TrendingDown, FileText, Upload, ShieldCheck, AlertTriangle } from 'lucide-react';

function Navbar() {
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,15,10,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={16} color="#052e16" /></div>
                <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
            </Link>
            <div style={{ display: 'flex', gap: 6 }}>
                {[['Upload', '/upload'], ['Analysis', '/analysis'], ['Reports', '/reports'], ['Compliance', '/compliance']].map(([l, h]) => (
                    <Link key={l} href={h as string} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, color: 'rgba(134,239,172,0.65)', textDecoration: 'none' }}>{l}</Link>
                ))}
            </div>
            <Link href="/upload" style={{ padding: '10px 22px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>Upload Bill</Link>
        </nav>
    );
}

// Simple SVG donut chart
function DonutChart({ data }: { data: { v: number; c: string; l: string }[] }) {
    const total = data.reduce((a, d) => a + d.v, 0);
    let offset = 0;
    const r = 54, cx = 70, cy = 70, circ = 2 * Math.PI * r;
    return (
        <svg width={140} height={140} viewBox="0 0 140 140">
            {data.map((d, i) => {
                const pct = d.v / total; const dash = pct * circ; const gap = circ - dash;
                const seg = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.c} strokeWidth={14} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset * circ} style={{ transition: 'stroke-dasharray 1s' }} />;
                offset += pct; return seg;
            })}
            <circle cx={cx} cy={cy} r={42} fill="#070f0a" />
            <text x={cx} y={cy - 4} textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="800">{total}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(134,239,172,0.5)" fontSize="9">tCO₂e</text>
        </svg>
    );
}

// Mini bar chart SVG
function BarChart({ data }: { data: { m: string; v: number }[] }) {
    const max = Math.max(...data.map(d => d.v));
    const W = 480, H = 100, pad = 10, barW = Math.floor((W - pad * 2) / data.length) - 4;
    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H + 24}`} preserveAspectRatio="none">
            {data.map((d, i) => {
                const h = (d.v / max) * (H - 10); const x = pad + i * (barW + 4); const y = H - h;
                return (
                    <g key={d.m}>
                        <rect x={x} y={y} width={barW} height={h} rx={3} fill="url(#bg)" />
                        <text x={x + barW / 2} y={H + 16} textAnchor="middle" fill="rgba(134,239,172,0.4)" fontSize="9">{d.m}</text>
                    </g>
                );
            })}
            <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#16a34a80" /></linearGradient></defs>
        </svg>
    );
}

const scopeData = [{ v: 186, c: '#22c55e', l: 'Scope 1' }, { v: 478, c: '#4ade80', l: 'Scope 2' }, { v: 271, c: '#86efac', l: 'Scope 3' }];
const monthData = [
    { m: 'Aug', v: 970 }, { m: 'Sep', v: 910 }, { m: 'Oct', v: 980 }, { m: 'Nov', v: 940 }, { m: 'Dec', v: 890 }, { m: 'Jan', v: 935 }
];
const recentReports = [
    { name: 'Invoice_Steel_Jan26.pdf', date: '2026-01-08', status: 'Ready', co2: '62.4', score: 68 },
    { name: 'Energy_Bill_Dec25.pdf', date: '2025-12-15', status: 'Ready', co2: '71.2', score: 64 },
    { name: 'Supplier_Invoice_Nov25.pdf', date: '2025-11-22', status: 'Ready', co2: '58.9', score: 72 },
];

export default function DashboardPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#070f0a', paddingTop: 80 }}>
            <Navbar />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><BarChart3 size={11} /> Dashboard</div>
                        <h1 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#e2fdf0' }}>Carbon Overview</h1>
                        <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14, marginTop: 4 }}>Nguyen Steel Co. · Ho Chi Minh City · Jan 2026</p>
                    </div>
                    <Link href="/upload" style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Upload size={14} /> Upload New Bill
                    </Link>
                </div>

                {/* KPI row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
                    {[
                        { label: 'Total Emissions (Jan)', value: '935', unit: 'tCO₂e', trend: -3.2, color: '#4ade80' },
                        { label: 'CBAM Exposure', value: '€3,420', unit: '/ month', trend: +1.8, color: '#f59e0b' },
                        { label: 'Green Supplier Score', value: '68', unit: '/ 100', trend: +4, color: '#22c55e' },
                        { label: 'Reports Generated', value: '11', unit: 'this quarter', trend: 0, color: '#86efac' },
                    ].map(({ label, value, unit, trend, color }) => (
                        <div key={label} className="glass shimmer" style={{ padding: '22px 20px' }}>
                            <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</div>
                            <div style={{ fontSize: 32, fontWeight: 900, color }}>{value} <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(134,239,172,0.4)' }}>{unit}</span></div>
                            {trend !== 0 && <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: trend < 0 ? '#4ade80' : '#f59e0b', fontWeight: 600 }}>
                                {trend < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />} {Math.abs(trend)}% vs last month
                            </div>}
                        </div>
                    ))}
                </div>

                {/* Charts row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14, marginBottom: 20 }}>
                    {/* Donut */}
                    <div className="glass" style={{ padding: '24px' }}>
                        <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15, marginBottom: 20 }}>Scope Breakdown</div>
                        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                            <DonutChart data={scopeData} />
                            <div style={{ flex: 1 }}>
                                {scopeData.map(d => (
                                    <div key={d.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.c }} />
                                            <span style={{ fontSize: 13, color: 'rgba(167,243,208,0.7)' }}>{d.l}</span>
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: d.c }}>{d.v}t</span>
                                    </div>
                                ))}
                                <div className="divider-line" style={{ margin: '12px 0' }} />
                                <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)' }}>Total: 935 tCO₂e · Jan 2026</div>
                            </div>
                        </div>
                    </div>

                    {/* Bar chart */}
                    <div className="glass" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15 }}>Monthly Emissions (tCO₂e)</div>
                            <div style={{ fontSize: 12, color: '#4ade80', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><TrendingDown size={12} /> -3.6% 6-month trend</div>
                        </div>
                        <BarChart data={monthData} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.3)' }}>6-month average: 938 tCO₂e</span>
                            <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.3)' }}>Target: 800 tCO₂e by Q4 2026</span>
                        </div>
                    </div>
                </div>

                {/* CBAM alert + supplier score */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                    <div className="glass" style={{ padding: '22px', background: 'rgba(245,158,11,0.04)', borderColor: 'rgba(245,158,11,0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <AlertTriangle size={18} color="#f59e0b" />
                            <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: 15 }}>CBAM Exposure</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {[['Estimated CBAM', '€3,420/mo'], ['EU ETS Price', '€72/tCO₂e'], ['Affected Products', 'Steel beams, rebar'], ['Next Report Due', 'Feb 28, 2026']].map(([l, v]) => (
                                <div key={l}>
                                    <div style={{ fontSize: 11, color: 'rgba(253,230,138,0.4)', marginBottom: 2 }}>{l}</div>
                                    <div style={{ fontWeight: 700, color: 'rgba(253,230,138,0.9)', fontSize: 14 }}>{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <ShieldCheck size={18} color="#4ade80" />
                            <span style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15 }}>Green Supplier Score</span>
                        </div>
                        <div style={{ fontSize: 48, fontWeight: 900, color: '#4ade80', marginBottom: 10 }}>68<span style={{ fontSize: 18, color: 'rgba(134,239,172,0.4)', fontWeight: 400 }}>/100</span></div>
                        <div className="progress-bar" style={{ marginBottom: 12 }}>
                            <div className="progress-fill" style={{ width: '68%' }} />
                        </div>
                        {[['Emission Intensity', '72/100'], ['Documentation', '65/100'], ['MRV Quality', '70/100']].map(([l, v]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)' }}>{l}</span>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#86efac' }}>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent reports */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><FileText size={16} color="#4ade80" />Recent Analyses</span>
                        <Link href="/reports" style={{ fontSize: 12, color: '#4ade80', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
                    </div>
                    <table className="data-table">
                        <thead><tr><th>File</th><th>Analyzed</th><th>CO₂e/unit</th><th>Score</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {recentReports.map(r => (
                                <tr key={r.name}>
                                    <td style={{ color: '#e2fdf0', fontWeight: 500, fontSize: 13 }}>{r.name}</td>
                                    <td>{r.date}</td>
                                    <td style={{ fontWeight: 700, color: '#4ade80' }}>{r.co2} kgCO₂e</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div className="progress-bar" style={{ width: 60, display: 'inline-block' }}><div className="progress-fill" style={{ width: `${r.score}%` }} /></div>
                                            <span style={{ fontSize: 12, color: '#86efac' }}>{r.score}</span>
                                        </div>
                                    </td>
                                    <td><span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>{r.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <Link href="/analysis" style={{ fontSize: 12, color: '#4ade80', textDecoration: 'none', fontWeight: 600 }}>View</Link>
                                            <Link href="/reports" style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)', textDecoration: 'none' }}>Report</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
