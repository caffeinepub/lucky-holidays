import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Building2, Waves, Mountain, Coffee, Hotel, Church, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TouristSpot {
  name: string;
  description: string;
}

interface DestinationCategory {
  temples?: TouristSpot[];
  ghatRoads?: TouristSpot[];
  beaches?: TouristSpot[];
  rivers?: TouristSpot[];
  hotels?: TouristSpot[];
  hillStations?: TouristSpot[];
  cafes?: TouristSpot[];
  viewpoints?: TouristSpot[];
}

interface DestinationData {
  name: string;
  slug: string;
  tagline: string;
  state: string;
  description: string;
  image: string;
  categories: DestinationCategory;
}

const destinationData: DestinationData[] = [
  {
    name: 'Coorg',
    slug: 'coorg',
    tagline: 'Scotland of India',
    state: 'Karnataka',
    description: 'Coorg (Kodagu) is a lush hill district in Karnataka, famous for its coffee and spice plantations, misty mountains, and rich Kodava culture.',
    image: '/assets/generated/tourist-place-1.dim_600x400.png',
    categories: {
      viewpoints: [
        { name: 'Raja\'s Seat', description: 'A scenic garden and viewpoint offering panoramic views of the misty valleys and sunset.' },
        { name: 'Mandalpatti Peak', description: 'A remote hilltop accessible by jeep, offering stunning views above the clouds.' },
        { name: 'Tadiandamol Peak', description: 'The highest peak in Coorg, perfect for trekking with breathtaking views.' },
        { name: 'Pushpagiri Peak', description: 'A challenging trek rewarding with spectacular views of the Western Ghats.' },
      ],
      temples: [
        { name: 'Omkareshwara Temple', description: 'A unique temple blending Islamic and Gothic architecture, dedicated to Lord Shiva.' },
        { name: 'Talacauvery Temple', description: 'The sacred origin of the Cauvery River, a major pilgrimage site.' },
        { name: 'Bhagamandala Temple', description: 'A beautiful temple at the confluence of three rivers, known for its Dravidian architecture.' },
        { name: 'Igguthappa Temple', description: 'An ancient temple dedicated to the rain god, revered by the Kodava community.' },
      ],
      rivers: [
        { name: 'Cauvery River', description: 'The sacred river originating from Talacauvery, offering rafting and fishing experiences.' },
        { name: 'Harangi River', description: 'A serene river ideal for picnics and nature walks along its banks.' },
        { name: 'Lakshmana Tirtha', description: 'A tributary of Cauvery known for its crystal-clear waters and scenic surroundings.' },
      ],
      hillStations: [
        { name: 'Madikeri Town', description: 'The main hill town of Coorg with colonial-era buildings and a pleasant climate.' },
        { name: 'Virajpet', description: 'A charming town surrounded by coffee estates and cardamom plantations.' },
        { name: 'Somwarpet', description: 'A scenic hill town known for its coffee and pepper plantations.' },
      ],
      hotels: [
        { name: 'Taj Madikeri Resort & Spa', description: 'A luxury resort nestled in the hills offering world-class amenities and stunning views.' },
        { name: 'Orange County Resort', description: 'An award-winning eco-resort set amidst coffee and spice plantations.' },
        { name: 'Coorg Wilderness Resort', description: 'A boutique resort offering an immersive nature experience in the heart of Coorg.' },
        { name: 'Club Mahindra Madikeri', description: 'A comfortable resort with modern amenities and beautiful garden views.' },
      ],
      cafes: [
        { name: 'Coorg Coffee Cured', description: 'A charming café serving freshly brewed estate coffee and local Kodava snacks.' },
        { name: 'The Planter\'s Café', description: 'A heritage café inside a colonial bungalow serving filter coffee and homemade cakes.' },
        { name: 'Café Coorg', description: 'A popular spot for travelers offering local cuisine and aromatic coffee blends.' },
      ],
    },
  },
  {
    name: 'Ooty',
    slug: 'ooty',
    tagline: 'Queen of Hill Stations',
    state: 'Tamil Nadu',
    description: 'Ooty (Udhagamandalam) is a picturesque hill station in the Nilgiri Hills, famous for its tea gardens, toy train, and colonial heritage.',
    image: '/assets/generated/tourist-place-2.dim_600x400.png',
    categories: {
      viewpoints: [
        { name: 'Doddabetta Peak', description: 'The highest peak in the Nilgiris at 2,637m, offering panoramic views of the surrounding hills.' },
        { name: 'Lamb\'s Rock', description: 'A scenic cliff offering stunning views of the Coimbatore plains and Coonoor valley.' },
        { name: 'Needle Rock Viewpoint', description: 'A dramatic viewpoint with a needle-shaped rock formation and valley views.' },
        { name: 'Kodanad Viewpoint', description: 'Offers breathtaking views of the Moyar River valley and surrounding forests.' },
      ],
      temples: [
        { name: 'Elk Hill Murugan Temple', description: 'A hilltop temple dedicated to Lord Murugan with panoramic views of Ooty town.' },
        { name: 'St. Stephen\'s Church', description: 'One of the oldest churches in the Nilgiris, built in 1829 with colonial architecture.' },
        { name: 'Maruthamalai Temple', description: 'A famous Murugan temple on a hilltop accessible by steps or ropeway.' },
      ],
      hillStations: [
        { name: 'Coonoor', description: 'A charming hill station near Ooty known for Nilgiri tea and the Sim\'s Park.' },
        { name: 'Kotagiri', description: 'The oldest hill station in the Nilgiris with a pleasant climate and scenic views.' },
        { name: 'Wellington', description: 'A small cantonment town near Coonoor with beautiful colonial bungalows.' },
      ],
      rivers: [
        { name: 'Pykara River', description: 'A scenic river with a beautiful waterfall and boating facilities nearby.' },
        { name: 'Avalanche Lake', description: 'A serene reservoir surrounded by eucalyptus forests, ideal for trout fishing.' },
      ],
      hotels: [
        { name: 'Savoy Hotel', description: 'A heritage hotel established in 1829, offering colonial charm and modern comforts.' },
        { name: 'Sterling Ooty Fern Hill', description: 'A luxury resort in a heritage property with stunning garden views.' },
        { name: 'The Nilgiris Nest', description: 'A cozy boutique hotel offering warm hospitality and beautiful hill views.' },
        { name: 'Hotel Lakeview', description: 'A comfortable hotel overlooking the Ooty Lake with easy access to attractions.' },
      ],
      cafes: [
        { name: 'Sidewalk Café', description: 'A popular café known for its homemade chocolates, pastries, and hot beverages.' },
        { name: 'Café Coffee Day (Ooty Lake)', description: 'A scenic café by the lake perfect for enjoying coffee with a view.' },
        { name: 'The Nilgiri Café', description: 'A charming café serving Nilgiri tea, local snacks, and continental breakfast.' },
        { name: 'Willy\'s Coffee Pub', description: 'A cozy pub-style café popular for its warm ambiance and variety of coffees.' },
      ],
    },
  },
  {
    name: 'Mysore',
    slug: 'mysore',
    tagline: 'City of Palaces',
    state: 'Karnataka',
    description: 'Mysore is a royal city in Karnataka, renowned for its magnificent palaces, vibrant Dasara festival, silk sarees, and sandalwood products.',
    image: '/assets/generated/tourist-place-3.dim_600x400.png',
    categories: {
      viewpoints: [
        { name: 'Chamundi Hill', description: 'A sacred hill offering panoramic views of Mysore city and the surrounding plains.' },
        { name: 'Lalitha Mahal Palace View', description: 'The second largest palace in Mysore offering stunning views of the city.' },
        { name: 'KRS Dam Viewpoint', description: 'A scenic viewpoint overlooking the Krishnarajasagara reservoir and Brindavan Gardens.' },
      ],
      temples: [
        { name: 'Chamundeshwari Temple', description: 'A famous temple atop Chamundi Hill dedicated to Goddess Chamundeshwari, the patron deity of Mysore.' },
        { name: 'Sri Ranganathaswamy Temple', description: 'An ancient Vaishnava temple on Srirangapatna island with beautiful Dravidian architecture.' },
        { name: 'Nanjangud Temple', description: 'One of the most important Shiva temples in Karnataka, known as Dakshina Kashi.' },
        { name: 'Somnathpur Temple', description: 'A stunning 13th-century Hoysala temple with intricate stone carvings.' },
      ],
      hotels: [
        { name: 'Radisson Blu Plaza Hotel', description: 'A luxury hotel in the heart of Mysore with world-class amenities.' },
        { name: 'Lalitha Mahal Palace Hotel', description: 'A heritage palace hotel offering a royal experience with colonial grandeur.' },
        { name: 'The Windflower Resort & Spa', description: 'A serene resort offering Ayurvedic treatments and beautiful garden settings.' },
        { name: 'Hotel Roopa', description: 'A well-located budget hotel popular among travelers for its comfort and value.' },
      ],
      cafes: [
        { name: 'Depth N Green', description: 'A popular café known for its healthy menu, fresh juices, and cozy ambiance.' },
        { name: 'Café Coffee Day (Mysore Palace)', description: 'A scenic café near the palace, perfect for a coffee break after sightseeing.' },
        { name: 'The Old House', description: 'A heritage café in a colonial building serving filter coffee and local snacks.' },
        { name: 'Vinayaka Mylari', description: 'A legendary breakfast spot famous for its soft idlis and aromatic filter coffee.' },
      ],
      rivers: [
        { name: 'Cauvery River (KRS)', description: 'The Krishnarajasagara dam on the Cauvery River with the famous Brindavan Gardens.' },
        { name: 'Kabini River', description: 'A scenic river near Mysore flowing through the Nagarhole forest, ideal for wildlife safaris.' },
      ],
    },
  },
  {
    name: 'Goa',
    slug: 'goa',
    tagline: 'Pearl of the Orient',
    state: 'Goa',
    description: 'Goa is India\'s smallest state, famous for its stunning beaches, Portuguese colonial heritage, vibrant nightlife, and delicious seafood cuisine.',
    image: '/assets/generated/tourist-place-4.dim_600x400.png',
    categories: {
      viewpoints: [
        { name: 'Aguada Fort', description: 'A 17th-century Portuguese fort offering stunning views of the Arabian Sea.' },
        { name: 'Chapora Fort', description: 'A hilltop fort made famous by Bollywood, offering panoramic views of Vagator Beach.' },
        { name: 'Cabo de Rama Fort', description: 'A scenic fort on a cliff with breathtaking views of the coastline.' },
        { name: 'Dudhsagar Falls Viewpoint', description: 'A spectacular viewpoint of the four-tiered Dudhsagar waterfall in the Western Ghats.' },
      ],
      beaches: [
        { name: 'Baga Beach', description: 'A lively beach known for water sports, beach shacks, and vibrant nightlife.' },
        { name: 'Calangute Beach', description: 'The largest and most popular beach in Goa, known as the "Queen of Beaches".' },
        { name: 'Anjuna Beach', description: 'A bohemian beach famous for its flea market, trance parties, and rocky coves.' },
        { name: 'Palolem Beach', description: 'A crescent-shaped paradise beach in South Goa, perfect for swimming and kayaking.' },
        { name: 'Vagator Beach', description: 'A scenic beach with red cliffs, known for its dramatic landscape and sunset views.' },
      ],
      temples: [
        { name: 'Shri Mangueshi Temple', description: 'One of the most visited temples in Goa, dedicated to Lord Manguesh (Shiva).' },
        { name: 'Shri Shantadurga Temple', description: 'A famous temple dedicated to Goddess Shantadurga, known for its unique architecture.' },
        { name: 'Basilica of Bom Jesus', description: 'A UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier.' },
      ],
      hotels: [
        { name: 'Taj Exotica Resort & Spa', description: 'A luxury beachfront resort in South Goa offering world-class amenities.' },
        { name: 'The Leela Goa', description: 'An iconic luxury resort set on a private beach with lagoons and lush gardens.' },
        { name: 'Alila Diwa Goa', description: 'A boutique luxury hotel inspired by Goan architecture with stunning paddy field views.' },
        { name: 'Zostel Goa', description: 'A popular backpacker hostel known for its social atmosphere and beach proximity.' },
      ],
      cafes: [
        { name: 'Artjuna Café', description: 'A bohemian café in Anjuna with a garden setting, healthy food, and artisan products.' },
        { name: 'Infantaria Café', description: 'A legendary Goan café known for its croissants, pastries, and local breakfast.' },
        { name: 'Café Chocolatti', description: 'A charming café in Panjim famous for its handmade chocolates and desserts.' },
        { name: 'The Black Sheep Bistro', description: 'A trendy café-restaurant in Panjim known for its innovative Goan fusion cuisine.' },
      ],
      rivers: [
        { name: 'Mandovi River', description: 'The main river of Goa, famous for evening cruises with cultural performances.' },
        { name: 'Zuari River', description: 'The second largest river in Goa, offering scenic boat rides and mangrove tours.' },
      ],
    },
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    tagline: "God's Own Country",
    state: 'Kerala',
    description: 'Kerala is a tropical paradise on India\'s southwestern coast, known for its backwaters, Ayurveda, spice gardens, and rich cultural heritage.',
    image: '/assets/generated/tourist-place-5.dim_600x400.png',
    categories: {
      viewpoints: [
        { name: 'Munnar Tea Gardens Viewpoint', description: 'Sweeping views of endless tea estates rolling across the Munnar hills.' },
        { name: 'Vagamon Meadows', description: 'Lush green meadows and pine forests offering stunning panoramic views.' },
        { name: 'Ponmudi Hill Station', description: 'A scenic hill station near Thiruvananthapuram with winding roads and valley views.' },
        { name: 'Ranipuram Peak', description: 'A remote hilltop in Kasaragod offering spectacular views of the Western Ghats.' },
      ],
      temples: [
        { name: 'Padmanabhaswamy Temple', description: 'One of the wealthiest temples in the world, dedicated to Lord Vishnu in Thiruvananthapuram.' },
        { name: 'Guruvayur Temple', description: 'One of the most important Vishnu temples in Kerala, known as the Dwarka of the South.' },
        { name: 'Sabarimala Temple', description: 'A famous pilgrimage site dedicated to Lord Ayyappa, attracting millions of devotees.' },
        { name: 'Thrissur Pooram Temple', description: 'The site of Kerala\'s most spectacular temple festival with elephant processions.' },
      ],
      beaches: [
        { name: 'Kovalam Beach', description: 'A crescent-shaped beach near Thiruvananthapuram, famous for Ayurvedic resorts.' },
        { name: 'Varkala Beach', description: 'A dramatic cliff beach with mineral springs and a bohemian atmosphere.' },
        { name: 'Cherai Beach', description: 'A serene beach near Kochi known for its calm waters and Chinese fishing nets.' },
        { name: 'Marari Beach', description: 'A pristine, uncrowded beach perfect for relaxation and Ayurvedic treatments.' },
      ],
      rivers: [
        { name: 'Periyar River', description: 'Kerala\'s longest river flowing through the Periyar Tiger Reserve, ideal for boat safaris.' },
        { name: 'Pamba River', description: 'A sacred river in Kerala, the site of the famous Aranmula Boat Race.' },
        { name: 'Chaliyar River', description: 'A scenic river in Malappuram known for its clean waters and riverside camping.' },
      ],
      hillStations: [
        { name: 'Munnar', description: 'A stunning hill station with tea estates, waterfalls, and the rare Neelakurinji flowers.' },
        { name: 'Wayanad', description: 'A green paradise with wildlife sanctuaries, tribal culture, and misty mountains.' },
        { name: 'Thekkady', description: 'Home to the Periyar Wildlife Sanctuary, famous for elephant sightings and spice tours.' },
      ],
      hotels: [
        { name: 'Kumarakom Lake Resort', description: 'A luxury heritage resort on the banks of Vembanad Lake with traditional Kerala architecture.' },
        { name: 'Taj Green Cove Resort', description: 'A luxury resort in Kovalam offering stunning sea views and Ayurvedic treatments.' },
        { name: 'Spice Village Thekkady', description: 'An eco-resort in Thekkady offering an authentic Kerala experience amidst spice gardens.' },
      ],
      cafes: [
        { name: 'Kashi Art Café', description: 'A legendary café in Fort Kochi known for its art gallery, breakfast, and filter coffee.' },
        { name: 'Teapot Café', description: 'A charming café in Fort Kochi with an extensive tea menu and colonial ambiance.' },
        { name: 'Café Arabi', description: 'A popular café in Kozhikode serving authentic Malabar cuisine and strong black tea.' },
      ],
    },
  },
  {
    name: 'Hampi',
    slug: 'hampi',
    tagline: 'Land of Ruins',
    state: 'Karnataka',
    description: 'Hampi is a UNESCO World Heritage Site, the former capital of the Vijayanagara Empire, featuring stunning ruins of temples, palaces, and bazaars.',
    image: '/assets/generated/tourist-place-6.dim_600x400.png',
    categories: {
      viewpoints: [
        { name: 'Matanga Hill', description: 'The highest point in Hampi offering a 360-degree view of the entire ruins and boulder landscape.' },
        { name: 'Hemakuta Hill', description: 'A hilltop with ancient temples offering beautiful sunset views over the ruins.' },
        { name: 'Anjaneya Hill', description: 'The birthplace of Lord Hanuman, offering panoramic views of the Tungabhadra River.' },
        { name: 'Malyavanta Hill', description: 'A sacred hill with a Raghunatha temple and stunning views of the surrounding landscape.' },
      ],
      temples: [
        { name: 'Virupaksha Temple', description: 'The main functioning temple in Hampi, dedicated to Lord Shiva, dating back to the 7th century.' },
        { name: 'Vittala Temple', description: 'Famous for its iconic stone chariot and musical pillars, a masterpiece of Vijayanagara architecture.' },
        { name: 'Hazara Rama Temple', description: 'A royal temple with exquisite bas-relief carvings depicting scenes from the Ramayana.' },
        { name: 'Achyutaraya Temple', description: 'A large temple complex dedicated to Lord Vishnu with beautiful sculptures.' },
        { name: 'Lotus Mahal', description: 'An elegant pavilion blending Hindu and Islamic architectural styles in the royal enclosure.' },
      ],
      rivers: [
        { name: 'Tungabhadra River', description: 'The sacred river flowing through Hampi, ideal for coracle boat rides and sunset views.' },
        { name: 'Tungabhadra Dam', description: 'A major dam on the Tungabhadra River with beautiful gardens and a light show.' },
      ],
      hotels: [
        { name: 'Evolve Back Hampi', description: 'A luxury resort inspired by the Vijayanagara Empire, offering an immersive heritage experience.' },
        { name: 'Hampi\'s Boulders', description: 'A unique eco-resort built among giant boulders on the banks of the Tungabhadra.' },
        { name: 'Kishkinda Heritage Resort', description: 'A comfortable resort offering traditional Karnataka hospitality near the ruins.' },
        { name: 'Mowgli Guest House', description: 'A popular budget guesthouse in Virupapur Gadde known for its riverside location.' },
      ],
      cafes: [
        { name: 'Mango Tree Restaurant', description: 'A legendary open-air café under a mango tree on the Tungabhadra riverbank.' },
        { name: 'Laughing Buddha', description: 'A popular café in Virupapur Gadde known for its relaxed vibe and river views.' },
        { name: 'Gopi Rooftop Restaurant', description: 'A rooftop café offering views of the Virupaksha Temple and local Karnataka cuisine.' },
      ],
      ghatRoads: [
        { name: 'Hampi Bazaar Ghat', description: 'The main ghat near Virupaksha Temple where pilgrims take holy dips in the Tungabhadra.' },
        { name: 'Chakratirtha Ghat', description: 'A sacred ghat believed to be the spot where Lord Vishnu\'s Sudarshana Chakra fell.' },
        { name: 'Kodanda Rama Ghat', description: 'A peaceful ghat near the Kodanda Rama Temple with scenic river views.' },
      ],
    },
  },
  {
    name: 'Munnar',
    slug: 'munnar',
    tagline: 'Tea Garden Paradise',
    state: 'Kerala',
    description: 'Munnar is a breathtaking hill station in Kerala\'s Western Ghats, famous for its vast tea plantations, misty peaks, and rare Neelakurinji flowers.',
    image: '/assets/generated/munnar-hero.dim_800x500.png',
    categories: {
      viewpoints: [
        { name: 'Anamudi Peak', description: 'The highest peak in South India at 2,695m, offering spectacular views of the Ghats.' },
        { name: 'Top Station', description: 'The highest point on the Munnar-Kodaikanal road with stunning views of the Tamil Nadu plains.' },
        { name: 'Rajamala (Eravikulam)', description: 'A national park viewpoint famous for the endangered Nilgiri Tahr and Neelakurinji blooms.' },
        { name: 'Pothamedu Viewpoint', description: 'A panoramic viewpoint offering views of tea, coffee, and cardamom plantations.' },
      ],
      hillStations: [
        { name: 'Devikulam', description: 'A serene hill town near Munnar with a beautiful lake and pleasant climate.' },
        { name: 'Marayoor', description: 'A unique area near Munnar with natural sandalwood forests and ancient dolmens.' },
        { name: 'Chinnakanal', description: 'A scenic area with the famous Power House Waterfalls and tea estate views.' },
      ],
      rivers: [
        { name: 'Muthirapuzha River', description: 'A scenic river flowing through Munnar, ideal for nature walks along its banks.' },
        { name: 'Kundala Lake', description: 'A beautiful reservoir surrounded by tea gardens, perfect for boating.' },
        { name: 'Mattupetty Dam', description: 'A scenic dam with a reservoir offering boating and views of the surrounding hills.' },
      ],
      hotels: [
        { name: 'Windermere Estate', description: 'A heritage plantation bungalow offering an authentic tea estate experience.' },
        { name: 'Fragrant Nature Munnar', description: 'A luxury resort with stunning views of the tea gardens and misty mountains.' },
        { name: 'Tea Valley Resort', description: 'A comfortable resort nestled in the tea estates with modern amenities.' },
        { name: 'Spice Tree Munnar', description: 'An eco-friendly boutique resort offering treehouse accommodations and nature walks.' },
      ],
      cafes: [
        { name: 'Rapsy Restaurant', description: 'A popular local restaurant known for its Kerala cuisine and fresh tea.' },
        { name: 'Saravana Bhavan', description: 'A well-known South Indian restaurant chain serving authentic vegetarian food.' },
        { name: 'The Tall Trees Café', description: 'A scenic café surrounded by tall trees offering fresh coffee and snacks.' },
        { name: 'Eastend Restaurant', description: 'A cozy café known for its warm ambiance and variety of local and continental dishes.' },
      ],
      temples: [
        { name: 'Pothamedu Viewpoint Temple', description: 'A small temple at the famous Pothamedu viewpoint with scenic surroundings.' },
        { name: 'Devikulam Temple', description: 'An ancient temple in Devikulam dedicated to Goddess Devi with a sacred lake.' },
        { name: 'Christ Church Munnar', description: 'A historic church built in 1910 by British planters, a landmark of colonial heritage.' },
      ],
    },
  },
  {
    name: 'Kodaikanal',
    slug: 'kodaikanal',
    tagline: 'Princess of Hill Stations',
    state: 'Tamil Nadu',
    description: 'Kodaikanal is a charming hill station in the Palani Hills of Tamil Nadu, known for its star-shaped lake, pine forests, and cool misty climate.',
    image: '/assets/generated/kodaikanal-hero.dim_800x500.png',
    categories: {
      viewpoints: [
        { name: 'Pillar Rocks', description: 'Three giant vertical rock pillars rising 122m from the ground, a dramatic natural wonder.' },
        { name: 'Dolphin\'s Nose', description: 'A flat rock jutting out like a dolphin\'s nose, offering stunning valley views.' },
        { name: 'Green Valley View', description: 'A breathtaking viewpoint overlooking the deep valley and the plains of Madurai.' },
        { name: 'Perumal Peak', description: 'The highest point in Kodaikanal offering panoramic views of the surrounding hills.' },
      ],
      hillStations: [
        { name: 'Kodaikanal Lake', description: 'A star-shaped man-made lake at the heart of Kodaikanal, perfect for boating and cycling.' },
        { name: 'Berijam Lake', description: 'A pristine reservoir surrounded by dense shola forests, accessible by permit.' },
        { name: 'Mannavanur Lake', description: 'A serene lake surrounded by eucalyptus forests, ideal for picnics and horse riding.' },
      ],
      temples: [
        { name: 'Kurinji Andavar Temple', description: 'A temple dedicated to Lord Murugan, associated with the rare Kurinji flower.' },
        { name: 'Shri Mariamman Temple', description: 'A colorful temple in the heart of Kodaikanal town dedicated to Goddess Mariamman.' },
        { name: 'Sacred Heart Church', description: 'A beautiful colonial-era church in Kodaikanal with stunning architecture.' },
      ],
      rivers: [
        { name: 'Silver Cascade Falls', description: 'A beautiful 55m waterfall on the Kodaikanal-Madurai highway, fed by the lake overflow.' },
        { name: 'Bear Shola Falls', description: 'A scenic waterfall in a forest setting, named after bears that once frequented the area.' },
        { name: 'Pambar River', description: 'A river originating from the Kodaikanal hills, flowing through scenic valleys.' },
      ],
      hotels: [
        { name: 'Carlton Hotel', description: 'A heritage hotel on the banks of Kodaikanal Lake offering stunning views and colonial charm.' },
        { name: 'Club Mahindra Kodaikanal', description: 'A comfortable resort with modern amenities and beautiful garden views.' },
        { name: 'The Kodai Resort', description: 'A well-appointed resort offering panoramic views of the valley and hills.' },
        { name: 'Elephant Valley', description: 'An eco-resort near Kodaikanal offering nature walks and wildlife experiences.' },
      ],
      cafes: [
        { name: 'Pastry Corner', description: 'A legendary bakery in Kodaikanal known for its homemade chocolates and pastries.' },
        { name: 'Café Cariappa', description: 'A cozy café near the lake serving fresh coffee, sandwiches, and local snacks.' },
        { name: 'Cloud Street Café', description: 'A popular café with a terrace offering misty views and a variety of beverages.' },
        { name: 'Tava Restaurant', description: 'A well-known restaurant serving South Indian and North Indian cuisine.' },
      ],
    },
  },
  {
    name: 'Pondicherry',
    slug: 'pondicherry',
    tagline: 'French Riviera of the East',
    state: 'Puducherry',
    description: 'Pondicherry is a unique Union Territory blending French colonial heritage with Tamil culture, known for its colorful streets, ashrams, and beaches.',
    image: '/assets/generated/pondicherry-hero.dim_800x500.png',
    categories: {
      viewpoints: [
        { name: 'Promenade Beach Walkway', description: 'A scenic 1.5km promenade along the Bay of Bengal, perfect for sunrise and sunset views.' },
        { name: 'Auroville Matrimandir', description: 'A golden sphere meditation center surrounded by lush gardens, a spiritual landmark.' },
        { name: 'Ousteri Lake', description: 'A large freshwater lake on the outskirts of Pondicherry, a haven for migratory birds.' },
      ],
      beaches: [
        { name: 'Promenade Beach', description: 'The main beach in Pondicherry, lined with colonial buildings and the famous Gandhi statue.' },
        { name: 'Paradise Beach', description: 'An isolated beach accessible only by boat, known for its pristine sands and clear waters.' },
        { name: 'Auroville Beach', description: 'A serene beach near Auroville, popular for swimming and relaxation.' },
        { name: 'Serenity Beach', description: 'A quiet beach popular for surfing and yoga retreats.' },
        { name: 'Chunnambar Beach', description: 'A backwater beach resort offering boat rides and water sports.' },
      ],
      temples: [
        { name: 'Manakula Vinayagar Temple', description: 'A famous Ganesha temple in the French Quarter, one of the oldest temples in Pondicherry.' },
        { name: 'Arulmigu Vedapureeswarar Temple', description: 'An ancient Shiva temple known for its towering gopuram and religious significance.' },
        { name: 'Immaculate Conception Cathedral', description: 'A beautiful 18th-century French colonial church, one of the oldest in Pondicherry.' },
        { name: 'Sri Aurobindo Ashram', description: 'A spiritual community founded by Sri Aurobindo, a major pilgrimage and meditation center.' },
      ],
      hotels: [
        { name: 'Palais de Mahe', description: 'A luxury boutique hotel in a restored French colonial mansion in the heart of the French Quarter.' },
        { name: 'Le Dupleix', description: 'A heritage hotel in an 18th-century French mansion offering colonial elegance.' },
        { name: 'Promenade Hotel', description: 'A stylish hotel on the beachfront promenade with stunning sea views.' },
        { name: 'Gratitude Heritage Hotel', description: 'A charming heritage hotel in a restored Tamil-French colonial building.' },
      ],
      cafes: [
        { name: 'Café des Arts', description: 'A charming French café in the White Town known for its crêpes, coffee, and art exhibitions.' },
        { name: 'Baker Street', description: 'A popular bakery-café known for its French pastries, croissants, and artisan breads.' },
        { name: 'Satsanga', description: 'A cozy café near the ashram serving healthy food, fresh juices, and herbal teas.' },
        { name: 'Villa Shanti', description: 'A stylish restaurant-café in a heritage villa serving French and Mediterranean cuisine.' },
      ],
      rivers: [
        { name: 'Chunnambar River', description: 'A scenic backwater river near Pondicherry, ideal for boat rides and kayaking.' },
        { name: 'Gingee River', description: 'A river near Pondicherry flowing past the historic Gingee Fort.' },
      ],
    },
  },
  {
    name: 'Wayanad',
    slug: 'wayanad',
    tagline: 'Green Paradise',
    state: 'Kerala',
    description: 'Wayanad is a lush green district in Kerala\'s Western Ghats, known for its dense forests, wildlife sanctuaries, tribal culture, and misty mountains.',
    image: '/assets/generated/wayanad-hero.dim_800x500.png',
    categories: {
      viewpoints: [
        { name: 'Chembra Peak', description: 'The highest peak in Wayanad at 2,100m, famous for the heart-shaped lake near the summit.' },
        { name: 'Pakshipathalam', description: 'A remote trekking destination with caves and stunning views of the Brahmagiri range.' },
        { name: 'Banasura Hill', description: 'A scenic hill offering panoramic views of the Banasura Sagar Dam and surrounding forests.' },
        { name: 'Lakkidi Viewpoint', description: 'The gateway to Wayanad, offering stunning views of the Thamarassery Pass.' },
      ],
      temples: [
        { name: 'Thirunelli Temple', description: 'An ancient Vishnu temple in the forest, known as the "Kashi of the South".' },
        { name: 'Edakkal Caves', description: 'Ancient caves with Neolithic rock engravings, one of the oldest human settlements in India.' },
        { name: 'Jain Temple Sulthan Bathery', description: 'A 13th-century Jain temple converted to a fort by Tipu Sultan, a historical landmark.' },
        { name: 'Valliyoorkavu Temple', description: 'A famous tribal temple known for its annual Bharani festival with elephant processions.' },
      ],
      rivers: [
        { name: 'Kabani River', description: 'A scenic river flowing through Wayanad, ideal for wildlife watching and nature walks.' },
        { name: 'Banasura Sagar Dam', description: 'The largest earthen dam in India, surrounded by beautiful hills and forests.' },
        { name: 'Pookode Lake', description: 'A freshwater lake surrounded by evergreen forests, perfect for boating.' },
      ],
      hillStations: [
        { name: 'Vythiri', description: 'A scenic hill town in Wayanad known for its tea and coffee estates and cool climate.' },
        { name: 'Kalpetta', description: 'The main town of Wayanad, a gateway to the district\'s natural attractions.' },
        { name: 'Mananthavady', description: 'A town near the Nagarhole forest, known for its tribal culture and wildlife.' },
      ],
      hotels: [
        { name: 'Vythiri Resort', description: 'A luxury treehouse resort in the rainforest offering an immersive nature experience.' },
        { name: 'Wayanad Wild', description: 'A CGH Earth property offering eco-friendly luxury amidst the Wayanad wilderness.' },
        { name: 'Pepper Trail', description: 'A heritage plantation bungalow offering a unique stay amidst spice gardens.' },
        { name: 'Tranquil Resort', description: 'A coffee and vanilla plantation resort offering a peaceful retreat in nature.' },
      ],
      cafes: [
        { name: 'Café Wayanad', description: 'A cozy café in Kalpetta serving fresh plantation coffee and local snacks.' },
        { name: 'The Green Leaf', description: 'A nature-themed café offering organic food and herbal teas.' },
        { name: 'Bamboo Dale Café', description: 'A charming café in a bamboo setting near the forest, perfect for a relaxing break.' },
      ],
    },
  },
  {
    name: 'Chikmagalur',
    slug: 'chikmagalur',
    tagline: 'Coffee Land of Karnataka',
    state: 'Karnataka',
    description: 'Chikmagalur is a scenic hill district in Karnataka, famous for being the birthplace of coffee in India, with lush estates, trekking trails, and misty peaks.',
    image: '/assets/generated/chikmagalur-hero.dim_800x500.png',
    categories: {
      viewpoints: [
        { name: 'Mullayanagiri Peak', description: 'The highest peak in Karnataka at 1,930m, offering breathtaking views of the Western Ghats.' },
        { name: 'Baba Budangiri', description: 'A sacred hill range with a dargah and stunning views, the birthplace of coffee in India.' },
        { name: 'Kudremukh Peak', description: 'A horse-face shaped peak in the Kudremukh National Park, a trekker\'s paradise.' },
        { name: 'Kemmanagundi', description: 'A hill station with beautiful gardens, waterfalls, and panoramic views.' },
      ],
      temples: [
        { name: 'Datta Peeta (Baba Budangiri)', description: 'A sacred shrine revered by both Hindus and Muslims, dedicated to Dattatreya.' },
        { name: 'Hoysaleswara Temple (Halebidu)', description: 'A stunning 12th-century Hoysala temple with intricate stone carvings.' },
        { name: 'Chennakeshava Temple (Belur)', description: 'A masterpiece of Hoysala architecture, known for its exquisite sculptures.' },
        { name: 'Kodandarama Temple', description: 'An ancient temple in Chikmagalur town dedicated to Lord Rama.' },
      ],
      rivers: [
        { name: 'Bhadra River', description: 'A scenic river flowing through the Bhadra Wildlife Sanctuary, ideal for nature walks.' },
        { name: 'Bhadra Reservoir', description: 'A large reservoir surrounded by forests, offering boating and wildlife watching.' },
        { name: 'Hebbe Falls', description: 'A beautiful two-tiered waterfall in the coffee estates, accessible by jeep.' },
      ],
      hillStations: [
        { name: 'Kemmanagundi', description: 'A scenic hill station with rose gardens, waterfalls, and trekking trails.' },
        { name: 'Mudigere', description: 'A town surrounded by coffee and cardamom estates with a pleasant climate.' },
        { name: 'Kalasa', description: 'A small town near the Kudremukh forest, known for its ancient temple and scenic beauty.' },
      ],
      hotels: [
        { name: 'The Serai Chikmagalur', description: 'A luxury resort set in a 300-acre coffee estate offering a premium plantation experience.' },
        { name: 'Tata Coffee Club House', description: 'A heritage bungalow in a coffee estate offering a unique plantation stay.' },
        { name: 'Arabica Resort', description: 'A comfortable resort amidst coffee estates with modern amenities.' },
        { name: 'Plantation Trails', description: 'An eco-resort offering guided coffee estate tours and nature walks.' },
      ],
      cafes: [
        { name: 'Coffee Day Square', description: 'The flagship café of India\'s largest coffee chain, located in the heart of coffee country.' },
        { name: 'The Planter\'s Bungalow Café', description: 'A heritage café in a colonial bungalow serving estate-fresh coffee and snacks.' },
        { name: 'Café Arabica', description: 'A cozy café in Chikmagalur town known for its single-origin coffee and local cuisine.' },
        { name: 'Green Beans Café', description: 'A popular café near the coffee estates serving freshly brewed specialty coffees.' },
      ],
    },
  },
  {
    name: 'Rishikesh',
    slug: 'rishikesh',
    tagline: 'Yoga Capital of the World',
    state: 'Uttarakhand',
    description: 'Rishikesh is a sacred city on the banks of the Ganges in Uttarakhand, known as the world\'s yoga capital, offering spiritual retreats, adventure sports, and Himalayan views.',
    image: '/assets/generated/rishikesh-hero.dim_800x500.png',
    categories: {
      viewpoints: [
        { name: 'Kunjapuri Devi Temple Viewpoint', description: 'A hilltop temple offering stunning sunrise views of the Himalayas and the Ganges valley.' },
        { name: 'Neer Garh Waterfall', description: 'A scenic waterfall in the forest, accessible by a short trek from Rishikesh.' },
        { name: 'Rajaji National Park Viewpoint', description: 'A viewpoint in the national park offering views of the Himalayan foothills and wildlife.' },
        { name: 'Beatles Ashram Viewpoint', description: 'The famous Chaurasi Kutia ashram offering views of the Ganges and surrounding forests.' },
      ],
      ghatRoads: [
        { name: 'Triveni Ghat', description: 'The most sacred ghat in Rishikesh, famous for the evening Ganga Aarti ceremony.' },
        { name: 'Ram Jhula Ghat', description: 'A scenic ghat near the famous Ram Jhula suspension bridge, ideal for meditation.' },
        { name: 'Lakshman Jhula Ghat', description: 'A historic ghat near the iconic Lakshman Jhula bridge with beautiful river views.' },
        { name: 'Swarg Ashram Ghat', description: 'A peaceful ghat in the Swarg Ashram area, perfect for yoga and meditation.' },
      ],
      temples: [
        { name: 'Triveni Ghat Temple', description: 'A sacred temple at the confluence of three rivers, famous for the evening Ganga Aarti.' },
        { name: 'Neelkanth Mahadev Temple', description: 'A famous Shiva temple in the forest, believed to be where Shiva drank the cosmic poison.' },
        { name: 'Bharat Mandir', description: 'The oldest temple in Rishikesh, dedicated to Lord Vishnu, dating back to the 12th century.' },
        { name: 'Parmarth Niketan Ashram', description: 'A large ashram on the Ganges banks, famous for its evening Ganga Aarti and yoga programs.' },
      ],
      rivers: [
        { name: 'Ganges River (Rafting)', description: 'The holy Ganges offers thrilling white-water rafting through scenic Himalayan gorges.' },
        { name: 'Ram Jhula', description: 'An iconic suspension bridge over the Ganges connecting the two banks of Rishikesh.' },
        { name: 'Lakshman Jhula', description: 'A historic iron suspension bridge over the Ganges, a landmark of Rishikesh.' },
      ],
      hotels: [
        { name: 'Aloha on the Ganges', description: 'A luxury resort on the Ganges banks offering yoga retreats and Ayurvedic treatments.' },
        { name: 'Ananda in the Himalayas', description: 'A world-renowned luxury spa resort in the Himalayan foothills near Rishikesh.' },
        { name: 'Taj Rishikesh Resort & Spa', description: 'A luxury resort offering stunning Himalayan views and world-class amenities.' },
        { name: 'Zostel Rishikesh', description: 'A popular backpacker hostel known for its social atmosphere and adventure activities.' },
      ],
      cafes: [
        { name: 'Little Buddha Café', description: 'A popular café on Ram Jhula offering Ganges views, healthy food, and a relaxed vibe.' },
        { name: 'Café Delmar', description: 'A rooftop café with stunning views of the Ganges and the surrounding mountains.' },
        { name: 'Chotiwala Restaurant', description: 'A legendary restaurant in Swarg Ashram known for its North Indian vegetarian cuisine.' },
        { name: 'Madras Café', description: 'A popular South Indian café in Rishikesh known for its dosas and filter coffee.' },
      ],
    },
  },
];

