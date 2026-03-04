import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

interface TouristSpot {
  name: string;
  category: string;
  description: string;
}

interface DestinationData {
  name: string;
  tagline: string;
  description: string;
  image: string;
  spots: TouristSpot[];
}

const destinationsData: Record<string, DestinationData> = {
  munnar: {
    name: "Munnar",
    tagline: "Tea Gardens & Misty Hills",
    description:
      "Munnar is a hill station in Kerala's Western Ghats, known for its sprawling tea plantations, misty mountains, and cool climate. It's one of South India's most popular tourist destinations.",
    image: "/assets/generated/munnar-hero.dim_800x500.png",
    spots: [
      {
        name: "Eravikulam National Park",
        category: "Nature",
        description:
          "Home to the endangered Nilgiri Tahr and stunning Neelakurinji flowers.",
      },
      {
        name: "Tea Museum",
        category: "Culture",
        description: "Learn about the history of tea cultivation in Munnar.",
      },
      {
        name: "Mattupetty Dam",
        category: "Scenic",
        description:
          "Beautiful reservoir surrounded by tea estates and forests.",
      },
      {
        name: "Top Station",
        category: "Viewpoint",
        description:
          "Highest point in Munnar with panoramic views of the Western Ghats.",
      },
      {
        name: "Attukal Waterfalls",
        category: "Nature",
        description: "Scenic waterfall surrounded by lush greenery.",
      },
      {
        name: "Chinnar Wildlife Sanctuary",
        category: "Wildlife",
        description: "Home to elephants, leopards, and rare flora.",
      },
    ],
  },
  kodaikanal: {
    name: "Kodaikanal",
    tagline: "Princess of Hill Stations",
    description:
      "Kodaikanal is a charming hill station in Tamil Nadu's Palani Hills, famous for its star-shaped lake, lush forests, and pleasant climate year-round.",
    image: "/assets/generated/kodaikanal-hero.dim_800x500.png",
    spots: [
      {
        name: "Kodaikanal Lake",
        category: "Scenic",
        description:
          "Star-shaped artificial lake perfect for boating and cycling.",
      },
      {
        name: "Coaker's Walk",
        category: "Viewpoint",
        description: "Scenic 1km walk with stunning valley views.",
      },
      {
        name: "Bryant Park",
        category: "Nature",
        description:
          "Beautiful botanical garden with exotic plants and flowers.",
      },
      {
        name: "Silver Cascade Falls",
        category: "Nature",
        description:
          "Stunning 180-foot waterfall on the Kodaikanal-Madurai highway.",
      },
      {
        name: "Pillar Rocks",
        category: "Scenic",
        description:
          "Three giant granite boulders rising 400 feet from the ground.",
      },
      {
        name: "Bear Shola Falls",
        category: "Nature",
        description: "Seasonal waterfall in a dense forest area.",
      },
    ],
  },
  chikmagalur: {
    name: "Chikmagalur",
    tagline: "Coffee Land of Karnataka",
    description:
      "Chikmagalur is a hill station in Karnataka known for its coffee estates, misty mountains, and trekking trails. It's the birthplace of coffee cultivation in India.",
    image: "/assets/generated/chikmagalur-hero.dim_800x500.png",
    spots: [
      {
        name: "Mullayanagiri Peak",
        category: "Adventure",
        description:
          "Highest peak in Karnataka at 1930m, perfect for trekking.",
      },
      {
        name: "Baba Budangiri",
        category: "Culture",
        description: "Sacred hills with a Sufi shrine and stunning views.",
      },
      {
        name: "Hebbe Falls",
        category: "Nature",
        description: "Beautiful two-tiered waterfall in a coffee estate.",
      },
      {
        name: "Kudremukh National Park",
        category: "Wildlife",
        description: "Dense forest with diverse flora and fauna.",
      },
      {
        name: "Coffee Estates",
        category: "Culture",
        description:
          "Visit working coffee plantations and learn about coffee processing.",
      },
      {
        name: "Kemmanagundi",
        category: "Scenic",
        description: "Hill station with rose gardens and waterfalls.",
      },
    ],
  },
  wayanad: {
    name: "Wayanad",
    tagline: "Green Paradise",
    description:
      "Wayanad is a lush green district in Kerala's Western Ghats, known for its wildlife sanctuaries, ancient caves, and tribal heritage. A paradise for nature lovers.",
    image: "/assets/generated/wayanad-hero.dim_800x500.png",
    spots: [
      {
        name: "Edakkal Caves",
        category: "History",
        description:
          "Ancient caves with prehistoric rock engravings dating back 6000 years.",
      },
      {
        name: "Chembra Peak",
        category: "Adventure",
        description:
          "Highest peak in Wayanad with a heart-shaped lake near the summit.",
      },
      {
        name: "Wayanad Wildlife Sanctuary",
        category: "Wildlife",
        description:
          "Home to elephants, tigers, leopards, and diverse bird species.",
      },
      {
        name: "Soochipara Falls",
        category: "Nature",
        description: "Three-tiered waterfall surrounded by dense forest.",
      },
      {
        name: "Banasura Sagar Dam",
        category: "Scenic",
        description: "Largest earthen dam in India surrounded by hills.",
      },
      {
        name: "Pookode Lake",
        category: "Scenic",
        description: "Freshwater lake surrounded by evergreen forests.",
      },
    ],
  },
  pondicherry: {
    name: "Pondicherry",
    tagline: "French Riviera of the East",
    description:
      "Pondicherry is a former French colony on India's southeastern coast, known for its colonial architecture, spiritual retreats, pristine beaches, and unique Franco-Tamil culture.",
    image: "/assets/generated/pondicherry-hero.dim_800x500.png",
    spots: [
      {
        name: "Auroville",
        category: "Spiritual",
        description:
          "Experimental township dedicated to human unity and spiritual growth.",
      },
      {
        name: "Sri Aurobindo Ashram",
        category: "Spiritual",
        description: "Famous ashram founded by Sri Aurobindo and The Mother.",
      },
      {
        name: "Promenade Beach",
        category: "Beach",
        description: "Scenic beachfront boulevard perfect for morning walks.",
      },
      {
        name: "French Quarter",
        category: "Culture",
        description:
          "Charming streets with colonial buildings and French cafes.",
      },
      {
        name: "Paradise Beach",
        category: "Beach",
        description: "Secluded beach accessible only by boat.",
      },
      {
        name: "Basilica of the Sacred Heart",
        category: "Heritage",
        description:
          "Beautiful Gothic-style church with stunning stained glass.",
      },
    ],
  },
  rishikesh: {
    name: "Rishikesh",
    tagline: "Yoga Capital of the World",
    description:
      "Rishikesh is a spiritual city in Uttarakhand at the foothills of the Himalayas, famous for yoga, meditation, white-water rafting, and the sacred Ganges River.",
    image: "/assets/generated/rishikesh-hero.dim_800x500.png",
    spots: [
      {
        name: "Laxman Jhula",
        category: "Heritage",
        description:
          "Iconic iron suspension bridge over the Ganges with temple views.",
      },
      {
        name: "Ram Jhula",
        category: "Heritage",
        description: "Another famous suspension bridge connecting two ashrams.",
      },
      {
        name: "Triveni Ghat",
        category: "Spiritual",
        description: "Sacred bathing ghat with evening Ganga Aarti ceremony.",
      },
      {
        name: "Neelkanth Mahadev Temple",
        category: "Temple",
        description: "Ancient Shiva temple in the forest above Rishikesh.",
      },
      {
        name: "White Water Rafting",
        category: "Adventure",
        description: "Thrilling rafting on the Ganges through rapids.",
      },
      {
        name: "Beatles Ashram",
        category: "Culture",
        description: "Abandoned ashram where The Beatles stayed in 1968.",
      },
    ],
  },
  jaipur: {
    name: "Jaipur",
    tagline: "The Pink City",
    description:
      "Jaipur, the capital of Rajasthan, is known as the Pink City for its distinctive terracotta-pink buildings. It's a treasure trove of magnificent forts, opulent palaces, vibrant bazaars, and rich Rajput heritage.",
    image: "/assets/generated/jaipur.dim_800x500.png",
    spots: [
      {
        name: "Amber Fort",
        category: "Heritage",
        description:
          "Majestic hilltop fort with stunning Rajput and Mughal architecture.",
      },
      {
        name: "Hawa Mahal",
        category: "Heritage",
        description:
          "Iconic Palace of Winds with 953 small windows for royal ladies.",
      },
      {
        name: "City Palace",
        category: "Heritage",
        description:
          "Royal palace complex housing museums and royal apartments.",
      },
      {
        name: "Jantar Mantar",
        category: "Culture",
        description:
          "UNESCO World Heritage astronomical observatory built in 1734.",
      },
      {
        name: "Govind Dev Ji Temple",
        category: "Temple",
        description:
          "Famous Krishna temple drawing thousands of devotees daily.",
      },
      {
        name: "Nahargarh Fort",
        category: "Viewpoint",
        description: "Hilltop fort offering panoramic views of Jaipur city.",
      },
    ],
  },
  udaipur: {
    name: "Udaipur",
    tagline: "City of Lakes",
    description:
      "Udaipur, the City of Lakes, is one of Rajasthan's most romantic destinations. Surrounded by the Aravalli Hills, it enchants visitors with shimmering lakes, magnificent palaces, and centuries of royal heritage.",
    image: "/assets/generated/udaipur.dim_800x500.png",
    spots: [
      {
        name: "City Palace",
        category: "Heritage",
        description: "Sprawling palace complex on the banks of Lake Pichola.",
      },
      {
        name: "Lake Pichola",
        category: "Scenic",
        description:
          "Serene artificial lake with island palaces and boat rides.",
      },
      {
        name: "Jag Mandir",
        category: "Heritage",
        description:
          "Island palace on Lake Pichola with stunning architecture.",
      },
      {
        name: "Fateh Sagar Lake",
        category: "Scenic",
        description:
          "Beautiful lake with an island garden and solar observatory.",
      },
      {
        name: "Jagdish Temple",
        category: "Temple",
        description:
          "Magnificent 17th-century temple dedicated to Lord Vishnu.",
      },
      {
        name: "Saheliyon Ki Bari",
        category: "Garden",
        description:
          "Garden of the Maidens with fountains and marble pavilions.",
      },
    ],
  },
  shimla: {
    name: "Shimla",
    tagline: "Queen of Hill Stations",
    description:
      "Shimla, the capital of Himachal Pradesh, was the summer capital of British India. This charming hill station is famous for its colonial architecture, the iconic Mall Road, scenic toy train, and snow-capped Himalayan views.",
    image: "/assets/generated/shimla.dim_800x500.png",
    spots: [
      {
        name: "Mall Road",
        category: "Culture",
        description:
          "Bustling promenade lined with shops, cafes, and colonial buildings.",
      },
      {
        name: "Jakhoo Hill",
        category: "Viewpoint",
        description: "Highest peak in Shimla with a famous Hanuman temple.",
      },
      {
        name: "Kufri",
        category: "Adventure",
        description: "Popular ski resort with stunning Himalayan panoramas.",
      },
      {
        name: "Christ Church",
        category: "Heritage",
        description:
          "Second oldest church in North India with beautiful stained glass.",
      },
      {
        name: "Shimla State Museum",
        category: "Culture",
        description: "Museum showcasing Himachal Pradesh's art and culture.",
      },
      {
        name: "Kalka-Shimla Toy Train",
        category: "Experience",
        description:
          "UNESCO-listed narrow-gauge railway through scenic mountains.",
      },
    ],
  },
  manali: {
    name: "Manali",
    tagline: "Adventure Hub of the Himalayas",
    description:
      "Manali is a high-altitude Himalayan resort town in Himachal Pradesh, a gateway to adventure. From snow-covered Rohtang Pass to the lush Kullu Valley, it offers thrilling activities and breathtaking natural beauty.",
    image: "/assets/generated/manali.dim_800x500.png",
    spots: [
      {
        name: "Rohtang Pass",
        category: "Adventure",
        description:
          "High mountain pass at 3978m with snow activities and stunning views.",
      },
      {
        name: "Solang Valley",
        category: "Adventure",
        description: "Popular valley for skiing, paragliding, and zorbing.",
      },
      {
        name: "Hadimba Temple",
        category: "Temple",
        description:
          "Ancient wooden temple dedicated to Goddess Hadimba in a cedar forest.",
      },
      {
        name: "Beas River",
        category: "Nature",
        description:
          "Scenic river perfect for white-water rafting and riverside walks.",
      },
      {
        name: "Old Manali",
        category: "Culture",
        description:
          "Charming village with cafes, guesthouses, and hippie culture.",
      },
      {
        name: "Naggar Castle",
        category: "Heritage",
        description: "Medieval castle turned heritage hotel with valley views.",
      },
    ],
  },
  darjeeling: {
    name: "Darjeeling",
    tagline: "Land of Tea & Toy Trains",
    description:
      "Darjeeling is a picturesque hill station in West Bengal, famous worldwide for its premium tea, the UNESCO-listed Darjeeling Himalayan Railway Toy Train, and spectacular views of Kanchenjunga.",
    image: "/assets/generated/darjeeling.dim_800x500.png",
    spots: [
      {
        name: "Tiger Hill",
        category: "Viewpoint",
        description:
          "Famous sunrise viewpoint with views of Kanchenjunga and Everest.",
      },
      {
        name: "Darjeeling Tea Estates",
        category: "Culture",
        description:
          "Visit iconic tea gardens and learn about premium tea production.",
      },
      {
        name: "Darjeeling Himalayan Railway",
        category: "Experience",
        description:
          "UNESCO World Heritage Toy Train through scenic mountain terrain.",
      },
      {
        name: "Batasia Loop",
        category: "Scenic",
        description:
          "Spiral railway loop with a war memorial and Himalayan views.",
      },
      {
        name: "Padmaja Naidu Zoo",
        category: "Wildlife",
        description:
          "High-altitude zoo famous for red pandas and snow leopards.",
      },
      {
        name: "Peace Pagoda",
        category: "Spiritual",
        description: "Japanese Buddhist stupa with panoramic Himalayan views.",
      },
    ],
  },
  varanasi: {
    name: "Varanasi",
    tagline: "Spiritual Capital of India",
    description:
      "Varanasi, one of the world's oldest living cities, is the spiritual heart of India. Situated on the banks of the sacred Ganges, it captivates with its ancient ghats, timeless rituals, and profound spiritual energy.",
    image: "/assets/generated/varanasi.dim_800x500.png",
    spots: [
      {
        name: "Dashashwamedh Ghat",
        category: "Spiritual",
        description:
          "Main ghat famous for the spectacular evening Ganga Aarti ceremony.",
      },
      {
        name: "Kashi Vishwanath Temple",
        category: "Temple",
        description: "One of the most sacred Shiva temples in India.",
      },
      {
        name: "Manikarnika Ghat",
        category: "Heritage",
        description:
          "Ancient cremation ghat considered most sacred in Hindu tradition.",
      },
      {
        name: "Sarnath",
        category: "Heritage",
        description:
          "Where Buddha gave his first sermon; ancient Buddhist site.",
      },
      {
        name: "Sankat Mochan Temple",
        category: "Temple",
        description: "Beloved Hanuman temple founded by saint Tulsidas.",
      },
      {
        name: "Ganges Boat Ride",
        category: "Experience",
        description:
          "Sunrise boat ride along the ghats for a magical perspective.",
      },
    ],
  },
  agra: {
    name: "Agra",
    tagline: "Home of the Taj Mahal",
    description:
      "Agra is a city on the banks of the Yamuna River in Uttar Pradesh, home to three UNESCO World Heritage Sites. The city's Mughal legacy is unparalleled, with the iconic Taj Mahal standing as a testament to eternal love.",
    image: "/assets/generated/agra.dim_800x500.png",
    spots: [
      {
        name: "Taj Mahal",
        category: "Heritage",
        description:
          "UNESCO World Heritage Site and one of the Seven Wonders of the World.",
      },
      {
        name: "Agra Fort",
        category: "Heritage",
        description:
          "Massive Mughal fort with palaces, mosques, and audience halls.",
      },
      {
        name: "Fatehpur Sikri",
        category: "Heritage",
        description:
          "Abandoned Mughal capital with stunning red sandstone architecture.",
      },
      {
        name: "Mehtab Bagh",
        category: "Viewpoint",
        description:
          "Garden across the Yamuna offering perfect Taj Mahal sunset views.",
      },
      {
        name: "Itimad-ud-Daulah",
        category: "Heritage",
        description:
          "Baby Taj — a delicate marble mausoleum predating the Taj Mahal.",
      },
      {
        name: "Kinari Bazaar",
        category: "Culture",
        description:
          "Vibrant market famous for marble crafts, leather goods, and sweets.",
      },
    ],
  },
  "leh-ladakh": {
    name: "Leh-Ladakh",
    tagline: "Land of High Passes",
    description:
      "Leh-Ladakh is a high-altitude desert region in northern India, bordering Tibet and Pakistan. Its dramatic moonscape terrain, ancient Buddhist monasteries, pristine lakes, and starlit skies make it one of India's most extraordinary destinations.",
    image: "/assets/generated/leh-ladakh.dim_800x500.png",
    spots: [
      {
        name: "Pangong Lake",
        category: "Scenic",
        description:
          "Stunning high-altitude lake spanning India and China, famous for its blue waters.",
      },
      {
        name: "Nubra Valley",
        category: "Adventure",
        description:
          "Cold desert valley with sand dunes and double-humped Bactrian camels.",
      },
      {
        name: "Thiksey Monastery",
        category: "Temple",
        description:
          "Impressive 12-storey monastery resembling the Potala Palace in Lhasa.",
      },
      {
        name: "Hemis Monastery",
        category: "Temple",
        description:
          "Largest and wealthiest monastery in Ladakh, famous for its annual festival.",
      },
      {
        name: "Khardung La Pass",
        category: "Adventure",
        description: "One of the world's highest motorable passes at 5359m.",
      },
      {
        name: "Magnetic Hill",
        category: "Scenic",
        description:
          "Gravity-defying hill where vehicles appear to roll uphill.",
      },
    ],
  },
  andaman: {
    name: "Andaman Islands",
    tagline: "Tropical Island Paradise",
    description:
      "The Andaman Islands are a breathtaking archipelago in the Bay of Bengal, offering pristine white-sand beaches, crystal-clear turquoise waters, vibrant coral reefs, and rich colonial history at the Cellular Jail.",
    image: "/assets/generated/andaman.dim_800x500.png",
    spots: [
      {
        name: "Radhanagar Beach",
        category: "Beach",
        description:
          "Asia's best beach with powdery white sand and turquoise waters.",
      },
      {
        name: "Cellular Jail",
        category: "Heritage",
        description:
          "Colonial-era prison turned national memorial with light-and-sound show.",
      },
      {
        name: "Elephant Beach",
        category: "Beach",
        description:
          "Pristine beach with excellent snorkeling and coral reefs.",
      },
      {
        name: "Havelock Island",
        category: "Nature",
        description:
          "Most popular island with stunning beaches and diving spots.",
      },
      {
        name: "Neil Island",
        category: "Nature",
        description:
          "Quiet island with natural rock formations and clear waters.",
      },
      {
        name: "Barren Island",
        category: "Adventure",
        description: "India's only active volcano, visible on boat tours.",
      },
    ],
  },
  "spiti-valley": {
    name: "Spiti Valley",
    tagline: "Cold Desert of the Himalayas",
    description:
      "Spiti Valley is a remote cold desert mountain valley in Himachal Pradesh, nestled between India and Tibet. Its stark, otherworldly landscapes, ancient Buddhist monasteries, and traditional villages offer an unparalleled off-the-beaten-path experience.",
    image: "/assets/generated/spiti-valley.dim_800x500.png",
    spots: [
      {
        name: "Key Monastery",
        category: "Temple",
        description:
          "Largest monastery in Spiti Valley perched dramatically on a hilltop.",
      },
      {
        name: "Tabo Monastery",
        category: "Temple",
        description:
          "1000-year-old monastery known as the Ajanta of the Himalayas.",
      },
      {
        name: "Chandratal Lake",
        category: "Scenic",
        description:
          "Crescent-shaped high-altitude lake with stunning reflections.",
      },
      {
        name: "Kibber Village",
        category: "Culture",
        description: "One of the world's highest inhabited villages at 4205m.",
      },
      {
        name: "Kunzum Pass",
        category: "Adventure",
        description:
          "High mountain pass at 4590m connecting Spiti and Lahaul valleys.",
      },
      {
        name: "Pin Valley National Park",
        category: "Wildlife",
        description:
          "Home to snow leopards, ibex, and rare Himalayan wildlife.",
      },
    ],
  },
  "rann-of-kutch": {
    name: "Rann of Kutch",
    tagline: "White Desert Wonder",
    description:
      "The Rann of Kutch is the world's largest salt desert, located in Gujarat. This vast white expanse transforms into a magical landscape under the full moon, and comes alive during the famous Rann Utsav festival celebrating Kutchi culture.",
    image: "/assets/generated/rann-of-kutch.dim_800x500.png",
    spots: [
      {
        name: "White Rann",
        category: "Scenic",
        description:
          "Vast salt desert stretching to the horizon, magical under moonlight.",
      },
      {
        name: "Rann Utsav",
        category: "Culture",
        description:
          "Annual festival celebrating Kutchi music, dance, crafts, and cuisine.",
      },
      {
        name: "Kalo Dungar",
        category: "Viewpoint",
        description: "Highest point in Kutch with panoramic views of the Rann.",
      },
      {
        name: "Dholavira",
        category: "Heritage",
        description: "UNESCO World Heritage Harappan archaeological site.",
      },
      {
        name: "Mandvi Beach",
        category: "Beach",
        description: "Scenic beach with a historic shipbuilding yard.",
      },
      {
        name: "Kutch Museum",
        category: "Culture",
        description:
          "Oldest museum in Gujarat showcasing Kutchi art and artifacts.",
      },
    ],
  },
  alleppey: {
    name: "Alleppey",
    tagline: "Venice of the East",
    description:
      "Alleppey (Alappuzha) in Kerala is famous for its enchanting network of backwater canals, serene lagoons, and lush paddy fields. A houseboat cruise through its waterways is one of India's most iconic travel experiences.",
    image: "/assets/generated/alleppey.dim_800x500.png",
    spots: [
      {
        name: "Alleppey Backwaters",
        category: "Nature",
        description:
          "Iconic network of canals, lakes, and lagoons perfect for houseboat cruises.",
      },
      {
        name: "Alappuzha Beach",
        category: "Beach",
        description: "Scenic beach with a historic pier and lighthouse.",
      },
      {
        name: "Vembanad Lake",
        category: "Scenic",
        description:
          "Largest lake in Kerala, famous for the Nehru Trophy Boat Race.",
      },
      {
        name: "Marari Beach",
        category: "Beach",
        description:
          "Pristine, uncrowded beach with golden sands and coconut groves.",
      },
      {
        name: "Krishnapuram Palace",
        category: "Heritage",
        description: "18th-century palace with Kerala murals and a museum.",
      },
      {
        name: "Pathiramanal Island",
        category: "Nature",
        description:
          "Tiny island in Vembanad Lake, a haven for migratory birds.",
      },
    ],
  },
};

