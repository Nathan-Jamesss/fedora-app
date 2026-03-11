'use client';
import { Users, TrendingDown, TrendingUp, Award } from 'lucide-react';

const competitors = [
    { rank: 1, name: 'Hanoi Metals Ltd', country: '🇻🇳', score: 84, total: 612, s1: 122, s2: 310, s3: 180, cbam: '€0.29', badge: 'Sector Leader' },
    { rank: 2, name: 'Thai Steel Works', country: '🇹🇭', score: 78, total: 668, s1: 134, s2: 335, s3: 199, cbam: '€0.32', badge: null },
    { rank: 3, name: 'YOU — Nguyen Steel', country: '🇻🇳', score: 68, total: 796, s1: 158, s2: 378, s3: 260, cbam: '€0.38', badge: 'Your Company', you: true },
    { rank: 4, name: 'Jakarta Iron Co.', country: '🇮🇩', score: 61, total: 924, s1: 188, s2: 450, s3: 286, cbam: '€0.44', badge: null },
    { rank: 5, name: 'KL Aluminium Bhd', country: '🇲🇾', score: 58, total: 990, s1: 200, s2: 480, s3: 310, cbam: '€0.47', badge: null },
    { rank: 6, name: 'Cebu Metals Corp', country: '🇵🇭', score: 52, total: 1120, s1: 226, s2: 540, s3: 354, cbam: '€0.54', badge: null },
];

