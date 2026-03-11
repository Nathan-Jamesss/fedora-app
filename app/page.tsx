'use client';
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/spotlight-card";
import Link from "next/link";
import { CSSProperties, useState, useEffect } from "react";
import { Leaf, Upload, BarChart3, FileText, ShieldCheck, ArrowRight, Zap, Globe, TrendingDown, Award, Brain } from "lucide-react";

// ── Animated floating leaves
const leafCfg = [
  [3, 8, 120, 20, 9, 0, 0.55, '#166534', '#4ade80'], [80, 5, 90, -45, 7, 1, 0.4, '#15803d', '#86efac'],
  [92, 22, 110, 15, 11, 0.5, 0.5, '#14532d', '#4ade80'], [88, 65, 80, -35, 8, 1.8, 0.38, '#15803d', '#a7f3d0'],
  [92, 80, 100, 55, 10, 0.7, 0.45, '#166534', '#34d399'], [2, 70, 95, -20, 9, 1.3, 0.4, '#15803d', '#4ade80'],
  [0, 42, 70, 50, 6, 2.2, 0.3, '#14532d', '#86efac'], [65, 90, 80, 30, 7, 1.7, 0.35, '#15803d', '#4ade80'],
  [45, 2, 60, -60, 5, 0.5, 0.25, '#166534', '#a7f3d0'], [15, 85, 70, 40, 8, 2.8, 0.3, '#15803d', '#6ee7b7'],
];
function LeafSVG({ sz = 80, c1 = '#16a34a', c2 = '#86efac', op = 1, id = '0' }: { sz?: number; c1?: string; c2?: string; op?: number; id?: string }) {
  return (
    <svg width={sz} height={sz * 1.3} viewBox="0 0 100 130" style={{ opacity: op }}>
      <defs><radialGradient id={`lg${id}`} cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor={c2} stopOpacity="0.9" /><stop offset="100%" stopColor={c1} stopOpacity="0.6" /></radialGradient></defs>
      <path d="M50,2 C70,2 98,25 98,60 C98,95 72,128 50,128 C28,128 2,95 2,60 C2,25 30,2 50,2Z" fill={`url(#lg${id})`} />
      <path d="M50,10 Q52,65 48,125" stroke={c1} strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M50,35 Q30,40 18,52M50,58 Q28,62 15,74M50,78 Q32,83 22,95" stroke={c1} strokeWidth="0.7" fill="none" opacity="0.28" />
      <path d="M50,35 Q70,40 82,52M50,58 Q72,62 85,74M50,78 Q68,83 78,95" stroke={c1} strokeWidth="0.7" fill="none" opacity="0.28" />
    </svg>
  );
}
function FloatingLeaves() {
  return (
    <div className="leaf-stage absolute inset-0 overflow-hidden pointer-events-none">
      {leafCfg.map(([l, t, sz, _rz, dur, delay, op, c1, c2], i) => (
        <div key={i} className="leaf-3d" style={{ left: `${l}%`, top: `${t}%`, '--dur': `${dur}s`, '--delay': `${delay}s`, '--rz': '0deg' } as CSSProperties}>
          <LeafSVG sz={sz as number} id={String(i)} c1={c1 as string} c2={c2 as string} op={op as number} />
        </div>
      ))}
      {/* ambient glows */}
      <div style={{ position: 'absolute', top: '12%', left: '6%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '18%', right: '6%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(22,163,74,0.06) 0%,transparent 70%)', filter: 'blur(55px)', pointerEvents: 'none' }} />
    </div>
  );
}

// ── Typewriter subtitle cycling
const subtitles = ["Measure Carbon. Comply with CBAM.", "Unlock Green Finance. Keep Your EU Customers.", "Built for ASEAN Reality.", "From Invoice Photo to MRV Report in 60 Seconds."];
function CyclingSubtitle() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t1 = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % subtitles.length); setVisible(true); }, 500);
    }, 3200);
    return () => clearInterval(t1);
  }, []);
  return (
    <div style={{ height: 32, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.p
        key={idx}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
        transition={{ duration: 0.45 }}
        style={{ fontSize: 'clamp(15px,2vw,20px)', color: 'rgba(134,239,172,0.7)', fontWeight: 500, textAlign: 'center', letterSpacing: '-0.01em' }}
      >
        {subtitles[idx]}
      </motion.p>
    </div>
  );
}

// ── Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(4,10,6,0.96)' : 'rgba(4,10,6,0.7)', backdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(74,222,128,0.15)' : 'rgba(74,222,128,0.05)'}`, transition: 'all 0.4s'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(34,197,94,0.35)' }}>
          <Leaf size={16} color="#052e16" />
        </div>
        <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
      </Link>
      <div style={{ display: 'flex', gap: 4 }}>
        {[['Dashboard', '/dashboard'], ['Analysis', '/analysis'], ['Reports', '/reports'], ['Compliance', '/compliance']].map(([l, h]) => (
          <Link key={l} href={h} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'rgba(134,239,172,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}>{l}</Link>
        ))}
      </div>
      <Link href="/upload" style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 16px rgba(34,197,94,0.3)', transition: 'all 0.25s' }}>
        Try Free →
      </Link>
    </nav>
  );
}