const categoryColors: Record<string, string> = {
  Nature: "bg-green-100 text-green-800",
  Culture: "bg-amber-100 text-amber-800",
  Scenic: "bg-blue-100 text-blue-800",
  Viewpoint: "bg-purple-100 text-purple-800",
  Wildlife: "bg-orange-100 text-orange-800",
  Adventure: "bg-red-100 text-red-800",
  History: "bg-yellow-100 text-yellow-800",
  Spiritual: "bg-indigo-100 text-indigo-800",
  Beach: "bg-cyan-100 text-cyan-800",
  Heritage: "bg-rose-100 text-rose-800",
  Temple: "bg-pink-100 text-pink-800",
  Experience: "bg-teal-100 text-teal-800",
  Garden: "bg-lime-100 text-lime-800",
};

export default function Destination() {
  const params = useParams({ strict: false });
  const name = (params as Record<string, string>).name ?? "";
  const destination = destinationsData[name];

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🗺️</div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Destination Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find information about this destination.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const categories = [...new Set(destination.spots.map((s) => s.category))];

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-3 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            {destination.name}
          </h1>
          <p className="text-lg opacity-90 mt-1">{destination.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {destination.description}
        </p>
      </section>

      {/* Tourist Spots by Category */}
      <section className="pb-16 px-4 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl font-bold mb-8">
          Top Places to Visit
        </h2>
        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  categoryColors[category] ?? "bg-muted text-muted-foreground"
                }`}
              >
                {category}
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.spots
                .filter((s) => s.category === category)
                .map((spot) => (
                  <div
                    key={spot.name}
                    className="bg-card border border-border rounded-xl p-4 hover:shadow-card transition-shadow"
                  >
                    <h4 className="font-semibold mb-1">{spot.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {spot.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* Booking CTA */}
      <section className="py-12 px-4 bg-primary text-primary-foreground text-center">
        <h2 className="font-display text-2xl font-bold mb-3">
          Plan Your Trip to {destination.name}
        </h2>
        <p className="opacity-80 mb-6">
          Let LAKKI HOLIDAYS arrange a comfortable and memorable journey for you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+919663202989"
            className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            📞 Book Now
          </a>
          <Link
            to="/contact"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            Send Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