function HorizBar({ pct, color }: { pct: number; color: string }) {
    return (
        <div style={{ height: 6, background: 'rgba(74,222,128,0.08)', borderRadius: 999, width: 100 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width 1s' }} />
        </div>
    );
}

// Radar-like chart comparing you vs sector leader
function CompareChart() {
    const dims = ['Scope 1', 'Scope 2', 'Scope 3', 'Documentation', 'CBAM Cost', 'Green Score'];
    const you = [68, 58, 55, 70, 65, 68];     // normalised 0–100 (higher=better)
    const leader = [88, 82, 78, 92, 88, 84];
    const W = 360, cx = 175, cy = 155, r = 110;
    const pts = (vals: number[]) => dims.map((_, i) => {
        const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2;
        const frac = vals[i] / 100;
        return [cx + r * frac * Math.cos(angle), cy + r * frac * Math.sin(angle)];
    });
    const toPath = (pts: number[][]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + 'Z';

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${W}`} style={{ maxWidth: 360 }}>
            {/* grid */}
            {[0.25, 0.5, 0.75, 1].map(f => (
                <polygon key={f} fill="none" stroke="rgba(74,222,128,0.07)" strokeWidth={1}
                    points={dims.map((_, i) => { const a = (i / dims.length) * 2 * Math.PI - Math.PI / 2; return `${cx + r * f * Math.cos(a)},${cy + r * f * Math.sin(a)}`; }).join(' ')} />
            ))}
            {dims.map((_, i) => {
                const a = (i / dims.length) * 2 * Math.PI - Math.PI / 2;
                return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="rgba(74,222,128,0.07)" strokeWidth={1} />;
            })}
            {/* leader area */}
            <path d={toPath(pts(leader))} fill="rgba(74,222,128,0.06)" stroke="#4ade80" strokeWidth={1.5} />
            {/* you area */}
            <path d={toPath(pts(you))} fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth={2} />
            {/* labels */}
            {dims.map((d, i) => {
                const a = (i / dims.length) * 2 * Math.PI - Math.PI / 2;
                return <text key={d} x={cx + (r + 18) * Math.cos(a)} y={cy + (r + 18) * Math.sin(a)}
                    textAnchor="middle" dominantBaseline="middle" fill="rgba(134,239,172,0.55)" fontSize={10}>{d}</text>;
            })}
        </svg>
    );
}

export default function CompetitorsPage() {
    return (
        <div style={{ padding: '32px 36px', color: '#e2fdf0' }}>
            <div style={{ marginBottom: 32 }}>
                <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><Users size={11} /> Competitor Benchmarking</div>
                <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>ASEAN Sector Leaderboard</h1>
                <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14 }}>See how your emissions compare to other ASEAN steel and metals producers targeting the same EU market.</p>
            </div>

            {/* Your position callout */}
            <div style={{ marginBottom: 20, padding: '18px 24px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <p style={{ fontWeight: 700, color: '#4ade80', fontSize: 16 }}>You are #3 in your sector</p>
                        <p style={{ fontSize: 13, color: 'rgba(134,239,172,0.55)', marginTop: 2 }}>
                            To reach #2: reduce total by <strong style={{ color: '#4ade80' }}>128 tCO₂e</strong> — achievable by switching to renewable electricity.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: '#4ade80' }}>68</div>
                            <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.4)' }}>Your Score</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: '#86efac' }}>84</div>
                            <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.4)' }}>Leader Score</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: '#f59e0b' }}>-16</div>
                            <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.4)' }}>Points gap</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table + Radar side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, marginBottom: 20, alignItems: 'start' }}>
                <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14 }}>Full Ranking</div>
                    <table className="data-table">
                        <thead><tr><th>#</th><th>Company</th><th>Green Score</th><th>Total (tCO₂e)</th><th>Scope 1</th><th>Scope 2</th><th>Scope 3</th><th>CBAM Cost</th></tr></thead>
                        <tbody>
                            {competitors.map(c => (
                                <tr key={c.rank} style={{ background: c.you ? 'rgba(34,197,94,0.05)' : undefined }}>
                                    <td style={{ fontWeight: 900, color: c.rank <= 3 ? ['#fbbf24', '#94a3b8', '#cd7c3e'][c.rank - 1] : 'rgba(134,239,172,0.4)', fontSize: 16 }}>
                                        {c.rank <= 3 ? ['🥇', '🥈', '🥉'][c.rank - 1] : c.rank}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span>{c.country}</span>
                                            <span style={{ fontWeight: c.you ? 700 : 500, color: c.you ? '#4ade80' : '#e2fdf0' }}>{c.name}</span>
                                            {c.badge && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: c.you ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.1)', color: c.you ? '#22c55e' : '#f59e0b' }}>{c.badge}</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontWeight: 700, color: c.score >= 80 ? '#22c55e' : c.score >= 65 ? '#4ade80' : '#f59e0b' }}>{c.score}</span>
                                            <HorizBar pct={c.score} color={c.score >= 80 ? '#22c55e' : c.score >= 65 ? '#4ade80' : '#f59e0b'} />
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 700, color: c.you ? '#4ade80' : 'rgba(167,243,208,0.8)' }}>{c.total}</td>
                                    <td style={{ fontSize: 12 }}>{c.s1}</td>
                                    <td style={{ fontSize: 12 }}>{c.s2}</td>
                                    <td style={{ fontSize: 12 }}>{c.s3}</td>
                                    <td style={{ fontWeight: 700, color: c.rank === 1 ? '#22c55e' : 'rgba(167,243,208,0.7)' }}>{c.cbam}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Radar */}
                <div className="glass" style={{ padding: '20px', minWidth: 280 }}>
                    <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 14, marginBottom: 12 }}>You vs Sector Leader</div>
                    <CompareChart />
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 2, background: '#22c55e', borderRadius: 1 }} /><span style={{ fontSize: 10, color: 'rgba(134,239,172,0.5)' }}>You</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 2, background: '#4ade80', borderRadius: 1 }} /><span style={{ fontSize: 10, color: 'rgba(134,239,172,0.5)' }}>Leader</span></div>
                    </div>
                </div>
            </div>

            {/* Improvement plan */}
            <div className="glass" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 15, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingDown size={15} color="#4ade80" /> How to Reach the Top of the Leaderboard
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                    {[
                        { action: 'Switch to renewable grid tariff', reduction: '-300 tCO₂e', score: '+12 pts', effort: 'Low' },
                        { action: 'Certified low-carbon steel feedstock', reduction: '-180 tCO₂e', score: '+8 pts', effort: 'Medium' },
                        { action: 'ISO 14064 verification', reduction: '0 tCO₂e', score: '+5 pts (documentation)', effort: 'Medium' },
                    ].map(item => (
                        <div key={item.action} className="glass-flat" style={{ padding: '16px' }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#e2fdf0', marginBottom: 8 }}>{item.action}</div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontWeight: 700 }}>{item.reduction}</span>
                                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(74,222,128,0.1)', color: '#4ade80', fontWeight: 700 }}>{item.score}</span>
                                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(134,239,172,0.06)', color: 'rgba(134,239,172,0.5)' }}>Effort: {item.effort}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
