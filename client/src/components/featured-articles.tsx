import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "How old is 100 years in dog years?",
    excerpt: "A 100-year-old human would be an unimaginably old dog—far beyond any known canine lifespan. But for fun and science, here's how you'd break it down.",
    date: "September 3, 2025",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=200&fit=crop",
    alt: "Senior golden retriever in garden"
  },
  {
    id: 2,
    title: "How Long Do Golden Retrievers Live? Understanding Lifespan and Keys to Longevity",
    excerpt: "Golden Retrievers, renowned for their intelligence, loyalty, and gentle temperament, rank among the world's most beloved dog breeds. The oldest recorded Golden Retriever, Augie, lived to 20 years and 11 months",
    date: "September 3, 2025",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop",
    alt: "Golden retriever playing with family"
  },
  {
    id: 3,
    title: "How long do chihuahuas live?",
    excerpt: "The Lifespan of Chihuahuas: Unlocking the Secrets to Their Longevity (12-20 Years!)",
    date: "September 3, 2025",
    image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=200&fit=crop",
    alt: "Chihuahua sitting on colorful blanket"
  }
];

export default function FeaturedArticles() {
  return (
    <section id="featured-articles" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Articles</h2>
          <p className="text-xl text-muted-foreground">
            Discover expert insights about dog health, aging, and care
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {articles.map((article) => (
            <Card key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" data-testid={`article-${article.id}`}>
              <img 
                src={article.image} 
                alt={article.alt}
                className="w-full h-48 object-cover"
                data-testid={`img-article-${article.id}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3" data-testid={`text-title-${article.id}`}>
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`text-excerpt-${article.id}`}>
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span data-testid={`text-date-${article.id}`}>{article.date}</span>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:underline font-medium"
                    data-testid={`link-read-more-${article.id}`}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            data-testid="button-view-all-articles"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
