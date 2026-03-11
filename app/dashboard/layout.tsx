'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, BarChart3, Upload, FileText, ShieldCheck, Brain, TrendingUp, Award, Users, Home } from 'lucide-react';
import { ReactNode } from 'react';

const navItems = [
    { href: '/dashboard', label: 'Overview', icon: <Home size={15} /> },
    { href: '/dashboard/batch', label: 'Batch & Yearly Analysis', icon: <TrendingUp size={15} /> },
    { href: '/dashboard/competitors', label: 'Competitor Benchmarking', icon: <Users size={15} /> },
    { href: '/dashboard/credits', label: 'Green Leaf Credits', icon: <Award size={15} /> },
    { label: '─', divider: true },
    { href: '/upload', label: 'Upload Bill', icon: <Upload size={15} /> },
    { href: '/analysis', label: 'In-Depth Analysis', icon: <Brain size={15} /> },
    { href: '/reports', label: 'Reports', icon: <FileText size={15} /> },
    { href: '/compliance', label: 'CBAM Compliance', icon: <ShieldCheck size={15} /> },
] as const;

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#040a06' }}>
            {/* Sidebar */}
            <aside style={{
                width: 230, flexShrink: 0, position: 'fixed', top: 0, left: 0, bottom: 0,
                background: 'rgba(7,15,10,0.97)', borderRight: '1px solid rgba(74,222,128,0.1)',
                backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', zIndex: 50,
                overflowY: 'auto',
            }}>
                {/* Logo */}
                <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(34,197,94,0.3)', flexShrink: 0 }}>
                            <Leaf size={14} color="#052e16" />
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FEDORA</span>
                    </Link>
                    <p style={{ fontSize: 10, color: 'rgba(134,239,172,0.3)', marginTop: 6, lineHeight: 1.4 }}>Climate OS · Nguyen Steel Co.</p>
                </div>

                {/* Nav items */}
                <nav style={{ padding: '12px 10px', flex: 1 }}>
                    {navItems.map((item, i) => {
                        if ('divider' in item && item.divider) {
                            return <div key={i} style={{ height: 1, background: 'rgba(74,222,128,0.07)', margin: '10px 6px' }} />;
                        }
                        const active = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href as string}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                                    borderRadius: 8, marginBottom: 2, textDecoration: 'none',
                                    fontSize: 13, fontWeight: active ? 600 : 500,
                                    color: active ? '#4ade80' : 'rgba(134,239,172,0.55)',
                                    background: active ? 'rgba(34,197,94,0.1)' : 'transparent',
                                    borderLeft: active ? '2px solid #22c55e' : '2px solid transparent',
                                    transition: 'all 0.2s',
                                }}>
                                <span style={{ color: active ? '#4ade80' : 'rgba(134,239,172,0.4)' }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom credit score */}
                <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(74,222,128,0.08)', margin: '0' }}>
                    <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ fontSize: 10, color: 'rgba(134,239,172,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Green Score</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#4ade80' }}>68 <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.4)', fontWeight: 400 }}>/100</span></div>
                        <div style={{ height: 4, background: 'rgba(34,197,94,0.12)', borderRadius: 999, marginTop: 6 }}>
                            <div style={{ height: '100%', width: '68%', background: 'linear-gradient(90deg,#22c55e,#4ade80)', borderRadius: 999 }} />
                        </div>
                        <Link href="/dashboard/credits" style={{ fontSize: 11, color: '#4ade80', textDecoration: 'none', marginTop: 6, display: 'block' }}>View Credits →</Link>
                    </div>
                </div>
            </aside>

            {/* Main content with offset for sidebar */}
            <main style={{ marginLeft: 230, flex: 1, minWidth: 0 }}>
                {children}
            </main>
        </div>
    );
}
