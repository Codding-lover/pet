import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gradient-hero py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Dog Years in{" "}
            <span className="text-primary">Human Years</span><br />
            Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Convert your dog's age to human years with our scientifically accurate calculator. Discover how old your dog is in human years and learn fascinating facts about canine aging.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold gradient-primary hover:opacity-90 transition-all"
            onClick={() => scrollToSection('calculator')}
            data-testid="button-calculate-now"
          >
            Calculate Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => scrollToSection('how-it-works')}
            data-testid="button-learn-how"
          >
            Learn How It Works
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="text-center" data-testid="stat-calculations">
            <div className="text-4xl font-bold text-primary mb-2">10M+</div>
            <div className="text-muted-foreground">Calculations Made</div>
          </div>
          <div className="text-center" data-testid="stat-breeds">
            <div className="text-4xl font-bold text-primary mb-2">340+</div>
            <div className="text-muted-foreground">Dog Breeds Supported</div>
          </div>
          <div className="text-center" data-testid="stat-accuracy">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
