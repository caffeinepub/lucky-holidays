import { Users, Fuel, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Vehicle {
  name: string;
  type: string;
  capacity: number;
  description: string;
  features: string[];
  badge?: string;
  image: string;
}

const vehicles: Vehicle[] = [
  {
    name: 'Toyota Innova Crysta',
    type: 'SUV / MPV',
    capacity: 7,
    description: 'The most popular choice for family trips and small group tours. Spacious, comfortable, and fuel-efficient with excellent road performance.',
    features: ['AC', 'Music System', 'GPS', 'Luggage Space'],
    badge: 'Most Popular',
    image: '/assets/generated/innova-crysta-360.dim_800x500.png',
  },
  {
    name: 'Force Traveller',
    type: 'Mini Bus',
    capacity: 17,
    description: 'Perfect for medium-sized groups. Offers ample seating with comfortable cushioned seats and large windows for scenic views.',
    features: ['AC', 'Push-back Seats', 'Music System', 'Luggage Rack'],
    image: '/assets/generated/force-traveller-360.dim_800x500.png',
  },
  {
    name: 'Tempo Traveller',
    type: 'Mini Bus',
    capacity: 12,
    description: 'Ideal for group outings and corporate trips. Comfortable seating with good legroom and reliable performance on all terrains.',
    features: ['AC', 'Reclining Seats', 'Music System', 'First Aid'],
    badge: 'Best Value',
    image: '/assets/generated/tempo-traveller-360.dim_800x500.png',
  },
  {
    name: 'Luxury Coach',
    type: 'Bus',
    capacity: 45,
    description: 'For large group tours and pilgrimages. Equipped with premium amenities to ensure a comfortable long-distance journey.',
    features: ['AC', 'Sleeper Seats', 'TV', 'Charging Points'],
    badge: 'Premium',
    image: '/assets/generated/luxury-coach-360.dim_800x500.png',
  },
  {
    name: 'Toyota Fortuner',
    type: 'SUV',
    capacity: 7,
    description: 'A premium SUV for those who want to travel in style. Powerful engine, luxurious interiors, and superior off-road capability.',
    features: ['AC', 'Leather Seats', 'GPS', 'Sunroof'],
    badge: 'Luxury',
    image: '/assets/generated/fortuner-360.dim_800x500.png',
  },
  {
    name: 'Maruti Ertiga',
    type: 'MPV',
    capacity: 7,
    description: 'A budget-friendly option for small families. Comfortable, economical, and perfect for short to medium distance trips.',
    features: ['AC', 'Music System', 'Luggage Space', 'Comfortable Seats'],
    image: '/assets/generated/ertiga-360.dim_800x500.png',
  },
];

const badgeColors: Record<string, string> = {
  'Most Popular': 'bg-primary text-primary-foreground',
  'Best Value': 'bg-secondary text-secondary-foreground',
  'Premium': 'bg-accent text-accent-foreground',
  'Luxury': 'bg-foreground text-background',
};

export default function Vehicles() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-primary mb-4">
            Our Fleet
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Choose from our wide range of well-maintained vehicles — from compact SUVs to luxury coaches — for every type of journey.
          </p>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.name}
                className="border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Vehicle Image */}
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.name} 360° view`}
                    className="w-full h-48 object-cover"
                  />
                  {vehicle.badge && (
                    <span className={`absolute top-3 right-3 text-xs font-body font-semibold px-3 py-1 rounded-full ${badgeColors[vehicle.badge]}`}>
                      {vehicle.badge}
                    </span>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-foreground">{vehicle.name}</h3>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline" className="text-xs font-body border-primary/40 text-primary">
                      {vehicle.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm font-body">
                      <Users size={14} />
                      <span>{vehicle.capacity} seats</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                    {vehicle.description}
                  </p>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-body font-semibold text-foreground uppercase tracking-wide mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                          <CheckCircle size={12} className="text-primary flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/10 border-t border-primary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Fuel size={32} className="text-primary mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Need a Custom Vehicle?
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            Don't see what you're looking for? Contact us and we'll arrange the perfect vehicle for your journey.
          </p>
          <a
            href="tel:9663202989"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 py-3 rounded-full transition-colors shadow-md"
          >
            Call Us: +91 9663202989
          </a>
        </div>
      </section>
    </div>
  );
}
