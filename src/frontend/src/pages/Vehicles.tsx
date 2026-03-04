import { useCallback, useRef, useState } from "react";

interface Vehicle {
  name: string;
  capacity: string;
  features: string[];
  image: string;
  description: string;
}

const vehicles: Vehicle[] = [
  {
    name: "Maruti Dzire / Honda Amaze",
    capacity: "4+1 Seater",
    features: ["AC", "Music System", "Fuel Efficient", "Comfortable"],
    image: "/assets/generated/sedan-4plus1-360.dim_800x500.png",
    description:
      "Compact sedan ideal for small families and couple trips — smooth, affordable, and comfortable.",
  },
  {
    name: "Toyota Innova Crysta",
    capacity: "6-7 Seater",
    features: ["AC", "Music System", "GPS", "Comfortable Seats"],
    image: "/assets/generated/innova-crysta-360.dim_800x500.png",
    description: "Premium MPV perfect for family trips and corporate travel.",
  },
  {
    name: "Toyota Fortuner",
    capacity: "7 Seater",
    features: ["AC", "4WD", "Sunroof", "Premium Interior"],
    image: "/assets/generated/fortuner-360.dim_800x500.png",
    description: "Luxury SUV for those who want to travel in style.",
  },
  {
    name: "Maruti Suzuki Ertiga",
    capacity: "6-7 Seater",
    features: ["AC", "Music System", "Fuel Efficient", "Spacious"],
    image: "/assets/generated/ertiga-360.dim_800x500.png",
    description: "Economical and spacious MPV for budget-friendly trips.",
  },
  {
    name: "Tempo Traveller",
    capacity: "12-14 Seater",
    features: ["AC", "Push-back Seats", "Music System", "Large Luggage Space"],
    image: "/assets/generated/tempo-traveller-360.dim_800x500.png",
    description: "Ideal for group tours and corporate outings.",
  },
  {
    name: "Force Traveller",
    capacity: "17 Seater",
    features: ["AC", "Comfortable Seats", "GPS", "First Aid Kit"],
    image: "/assets/generated/force-traveller-360.dim_800x500.png",
    description: "Spacious van for large group travel.",
  },
  {
    name: "Luxury Coach",
    capacity: "35-45 Seater",
    features: ["AC", "Reclining Seats", "Entertainment System", "Restroom"],
    image: "/assets/generated/luxury-coach-360.dim_800x500.png",
    description: "Premium coach for large groups and long-distance travel.",
  },
];

interface ViewerState {
  angle: number;
  isDragging: boolean;
  startX: number;
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [show360, setShow360] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ViewerState>({
    angle: 0,
    isDragging: false,
    startX: 0,
  });
  const [angle, setAngle] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    stateRef.current.isDragging = true;
    stateRef.current.startX = e.clientX;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stateRef.current.isDragging) return;
    const delta = e.clientX - stateRef.current.startX;
    stateRef.current.startX = e.clientX;
    const newAngle = (stateRef.current.angle + delta * 0.5) % 360;
    stateRef.current.angle = newAngle;
    setAngle(Math.round(newAngle));
  }, []);

  const handleMouseUp = useCallback(() => {
    stateRef.current.isDragging = false;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.touches[0].clientX;
    },
    [],
  );

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!stateRef.current.isDragging) return;
    const delta = e.touches[0].clientX - stateRef.current.startX;
    stateRef.current.startX = e.touches[0].clientX;
    const newAngle = (stateRef.current.angle + delta * 0.5) % 360;
    stateRef.current.angle = newAngle;
    setAngle(Math.round(newAngle));
  }, []);

  const handleTouchEnd = useCallback(() => {
    stateRef.current.isDragging = false;
  }, []);

  const rotateLeft = () => {
    const newAngle = (stateRef.current.angle - 30) % 360;
    stateRef.current.angle = newAngle;
    setAngle(Math.round(newAngle));
  };

  const rotateRight = () => {
    const newAngle = (stateRef.current.angle + 30) % 360;
    stateRef.current.angle = newAngle;
    setAngle(Math.round(newAngle));
  };

  const displayAngle = ((angle % 360) + 360) % 360;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card transition-shadow">
      {/* Image / 360 Viewer */}
      <div className="relative h-52 bg-muted overflow-hidden">
        {show360 ? (
          <div
            ref={viewerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={vehicle.image}
              alt={`${vehicle.name} 360 view`}
              className="w-full h-full object-cover pointer-events-none"
              style={{ transform: `rotateY(${displayAngle}deg)` }}
              draggable={false}
            />
            {/* Angle indicator */}
            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              {displayAngle}°
            </div>
            {/* Arrow controls */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
              <button
                type="button"
                onClick={rotateLeft}
                className="bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={rotateRight}
                className="bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
              >
                ▶
              </button>
            </div>
          </div>
        ) : (
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        )}
        {/* 360 Toggle */}
        <button
          type="button"
          onClick={() => setShow360(!show360)}
          className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1 rounded-full transition-colors font-medium"
        >
          {show360 ? "📷 Photo" : "🔄 360°"}
        </button>
        {/* LAKKI HOLIDAYS sticker */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none z-10">
          <div
            style={{
              background: "linear-gradient(135deg, #ff6b00 0%, #ffcc00 100%)",
              border: "2.5px solid #fff",
              borderRadius: "8px",
              padding: "4px 14px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.45)",
              transform: "rotate(-8deg)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontWeight: 900,
                fontSize: "15px",
                color: "#1a1a1a",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                textShadow: "0 1px 2px rgba(255,255,255,0.4)",
                fontFamily: "Arial Black, Arial, sans-serif",
              }}
            >
              LAKKI HOLIDAYS
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-lg">{vehicle.name}</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            {vehicle.capacity}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {vehicle.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle.features.map((feature) => (
            <span
              key={feature}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>
        <a
          href="tel:+919663202989"
          className="block w-full text-center py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Book This Vehicle
        </a>
      </div>
    </div>
  );
}

export default function Vehicles() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-3">Our Fleet</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose from our wide range of well-maintained vehicles for your next
          journey. All vehicles are AC-equipped and driven by experienced
          professionals.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.name} vehicle={vehicle} />
        ))}
      </div>
      <div className="mt-12 text-center bg-primary/5 border border-primary/20 rounded-2xl p-8">
        <h2 className="font-display text-2xl font-bold mb-3">
          Need a Custom Vehicle?
        </h2>
        <p className="text-muted-foreground mb-6">
          We can arrange special vehicles for weddings, corporate events, and
          large group travel.
        </p>
        <a
          href="tel:+919663202989"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          📞 Call for Custom Booking
        </a>
      </div>
    </div>
  );
}