const categoryConfig = [
  { key: 'viewpoints', label: 'Viewpoints', icon: Navigation, color: 'text-blue-600' },
  { key: 'temples', label: 'Temples & Shrines', icon: Church, color: 'text-orange-600' },
  { key: 'ghatRoads', label: 'Ghat Roads', icon: Waves, color: 'text-teal-600' },
  { key: 'beaches', label: 'Beaches', icon: Waves, color: 'text-cyan-600' },
  { key: 'rivers', label: 'Rivers & Lakes', icon: Waves, color: 'text-blue-500' },
  { key: 'hillStations', label: 'Hill Stations', icon: Mountain, color: 'text-green-600' },
  { key: 'hotels', label: 'Hotels & Resorts', icon: Hotel, color: 'text-purple-600' },
  { key: 'cafes', label: 'Cafés & Restaurants', icon: Coffee, color: 'text-amber-700' },
] as const;

export default function Destination() {
  const { name } = useParams({ from: '/destination/$name' });
  const destination = destinationData.find((d) => d.slug === name);

  if (!destination) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🗺️</div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-2">Destination Not Found</h1>
        <p className="text-muted-foreground font-body mb-6">We couldn't find information for this destination.</p>
        <Link to="/">
          <Button className="rounded-full">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* Back Button */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-white/20 border-white/40 text-white hover:bg-white/30 backdrop-blur-sm rounded-full">
              <ArrowLeft size={16} className="mr-1.5" />
              Back
            </Button>
          </Link>
        </div>
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0 font-body text-xs">
                <MapPin size={10} className="mr-1" />
                {destination.state}
              </Badge>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">
              {destination.name}
            </h1>
            <p className="text-primary font-body font-semibold text-base md:text-lg mb-2">
              {destination.tagline}
            </p>
            <p className="text-white/80 font-body text-sm md:text-base max-w-2xl leading-relaxed">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      {/* Tourist Spots by Category */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              Explore {destination.name}
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Discover the best viewpoints, temples, beaches, rivers, hotels, hill stations, and cafés in {destination.name}.
            </p>
          </div>

          <div className="space-y-10">
            {categoryConfig.map(({ key, label, icon: Icon, color }) => {
              const spots = destination.categories[key as keyof DestinationCategory];
              if (!spots || spots.length === 0) return null;

              return (
                <div key={key}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className={color} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground">{label}</h3>
                      <p className="text-xs text-muted-foreground font-body">{spots.length} places</p>
                    </div>
                  </div>

                  {/* Spots Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {spots.map((spot) => (
                      <div
                        key={spot.name}
                        className="bg-card border border-border rounded-xl p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon size={15} className={color} />
                          </div>
                          <div>
                            <h4 className="font-body font-semibold text-sm text-foreground mb-1 leading-snug">
                              {spot.name}
                            </h4>
                            <p className="text-xs text-muted-foreground font-body leading-relaxed">
                              {spot.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center bg-muted/40 rounded-2xl p-8 border border-border">
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Plan Your Trip to {destination.name}
            </h3>
            <p className="text-muted-foreground font-body mb-5 max-w-md mx-auto">
              Let Lucky Holidays arrange a comfortable and memorable journey to {destination.name} for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-6">
                  Book This Trip
                  <Building2 size={15} className="ml-2" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="rounded-full font-body font-semibold px-6">
                  <ArrowLeft size={15} className="mr-2" />
                  More Destinations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
