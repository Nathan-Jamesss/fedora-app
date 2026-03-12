"use client";

// Smooth flowing lines — pure CSS, no JS per frame
function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 22 * position} -${189 + i * 24}C-${380 - i * 22 * position} -${189 + i * 24} -${312 - i * 22 * position} ${216 - i * 24} ${152 - i * 22 * position} ${343 - i * 24}C${616 - i * 22 * position} ${470 - i * 24} ${684 - i * 22 * position} ${875 - i * 24} ${684 - i * 22 * position} ${875 - i * 24}`,
        opacity: 0.06 + i * 0.025,
        width: 0.6 + i * 0.08,
        dur: 30 + i * 5,
        delay: i * 3,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
                <title>Background Paths</title>
                {paths.map((p) => (
                    <path
                        key={p.id}
                        d={p.d}
                        stroke="#22c55e"
                        strokeWidth={p.width}
                        strokeOpacity={p.opacity}
                        strokeDasharray="1600"
                        strokeDashoffset="1600"
                        style={{
                            animation: `flowLine ${p.dur}s ease-in-out infinite`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes flowLine {
          0%   { stroke-dashoffset: 1600; opacity: 0; }
          5%   { opacity: 0.4; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          95%  { opacity: 0.4; }
          100% { stroke-dashoffset: -1600; opacity: 0; }
        }
      `}} />
        </div>
    );
}
