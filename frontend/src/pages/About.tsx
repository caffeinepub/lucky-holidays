import { Award, Heart, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    description: 'We are travelers at heart. Every trip we plan is infused with genuine love for exploration and discovery.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your comfort, safety, and satisfaction are at the center of everything we do. We listen, we care, we deliver.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'From vehicle maintenance to route planning, we maintain the highest standards in every aspect of our service.',
  },
  {
    icon: Target,
    title: 'Reliability',
    description: 'Punctuality and dependability are our hallmarks. When you book with us, you can count on us to be there.',
  },
];

const milestones = [
  { year: '2010', event: 'LUCKY HOLIDAYS was founded with a single vehicle and a big dream.' },
  { year: '2013', event: 'Expanded our fleet to 5 vehicles and started offering group tour packages.' },
  { year: '2016', event: 'Reached 100+ satisfied customers and launched our signature hill station tours.' },
  { year: '2019', event: 'Grew to 15+ vehicles and partnered with hotels across South India.' },
  { year: '2022', event: 'Celebrated 500+ happy travelers and launched premium luxury travel packages.' },
  { year: '2025', event: 'Continuing to grow with 20+ vehicles and expanding to new destinations.' },
];

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-primary mb-4">
            About LUCKY HOLIDAYS
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            A journey of a thousand miles begins with a single step — and we've been taking those steps with our customers since 2010.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-body font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2 mb-6">
                Born from a Love of Travel
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  LUCKY HOLIDAYS was born in 2010 from a simple belief: that every person deserves to experience the beauty of travel without worry or hassle. Founded in the heart of Karnataka, we started with one vehicle and an unwavering commitment to making travel accessible, comfortable, and memorable.
                </p>
                <p>
                  Over the years, we've grown into a trusted name in tours and travels, serving hundreds of families, corporate groups, and solo adventurers. Our deep knowledge of South Indian destinations — from the misty hills of Coorg to the golden beaches of Goa — sets us apart.
                </p>
                <p>
                  Today, LUCKY HOLIDAYS operates a modern fleet of well-maintained vehicles, staffed by experienced and courteous drivers who know every road, every shortcut, and every hidden gem along the way.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20">
                <div className="text-6xl text-center mb-4">🌄</div>
                <blockquote className="text-center">
                  <p className="font-display text-xl text-foreground italic mb-4">
                    "Travel is not just about reaching a destination — it's about the stories you collect along the way."
                  </p>
                  <footer className="text-primary font-body font-semibold">
                    — LUCKY HOLIDAYS Team
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary font-body font-semibold text-sm uppercase tracking-widest">Our Mission</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2 mb-6">
            Making Every Journey Extraordinary
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-3xl mx-auto leading-relaxed">
            Our mission is to provide safe, comfortable, and affordable travel experiences that create lasting memories. We are dedicated to delivering exceptional service, maintaining the highest safety standards, and ensuring every traveler returns home with a smile and a story to tell.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-border shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-body font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2">
              Milestones Along the Way
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-0.5" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 md:absolute md:left-1/2 md:-translate-x-1/2 shadow-md">
                    <span className="text-primary-foreground font-body font-bold text-xs">{milestone.year.slice(2)}</span>
                  </div>
                  <div className={`flex-1 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <div className="bg-card rounded-xl p-4 shadow-card border border-border">
                      <div className="font-display font-bold text-primary text-lg">{milestone.year}</div>
                      <p className="text-sm text-muted-foreground font-body mt-1">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
