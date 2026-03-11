'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Leaf, CloudUpload, Brain, FileText, CheckCircle, ArrowLeft, Zap } from 'lucide-react';

function Navbar() {
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,15,10,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Leaf size={16} color="#052e16" />
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
            </Link>
            <div style={{ display: 'flex', gap: 6 }}>
                {[['Dashboard', '/dashboard'], ['Analysis', '/analysis'], ['Reports', '/reports'], ['Compliance', '/compliance']].map(([l, h]) => (
                    <Link key={l} href={h as string} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, color: 'rgba(134,239,172,0.65)', textDecoration: 'none' }}>{l}</Link>
                ))}
            </div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(134,239,172,0.5)', textDecoration: 'none' }}><ArrowLeft size={14} /> Back</Link>
        </nav>
    );
}

type Step = 'idle' | 'uploading' | 'processing' | 'done';

const mockLines = [
    { item: 'Electricity (Grid)', qty: '4,200 kWh', factor: '0.4842 kgCO₂/kWh', scope: 'Scope 2', co2: '2,033.6' },
    { item: 'Natural Gas', qty: '820 m³', factor: '2.04 kgCO₂/m³', scope: 'Scope 1', co2: '1,672.8' },
    { item: 'Diesel (Generator)', qty: '180 L', factor: '2.68 kgCO₂/L', scope: 'Scope 1', co2: '482.4' },
    { item: 'Steel Feedstock', qty: '12.4 t', factor: '1.85 tCO₂/t', scope: 'Scope 3', co2: '2,294.0' },
    { item: 'Process Water', qty: '280 m³', factor: '0.42 kgCO₂/m³', scope: 'Scope 3', co2: '117.6' },
];

