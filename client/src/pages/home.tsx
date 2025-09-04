import Hero from "@/components/hero";
import Calculator from "@/components/calculator";
import Testimonials from "@/components/testimonials";
import HowItWorks from "@/components/how-it-works";
import InterestingFacts from "@/components/interesting-facts";
import FeaturedArticles from "@/components/featured-articles";
import Footer from "@/components/footer";
import { DynamicRenderer } from "@/components/DynamicRenderer";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // Check if there's a custom home page designed with the builder
  const { data: homePage } = useQuery({
    queryKey: ['/api/pages/home'],
    queryFn: () => fetch('/api/pages/home').then(res => res.ok ? res.json() : null).catch(() => null)
  });

  // If a custom home page exists and is published, render it instead of default content
  if (homePage && homePage.status === 'published') {
    return (
      <div className="min-h-screen bg-background" data-testid="dynamic-home-page">
        {/* Dynamic Header */}
        <DynamicRenderer type="element" elementType="header" />
        
        {/* Custom Home Page Content */}
        <DynamicRenderer type="page" isHomePage={true} />
        
        {/* Dynamic Footer */}
        <DynamicRenderer type="element" elementType="footer" />
      </div>
    );
  }

  // Default static home page with dynamic header/footer
  return (
    <div className="min-h-screen bg-background" data-testid="default-home-page">
      {/* Dynamic Header - will render if designed in admin */}
      <DynamicRenderer type="element" elementType="header" />
      
      {/* Default Static Content */}
      <Hero />
      <Calculator />
      <Testimonials />
      <HowItWorks />
      <InterestingFacts />
      <FeaturedArticles />
      
      {/* Dynamic Footer - will render if designed in admin */}
      <DynamicRenderer type="element" elementType="footer" />
      
      {/* Fallback to static footer if no dynamic footer */}
      <Footer />
    </div>
  );
}
