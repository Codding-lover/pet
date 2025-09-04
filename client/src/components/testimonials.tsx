import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  dog: string;
  age: string;
  status: string;
  statusColor: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    dog: "Buddy",
    age: "6 months",
    status: "Excited for Growth",
    statusColor: "text-green-600",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face",
    quote: "Buddy is only 6 months old, and using this calculator I discovered he's equivalent to a 10-year-old human! It's amazing. I'm so excited to watch him grow up and imagine what he'll be like. Watching him learn new skills every day is like watching a child grow."
  },
  {
    id: 2,
    name: "Michael Chen",
    dog: "Max",
    age: "8 years",
    status: "Worried about Aging",
    statusColor: "text-amber-600",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    quote: "Max is already 8 years old, which equals 51 human years. Seeing this number makes me a bit sad, realizing he's entered middle age. I've started cherishing every day with him even more, giving him the best care, hoping he stays healthy and lives long."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    dog: "Luna",
    age: "Passed away",
    status: "Cherished Memories",
    statusColor: "text-purple-600",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    quote: "Luna was with us for 12 years, equivalent to 74 human years when she passed. Though she's no longer here, using this calculator brings back memories of her life - from a playful puppy to a gentle old dog. Every stage was filled with beautiful memories. Thank you Luna for all the love."
  },
  {
    id: 4,
    name: "David Wilson",
    dog: "Charlie",
    age: "2 years",
    status: "Excited for Growth",
    statusColor: "text-green-600",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    quote: "Charlie just turned 2, which is already 24 in human years! He's in his prime now, full of energy, and I have to take him running every day. Seeing him so vibrant fills me with excitement, and I look forward to spending many more wonderful times together."
  },
  {
    id: 5,
    name: "Lisa Thompson",
    dog: "Bella",
    age: "10 years",
    status: "Worried about Aging",
    statusColor: "text-amber-600",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    quote: "Bella is 10 years old now, which makes her over 60 in human years. I've noticed she walks much slower lately and doesn't play as much as before. I'm starting to worry about her health, getting nervous every vet visit, just hoping she can stay with us longer."
  },
  {
    id: 6,
    name: "Robert Davis",
    dog: "Daisy",
    age: "Passed away",
    status: "Cherished Memories",
    statusColor: "text-purple-600",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    quote: "Daisy passed away a year ago after living 14 years, equivalent to 78 human years - quite a long life. Every time I use this calculator, I remember her mischievous puppy days and the warmth of her quietly staying by my side in her later years. Though I miss her, I feel satisfied with the life she lived."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 px-4 bg-accent/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Real User Stories</h2>
          <p className="text-xl text-muted-foreground">
            Hear from other dog owners and feel the deep bond between humans and their beloved pets
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full md:w-1/2 lg:w-1/3 px-4 flex-shrink-0">
                <Card className="bg-white rounded-xl p-6 shadow-lg testimonial-card h-full">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      data-testid={`img-avatar-${testimonial.id}`}
                    />
                    <div>
                      <div className="font-semibold" data-testid={`text-name-${testimonial.id}`}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`text-dog-info-${testimonial.id}`}>
                        Dog: {testimonial.dog} · {testimonial.age}
                      </div>
                      <div className={`text-sm font-medium ${testimonial.statusColor}`} data-testid={`text-status-${testimonial.id}`}>
                        {testimonial.status}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-quote-${testimonial.id}`}>
                    "{testimonial.quote}"
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full"
            data-testid="button-prev-testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full"
            data-testid="button-next-testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={toggleAutoPlay}
            className="px-4 py-2"
            data-testid="button-toggle-autoplay"
          >
            {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
          </Button>
        </div>
      </div>
    </section>
  );
}
