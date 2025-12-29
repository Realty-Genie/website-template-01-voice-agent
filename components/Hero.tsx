import { Input } from "@/components/ui/input"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import LiveStream from "./LiveStream"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <LiveStream
          className="w-full h-full object-cover block pointer-events-none"
          playlistUrl="http://ik.imagekit.io/mohakgupta/hero_background.mp4/ik-master.m3u8?tr=sr-360_480_720_1080"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,transparent_60%),radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center gap-6 md:gap-8">

        {/* Badge */}
        <div className="animate-in fade-in duration-1000 delay-100">
          <span className="inline-block px-3 py-1 border border-white/20 rounded-full bg-black/20 backdrop-blur-sm text-primary/90 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase">
            Greater Vancouver's Premier Real Estate
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="animate-in fade-in duration-1000 delay-300 text-4xl md:text-6xl lg:text-7xl font-sans font-light text-white tracking-wide leading-[1.1] max-w-5xl shadow-black drop-shadow-lg">
          Top 1% Realtor <br /> in Greater Vancouver
        </h1>

        {/* Subhead */}
        <p className="animate-in fade-in duration-1000 delay-500 text-lg md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-md">
          Powerful Luxury Marketing that captivates and sells.
        </p>

        {/* AI Search Bar */}
        <div className="animate-in fade-in scale-in-95 duration-1000 delay-500 w-full max-w-2xl mt-8 relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60" />

          <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/30 rounded-full p-1.5 transition-all duration-300 hover:bg-black/40 hover:border-primary/60 focus-within:ring-1 focus-within:ring-primary/50 focus-within:bg-black/60 focus-within:border-primary">
            <div className="pl-4 pr-3 text-primary animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Ask AI: 'Show me luxury condos in Coal Harbour w/ ocean view'..."
              className="border-0 bg-transparent text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 md:h-12 text-base md:text-lg font-light w-full"
            />
            <Button size="icon" className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-primary hover:bg-white hover:text-black text-black ml-2 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
          <p className="sr-only">AI Search Input</p>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-[10px] text-white uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  )
}
