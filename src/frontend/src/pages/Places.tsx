import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

const places = [
  {
    id: 1,
    name: "Munnar",
    location: "Kerala",
    tag: "Hill Station",
    description:
      "Breathtaking tea gardens and misty mountains in the Western Ghats.",
    image: "/assets/generated/tourist-place-1.dim_600x400.png",
  },
  {
    id: 2,
    name: "Kodaikanal",
    location: "Tamil Nadu",
    tag: "Hill Station",
    description:
      "The Princess of Hill Stations with a star-shaped lake and eucalyptus forests.",
    image: "/assets/generated/tourist-place-2.dim_600x400.png",
  },
  {
    id: 3,
    name: "Chikmagalur",
    location: "Karnataka",
    tag: "Coffee Land",
    description:
      "Karnataka's coffee country with misty peaks and dense forests.",
    image: "/assets/generated/tourist-place-3.dim_600x400.png",
  },
  {
    id: 4,
    name: "Wayanad",
    location: "Kerala",
    tag: "Wildlife",
    description:
      "Lush green district with ancient caves and wildlife sanctuaries.",
    image: "/assets/generated/tourist-place-4.dim_600x400.png",
  },
  {
    id: 5,
    name: "Pondicherry",
    location: "Puducherry",
    tag: "Beach & Heritage",
    description:
      "French colonial charm meets Tamil culture on the Coromandel Coast.",
    image: "/assets/generated/tourist-place-5.dim_600x400.png",
  },
  {
    id: 6,
    name: "Rishikesh",
    location: "Uttarakhand",
    tag: "Spiritual",
    description:
      "The Yoga Capital of the World on the banks of the sacred Ganges.",
    image: "/assets/generated/tourist-place-6.dim_600x400.png",
  },
];

export default function Places() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="bg-primary text-primary-foreground py-16 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Tourist Places
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Explore India's most beautiful destinations with LAKKI HOLIDAYS
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                  {place.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {place.location}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  {place.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground text-sm">
          Made with ❤️ by SWAROOP TEAM
        </div>
      </div>
    </div>
  );
}
