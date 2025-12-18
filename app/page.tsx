import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SplitRealtorStory } from "@/components/ui/split-realtor-story";
import Achievement from "@/components/ui/achievement";
import FeaturedListings from "@/components/FeaturedListings";
import FeaturedAreas from "@/components/FeaturedAreas";
import ServicesSection from "@/components/ServicesSection";
import VideoTestimonials from "@/components/VideoTestimonials";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SplitRealtorStory />
      <ServicesSection />
      <Achievement />
      <FeaturedListings />
      <FeaturedAreas />
      <VideoTestimonials />
      <Testimonials />
      {/* Future sections (About, Listings, etc.) would go here */}
      <div className="h-20 bg-background" />
    </main>
  );
}
