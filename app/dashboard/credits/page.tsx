'use client';
import { useState } from 'react';
import { Award, Leaf, TrendingUp, Gift, CheckCircle, Lock } from 'lucide-react';

const leaderboard = [
    { rank: 1, name: 'Hanoi Metals Ltd', country: '🇻🇳', credits: 2840, tier: 'Platinum', change: +120 },
    { rank: 2, name: 'Thai Steel Works', country: '🇹🇭', credits: 2210, tier: 'Gold', change: +88 },
    { rank: 3, name: 'YOU — Nguyen Steel', country: '🇻🇳', credits: 1560, tier: 'Silver', change: +64, you: true },
    { rank: 4, name: 'Jakarta Iron Co.', country: '🇮🇩', credits: 980, tier: 'Bronze', change: +32 },
    { rank: 5, name: 'KL Aluminium Bhd', country: '🇲🇾', credits: 740, tier: 'Bronze', change: +18 },
    { rank: 6, name: 'Cebu Metals Corp', country: '🇵🇭', credits: 340, tier: 'Member', change: +8 },
];

const tierColors: Record<string, string> = { Platinum: '#e2e8f0', Gold: '#fbbf24', Silver: '#94a3b8', Bronze: '#cd7c3e', Member: '#4ade80' };

const rewards = [
    { title: 'Green Loan Access', desc: 'Unlock preferential rate sustainability-linked loans from OCBC, UOB, DBS.', cost: 500, category: 'Finance', unlocked: true },
    { title: 'ISO 14064 Fast-Track', desc: 'Expedited GHG verification by certified auditors — skip the waitlist.', cost: 1000, category: 'Certification', unlocked: true },
    { title: 'EU Buyer Directory Listing', desc: 'Featured listing in Fedora\'s verified green supplier directory for EU procurement.', cost: 1500, category: 'Market Access', unlocked: true },
    { title: 'CBAM Certificate Pre-Calc Service', desc: 'Dedicated analyst calculates your quarterly CBAM obligation in advance.', cost: 2000, category: 'Compliance', unlocked: false },
    { title: 'Annual Carbon Roadmap Report', desc: 'AI-generated 12-month decarbonisation roadmap with investment scenarios.', cost: 2500, category: 'Strategy', unlocked: false },
];

const howToEarn = [
    { action: 'Complete monthly bill upload + analysis', credits: '+50 credits', done: true },
    { action: 'Reduce emissions vs previous month', credits: '+20 per % reduction', done: true },
    { action: 'Get ISO 14064 verification', credits: '+300 one-time', done: false },
    { action: 'Share verified carbon data with EU importer', credits: '+80 per report', done: true },
    { action: 'Reduce Scope 2 below sector average', credits: '+150', done: false },
    { action: 'Achieve 12-month continuous monitoring', credits: '+500 yearly bonus', done: false },
];

function CreditProgressRing({ pct, credits }: { pct: number; credits: number }) {
    const r = 80, circ = 2 * Math.PI * r;
    return (
        <svg width={200} height={200} viewBox="0 0 200 200">
            <circle cx={100} cy={100} r={r} fill="none" stroke="rgba(74,222,128,0.07)" strokeWidth={12} />
            <circle cx={100} cy={100} r={r} fill="none" stroke="url(#cr)" strokeWidth={12}
                strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeDashoffset={circ / 4}
                strokeLinecap="round" />
            <defs><linearGradient id="cr" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#86efac" />
            </linearGradient></defs>
            <text x={100} y={92} textAnchor="middle" fill="#4ade80" fontSize="28" fontWeight="900">{credits.toLocaleString()}</text>
            <text x={100} y={112} textAnchor="middle" fill="rgba(134,239,172,0.5)" fontSize="11">Green Leaf Credits</text>
            <text x={100} y={128} textAnchor="middle" fill="rgba(134,239,172,0.35)" fontSize="10">Silver Tier</text>
        </svg>
    );
}

