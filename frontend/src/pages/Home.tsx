import { useNavigate } from '@tanstack/react-router';
import { MapPin, Phone, Star, Users, Car, Award, ArrowRight, CheckCircle } from 'lucide-react';

const destinations = [
  {
    name: 'Coorg',
    slug: 'coorg',
    description: 'The Scotland of India with misty hills and coffee plantations.',
    image: '/assets/generated/tourist-place-1.dim_600x400.png',
    tag: 'Hill Station',
  },
  {
    name: 'Ooty',
    slug: 'ooty',
    description: 'Queen of hill stations with lush tea gardens and cool climate.',
    image: '/assets/generated/tourist-place-2.dim_600x400.png',
    tag: 'Hill Station',
  },
  {
    name: 'Mysore',
    slug: 'mysore',
    description: 'City of palaces, sandalwood, and royal heritage.',
    image: '/assets/generated/tourist-place-3.dim_600x400.png',
    tag: 'Heritage',
  },
  {
    name: 'Goa',
    slug: 'goa',
    description: 'Sun, sand, and sea with vibrant nightlife and Portuguese charm.',
    image: '/assets/generated/tourist-place-4.dim_600x400.png',
    tag: 'Beach',
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    description: "God's Own Country with backwaters, spices, and Ayurveda.",
    image: '/assets/generated/tourist-place-5.dim_600x400.png',
    tag: 'Backwaters',
  },
  {
    name: 'Hampi',
    slug: 'hampi',
    description: 'UNESCO World Heritage Site with ancient Vijayanagara ruins.',
    image: '/assets/generated/tourist-place-6.dim_600x400.png',
    tag: 'Heritage',
  },
  {
    name: 'Munnar',
    slug: 'munnar',
    description: 'Breathtaking tea estates and misty mountain landscapes.',
    image: '/assets/generated/munnar-hero.dim_800x500.png',
    tag: 'Hill Station',
  },
  {
    name: 'Kodaikanal',
    slug: 'kodaikanal',
    description: 'Princess of hill stations with serene lakes and pine forests.',
    image: '/assets/generated/kodaikanal-hero.dim_800x500.png',
    tag: 'Hill Station',
  },
  {
    name: 'Pondicherry',
    slug: 'pondicherry',
    description: 'French colonial charm meets Indian spirituality by the sea.',
    image: '/assets/generated/pondicherry-hero.dim_800x500.png',
    tag: 'Coastal',
  },
  {
    name: 'Wayanad',
    slug: 'wayanad',
    description: 'Lush green forests, wildlife sanctuaries, and tribal culture.',
    image: '/assets/generated/wayanad-hero.dim_800x500.png',
    tag: 'Wildlife',
  },
  {
    name: 'Chikmagalur',
    slug: 'chikmagalur',
    description: 'Coffee land of Karnataka with scenic trekking trails.',
    image: '/assets/generated/chikmagalur-hero.dim_800x500.png',
    tag: 'Adventure',
  },
  {
    name: 'Rishikesh',
    slug: 'rishikesh',
    description: 'Yoga capital of the world on the banks of the holy Ganges.',
    image: '/assets/generated/rishikesh-hero.dim_800x500.png',
    tag: 'Spiritual',
  },
];

const services = [
  { icon: Car, title: 'Premium Vehicles', desc: 'AC sedans, SUVs, and luxury coaches for every group size.' },
  { icon: Users, title: 'Expert Drivers', desc: 'Experienced, courteous drivers who know every route.' },
  { icon: MapPin, title: 'Custom Itineraries', desc: 'Tailor-made tour packages to suit your schedule and budget.' },
  { icon: Award, title: 'Best Price Guarantee', desc: 'Competitive pricing with no hidden charges.' },
];

const tagColors: Record<string, string> = {
  'Hill Station': 'bg-green-100 text-green-800',
  Heritage: 'bg-amber-100 text-amber-800',
  Beach: 'bg-blue-100 text-blue-800',
  Backwaters: 'bg-teal-100 text-teal-800',
  Coastal: 'bg-cyan-100 text-cyan-800',
  Wildlife: 'bg-orange-100 text-orange-800',
  Adventure: 'bg-red-100 text-red-800',
  Spiritual: 'bg-purple-100 text-purple-800',
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[520px] md:h-[600px] overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1400x500.png"
          alt="Lucky Holidays Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl">
              <span className="inline-block bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
                South India's #1 Travel Partner
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Explore India's<br />
                <span className="text-yellow-300">Hidden Gems</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Comfortable, affordable, and memorable travel experiences across South India and beyond.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate({ to: '/contact' })}
                  className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
                >
                  Book Your Trip <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate({ to: '/vehicles' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-green-900 font-bold px-6 py-3 rounded-full transition-colors"
                >
                  View Vehicles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-green-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '500+', label: 'Happy Customers' },
            { value: '50+', label: 'Destinations' },
            { value: '10+', label: 'Years Experience' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-extrabold text-yellow-300">{stat.value}</div>
              <div className="text-sm text-green-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why Choose Lucky Holidays?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We make every journey comfortable, safe, and unforgettable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon size={28} className="text-green-700" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Popular Destinations
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover breathtaking places across South India and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <button
                key={dest.slug}
                onClick={() => navigate({ to: '/destination/$name', params: { name: dest.slug } })}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full ${tagColors[dest.tag] || 'bg-gray-100 text-gray-800'}`}>
                    {dest.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin size={14} className="text-green-600" />
                    <h3 className="font-bold text-foreground text-lg">{dest.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{dest.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-green-700 text-sm font-semibold">
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Travel Smarter with Lucky Holidays
            </h2>
            <p className="text-muted-foreground mb-6">
              From the misty hills of Coorg to the beaches of Goa, we've been crafting perfect travel experiences for over a decade. Our team of passionate travel experts ensures every trip is seamless.
            </p>
            <ul className="space-y-3">
              {[
                '24/7 customer support throughout your journey',
                'Flexible booking and cancellation policies',
                'Handpicked hotels and resorts',
                'Experienced local guides at every destination',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate({ to: '/about' })}
              className="mt-8 bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              Learn About Us <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Star, value: '4.9/5', label: 'Customer Rating' },
              { icon: Users, value: '500+', label: 'Happy Travelers' },
              { icon: MapPin, value: '50+', label: 'Destinations' },
              { icon: Car, value: '20+', label: 'Premium Vehicles' },
            ].map((item) => (
              <div key={item.label} className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                <item.icon size={28} className="text-green-700 mx-auto mb-2" />
                <div className="text-2xl font-extrabold text-green-900">{item.value}</div>
                <div className="text-xs text-green-700 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready for Your Next Adventure?
          </h2>
          <p className="text-green-200 mb-8">
            Call us now or send an inquiry. We'll craft the perfect itinerary just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9663202989"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-3 rounded-full transition-colors"
            >
              <Phone size={18} />
              9663202989
            </a>
            <button
              onClick={() => navigate({ to: '/contact' })}
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 font-bold px-8 py-3 rounded-full transition-colors"
            >
              Send Inquiry
            </button>
          </div>
          <p className="mt-10 text-green-300 text-sm">
            Made with ❤️ by <span className="text-red-400 font-semibold">Swaroop Team</span>
          </p>
        </div>
      </section>
    </main>
  );
}
