import { Award, Heart, MapPin, Target, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Passion for Travel",
    desc: "We love what we do. Every trip is planned with genuine care and enthusiasm for creating unforgettable experiences.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safety First",
    desc: "Your safety is our top priority. All vehicles are regularly maintained and our drivers are professionally trained.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Customer Focus",
    desc: "We listen to your needs and tailor every journey to exceed your expectations, from planning to drop-off.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence",
    desc: "We strive for excellence in every aspect — vehicle quality, driver professionalism, and customer service.",
  },
];

const milestones = [
  {
    year: "2013",
    title: "Founded",
    desc: "LAKKI HOLIDAYS was established with a single vehicle and a big dream.",
  },
  {
    year: "2015",
    title: "Fleet Expansion",
    desc: "Grew to 10 vehicles covering major South Indian destinations.",
  },
  {
    year: "2018",
    title: "1000 Customers",
    desc: "Celebrated serving over 1000 happy travelers across India.",
  },
  {
    year: "2020",
    title: "Digital Presence",
    desc: "Launched online booking and expanded to pan-India coverage.",
  },
  {
    year: "2023",
    title: "5000+ Travelers",
    desc: "Reached the milestone of 5000+ satisfied customers.",
  },
  {
    year: "2025",
    title: "Premium Fleet",
    desc: "Upgraded to a premium fleet of 6 vehicle types for all group sizes.",
  },
];

// Import Shield separately since it's used in values
import { Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          About LAKKI HOLIDAYS
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          A decade of creating unforgettable travel experiences across India
        </p>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LAKKI HOLIDAYS was born from a simple belief: every journey should
              be as memorable as the destination. Founded in 2013 in Karnataka,
              we started with a single vehicle and an unwavering commitment to
              customer satisfaction.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Over the years, we've grown into a trusted travel partner for
              thousands of families, friends, and corporate groups. Our fleet
              now includes premium vehicles ranging from comfortable sedans to
              spacious luxury coaches.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, LAKKI HOLIDAYS is synonymous with reliability, comfort, and
              exceptional service across South India and beyond.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="grid grid-cols-2 gap-6 text-center">
              {[
                {
                  value: "10+",
                  label: "Years Experience",
                  icon: <TrendingUp className="w-6 h-6" />,
                },
                {
                  value: "5000+",
                  label: "Happy Travelers",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  value: "12+",
                  label: "Destinations",
                  icon: <MapPin className="w-6 h-6" />,
                },
                {
                  value: "6",
                  label: "Vehicle Types",
                  icon: <Award className="w-6 h-6" />,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Target className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            To provide safe, comfortable, and affordable travel experiences that
            connect people with India's incredible destinations, while
            delivering exceptional service that turns every trip into a
            cherished memory.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-card border border-border rounded-2xl p-6 text-center shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="bg-card border border-border rounded-xl p-5 shadow-card inline-block w-full md:w-auto md:max-w-xs">
                      <div className="text-primary font-bold text-lg">
                        {milestone.year}
                      </div>
                      <div className="font-semibold mb-1">
                        {milestone.title}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {milestone.desc}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background flex-shrink-0 z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
