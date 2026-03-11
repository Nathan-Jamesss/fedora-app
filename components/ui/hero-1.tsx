"use client"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
    eyebrow?: string
    title: string
    subtitle: string
    ctaLabel?: string
    ctaHref?: string
    ctaLabel2?: string
    ctaHref2?: string
}

export function Hero({
    eyebrow = "Climate OS for ASEAN SMEs",
    title,
    subtitle,
    ctaLabel = "Explore Now",
    ctaHref = "#",
    ctaLabel2,
    ctaHref2,
}: HeroProps) {
    return (
        <section
            id="hero"
            className="relative mx-auto w-full pt-40 px-6 text-center md:px-8
      min-h-[calc(100vh-40px)] overflow-hidden rounded-b-xl"
            style={{ background: 'linear-gradient(to bottom, #020c07, #031409 50%, #041f0b 88%)' }}
        >
            {/* Grid BG — dark green lines */}
            <div
                className="absolute -z-10 inset-0 opacity-60 h-[700px] w-full"
                style={{
                    backgroundImage: 'linear-gradient(to right, #1a3a22 1px, transparent 1px), linear-gradient(to bottom, #1a3a22 1px, transparent 1px)',
                    backgroundSize: '6rem 5rem',
                    maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)',
                }}
            />

            {/* Radial Accent — deep green glow */}
            <div
                className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)]
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%]
        -translate-x-1/2 rounded-[100%] animate-fade-up"
                style={{
                    background: 'radial-gradient(closest-side, #020c07 82%, #22c55e18)',
                    border: '1px solid rgba(34,197,94,0.12)',
                }}
            />

            {/* Eyebrow */}
            {eyebrow && (
                <a href="#" className="group">
                    <span className="text-sm font-medium mx-auto px-5 py-2 border rounded-3xl w-fit tracking-tight flex items-center justify-center mb-4"
                        style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.25)', background: 'rgba(34,197,94,0.06)' }}>
                        {eyebrow}
                        <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </a>
            )}

            {/* Title */}
            <h1
                className="animate-fade-in -translate-y-4 text-balance py-6 text-5xl font-black leading-none tracking-tighter opacity-0 sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ background: 'linear-gradient(135deg, #a7f3d0 0%, #4ade80 40%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
                {title}
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in mb-12 -translate-y-4 text-balance text-lg tracking-tight opacity-0 md:text-xl"
                style={{ color: 'rgba(134,239,172,0.65)' }}>
                {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex justify-center gap-4 flex-wrap">
                {ctaLabel && (
                    <Button asChild size="lg" className="mt-[-20px] z-20">
                        <a href={ctaHref}>{ctaLabel}</a>
                    </Button>
                )}
                {ctaLabel2 && (
                    <Button asChild size="lg" variant="outline" className="mt-[-20px] z-20">
                        <a href={ctaHref2}>{ctaLabel2}</a>
                    </Button>
                )}
            </div>

            {/* Bottom Fade */}
            <div
                className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px]
        after:absolute after:inset-0 after:z-50"
                style={{ ['--tw-after-bg' as string]: 'linear-gradient(to top, #020c07 10%, transparent)' }}
            />
        </section>
    )
}
