'use client';
import { FallingPattern } from "@/components/ui/falling-pattern";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Leaf, Upload, BarChart3, FileText, ShieldCheck, ArrowRight, Zap, Globe, TrendingDown, Award, Brain } from "lucide-react";

/* ── Floating leaves — simple translateY, GPU-friendly ── */
const leaves = [
  { l: 4, t: 10, sz: 70, dur: 14, del: 0, op: 0.3 },
  { l: 82, t: 8, sz: 55, dur: 12, del: 2, op: 0.25 },
  { l: 92, t: 65, sz: 60, dur: 16, del: 1, op: 0.28 },
  { l: 3, t: 60, sz: 50, dur: 13, del: 3, op: 0.22 },
  { l: 55, t: 90, sz: 45, dur: 11, del: 1.5, op: 0.2 },
];
function LeafSVG({ sz, op }: { sz: number; op: number }) {
  return (
    <svg width={sz} height={sz * 1.3} viewBox="0 0 100 130" style={{ opacity: op }}>
      <defs>
        <radialGradient id="lfg" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#86efac" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#166534" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <path d="M50,2 C70,2 98,25 98,60 C98,95 72,128 50,128 C28,128 2,95 2,60 C2,25 30,2 50,2Z" fill="url(#lfg)" />
      <path d="M50,15 Q52,65 48,120" stroke="#166534" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 40px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(4,10,6,0.95)',
      borderBottom: '1px solid rgba(74,222,128,0.1)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
      </Link>
      <div style={{ display: 'flex', gap: 4 }}>
        {[['Dashboard', '/dashboard'], ['Analysis', '/analysis'], ['Reports', '/reports'], ['Compliance', '/compliance']].map(([l, h]) => (
          <Link key={l} href={h} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'rgba(134,239,172,0.6)', textDecoration: 'none' }}>{l}</Link>
        ))}
      </div>
      <Link href="/upload" style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 16px rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Upload size={14} /> Upload
      </Link>
    </nav>
  );
}

/* ── Feature data ── */
const features = [
  { icon: <Upload size={22} />, title: 'Upload & Analyze', desc: 'Drop a photo of any invoice or energy bill. AI extracts and maps ASEAN emission factors in seconds.', href: '/upload', color: '#22c55e' },
  { icon: <BarChart3 size={22} />, title: 'Dashboard & Batch', desc: 'Track Scope 1/2/3 over time, compare months, benchmark against competitors.', href: '/dashboard', color: '#4ade80' },
  { icon: <FileText size={22} />, title: 'CBAM Reports', desc: 'Export-ready MRV documents your EU importer can use immediately.', href: '/reports', color: '#86efac' },
  { icon: <Brain size={22} />, title: 'In-Depth Analysis', desc: 'Full emission breakdown with AI decarbonisation recommendations.', href: '/analysis', color: '#a7f3d0' },
  { icon: <ShieldCheck size={22} />, title: 'Compliance Tracker', desc: 'Real-time CBAM readiness score with action checklist.', href: '/compliance', color: '#34d399' },
  { icon: <Award size={22} />, title: 'Green Leaf Credits', desc: 'Earn credits for verified reductions. Claim green finance and certifications.', href: '/dashboard/credits', color: '#6ee7b7' },
];

const stats = [
  { v: '62.4', u: 'kgCO₂e/unit', l: 'Measured in minutes' },
  { v: '€0.38', u: 'CBAM cert/unit', l: 'vs €1.20+ default' },
  { v: '68', u: 'Green Score', l: 'Instant supplier rating' },
  { v: '<1h', u: 'onboarding', l: 'Zero tools needed' },
];

