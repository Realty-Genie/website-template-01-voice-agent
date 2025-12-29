"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee } from "lucide-react"
import LiveStream from "../LiveStream"

const texts = [
  "Denise Mai is an award-winning Realtor with eXp Realty and the Founder of the Mai Real Estate Group, ranked among Vancouver’s top 10% teams.",
  "Born into humble beginnings, Denise defied the odds to become a self-made millionaire, 2x TEDx speaker, and one of Vancouver’s top 1% realtors since 2010.",
  "Her journey from growing up with a single mother on welfare to building a seven-figure real estate business is a true story of resilience, grit, and heart."
]

export function SplitRealtorStory() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, 6000) // Rotate every 6 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full py-20 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left: Animated Text Content */}
        <div className="flex flex-col items-start gap-6 z-10">
          <div className="inline-block px-3 py-1 border border-primary/30 rounded-full bg-primary/5 text-primary text-[10px] uppercase tracking-[0.2em] font-medium">
            The Story
          </div>

          <div className="h-[200px] md:h-[180px] relative w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-white/90"
              >
                {texts[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex gap-2 mt-6">
            {texts.map((_, i) => (
              <div
                key={i}
                className={`h-1 mt-6 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-primary' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <Button
            className="hidden md:flex border border-primary/50 text-white bg-primary/10 backdrop-blur-sm hover:bg-primary hover:text-black hover:border-primary rounded-xl px-8 py-6 tracking-widest text-xs uppercase font-medium transition-all duration-300"
          >
            Let's get a coffee
            <Coffee className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Right: Video & CTA */}
        <div className="relative w-full flex flex-col items-center lg:items-end gap-8">
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 relative bg-black/50">
            <LiveStream playlistUrl="https://ik.imagekit.io/mohakgupta/cta_section.mp4/ik-master.m3u8?tr=sr-360_480_720_1080" className="" />
            {/* https://ik.imagekit.io/mohakgupta/cta_section.mp4/ik-master.m3u8?tr=sr-360_480_720_1080 */}
          </div>

          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-6 text-lg tracking-wide font-medium shadow-lg hover:shadow-primary/20 transition-all duration-300 w-full md:w-auto"
          >
            Get Free Seller’s Guide
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

      </div>
    </section>
  )
}
