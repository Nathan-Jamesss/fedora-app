'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Leaf, FileText, Download, CheckCircle, Clock, AlertTriangle, Plus, Brain } from 'lucide-react';
import { downloadReportForFile } from '@/lib/report-generator';

function Navbar() {
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,15,10,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
            </Link>
            <div style={{ display: 'flex', gap: 6 }}>
                {[['Upload', '/upload'], ['Dashboard', '/dashboard'], ['Analysis', '/analysis'], ['Compliance', '/compliance']].map(([l, h]) => (
                    <Link key={l} href={h as string} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, color: 'rgba(134,239,172,0.65)', textDecoration: 'none' }}>{l}</Link>
                ))}
            </div>
            <span style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, color: '#4ade80', background: 'rgba(34,197,94,0.08)', fontWeight: 600 }}>Reports</span>
        </nav>
    );
}

const reports = [
    { id: 'R-2601', name: 'Invoice_Steel_Jan26.pdf', type: 'CBAM MRV', date: '2026-01-08', status: 'Ready', co2: '62.4', importer: 'Heinz GmbH, DE', size: '148 KB' },
    { id: 'R-2512', name: 'Energy_Bill_Dec25.pdf', type: 'Scope 2', date: '2025-12-15', status: 'Ready', co2: '71.2', importer: '—', size: '82 KB' },
    { id: 'R-2511', name: 'Supplier_Invoice_Nov25.pdf', type: 'CBAM MRV', date: '2025-11-22', status: 'Ready', co2: '58.9', importer: 'VDM Steel, NL', size: '134 KB' },
    { id: 'R-2510', name: 'Energy_Bill_Nov25.pdf', type: 'Full Footprint', date: '2025-11-08', status: 'Ready', co2: '64.1', importer: '—', size: '96 KB' },
    { id: 'R-2509', name: 'Production_Data_Oct25.xlsx', type: 'Scope 1,2,3', date: '2025-10-30', status: 'Processing', co2: '—', importer: '—', size: '—' },
    { id: 'R-2508', name: 'Cement_Invoice_Oct25.pdf', type: 'CBAM MRV', date: '2025-10-14', status: 'Ready', co2: '89.2', importer: 'Lafarge, FR', size: '111 KB' },
];

function downloadSampleReport(name: string) {
    downloadReportForFile(name);
}

export default function ReportsPage() {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'CBAM MRV', 'Scope 2', 'Full Footprint', 'Processing'];
    const shown = filter === 'All' ? reports : reports.filter(r => r.type === filter || r.status === filter);

    return (
        <main style={{ minHeight: '100vh', background: '#070f0a', paddingTop: 80 }}>
            <Navbar />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><FileText size={11} /> Reports</div>
                        <h1 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#e2fdf0', marginBottom: 4 }}>Generated Reports</h1>
                        <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14 }}>{reports.filter(r => r.status === 'Ready').length} ready · 1 processing · PT PLN (Persero)</p>
                    </div>
                    <Link href="/upload" style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Plus size={16} /> New Analysis
                    </Link>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
                    {[['11', 'Reports Generated', 'this quarter', '#4ade80'], ['3', 'CBAM MRV Reports', 'ready for EU importers', '#22c55e'], ['68', 'Avg Green Score', 'across all analyses', '#86efac'], ['€0.38', 'Avg CBAM Cost', 'per unit (Jan 2026)', '#f59e0b']].map(([v, l, s, c]) => (
                        <div key={l} className="glass" style={{ padding: '18px 20px' }}>
                            <div style={{ fontSize: 28, fontWeight: 900, color: c as string, marginBottom: 4 }}>{v}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#e2fdf0' }}>{l}</div>
                            <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', marginTop: 2 }}>{s}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid',
                            borderColor: filter === f ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.15)',
                            background: filter === f ? 'rgba(34,197,94,0.12)' : 'transparent',
                            color: filter === f ? '#4ade80' : 'rgba(134,239,172,0.5)'
                        }}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden', marginBottom: 20 }}>
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>File</th><th>Report Type</th><th>Date</th><th>CO₂e/unit</th><th>EU Importer</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {shown.map(r => (
                                <tr key={r.id}>
                                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(134,239,172,0.4)' }}>{r.id}</td>
                                    <td style={{ color: '#e2fdf0', fontWeight: 500, fontSize: 13 }}>{r.name}</td>
                                    <td><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(74,222,128,0.08)', color: '#86efac', fontWeight: 600 }}>{r.type}</span></td>
                                    <td style={{ fontSize: 12 }}>{r.date}</td>
                                    <td style={{ fontWeight: 700, color: '#4ade80' }}>{r.co2 !== '—' ? `${r.co2} kg` : '—'}</td>
                                    <td style={{ fontSize: 12, color: 'rgba(134,239,172,0.6)' }}>{r.importer}</td>
                                    <td>
                                        <span style={{
                                            display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700,
                                            color: r.status === 'Ready' ? '#22c55e' : '#f59e0b',
                                            padding: '3px 10px', borderRadius: 999,
                                            background: r.status === 'Ready' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                                            width: 'fit-content'
                                        }}>
                                            {r.status === 'Ready' ? <CheckCircle size={11} /> : <Clock size={11} />} {r.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {r.status === 'Ready' && <>
                                                <button onClick={() => downloadSampleReport(r.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4ade80', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                                                    <Download size={12} /> Download
                                                </button>
                                                <Link href="/analysis" style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)', textDecoration: 'none' }}>View</Link>
                                            </>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* How to use reports */}
                <div className="glass" style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><CheckCircle size={18} color="#4ade80" /><span style={{ fontWeight: 700, color: '#e2fdf0' }}>Sending to EU Importers</span></div>
                        <p style={{ fontSize: 13, color: 'rgba(134,239,172,0.6)', lineHeight: 1.7 }}>
                            CBAM MRV reports are formatted for direct submission. Download and attach to your EU trade documents. Your importer uses the carbon intensity figure to calculate their certificate cost — using your actual lower values, not worst-case defaults.
                        </p>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Brain size={18} color="#4ade80" /><span style={{ fontWeight: 700, color: '#e2fdf0' }}>Green Finance Applications</span></div>
                        <p style={{ fontSize: 13, color: 'rgba(134,239,172,0.6)', lineHeight: 1.7 }}>
                            Share your Full Footprint reports directly with OCBC, UOB, or DBS for sustainability-linked loan applications. Lower verified emissions = better loan terms. Fedora data is accepted by 3 ASEAN banking partners.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
