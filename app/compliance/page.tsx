'use client';
import Link from 'next/link';
import { Leaf, ShieldCheck, AlertTriangle, CheckCircle, Clock, XCircle, ArrowRight, Globe, FileText } from 'lucide-react';

function Navbar() {
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,15,10,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
            </Link>
            <div style={{ display: 'flex', gap: 6 }}>
                {[['Upload', '/upload'], ['Dashboard', '/dashboard'], ['Analysis', '/analysis'], ['Reports', '/reports']].map(([l, h]) => (
                    <Link key={l} href={h as string} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, color: 'rgba(134,239,172,0.65)', textDecoration: 'none' }}>{l}</Link>
                ))}
            </div>
            <span style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, color: '#4ade80', background: 'rgba(34,197,94,0.08)', fontWeight: 600 }}>Compliance</span>
        </nav>
    );
}

const checklist = [
    { item: 'Baseline emissions measured (Scope 1, 2, 3)', done: true, detail: 'Jan 2026 full measurement completed' },
    { item: 'ASEAN-specific emission factors applied', done: true, detail: 'ASEAN EF DB v2.3 — Vietnam grid, fuel & process factors' },
    { item: 'GHG Protocol methodology followed', done: true, detail: 'GHG Protocol Corporate Standard — automated calculation' },
    { item: 'MRV documentation generated', done: true, detail: 'CBAM MRV report ready for EU importer submission' },
    { item: 'Carbon intensity per unit calculated', done: true, detail: '62.4 kgCO₂e per unit · Steel Beam 40×40mm' },
    { item: 'CN product code mapped', done: true, detail: '7308.90 — Iron/steel structures, pending EU expansion to downstream' },
    { item: 'CBAM certificate cost estimated', done: true, detail: '€0.38 per unit at €72/tCO₂e EU ETS price' },
    { item: 'EU importer notified with carbon data', done: false, detail: 'Send CBAM MRV report to Heinz GmbH, Germany' },
    { item: 'Green finance application initiated', done: false, detail: 'Upload verified data to OCBC green lending portal' },
    { item: 'Scope 3 supplier data collected', done: false, detail: 'Request carbon data from top 3 steel feedstock suppliers' },
];

const countries = [
    { name: 'Vietnam', exposure: '€830M/yr', products: 'Iron & steel, rebar', risk: 'Highest', score: 68, flag: '🇻🇳' },
    { name: 'Thailand', exposure: '€340M/yr', products: 'Al products, steel goods', risk: 'Growing', score: 72, flag: '🇹🇭' },
    { name: 'Indonesia', exposure: '€280M/yr', products: 'Cement, clinker', risk: 'High', score: 61, flag: '🇮🇩' },
    { name: 'Malaysia', exposure: '€190M/yr', products: 'Aluminium, metals', risk: 'Moderate', score: 75, flag: '🇲🇾' },
];

const timeline = [
    { date: 'Oct 2023 – Dec 2025', label: 'Transitional Phase', status: 'past', desc: 'Importers reported embedded carbon — NO charges yet. Data collection only.' },
    { date: 'Jan 2026', label: 'Full CBAM Enforcement', status: 'now', desc: 'Certificate purchases begin. EU importers must cover embedded carbon costs. ASEAN SMEs must provide MRV reports NOW.' },
    { date: '2026 Q2', label: 'Scope Expansion', status: 'future', desc: 'EU expanding CBAM to downstream products (finished steel goods, fabricated items).' },
    { date: '2027', label: 'Additional Sectors', status: 'future', desc: 'Organic chemicals, plastics, rubber expected to be added as EU reviews scope.' },
];