export default function UploadPage() {
    const [step, setStep] = useState<Step>('idle');
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const simulate = (name: string) => {
        setFileName(name);
        setStep('uploading');
        setTimeout(() => setStep('processing'), 1600);
        setTimeout(() => setStep('done'), 4200);
    };

    const processingSteps = [
        { label: 'OCR text extraction', done: true },
        { label: 'Line-item parsing', done: true },
        { label: 'ASEAN emission factor lookup', done: true },
        { label: 'Scope 1/2/3 calculation', done: false },
        { label: 'CBAM certificate estimate', done: false },
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#070f0a', paddingTop: 80 }}>
            <Navbar />
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px' }}>
                <div style={{ marginBottom: 40 }}>
                    <div className="badge" style={{ marginBottom: 12, display: 'inline-flex' }}><CloudUpload size={11} /> Upload & Analyze</div>
                    <h1 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#e2fdf0', marginBottom: 8 }}>
                        Upload Your Bill
                    </h1>
                    <p style={{ color: 'rgba(134,239,172,0.55)', fontSize: 15 }}>
                        Photo, scan or PDF — our AI reads it, maps ASEAN emission factors, and returns Scope 1/2/3 results in minutes.
                    </p>
                </div>

                {step === 'idle' && (
                    <div>
                        <div
                            className={`upload-zone${dragOver ? ' drag-over' : ''}`}
                            style={{ padding: '72px 32px', textAlign: 'center', marginBottom: 24 }}
                            onClick={() => fileRef.current?.click()}
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) simulate(e.dataTransfer.files[0].name); }}
                        >
                            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <CloudUpload size={32} color="#4ade80" />
                            </div>
                            <p style={{ fontSize: 18, fontWeight: 700, color: '#e2fdf0', marginBottom: 8 }}>Drop invoice, energy bill or receipt</p>
                            <p style={{ fontSize: 13, color: 'rgba(134,239,172,0.4)', marginBottom: 20 }}>PNG · JPG · PDF · HEIC — works from your phone camera</p>
                            <button className="btn-primary" style={{ padding: '12px 28px', fontSize: 14 }}>Browse Files</button>
                            <input ref={fileRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) simulate(e.target.files[0].name); }} />
                        </div>
                        {/* Quick demo mode */}
                        <div className="glass" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <p style={{ fontWeight: 600, color: '#e2fdf0', fontSize: 14 }}>No bill handy? Try a demo</p>
                                <p style={{ fontSize: 12, color: 'rgba(134,239,172,0.4)' }}>Run the analysis on a sample Vietnamese steel factory invoice</p>
                            </div>
                            <button className="btn-ghost" style={{ padding: '10px 22px', fontSize: 13 }} onClick={() => simulate('sample_steel_factory_invoice.pdf')}>
                                <Zap size={14} /> Run Demo Analysis
                            </button>
                        </div>
                    </div>
                )}

                {(step === 'uploading' || step === 'processing') && (
                    <div className="glass" style={{ padding: '52px 32px', textAlign: 'center' }}>
                        <div style={{ width: 60, height: 60, border: '3px solid rgba(74,222,128,0.15)', borderTopColor: '#4ade80', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin-slow 1s linear infinite' }} />
                        <p style={{ color: '#4ade80', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
                            {step === 'uploading' ? `Uploading "${fileName}"…` : 'AI pipeline running…'}
                        </p>
                        <p style={{ color: 'rgba(134,239,172,0.45)', fontSize: 13, marginBottom: 32 }}>
                            {step === 'uploading' ? 'Sending to OCR engine' : 'Extracting, mapping, calculating…'}
                        </p>
                        <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
                            {processingSteps.map((s, i) => (
                                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(74,222,128,0.07)' }}>
                                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: step === 'processing' && i <= 2 ? 'rgba(34,197,94,0.15)' : 'rgba(74,222,128,0.05)', border: `1px solid ${step === 'processing' && i <= 2 ? 'rgba(74,222,128,0.4)' : 'rgba(74,222,128,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {step === 'processing' && i <= 2 && <CheckCircle size={12} color="#4ade80" />}
                                    </div>
                                    <span style={{ fontSize: 13, color: step === 'processing' && i <= 2 ? '#86efac' : 'rgba(134,239,172,0.4)' }}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'done' && (
                    <div>
                        {/* Success header */}
                        <div className="glass" style={{ padding: '20px 24px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <CheckCircle size={22} color="#4ade80" />
                            <div>
                                <p style={{ fontWeight: 700, color: '#4ade80', fontSize: 15 }}>Analysis Complete — "{fileName}"</p>
                                <p style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)', marginTop: 2 }}>24 line items extracted · 5 emission sources identified · CBAM certificate calculated</p>
                            </div>
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                <Link href="/analysis" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <FileText size={12} /> Full Analysis
                                </Link>
                                <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => { setStep('idle'); setFileName(''); }}>
                                    Upload Another
                                </button>
                            </div>
                        </div>

                        {/* Scope cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
                            {[['Scope 1', 'Direct', '12.4', 'kgCO₂e/unit', '#22c55e'], ['Scope 2', 'Energy', '31.8', 'kgCO₂e/unit', '#4ade80'], ['Scope 3', 'Supply chain', '18.2', 'kgCO₂e/unit', '#86efac'], ['Total', 'All scopes', '62.4', 'kgCO₂e/unit', '#a7f3d0']].map(([s, l, v, u, c]) => (
                                <div key={s} className="glass" style={{ padding: '18px 16px' }}>
                                    <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s} · {l}</div>
                                    <div style={{ fontSize: 30, fontWeight: 900, color: c as string }}>{v}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', marginTop: 2 }}>{u}</div>
                                </div>
                            ))}
                        </div>

                        {/* Extracted line items table */}
                        <div className="glass" style={{ padding: '0', overflow: 'hidden', marginBottom: 16 }}>
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14 }}>
                                Extracted Line Items — OCR Results
                            </div>
                            <table className="data-table">
                                <thead><tr><th>Item</th><th>Quantity</th><th>Emission Factor</th><th>Scope</th><th>CO₂ (kg)</th></tr></thead>
                                <tbody>
                                    {mockLines.map(r => (
                                        <tr key={r.item}>
                                            <td style={{ color: '#e2fdf0', fontWeight: 500 }}>{r.item}</td>
                                            <td>{r.qty}</td>
                                            <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.factor}</td>
                                            <td>
                                                <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: r.scope === 'Scope 1' ? 'rgba(34,197,94,0.1)' : r.scope === 'Scope 2' ? 'rgba(74,222,128,0.1)' : 'rgba(134,239,172,0.1)', color: r.scope === 'Scope 1' ? '#22c55e' : r.scope === 'Scope 2' ? '#4ade80' : '#86efac' }}>
                                                    {r.scope}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: 700, color: '#4ade80' }}>{r.co2}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* CBAM + actions */}
                        <div className="glass" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>CBAM Certificate Cost</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: '#f59e0b' }}>€0.38 / unit</div>
                                <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', marginTop: 2 }}>Based on EU ETS price of €72/tCO₂</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Green Supplier Score</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: '#4ade80' }}>68 / 100</div>
                                <div className="progress-bar" style={{ marginTop: 8 }}>
                                    <div className="progress-fill" style={{ width: '68%' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <Link href="/analysis" style={{ padding: '12px 20px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <Brain size={14} /> Full Analysis + Download
                                </Link>
                                <Link href="/reports" style={{ padding: '10px 20px', border: '1px solid rgba(74,222,128,0.25)', color: '#86efac', borderRadius: 999, fontSize: 12, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <FileText size={12} /> Generate CBAM Report
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
