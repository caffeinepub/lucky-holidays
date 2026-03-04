import { Link } from "@tanstack/react-router";
import { CalendarDays, Headphones, MapPin, Smile, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const destinations = [
  {
    name: "Munnar",
    slug: "munnar",
    image: "/assets/generated/munnar-hero.dim_800x500.png",
    tagline: "Tea Gardens & Misty Hills",
    description: "Kerala's most scenic hill station with lush tea estates.",
    region: "Kerala",
  },
  {
    name: "Kodaikanal",
    slug: "kodaikanal",
    image: "/assets/generated/kodaikanal-hero.dim_800x500.png",
    tagline: "Princess of Hill Stations",
    description: "Serene lakes, waterfalls, and cool mountain air.",
    region: "Tamil Nadu",
  },
  {
    name: "Chikmagalur",
    slug: "chikmagalur",
    image: "/assets/generated/chikmagalur-hero.dim_800x500.png",
    tagline: "Coffee Land of Karnataka",
    description: "Aromatic coffee estates and misty mountain trails.",
    region: "Karnataka",
  },
  {
    name: "Wayanad",
    slug: "wayanad",
    image: "/assets/generated/wayanad-hero.dim_800x500.png",
    tagline: "Green Paradise",
    description: "Wildlife sanctuaries and ancient tribal heritage.",
    region: "Kerala",
  },
  {
    name: "Pondicherry",
    slug: "pondicherry",
    image: "/assets/generated/pondicherry-hero.dim_800x500.png",
    tagline: "French Riviera of the East",
    description: "Colonial charm, beaches, and spiritual retreats.",
    region: "Puducherry",
  },
  {
    name: "Rishikesh",
    slug: "rishikesh",
    image: "/assets/generated/rishikesh-hero.dim_800x500.png",
    tagline: "Yoga Capital of the World",
    description: "Adventure sports, ashrams, and the holy Ganges.",
    region: "Uttarakhand",
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    image: "/assets/generated/jaipur.dim_800x500.png",
    tagline: "The Pink City",
    description: "Majestic forts, vibrant bazaars, and royal palaces.",
    region: "Rajasthan",
  },
  {
    name: "Udaipur",
    slug: "udaipur",
    image: "/assets/generated/udaipur.dim_800x500.png",
    tagline: "City of Lakes",
    description: "Romantic lakeside palaces and Rajput grandeur.",
    region: "Rajasthan",
  },
  {
    name: "Shimla",
    slug: "shimla",
    image: "/assets/generated/shimla.dim_800x500.png",
    tagline: "Queen of Hill Stations",
    description: "Colonial architecture, Mall Road, and snow-capped peaks.",
    region: "Himachal Pradesh",
  },
  {
    name: "Manali",
    slug: "manali",
    image: "/assets/generated/manali.dim_800x500.png",
    tagline: "Adventure Hub of the Himalayas",
    description:
      "Snow valleys, river rafting, and breathtaking mountain views.",
    region: "Himachal Pradesh",
  },
  {
    name: "Darjeeling",
    slug: "darjeeling",
    image: "/assets/generated/darjeeling.dim_800x500.png",
    tagline: "Land of Tea & Toy Trains",
    description: "Iconic tea gardens, Toy Train rides, and Himalayan vistas.",
    region: "West Bengal",
  },
  {
    name: "Varanasi",
    slug: "varanasi",
    image: "/assets/generated/varanasi.dim_800x500.png",
    tagline: "Spiritual Capital of India",
    description: "Ancient ghats, sacred temples, and timeless Ganga aarti.",
    region: "Uttar Pradesh",
  },
  {
    name: "Agra",
    slug: "agra",
    image: "/assets/generated/agra.dim_800x500.png",
    tagline: "Home of the Taj Mahal",
    description: "Iconic Mughal monuments and rich architectural heritage.",
    region: "Uttar Pradesh",
  },
  {
    name: "Leh-Ladakh",
    slug: "leh-ladakh",
    image: "/assets/generated/leh-ladakh.dim_800x500.png",
    tagline: "Land of High Passes",
    description: "Dramatic landscapes, ancient monasteries, and starlit skies.",
    region: "Ladakh",
  },
  {
    name: "Andaman Islands",
    slug: "andaman",
    image: "/assets/generated/andaman.dim_800x500.png",
    tagline: "Tropical Island Paradise",
    description: "Crystal-clear waters, coral reefs, and pristine beaches.",
    region: "Andaman & Nicobar Islands",
  },
  {
    name: "Spiti Valley",
    slug: "spiti-valley",
    image: "/assets/generated/spiti-valley.dim_800x500.png",
    tagline: "Cold Desert of the Himalayas",
    description: "Remote monasteries, rugged terrain, and surreal landscapes.",
    region: "Himachal Pradesh",
  },
  {
    name: "Rann of Kutch",
    slug: "rann-of-kutch",
    image: "/assets/generated/rann-of-kutch.dim_800x500.png",
    tagline: "White Desert Wonder",
    description: "Vast salt marshes, vibrant folk culture, and Rann Utsav.",
    region: "Gujarat",
  },
  {
    name: "Alleppey",
    slug: "alleppey",
    image: "/assets/generated/alleppey.dim_800x500.png",
    tagline: "Venice of the East",
    description: "Serene backwaters, houseboat cruises, and lush paddy fields.",
    region: "Kerala",
  },
];

const services = [
  {
    icon: "🚗",
    title: "Outstation Trips",
    desc: "Comfortable rides to any destination across India",
  },
  {
    icon: "🏔️",
    title: "Hill Station Tours",
    desc: "Curated packages to the most scenic hill stations",
  },
  {
    icon: "🏖️",
    title: "Beach Getaways",
    desc: "Relaxing coastal trips with premium vehicles",
  },
  {
    icon: "🛕",
    title: "Pilgrimage Tours",
    desc: "Sacred journeys with experienced local guides",
  },
  {
    icon: "🎒",
    title: "Adventure Trips",
    desc: "Thrilling expeditions for the adventurous soul",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Packages",
    desc: "Tailored family vacations with all amenities",
  },
];

interface StatItem {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
  color: string;
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

interface AnimatedStatProps {
  stat: StatItem;
  active: boolean;
  index: number;
}

function AnimatedStat({ stat, active, index }: AnimatedStatProps) {
  const count = useCountUp(stat.target, 1800, active);

  return (
    <div
      className="flex flex-col items-center gap-3 py-6 px-4"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Icon circle */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${stat.color}`}
      >
        {stat.icon}
      </div>

      {/* Animated number */}
      <div className="font-display text-4xl md:text-5xl font-bold text-primary-foreground tabular-nums">
        {count.toLocaleString()}
        <span className="text-accent">{stat.suffix}</span>
      </div>

      {/* Label */}
      <div className="text-sm md:text-base font-medium text-primary-foreground/80 tracking-wide uppercase">
        {stat.label}
      </div>
    </div>
  );
}

interface PhotoItem {
  id: string;
  url: string;
  name: string;
}

export default function Home() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const stats: StatItem[] = [
    {
      icon: <Smile className="w-7 h-7 text-white" />,
      target: 5000,
      suffix: "+",
      label: "Happy Customers",
      color: "bg-emerald-500",
    },
    {
      icon: <MapPin className="w-7 h-7 text-white" />,
      target: 100,
      suffix: "+",
      label: "Destinations",
      color: "bg-amber-500",
    },
    {
      icon: <CalendarDays className="w-7 h-7 text-white" />,
      target: 10,
      suffix: "+",
      label: "Years Experience",
      color: "bg-emerald-600",
    },
    {
      icon: <Headphones className="w-7 h-7 text-white" />,
      target: 24,
      suffix: "/7",
      label: "Support",
      color: "bg-amber-600",
    },
  ];

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !statsVisible) {
        setStatsVisible(true);
      }
    },
    [statsVisible],
  );

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: PhotoItem[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1400x500.png"
          alt="LAKKI HOLIDAYS Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Your Dream Journey Awaits
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">
            Explore India's most beautiful destinations with LAKKI HOLIDAYS —
            comfortable, affordable, and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919663202989"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              📞 Book Now
            </a>
            <Link
              to="/vehicles"
              className="px-8 py-3 bg-white/20 backdrop-blur text-white border border-white/40 rounded-full font-semibold text-lg hover:bg-white/30 transition-colors"
            >
              View Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="bg-primary relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              stat={stat}
              active={statsVisible}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-2">
          Our Services
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Everything you need for a perfect trip
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-2">
            Popular Destinations
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Handpicked destinations for your next adventure
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                to="/destination/$name"
                params={{ name: dest.slug }}
                className="group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="font-display font-bold text-base sm:text-lg leading-tight">
                      {dest.name}
                    </div>
                    <div className="text-xs opacity-90 hidden sm:block">
                      {dest.tagline}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-primary/80 text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                      {dest.region}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {dest.description}
                  </p>
                  <span className="inline-block mt-2 text-primary text-xs sm:text-sm font-semibold">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Upload Gallery */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-2">
          Share Your Journey
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Upload your travel photos and display them in our gallery frame
        </p>

        {/* Upload Button */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
          >
            <span className="text-lg">📸</span>
            {photos.length === 0 ? "Choose Photos" : "Add More Photos"}
          </button>
          {photos.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {photos.length} photo{photos.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="flex justify-center">
            <div className="w-72 h-72 border-8 border-primary rounded-2xl overflow-hidden bg-muted flex items-center justify-center shadow-card">
              <div className="text-center text-muted-foreground p-6">
                <div className="text-5xl mb-3">📸</div>
                <p className="text-sm font-medium">
                  Upload your travel photos here
                </p>
                <p className="text-xs mt-1 opacity-70">
                  Select multiple photos at once
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Photo Gallery Grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group border-4 border-primary rounded-2xl overflow-hidden shadow-card bg-card"
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* LAKKI HOLIDAYS branding strip */}
                <div className="bg-primary/90 text-primary-foreground text-center text-xs py-1.5 font-semibold tracking-wide">
                  LAKKI HOLIDAYS ✈️
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Remove photo"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Clear all button */}
        {photos.length > 1 && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => {
                for (const p of photos) URL.revokeObjectURL(p.url);
                setPhotos([]);
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Clear all photos
            </button>
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            Why Choose LAKKI HOLIDAYS?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "✅",
                title: "Verified Drivers",
                desc: "All drivers are background-checked and experienced",
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "Competitive rates with no hidden charges",
              },
              {
                icon: "🛡️",
                title: "Safe Travel",
                desc: "Well-maintained vehicles with safety features",
              },
              {
                icon: "⭐",
                title: "5-Star Service",
                desc: "Rated highly by hundreds of happy travelers",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm opacity-80">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact us today and let us plan your perfect trip
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919663202989"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              📞 Call +91 96632 02989
            </a>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