export default function CompliancePage() {
    const done = checklist.filter(c => c.done).length;
    const pct = Math.round(done / checklist.length * 100);

    return (
        <main style={{ minHeight: '100vh', background: '#070f0a', paddingTop: 80 }}>
            <Navbar />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
                {/* Header */}
                <div style={{ marginBottom: 36 }}>
                    <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><ShieldCheck size={11} /> CBAM Compliance</div>
                    <h1 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#e2fdf0', marginBottom: 6 }}>Compliance Tracker</h1>
                    <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14 }}>Track your readiness for EU Carbon Border Adjustment Mechanism enforcement — January 2026</p>
                </div>

                {/* Score + CBAM status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14, marginBottom: 20 }}>
                    <div className="glass" style={{ padding: '28px', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Readiness Score</div>
                        <div style={{ fontSize: 64, fontWeight: 900, color: '#4ade80', lineHeight: 1 }}>{pct}%</div>
                        <div className="progress-bar" style={{ margin: '16px 0' }}>
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <div style={{ fontSize: 13, color: 'rgba(134,239,172,0.5)' }}>{done} / {checklist.length} tasks complete</div>
                    </div>

                    <div className="glass" style={{ padding: '24px', background: 'rgba(245,158,11,0.04)', borderColor: 'rgba(245,158,11,0.18)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <AlertTriangle size={18} color="#f59e0b" />
                            <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: 16 }}>CBAM: Full Enforcement Active</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                            {[['Status', 'ACTIVE — Jan 2026'], ['Your Products', 'Steel beams (7308.90)'], ['Monthly Exposure', '€3,420'], ['EU ETS Price', '€72 / tCO₂e'], ['Without Fedora', 'Default (worst-case) rate'], ['With Fedora', 'Actual rate: €0.38/unit']].map(([l, v]) => (
                                <div key={l}>
                                    <div style={{ fontSize: 11, color: 'rgba(253,230,138,0.4)', marginBottom: 3 }}>{l}</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(253,230,138,0.9)' }}>{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Checklist */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden', marginBottom: 20 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={15} color="#4ade80" /> CBAM Compliance Checklist
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {checklist.map((c, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 20px', borderBottom: '1px solid rgba(74,222,128,0.06)', transition: 'background 0.2s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.03)'}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                                <div style={{ marginTop: 1, flexShrink: 0 }}>
                                    {c.done
                                        ? <CheckCircle size={18} color="#22c55e" />
                                        : <Clock size={18} color="rgba(245,158,11,0.7)" />
                                    }
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: c.done ? '#e2fdf0' : 'rgba(167,243,208,0.6)', fontSize: 14 }}>{c.item}</div>
                                    <div style={{ fontSize: 12, color: 'rgba(134,239,172,0.4)', marginTop: 3 }}>{c.detail}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                                    {c.done
                                        ? <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>Done</span>
                                        : <Link href="/upload" style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>Action needed <ArrowRight size={10} /></Link>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ASEAN exposure + timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                    {/* Country table */}
                    <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Globe size={15} color="#4ade80" /> ASEAN CBAM Exposure
                        </div>
                        <table className="data-table">
                            <thead><tr><th>Country</th><th>Annual Exposure</th><th>Products</th><th>Risk</th></tr></thead>
                            <tbody>
                                {countries.map(c => (
                                    <tr key={c.name}>
                                        <td style={{ color: '#e2fdf0', fontWeight: 600 }}>{c.flag} {c.name}</td>
                                        <td style={{ fontWeight: 700, color: '#4ade80' }}>{c.exposure}</td>
                                        <td style={{ fontSize: 12, color: 'rgba(134,239,172,0.6)' }}>{c.products}</td>
                                        <td>
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                                                background: c.risk === 'Highest' ? 'rgba(239,68,68,0.1)' : c.risk === 'High' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                                                color: c.risk === 'Highest' ? '#ef4444' : c.risk === 'High' ? '#f59e0b' : '#22c55e'
                                            }}>
                                                {c.risk}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Timeline */}
                    <div className="glass" style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: 700, color: '#e2fdf0', fontSize: 14, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Clock size={15} color="#4ade80" /> CBAM Timeline
                        </div>
                        <div style={{ position: 'relative', paddingLeft: 28 }}>
                            <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,#22c55e,rgba(34,197,94,0.1))' }} />
                            {timeline.map((t, i) => (
                                <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                                    <div style={{
                                        position: 'absolute', left: -20, top: 2, width: 10, height: 10, borderRadius: '50%',
                                        background: t.status === 'past' ? 'rgba(74,222,128,0.4)' : t.status === 'now' ? '#22c55e' : 'rgba(74,222,128,0.15)',
                                        border: `1px solid ${t.status === 'now' ? '#4ade80' : 'rgba(74,222,128,0.2)'}`,
                                        boxShadow: t.status === 'now' ? '0 0 12px rgba(34,197,94,0.5)' : 'none'
                                    }} />
                                    <div style={{ fontSize: 10, color: t.status === 'now' ? '#f59e0b' : 'rgba(134,239,172,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{t.date}</div>
                                    <div style={{ fontWeight: 700, color: t.status === 'now' ? '#fbbf24' : '#e2fdf0', fontSize: 13, marginBottom: 3 }}>{t.label}</div>
                                    <div style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)', lineHeight: 1.6 }}>{t.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Before/After */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="glass" style={{ padding: '22px', borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}><XCircle size={18} color="#ef4444" /><span style={{ fontWeight: 700, color: '#ef4444', fontSize: 15 }}>Without Fedora</span></div>
                        {['EU importer gets invoice with no carbon data', 'Must use worst-case default values', 'Pays maximum CBAM certificate costs', 'Importer finds a new compliant supplier'].map(s => (
                            <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                                <XCircle size={14} color="rgba(239,68,68,0.6)" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: 'rgba(167,243,208,0.6)' }}>{s}</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass" style={{ padding: '22px', borderColor: 'rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}><CheckCircle size={18} color="#22c55e" /><span style={{ fontWeight: 700, color: '#22c55e', fontSize: 15 }}>With Fedora</span></div>
                        {['Invoice arrives with verified carbon per unit', 'Importer uses actual (lower) emission values', 'Saves money on CBAM certificates', 'Keeps you as a preferred supplier'].map(s => (
                            <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                                <CheckCircle size={14} color="#22c55e" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: 'rgba(167,243,208,0.75)' }}>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Link href="/upload" style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <FileText size={16} /> Generate Your First CBAM Report
                    </Link>
                </div>
            </div>
        </main>
    );
}
