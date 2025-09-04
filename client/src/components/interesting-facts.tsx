import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const facts = [
  {
    icon: "📏",
    title: "Size Matters",
    description: "Smaller dogs typically live longer than larger breeds. A Chihuahua can live 14-16 years, while a Great Dane averages 8-10 years."
  },
  {
    icon: "🧬",
    title: "Genetic Factors",
    description: "Mixed breed dogs often live longer than purebreds due to hybrid vigor, which reduces the risk of inherited genetic disorders."
  },
  {
    icon: "🏃",
    title: "Exercise Impact",
    description: "Regular exercise can add 1-2 years to your dog's life by maintaining healthy weight and cardiovascular function."
  },
  {
    icon: "🦷",
    title: "Dental Health",
    description: "Dogs with good dental hygiene live longer. Dental disease can lead to heart, liver, and kidney problems if left untreated."
  },
  {
    icon: "🥗",
    title: "Nutrition Matters",
    description: "A balanced diet with proper portions can extend your dog's life by preventing obesity and related health issues."
  },
  {
    icon: "🏥",
    title: "Preventive Care",
    description: "Regular vet checkups and vaccinations can detect health issues early and add years to your dog's life."
  }
];

export default function InterestingFacts() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 bg-accent/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Interesting Facts About Dog Aging</h2>
          <p className="text-xl text-muted-foreground">
            Discover fascinating insights about how our canine companions age and what factors influence their lifespan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {facts.map((fact, index) => (
            <Card key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow" data-testid={`fact-${index}`}>
              <div className="text-4xl mb-4">{fact.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{fact.title}</h3>
              <p className="text-muted-foreground">{fact.description}</p>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <Card className="bg-primary text-primary-foreground rounded-2xl p-8 text-center gradient-primary">
          <h3 className="text-2xl font-bold mb-4">Want to Learn More?</h3>
          <p className="text-lg mb-6 opacity-90">
            Explore our comprehensive articles about dog health, aging, and care tips from veterinary experts.
          </p>
          <Button 
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
            onClick={() => scrollToSection('featured-articles')}
            data-testid="button-read-articles"
          >
            Read Our Articles
          </Button>
        </Card>
      </div>
    </section>
  );
}