// ── Letter-by-letter animated FEDORA title
function AnimatedTitle() {
  const word = "FEDORA";
  return (
    <h1 style={{ fontSize: 'clamp(72px,13vw,160px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
      {word.split('').map((letter, i) => (
        <motion.span key={i}
          initial={{ y: 80, opacity: 0, rotateX: 90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: i * 0.06 + 0.2, type: 'spring', stiffness: 160, damping: 22 }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#a7f3d0 0%,#4ade80 40%,#22c55e 75%,#15803d 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
          {letter}
        </motion.span>
      ))}
    </h1>
  );
}

const features = [
  { icon: <Upload size={24} />, title: 'Upload & Analyze', desc: 'Drop a photo of any invoice, energy bill, or receipt. AI extracts and maps ASEAN emission factors in seconds.', href: '/upload', color: '#22c55e' },
  { icon: <BarChart3 size={24} />, title: 'Dashboard & Batch', desc: 'Track Scope 1/2/3 over time, compare months, benchmark against competitors.', href: '/dashboard', color: '#4ade80' },
  { icon: <FileText size={24} />, title: 'CBAM Reports', desc: 'Export-ready MRV documents your EU importer can use immediately.', href: '/reports', color: '#86efac' },
  { icon: <Brain size={24} />, title: 'In-Depth Analysis', desc: 'Full emission breakdown with AI decarbonisation recommendations + downloadable report.', href: '/analysis', color: '#a7f3d0' },
  { icon: <ShieldCheck size={24} />, title: 'Compliance Tracker', desc: 'Real-time CBAM readiness score with action checklist.', href: '/compliance', color: '#34d399' },
  { icon: <Award size={24} />, title: 'Green Leaf Credits', desc: 'Earn credits for verified reductions. Claim green finance, certifications, and marketplace visibility.', href: '/dashboard/credits', color: '#6ee7b7' },
];

const stats = [
  { v: '62.4', u: 'kgCO₂e/unit', l: 'Measured in minutes' },
  { v: '€0.38', u: 'CBAM cert/unit', l: 'vs €1.20+ default' },
  { v: '68', u: 'Green Score', l: 'Instant supplier rating' },
  { v: '<1h', u: 'onboarding', l: 'Zero accounting tools needed' },
];

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#040a06', overflow: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, overflow: 'hidden' }}>
        {/* Layer 1: animated path lines */}
        <BackgroundPaths />
        {/* Layer 2: floating leaves */}
        <FloatingLeaves />
        {/* Layer 3: radial vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(4,10,6,0.1) 0%,rgba(4,10,6,0.65) 100%)', pointerEvents: 'none' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 8, display: 'inline-flex', gap: 6 }}><Leaf size={11} /> Climate OS for ASEAN SMEs &nbsp;·&nbsp; CBAM 2026</span>
          </motion.div>

          <AnimatedTitle />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
            <p style={{ fontSize: 'clamp(16px,2.2vw,22px)', fontWeight: 700, color: '#86efac', letterSpacing: '-0.01em', marginBottom: 4 }}>
              The Climate Operating System for ASEAN SMEs
            </p>
            <p style={{ fontSize: 'clamp(13px,1.5vw,16px)', color: 'rgba(134,239,172,0.55)', maxWidth: 640, lineHeight: 1.7, marginBottom: 8 }}>
              Helping ASEAN manufacturers keep their EU market access as carbon border taxes go live in 2026.
              Upload a bill, get your footprint, generate your CBAM report — under an hour.
            </p>
            <CyclingSubtitle />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            <Link href="/upload" style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 28px rgba(34,197,94,0.35)', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}>
              <Upload size={16} /> Upload Your First Bill
            </Link>
            <Link href="/dashboard" style={{ padding: '14px 32px', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart3 size={16} /> See Dashboard
            </Link>
          </motion.div>

          {/* Stat pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.5 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
            {stats.map(({ v, u, l }) => (
              <div key={l} style={{ padding: '10px 20px', background: 'rgba(13,31,18,0.65)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 12, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 20, color: '#4ade80' }}>{v} <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', fontWeight: 400 }}>{u}</span></div>
                <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 1, height: 28, background: 'linear-gradient(to bottom,rgba(74,222,128,0.4),transparent)' }} />
        </motion.div>
      </section>

      {/* ── CBAM Alert ── */}
      <div style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.07),rgba(234,88,12,0.04))', borderTop: '1px solid rgba(245,158,11,0.15)', borderBottom: '1px solid rgba(245,158,11,0.15)', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', textAlign: 'center' }}>
        <Zap size={16} color="#f59e0b" />
        <span style={{ color: 'rgba(253,230,138,0.85)', fontSize: 14, fontWeight: 600 }}>
          CBAM full enforcement: <strong style={{ color: '#fbbf24' }}>January 2026</strong> — ASEAN exporters must measure embedded emissions or lose EU customers.
        </span>
        <Link href="/compliance" style={{ padding: '7px 18px', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#1c0a00', borderRadius: 999, fontWeight: 700, fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          Check Your Exposure <ArrowRight size={12} />
        </Link>
      </div>

      {/* ── Features: GlowCard grid ── */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="badge" style={{ marginBottom: 12, display: 'inline-flex' }}><Leaf size={11} /> Platform Features</span>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, color: '#e2fdf0', lineHeight: 1.1, marginBottom: 12 }}>
              Everything ASEAN SMEs Need<br />to Survive and Profit from CBAM
            </h2>
            <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
              From invoice photo to green finance access. No consultants. No European accounting tools. Made for the ASEAN factory floor.
            </p>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 14 }}>
          {features.map(({ icon, title, desc, href, color }, idx) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.5 }}>
              <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <GlowCard glowColor={idx % 2 === 0 ? 'green' : 'emerald'} className="p-6 h-full transition-transform hover:-translate-y-1">
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}16`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 16 }}>
                    {icon}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#e2fdf0', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(167,243,208,0.5)', lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                  <span style={{ fontSize: 12, color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Explore <ArrowRight size={12} /></span>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Before/After ── */}
      <section style={{ padding: '40px 40px 80px', maxWidth: 860, margin: '0 auto' }}>
        <div className="divider-line" style={{ marginBottom: 56 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: '24px', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 16 }}>
            <p style={{ color: '#ef4444', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>✕ Without Fedora</p>
            {['EU importer uses worst-case default carbon values', 'Pays maximum CBAM certificate cost', 'Risk of losing preferred supplier status', 'Scrambles for ASEAN-specific data'].map(s => (
              <div key={s} style={{ fontSize: 13, color: 'rgba(167,243,208,0.55)', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid rgba(239,68,68,0.3)' }}>{s}</div>
            ))}
          </div>
          <div style={{ padding: '24px', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 16 }}>
            <p style={{ color: '#22c55e', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>✓ With Fedora</p>
            {['Invoice arrives with verified carbon per unit', 'Importer uses actual (lower) values', 'Save money on CBAM certificates', 'Stay a preferred EU supplier'].map(s => (
              <div key={s} style={{ fontSize: 13, color: 'rgba(167,243,208,0.7)', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid rgba(34,197,94,0.4)' }}>{s}</div>
            ))}
          </div>
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/upload" style={{ padding: '16px 40px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(34,197,94,0.3)' }}>
            <Globe size={18} /> Start for Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: '40px 40px 80px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="divider-line" style={{ marginBottom: 48 }} />
        <span className="badge" style={{ marginBottom: 16, display: 'inline-flex' }}><TrendingDown size={11} /> How It Works</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {[['01', 'Upload', 'Photo or PDF in 30 sec'], ['02', 'AI Reads', 'OCR + ASEAN factors'], ['03', 'Report', 'CBAM-ready MRV doc'], ['04', 'Finance', 'Banks get your data']].map(([n, t, d]) => (
            <motion.div key={n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass" style={{ padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 900, fontSize: 13, color: '#052e16' }}>{n}</div>
              <div style={{ fontWeight: 700, color: '#e2fdf0', marginBottom: 4, fontSize: 14 }}>{t}</div>
              <div style={{ fontSize: 12, color: 'rgba(134,239,172,0.45)' }}>{d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(74,222,128,0.1)', padding: '28px 40px', background: '#040a06', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={12} color="#052e16" /></div>
          <span style={{ fontWeight: 900, fontSize: 16, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(134,239,172,0.3)' }}>BU × Berkeley · Climate Venture Competition · 2026 · The Climate OS for ASEAN SMEs</p>
      </footer>
    </main>
  );
}
