import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { Neighborhoods } from "@/components/home/Neighborhoods";
import { About } from "@/components/home/About";
import { Brokers } from "@/components/home/Brokers";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties />
      <Neighborhoods />
      <About />
      <Brokers />
      <Testimonials />
      <CTA />
    </>
  );
}
