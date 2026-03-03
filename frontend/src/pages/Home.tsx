import { Link } from '@tanstack/react-router';
import { MapPin, Users, Shield, Star, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: MapPin,
    title: 'Tour Packages',
    description: 'Curated travel packages to the most breathtaking destinations across India and beyond.',
  },
  {
    icon: Users,
    title: 'Group Travel',
    description: 'Comfortable group tours with experienced guides ensuring a seamless journey for everyone.',
  },
  {
    icon: Shield,
    title: 'Safe & Reliable',
    description: 'Your safety is our priority. All vehicles are well-maintained and drivers are professionally trained.',
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'From budget-friendly to luxury travel, we offer options tailored to every traveler\'s needs.',
  },
];

const destinations = [
  { name: 'Coorg', tagline: 'Scotland of India', emoji: '🌿' },
  { name: 'Ooty', tagline: 'Queen of Hill Stations', emoji: '🏔️' },
  { name: 'Mysore', tagline: 'City of Palaces', emoji: '🏰' },
  { name: 'Goa', tagline: 'Pearl of the Orient', emoji: '🏖️' },
  { name: 'Kerala', tagline: 'God\'s Own Country', emoji: '🌴' },
  { name: 'Hampi', tagline: 'Land of Ruins', emoji: '🗿' },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1400x500.png"
            alt="Travel destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-body font-medium mb-6">
            <MapPin size={14} />
            Trusted Tours & Travels Since 2010
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
            Explore the World with<br />
            <span className="text-primary">LUCKY HOLIDAYS</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Your journey begins here. We craft unforgettable travel experiences with comfort, safety, and joy at every mile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 py-3 rounded-full shadow-lg">
                Book Your Trip
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/vehicles">
              <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 font-body font-semibold px-8 py-3 rounded-full">
                View Our Fleet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Happy Travelers' },
              { value: '50+', label: 'Destinations' },
              { value: '15+', label: 'Years Experience' },
              { value: '20+', label: 'Vehicles' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl md:text-3xl text-primary-foreground">{stat.value}</div>
                <div className="text-sm font-body text-primary-foreground/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              We go beyond just transportation — we create experiences that last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Discover the most sought-after travel destinations we cover.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-border"
              >
                <div className="text-4xl mb-3">{dest.emoji}</div>
                <h3 className="font-display font-bold text-lg text-foreground">{dest.name}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">{dest.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-secondary-foreground mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-secondary-foreground/80 font-body text-lg mb-8 max-w-xl mx-auto">
            Contact us today and let us plan your perfect getaway. Our team is ready to make your travel dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 rounded-full">
                Get In Touch
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <a href="tel:9663202989" className="flex items-center gap-2 text-secondary-foreground/90 hover:text-secondary-foreground font-body font-medium transition-colors">
              <Phone size={18} />
              +91 9663202989
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