export default function CreditsPage() {
    const [claimed, setClaimed] = useState<string[]>([]);
    const yourCredits = 1560;
    const nextTierCredits = 2210;
    const pct = (yourCredits / nextTierCredits) * 100;

    const claim = (title: string) => {
        if (!claimed.includes(title)) setClaimed(prev => [...prev, title]);
    };

    return (
        <div style={{ padding: '32px 36px', color: '#e2fdf0' }}>
            <div style={{ marginBottom: 32 }}>
                <div className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}><Award size={11} /> Green Leaf Credits</div>
                <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>Your Green Leaf Credits</h1>
                <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 14 }}>Earn credits for verified carbon reductions. Claim green finance, certifications, and market access rewards.</p>
            </div>

            {/* Credit summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, marginBottom: 20, alignItems: 'center' }}>
                <div className="glass" style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <CreditProgressRing pct={pct} credits={yourCredits} />
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 12, color: 'rgba(134,239,172,0.45)', marginBottom: 4 }}>{nextTierCredits - yourCredits} credits to Gold tier</p>
                        <div className="progress-bar" style={{ width: 160, margin: '0 auto' }}>
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                        { l: 'Total Earned (all time)', v: '1,560', c: '#4ade80' },
                        { l: 'Earned This Month', v: '+64', c: '#22c55e' },
                        { l: 'Available to Redeem', v: '1,060', c: '#86efac' },
                        { l: 'Redeemed', v: '500', c: '#a7f3d0' },
                    ].map(({ l, v, c }) => (
                        <div key={l} className="glass" style={{ padding: '18px 20px' }}>
                            <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{l}</div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: c }}>{v}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rewards marketplace */}
            <div className="glass" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Gift size={15} color="#4ade80" /> Rewards Marketplace
                </div>
                <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12 }}>
                    {rewards.map(r => {
                        const canClaim = yourCredits >= r.cost && !claimed.includes(r.title);
                        const isClaimed = claimed.includes(r.title);
                        return (
                            <div key={r.title} className="glass-flat" style={{ padding: '18px', opacity: r.unlocked || isClaimed ? 1 : 0.65 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'rgba(74,222,128,0.08)', color: '#86efac' }}>{r.category}</span>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: canClaim || isClaimed ? '#4ade80' : 'rgba(134,239,172,0.4)' }}>🍃 {r.cost}</span>
                                </div>
                                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#e2fdf0', marginBottom: 6 }}>{r.title}</h4>
                                <p style={{ fontSize: 12, color: 'rgba(134,239,172,0.5)', lineHeight: 1.6, marginBottom: 14 }}>{r.desc}</p>
                                <button
                                    onClick={() => canClaim && claim(r.title)}
                                    style={{
                                        width: '100%', padding: '10px', borderRadius: 999, border: 'none', cursor: canClaim ? 'pointer' : 'default', fontSize: 13, fontWeight: 700,
                                        background: isClaimed ? 'rgba(34,197,94,0.1)' : canClaim ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'rgba(74,222,128,0.05)',
                                        color: isClaimed ? '#22c55e' : canClaim ? '#052e16' : 'rgba(134,239,172,0.35)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                    }}>
                                    {isClaimed ? <><CheckCircle size={13} /> Claimed!</> : canClaim ? <><Gift size={13} /> Claim Reward</> : <><Lock size={13} /> Need {r.cost - yourCredits} more credits</>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Two-col: How to earn + Leaderboard */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {/* How to earn */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TrendingUp size={14} color="#4ade80" /> How to Earn Credits
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {howToEarn.map(h => (
                            <div key={h.action} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(74,222,128,0.05)' }}>
                                <div style={{ flexShrink: 0 }}>{h.done ? <CheckCircle size={16} color="#22c55e" /> : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(74,222,128,0.25)' }} />}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, color: h.done ? '#e2fdf0' : 'rgba(134,239,172,0.55)', fontWeight: h.done ? 500 : 400 }}>{h.action}</div>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', flexShrink: 0 }}>{h.credits}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sector leaderboard */}
                <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(74,222,128,0.1)', fontWeight: 700, color: '#e2fdf0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Award size={14} color="#4ade80" /> ASEAN Credits Leaderboard
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {leaderboard.map(c => (
                            <div key={c.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(74,222,128,0.05)', background: c.you ? 'rgba(34,197,94,0.04)' : undefined }}>
                                <div style={{ width: 24, fontSize: 14, fontWeight: 900, textAlign: 'center', color: c.rank <= 3 ? ['#fbbf24', '#94a3b8', '#cd7c3e'][c.rank - 1] : 'rgba(134,239,172,0.3)' }}>
                                    {c.rank <= 3 ? ['🥇', '🥈', '🥉'][c.rank - 1] : c.rank}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: c.you ? 700 : 500, color: c.you ? '#4ade80' : '#e2fdf0' }}>{c.country} {c.name}</div>
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: `${tierColors[c.tier]}18`, color: tierColors[c.tier] }}>{c.tier}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 15, fontWeight: 800, color: c.you ? '#4ade80' : '#86efac' }}>🍃 {c.credits.toLocaleString()}</div>
                                    <div style={{ fontSize: 11, color: '#22c55e' }}>+{c.change} this mo.</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
