import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Enter Your Dog's Age",
    description: "Input your dog's current age in years. You can use decimals for more precision (e.g., 2.5 years).",
    color: "bg-primary text-primary-foreground"
  },
  {
    number: 2,
    title: "Select Dog Size",
    description: "Choose your dog's size category. Smaller dogs generally live longer and age differently than larger breeds.",
    color: "bg-green-500 text-white"
  },
  {
    number: 3,
    title: "Advanced Calculation",
    description: "Our algorithm uses veterinary research to calculate the equivalent human age based on size-specific aging patterns.",
    color: "bg-purple-500 text-white"
  },
  {
    number: 4,
    title: "Get Results",
    description: "Receive your dog's human age equivalent along with their current life stage and health insights.",
    color: "bg-primary text-primary-foreground"
  }
];

const sciencePoints = [
  {
    icon: "📈",
    title: "Non-Linear Aging",
    description: "Dogs don't age at a constant rate. They mature quickly in their first two years, then age more gradually."
  },
  {
    icon: "📏",
    title: "Size Matters",
    description: "Smaller dogs typically live longer and age differently than larger breeds due to metabolic differences."
  },
  {
    icon: "🔬",
    title: "Veterinary Research",
    description: "Our formulas are based on extensive veterinary studies and real-world data from thousands of dogs."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How Our Calculator Works</h2>
          <p className="text-xl text-muted-foreground">
            Our dog age calculator uses scientifically-backed formulas that account for breed size and the non-linear nature of dog aging to provide the most accurate results.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="text-center" data-testid={`step-${step.number}`}>
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Science Behind */}
        <Card className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-8 text-center">The Science Behind Dog Aging</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {sciencePoints.map((point, index) => (
              <div key={index} className="text-center" data-testid={`science-point-${index}`}>
                <div className="text-4xl mb-4">{point.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{point.title}</h4>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </div>
            ))}
          </div>
          
          {/* Quick Reference */}
          <div className="bg-accent/30 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-center">Quick Reference</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-testid="reference-small-medium">
                <h5 className="font-semibold mb-2">Small & Medium Dogs:</h5>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>1 year old ≈ 15 human years</li>
                  <li>2 years old ≈ 24 human years</li>
                  <li>Each year after +4-5 years</li>
                </ul>
              </div>
              <div data-testid="reference-large">
                <h5 className="font-semibold mb-2">Large Dogs:</h5>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>1 year old ≈ 12 human years</li>
                  <li>2 years old ≈ 22.5 human years</li>
                  <li>Each year after +6.5 years</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              *Based on scientific veterinary research
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
