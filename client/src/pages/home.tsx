import Hero from "@/components/hero";
import Calculator from "@/components/calculator";
import Testimonials from "@/components/testimonials";
import HowItWorks from "@/components/how-it-works";
import InterestingFacts from "@/components/interesting-facts";
import FeaturedArticles from "@/components/featured-articles";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Calculator />
      <Testimonials />
      <HowItWorks />
      <InterestingFacts />
      <FeaturedArticles />
      <Footer />
    </div>
  );
}
