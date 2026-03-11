'use client';
import { useState, useRef } from 'react';
import { BarChart3, Upload, CheckCircle, CloudUpload, Download, TrendingDown, TrendingUp } from 'lucide-react';

// ── SVG grouped bar chart (months × scopes)
const monthData = [
    { m: 'Aug', s1: 186, s2: 420, s3: 310, opt: 820, comp: 1050 },
    { m: 'Sep', s1: 175, s2: 410, s3: 295, opt: 780, comp: 1020 },
    { m: 'Oct', s1: 195, s2: 438, s3: 320, opt: 850, comp: 1080 },
    { m: 'Nov', s1: 172, s2: 408, s3: 288, opt: 760, comp: 990 },
    { m: 'Dec', s1: 168, s2: 392, s3: 278, opt: 740, comp: 970 },
    { m: 'Jan', s1: 158, s2: 378, s3: 260, opt: 720, comp: 950 },
];

function GroupedBarChart() {
    const W = 600, H = 200, PAD = 40;
    const groups = monthData.length;
    const gW = (W - PAD * 2) / groups;
    const barW = gW / 4 - 2;
    const maxV = 1100;
    const toY = (v: number) => H - PAD / 2 - (v / maxV) * (H - PAD);

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H + 25}`} style={{ overflow: 'visible' }}>
            {[0, 250, 500, 750, 1000].map(v => (
                <g key={v}>
                    <line x1={PAD} x2={W - PAD} y1={toY(v)} y2={toY(v)} stroke="rgba(74,222,128,0.06)" strokeWidth={1} />
                    <text x={PAD - 4} y={toY(v) + 4} textAnchor="end" fill="rgba(134,239,172,0.3)" fontSize={9}>{v}</text>
                </g>
            ))}
            {monthData.map((d, gi) => {
                const gx = PAD + gi * gW;
                const bars = [
                    { v: d.s1, c: '#22c55e' }, { v: d.s2, c: '#4ade80' }, { v: d.s3, c: '#86efac' },
                    { v: d.s1 + d.s2 + d.s3, c: '#a7f3d080', label: 'Total' },
                ];
                return (
                    <g key={d.m}>
                        {bars.map((b, bi) => {
                            const x = gx + bi * (barW + 1.5) + 2;
                            const y = toY(b.v); const h = H - PAD / 2 - y;
                            return <rect key={bi} x={x} y={y} width={barW} height={h} rx={2} fill={b.c} opacity={0.85} />;
                        })}
                        <text x={gx + gW / 2} y={H + 16} textAnchor="middle" fill="rgba(134,239,172,0.45)" fontSize={10}>{d.m}</text>
                    </g>
                );
            })}
            {/* Legend */}
            {[['#22c55e', 'Scope 1'], ['#4ade80', 'Scope 2'], ['#86efac', 'Scope 3'], ['#a7f3d0', 'Total']].map(([c, l], i) => (
                <g key={l} transform={`translate(${PAD + i * 80}, ${H + 26})`}>
                    <rect width={10} height={10} rx={2} fill={c} />
                    <text x={14} y={9} fill="rgba(134,239,172,0.5)" fontSize={9}>{l}</text>
                </g>
            ))}
        </svg>
    );
}

// ── Line chart: Yours vs Optimal vs Competitor
function LineChart() {
    const W = 600, H = 180, PAD = 40;
    const maxV = 1200;
    const toX = (i: number) => PAD + i * ((W - PAD * 2) / (monthData.length - 1));
    const toY = (v: number) => H - PAD / 2 - (v / maxV) * (H - PAD);

    const yourPts = monthData.map((d, i) => `${toX(i)},${toY(d.s1 + d.s2 + d.s3)}`).join(' ');
    const optPts = monthData.map((d, i) => `${toX(i)},${toY(d.opt)}`).join(' ');
    const compPts = monthData.map((d, i) => `${toX(i)},${toY(d.comp)}`).join(' ');

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`} style={{ overflow: 'visible' }}>
            {[400, 600, 800, 1000].map(v => (
                <line key={v} x1={PAD} x2={W - PAD} y1={toY(v)} y2={toY(v)} stroke="rgba(74,222,128,0.06)" strokeWidth={1} />
            ))}
            {/* Area fills */}
            <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" /><stop offset="100%" stopColor="#22c55e" stopOpacity="0" /></linearGradient>
                <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0" /></linearGradient>
            </defs>
            <polyline points={yourPts} fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinejoin="round" />
            <polyline points={optPts} fill="none" stroke="#4ade80" strokeWidth={1.5} strokeDasharray="6 4" strokeLinejoin="round" opacity={0.7} />
            <polyline points={compPts} fill="none" stroke="#f59e0b" strokeWidth={2} strokeLinejoin="round" opacity={0.6} />
            {/* Dots */}
            {monthData.map((d, i) => {
                const tot = d.s1 + d.s2 + d.s3;
                return (
                    <g key={d.m}>
                        <circle cx={toX(i)} cy={toY(tot)} r={4} fill="#22c55e" />
                        <circle cx={toX(i)} cy={toY(d.opt)} r={3} fill="#4ade80" />
                        <circle cx={toX(i)} cy={toY(d.comp)} r={3} fill="#f59e0b" />
                        <text x={toX(i)} y={H + 16} textAnchor="middle" fill="rgba(134,239,172,0.4)" fontSize={10}>{d.m}</text>
                    </g>
                );
            })}
            {/* Legend */}
            {[['#22c55e', 'Your Emissions'], ['#4ade80', 'Optimal Target'], ['#f59e0b', 'Industry Avg']].map(([c, l], i) => (
                <g key={l} transform={`translate(${PAD + i * 140}, ${H + 26})`}>
                    <line x1={0} y1={5} x2={14} y2={5} stroke={c} strokeWidth={2} />
                    <text x={18} y={9} fill="rgba(134,239,172,0.5)" fontSize={9}>{l}</text>
                </g>
            ))}
        </svg>
    );
}