/* ── Subtitle cycling — pure state, minimal re-render ── */
const subtitles = ["Measure Carbon. Comply with CBAM.", "Unlock Green Finance. Keep Your EU Customers.", "Built for ASEAN Reality.", "Invoice to MRV Report in 60 Seconds."];
function CyclingSubtitle() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % subtitles.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <p key={idx} className="animate-fade-in" style={{ fontSize: 'clamp(14px,1.8vw,18px)', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textAlign: 'center', minHeight: 28 }}>
      {subtitles[idx]}
    </p>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#040a06', overflow: 'hidden' }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, overflow: 'hidden' }}>
        {/* Layer 1: falling pattern background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <FallingPattern
            color="#22c55e"
            backgroundColor="#040a06"
            duration={180}
            blurIntensity="0.8em"
            density={1}
            className="h-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          />
        </div>

        {/* Layer 2: simple floating leaves */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {leaves.map((lf, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${lf.l}%`, top: `${lf.t}%`,
              animation: `leafBob ${lf.dur}s ease-in-out infinite`,
              animationDelay: `${lf.del}s`,
            }}>
              <LeafSVG sz={lf.sz} op={lf.op} />
            </div>
          ))}
          {/* Ambient glows */}
          <div style={{ position: 'absolute', top: '15%', left: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.06) 0%,transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(22,163,74,0.05) 0%,transparent 70%)', filter: 'blur(50px)' }} />
        </div>

        {/* Layer 3: vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(4,10,6,0.1) 0%,rgba(4,10,6,0.65) 100%)', pointerEvents: 'none' }} />

        {/* Hero content — CSS animations only, no framer-motion */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <GradualSpacing
            text="FEDORA"
            duration={0.6}
            delayMultiple={0.08}
            className="text-white drop-shadow-lg font-black tracking-tighter"
            framerProps={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
            }}
          />
          <style dangerouslySetInnerHTML={{ __html: `.flex.justify-center.space-x-1 h1 { font-size: clamp(64px,12vw,140px); line-height: 0.9; }` }} />

          <div className="animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <p style={{ fontSize: 'clamp(16px,2.2vw,22px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em', marginBottom: 4 }}>
              The Climate Operating System for ASEAN SMEs
            </p>
            <p style={{ fontSize: 'clamp(13px,1.4vw,15px)', color: 'rgba(255,255,255,0.7)', maxWidth: 600, lineHeight: 1.7, marginBottom: 12, margin: '0 auto' }}>
              Helping ASEAN manufacturers keep their EU market access as carbon border taxes go live in 2026.
              Upload a bill, get your footprint, generate your CBAM report — under an hour.
            </p>
            <CyclingSubtitle />
          </div>

          {/* CTA buttons */}
          <div className="animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'both', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
            <Link href="/upload" style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 28px rgba(34,197,94,0.35)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Upload size={16} /> Upload Your First Bill
            </Link>
            <Link href="/dashboard" style={{ padding: '14px 32px', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart3 size={16} /> See Dashboard
            </Link>
          </div>

          {/* Stat pills */}
          <div className="animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
            {stats.map(({ v, u, l }) => (
              <div key={l} style={{ padding: '10px 20px', background: 'rgba(13,31,18,0.65)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 12, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 20, color: '#4ade80' }}>{v} <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.5)', fontWeight: 400 }}>{u}</span></div>
                <div style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in" style={{ animationDelay: '1.8s', animationFillMode: 'both', position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom,rgba(74,222,128,0.4),transparent)', animation: 'scrollPulse 1.5s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══ CBAM Alert ══ */}
      <div style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.07),rgba(234,88,12,0.04))', borderTop: '1px solid rgba(245,158,11,0.15)', borderBottom: '1px solid rgba(245,158,11,0.15)', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', textAlign: 'center' }}>
        <Zap size={16} color="#f59e0b" />
        <span style={{ color: 'rgba(253,230,138,0.85)', fontSize: 14, fontWeight: 600 }}>
          CBAM full enforcement: <strong style={{ color: '#fbbf24' }}>January 2026</strong> — ASEAN exporters must measure embedded emissions or lose EU customers.
        </span>
        <Link href="/compliance" style={{ padding: '7px 18px', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#1c0a00', borderRadius: 999, fontWeight: 700, fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          Check Your Exposure <ArrowRight size={12} />
        </Link>
      </div>

      {/* ══ Features grid — simple glass cards, NO GlowCard ══ */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="badge" style={{ marginBottom: 12, display: 'inline-flex' }}><Leaf size={11} /> Platform Features</span>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, color: '#e2fdf0', lineHeight: 1.1, marginBottom: 12 }}>
            Everything ASEAN SMEs Need<br />to Survive and Profit from CBAM
          </h2>
          <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
            From invoice photo to green finance access. No consultants. No European accounting tools. Made for the ASEAN factory floor.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {features.map(({ icon, title, desc, href, color }, idx) => (
            <Link key={title} href={href} style={{ textDecoration: 'none', display: 'block' }}>
              <div className="glass" style={{ padding: '28px 24px', height: '100%', animationDelay: `${0.1 * idx}s` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#e2fdf0', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(167,243,208,0.5)', lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                <span style={{ fontSize: 12, color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Explore <ArrowRight size={12} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ Before / After ══ */}
      <section style={{ padding: '40px 40px 80px', maxWidth: 860, margin: '0 auto' }}>
        <div className="divider-line" style={{ marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/upload" style={{ padding: '16px 40px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#052e16', borderRadius: 999, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(34,197,94,0.3)' }}>
            <Globe size={18} /> Start for Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* ══ How it works ══ */}
      <section style={{ padding: '40px 40px 80px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="divider-line" style={{ marginBottom: 48 }} />
        <span className="badge" style={{ marginBottom: 16, display: 'inline-flex' }}><TrendingDown size={11} /> How It Works</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {[['01', 'Upload', 'Photo or PDF in 30 sec'], ['02', 'AI Reads', 'OCR + ASEAN factors'], ['03', 'Report', 'CBAM-ready MRV doc'], ['04', 'Finance', 'Banks get your data']].map(([n, t, d]) => (
            <div key={n} className="glass" style={{ padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 900, fontSize: 13, color: '#052e16' }}>{n}</div>
              <div style={{ fontWeight: 700, color: '#e2fdf0', marginBottom: 4, fontSize: 14 }}>{t}</div>
              <div style={{ fontSize: 12, color: 'rgba(134,239,172,0.45)' }}>{d}</div>
            </div>
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

      {/* Lightweight keyframes — CSS only, no JS overhead */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes leafBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(8px); }
        }
      `}} />
    </main>
  );
}