export default function BatchAnalysisPage() {
    const [files, setFiles] = useState<{ name: string; month: string; status: string; s1: number; s2: number; s3: number }[]>([
        { name: 'energy_bill_aug25.pdf', month: 'Aug 2025', status: 'Done', s1: 186, s2: 420, s3: 310 },
        { name: 'invoice_sep25.pdf', month: 'Sep 2025', status: 'Done', s1: 175, s2: 410, s3: 295 },
        { name: 'energy_bill_oct25.pdf', month: 'Oct 2025', status: 'Done', s1: 195, s2: 438, s3: 320 },
        { name: 'invoice_nov25.pdf', month: 'Nov 2025', status: 'Done', s1: 172, s2: 408, s3: 288 },
        { name: 'energy_bill_dec25.pdf', month: 'Dec 2025', status: 'Done', s1: 168, s2: 392, s3: 278 },
        { name: 'invoice_jan26.pdf', month: 'Jan 2026', status: 'Done', s1: 158, s2: 378, s3: 260 },
    ]);
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const addFile = (name: string) => {
        setFiles(prev => [...prev, { name, month: 'Feb 2026', status: 'Processing…', s1: 0, s2: 0, s3: 0 }]);
        setTimeout(() => {
            setFiles(prev => prev.map(f => f.name === name ? { ...f, status: 'Done', s1: 148, s2: 362, s3: 245 } : f));
        }, 2800);
    };

    const totalDelta = ((186 + 420 + 310) - (158 + 378 + 260));
    const yoyPct = ((totalDelta / (186 + 420 + 310)) * 100).toFixed(1);

    function downloadBatchReport() {
        const rows = files.map(f => `<tr><td>${f.month}</td><td>${f.name}</td><td>${f.s1}</td><td>${f.s2}</td><td>${f.s3}</td><td>${f.s1 + f.s2 + f.s3}</td></tr>`).join('');
        const html = `<!DOCTYPE html><html><head><title>Fedora Batch Analysis Report</title>
<style>body{font-family:Arial;padding:40px;color:#1a1a1a;}h1{color:#15803d;}table{width:100%;border-collapse:collapse;margin-top:16px;}th,td{padding:10px;border:1px solid #dcfce7;text-align:left;}th{background:#f0fdf4;color:#166534;}</style>
</head><body><h1>🌿 Fedora — Batch Analysis Report</h1>
<p>Nguyen Steel Co. · ${files.length} months analysed · Generated: ${new Date().toLocaleDateString('en-GB')}</p>
<table><thead><tr><th>Month</th><th>File</th><th>Scope 1</th><th>Scope 2</th><th>Scope 3</th><th>Total (tCO₂e)</th></tr></thead><tbody>${rows}</tbody></table>
<p style="margin-top:24px;font-size:12px;color:#6b7280;">FEDORA · To save as PDF: File → Print → Save as PDF</p></body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'fedora-batch-report.html';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }

    return (
        <div style={{ padding: '32px 36px', color: '#e2fdf0' }}>
            <div style={{ marginBottom: 32 }}>
                <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><BarChart3 size={11} /> Batch &amp; Yearly Analysis</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Multi-Month Analysis</h1>
                        <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14 }}>Upload bills for multiple months — compare, trend, and benchmark your emissions over time.</p>
                    </div>
                    <button onClick={downloadBatchReport} className="btn-primary" style={{ padding: '12px 24px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Download size={14} /> Download Batch Report
                    </button>
                </div>
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                {[
                    { l: 'Months Analysed', v: String(files.length), u: 'files', c: '#4ade80' },
                    { l: '6-Month Reduction', v: `${yoyPct}%`, u: 'improvement', c: '#22c55e' },
                    { l: 'Latest Total', v: '796', u: 'tCO₂e (Jan)', c: '#86efac' },
                    { l: 'Optimal Gap', v: '-76', u: 'tCO₂e to target', c: '#a7f3d0' },
                ].map(({ l, v, u, c }) => (
                    <div key={l} className="glass" style={{ padding: '18px 20px' }}>
                        <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{l}</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: c }}>{v} <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', fontWeight: 400 }}>{u}</span></div>
                    </div>
                ))}
            </div>

            {/* Upload zone */}
            <div className={`upload-zone${dragOver ? ' drag-over' : ''}`}
                style={{ padding: '28px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) addFile(e.dataTransfer.files[0].name); }}>
                <CloudUpload size={32} color="#4ade80" style={{ flexShrink: 0 }} />
                <div>
                    <p style={{ fontWeight: 700, color: '#e2fdf0', marginBottom: 4 }}>Add more months to your batch</p>
                    <p style={{ fontSize: 12, color: 'rgba(134,239,172,0.4)' }}>Drop energy bills or invoices here — supports PNG, PDF, JPG, HEIC</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*,.pdf" multiple style={{ display: 'none' }}
                    onChange={e => { Array.from(e.target.files || []).forEach(f => addFile(f.name)); }} />
            </div>

            {/* File list */}
            <div className="glass" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14 }}>Uploaded Files</div>
                <table className="data-table">
                    <thead><tr><th>Month</th><th>File</th><th>Scope 1</th><th>Scope 2</th><th>Scope 3</th><th>Total (tCO₂e)</th><th>Status</th><th>Δ vs Prev</th></tr></thead>
                    <tbody>
                        {files.map((f, i) => {
                            const tot = f.s1 + f.s2 + f.s3;
                            const prev = i > 0 ? files[i - 1] : null;
                            const prevTot = prev ? prev.s1 + prev.s2 + prev.s3 : tot;
                            const delta = tot - prevTot;
                            return (
                                <tr key={f.name}>
                                    <td style={{ color: '#e2fdf0', fontWeight: 600 }}>{f.month}</td>
                                    <td style={{ fontSize: 12, color: 'rgba(134,239,172,0.6)' }}>{f.name}</td>
                                    <td>{f.s1 || '—'}</td><td>{f.s2 || '—'}</td><td>{f.s3 || '—'}</td>
                                    <td style={{ fontWeight: 700, color: '#4ade80' }}>{tot || '—'}</td>
                                    <td><span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: f.status === 'Done' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: f.status === 'Done' ? '#22c55e' : '#f59e0b' }}>{f.status}</span></td>
                                    <td style={{ color: delta < 0 ? '#22c55e' : delta > 0 ? '#f59e0b' : 'rgba(134,239,172,0.4)', fontWeight: 600, fontSize: 12 }}>
                                        {i > 0 && f.status === 'Done' ? (delta < 0 ? '▼' : '▲') + ' ' + Math.abs(delta) : '—'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Charts */}
            <div className="glass" style={{ padding: '24px', marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BarChart3 size={15} color="#4ade80" /> Monthly Scope Breakdown (tCO₂e)
                </div>
                <GroupedBarChart />
            </div>

            <div className="glass" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TrendingDown size={15} color="#4ade80" /> Your Trajectory vs Optimal Target &amp; Industry Average
                    </div>
                    <div style={{ fontSize: 12, color: '#4ade80', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <TrendingDown size={12} /> Great — you&apos;re improving every month!
                    </div>
                </div>
                <LineChart />
                <div style={{ marginTop: 16, padding: '14px 18px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 10 }}>
                    <p style={{ fontSize: 13, color: 'rgba(167,243,208,0.7)', lineHeight: 1.7 }}>
                        <strong style={{ color: '#4ade80' }}>Key insight:</strong> Your emissions are <strong>{yoyPct}% lower</strong> than 6 months ago, beating the industry average by ~23%.
                        To reach the optimal target (720 tCO₂e), the biggest remaining lever is switching to a renewable electricity tariff (saves ~300 tCO₂e).
                    </p>
                </div>
            </div>
        </div>
    );
}
