import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const cyclingWords = [
  "Memorable",
  "Comfortable",
  "Affordable",
  "Unforgettable",
  "Luxurious",
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Vehicles", path: "/vehicles" },
  { label: "Contact", path: "/contact" },
  { label: "Ratings", path: "/ratings" },
];

// ── Chatbot logic ──────────────────────────────────────────────────────────────

interface ChatMessage {
  id: number;
  role: "bot" | "user";
  text: string;
}

let msgIdCounter = 0;
function nextMsgId() {
  return ++msgIdCounter;
}

function getBotReply(input: string): string {
  const msg = input.toLowerCase().trim();

  if (
    msg.match(
      /\b(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/,
    )
  ) {
    return "Namaste! 🙏 Welcome to LAKKI HOLIDAYS! I'm your travel assistant. Ask me about destinations, vehicles, pricing, or bookings. How can I help you today?";
  }

  if (msg.match(/\bcoorg\b/)) {
    return "🌿 Coorg (Kodagu) is the 'Scotland of India'! Top spots: Abbey Falls, Raja's Seat, Dubare Elephant Camp, Talacauvery, Namdroling Monastery, and Iruppu Falls. Best season: Oct–Mar. We offer full Coorg tour packages — call 9663202989 to book!";
  }

  if (msg.match(/\booty\b/)) {
    return "🏔️ Ooty (Udhagamandalam) is a stunning Nilgiri hill station! Must-see: Botanical Gardens, Ooty Lake, Doddabetta Peak, Pine Forest, Avalanche Lake, and the iconic Nilgiri Mountain Railway. Best season: Apr–Jun & Sep–Nov. Ask us for a package!";
  }

  if (msg.match(/\bmysore\b|mysuru/)) {
    return "👑 Mysore is a royal heritage city! Don't miss: Mysore Palace (illuminated on Sundays), Chamundeshwari Temple, Brindavan Gardens, St. Philomena's Church, and Devaraja Market. Famous for Dasara festival. We cover Mysore in our Karnataka tours!";
  }

  if (msg.match(/\bgoa\b/)) {
    return "🏖️ Goa — India's beach paradise! Top places: Calangute & Baga Beach, Dudhsagar Waterfalls, Fort Aguada, Old Goa churches, Palolem Beach, and Spice Plantations. Best season: Nov–Feb. We offer Goa packages with AC vehicles!";
  }

  if (msg.match(/\bkerala\b/)) {
    return "🌴 Kerala — God's Own Country! Highlights: Alleppey Backwaters, Munnar Tea Gardens, Wayanad Wildlife, Kovalam Beach, Thekkady Periyar Reserve, and Fort Kochi. Best season: Sep–Mar. Ask about our Kerala houseboat packages!";
  }

  if (msg.match(/\bhampi\b/)) {
    return "🏛️ Hampi — a UNESCO World Heritage Site! Explore Virupaksha Temple, Vittala Temple (Stone Chariot), Elephant Stables, Lotus Mahal, Tungabhadra River, and the Achyutaraya Temple complex. Best season: Oct–Feb.";
  }

  if (msg.match(/\bbangalore\b|bengaluru/)) {
    return "🌆 Bengaluru, the Garden City! Lalbagh Botanical Garden, Cubbon Park, Bangalore Palace, ISKCON Temple, Nandi Hills nearby. We operate all Bangalore-to-destination routes!";
  }

  if (msg.match(/\bmanali\b/)) {
    return "❄️ Manali is a Himalayan paradise! Rohtang Pass, Solang Valley, Hadimba Temple, Vashisht Hot Springs, and the Beas River. Best season: May–Jun & Oct–Nov.";
  }

  if (msg.match(/\brameshwaram\b/)) {
    return "🌊 Rameswaram — one of the char dham pilgrimage sites! Ramanathaswamy Temple, Pamban Bridge, Dhanushkodi, Agni Theertham Beach. We offer pilgrimage tour packages!";
  }

  if (msg.match(/\bkanyakumari\b/)) {
    return "🌅 Kanyakumari — the southernmost tip of India! Vivekananda Rock Memorial, Thiruvalluvar Statue, Kumari Amman Temple, sunrise and sunset views. Perfect year-round destination!";
  }

  if (msg.match(/\bvehicle|car|bus|tempo|traveller|seater\b/)) {
    return "🚗 Our fleet includes: 4+1 Seater (Dzire/Amaze), 6+1 Seater (Innova Crysta), 12 Seater (Tempo Traveller), 17 Seater Mini Bus, 20–32 Seater AC Bus, and 40–50 Seater Luxury Bus. All vehicles are AC and GPS-tracked! Visit our Vehicles page or call 9663202989 for rates.";
  }

  if (msg.match(/\bprice|cost|rate|tariff|charge|fare|how much\b/)) {
    return "💰 Pricing depends on destination, vehicle type, and duration. For accurate quotes, call us at 📞 9663202989 or email lakkiholidays@gmail.com. We offer competitive rates with no hidden charges!";
  }

  if (msg.match(/\bbook|booking|reserve|reservation|tour|package\b/)) {
    return "📅 To book a tour, call us at 📞 9663202989 or WhatsApp the same number. You can also email lakkiholidays@gmail.com with your destination, travel dates, number of passengers, and preferred vehicle. We'll get back to you within 2 hours!";
  }

  if (msg.match(/\bcontact|phone|number|call|email\b/)) {
    return "📞 Contact LAKKI HOLIDAYS:\n• Phone/WhatsApp: 9663202989\n• Email: lakkiholidays@gmail.com\nWe're available 7 days a week, 8 AM – 9 PM.";
  }

  if (msg.match(/\bwhatsapp\b/)) {
    return "💬 You can WhatsApp us directly at 9663202989. Click the WhatsApp icon on the bottom-right of the page to start a chat instantly!";
  }

  if (msg.match(/\brating|review|feedback|testimonial\b/)) {
    return "⭐ We're proud of our 4.8★ average rating! Check out our Ratings page to read reviews from happy travellers. Your feedback helps us serve you better!";
  }

  if (msg.match(/\babout|company|who are you|lakki holidays\b/)) {
    return "🏢 LAKKI HOLIDAYS is a trusted travel company offering tours across India. From pilgrimage trips to leisure holidays, corporate travel to adventure tours — we cover it all with a fleet of well-maintained AC vehicles. Contact: 9663202989.";
  }

  if (msg.match(/\bhelp|what can you do|options\b/)) {
    return "🤖 I can help you with:\n• Popular destinations (Coorg, Ooty, Goa, Kerala, Mysore, Hampi...)\n• Vehicle info & fleet\n• Tour packages & booking\n• Pricing & rates\n• Contact details\n\nJust type your question!";
  }

  if (msg.match(/\bthank|thanks|thank you\b/)) {
    return "You're welcome! 😊 Happy to help. For bookings or more info, call 9663202989. Have a wonderful trip with LAKKI HOLIDAYS! ✈️";
  }

  return "I'm not sure about that, but our team can help! 📞 Call us at 9663202989 or email lakkiholidays@gmail.com — we're available 7 days a week. You can also ask me about destinations, vehicles, or booking!";
}

// ── Chatbot Panel ──────────────────────────────────────────────────────────────

function ChatbotPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextMsgId(),
      role: "bot",
      text: "Namaste! 🙏 I'm your LAKKI HOLIDAYS travel assistant. Ask me about destinations, vehicles, pricing, or bookings!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered by messages/typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: nextMsgId(), role: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(
      () => {
        const reply = getBotReply(text);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextMsgId(), role: "bot", text: reply },
        ]);
      },
      600 + Math.random() * 400,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      data-ocid="chatbot.dialog"
      className="fixed bottom-4 right-4 z-[9000] w-[340px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1.5px solid rgba(0,0,0,0.08)",
        maxHeight: "min(520px, calc(100vh - 6rem))",
      }}
    >
      {/* Chat header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "var(--color-primary, #1e40af)",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            🌍
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">
              LAKKI HOLIDAYS Assistant
            </div>
            <div className="text-xs opacity-75 leading-tight">
              Always here to help ✈️
            </div>
          </div>
        </div>
        <button
          type="button"
          data-ocid="chatbot.close_button"
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
        style={{ background: "#f9fafb", minHeight: 0 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "bot" && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-1.5 flex-shrink-0 self-end"
                style={{
                  background: "var(--color-primary, #1e40af)",
                  color: "#fff",
                }}
              >
                🌍
              </div>
            )}
            <div
              className="max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
              style={
                msg.role === "user"
                  ? {
                      background: "var(--color-primary, #1e40af)",
                      color: "#fff",
                      borderBottomRightRadius: "4px",
                    }
                  : {
                      background: "#fff",
                      color: "#1a1a2e",
                      border: "1px solid #e5e7eb",
                      borderBottomLeftRadius: "4px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-1.5 self-end"
              style={{
                background: "var(--color-primary, #1e40af)",
                color: "#fff",
              }}
            >
              🌍
            </div>
            <div
              className="px-3 py-2 rounded-2xl text-sm"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderBottomLeftRadius: "4px",
              }}
            >
              <span className="inline-flex gap-1 items-center">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: "var(--color-primary, #1e40af)",
                    animationDelay: "0ms",
                  }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: "var(--color-primary, #1e40af)",
                    animationDelay: "150ms",
                  }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: "var(--color-primary, #1e40af)",
                    animationDelay: "300ms",
                  }}
                />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      <div
        className="flex gap-1.5 px-3 py-2 overflow-x-auto flex-shrink-0"
        style={{
          background: "#f3f4f6",
          borderTop: "1px solid #e5e7eb",
          scrollbarWidth: "none",
        }}
      >
        {["Coorg", "Ooty", "Goa", "Kerala", "Booking", "Vehicles"].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setInputValue(q);
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  { id: nextMsgId(), role: "user", text: q },
                ]);
                setInputValue("");
                setIsTyping(true);
                setTimeout(
                  () => {
                    const reply = getBotReply(q);
                    setIsTyping(false);
                    setMessages((prev) => [
                      ...prev,
                      { id: nextMsgId(), role: "bot", text: reply },
                    ]);
                  },
                  600 + Math.random() * 400,
                );
              }, 0);
            }}
            className="whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0"
            style={{
              background: "#fff",
              border: "1px solid #d1d5db",
              color: "#374151",
              cursor: "pointer",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
        style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}
      >
        <input
          ref={inputRef}
          type="text"
          data-ocid="chatbot.input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about destinations, booking…"
          className="flex-1 text-sm px-3 py-2 rounded-full outline-none"
          style={{
            background: "#f3f4f6",
            border: "1.5px solid #e5e7eb",
            color: "#1a1a2e",
            minWidth: 0,
          }}
        />
        <button
          type="button"
          data-ocid="chatbot.submit_button"
          onClick={sendMessage}
          disabled={!inputValue.trim()}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity flex-shrink-0"
          style={{
            background: "var(--color-primary, #1e40af)",
            color: "#fff",
            opacity: inputValue.trim() ? 1 : 0.4,
            cursor: inputValue.trim() ? "pointer" : "not-allowed",
          }}
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}

// ── India map logo ──────────────────────────────────────────────────────────────

/** Inline SVG: India map outline with Kanyakumari→Kashmir route + pins */
function IndiaMapLogo({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View India route map"
      className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <svg
        width="48"
        height="54"
        viewBox="0 0 120 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* India map outline — simplified silhouette */}
        <path
          d="
            M55,8
            C52,8 46,10 43,13
            C40,16 38,20 36,22
            C32,24 28,24 25,27
            C22,30 20,35 18,40
            C16,45 14,50 13,55
            C12,60 12,65 13,70
            C14,75 16,79 18,83
            C20,87 22,90 24,93
            C26,96 28,98 30,100
            C32,102 34,104 36,106
            C38,108 40,110 42,112
            C44,114 46,116 48,118
            C50,120 52,122 54,124
            C56,126 58,127 60,127
            C62,127 64,126 66,124
            C68,122 69,120 70,118
            C71,116 72,114 73,112
            C74,110 75,108 76,106
            C77,104 78,102 79,100
            C80,98 81,96 82,94
            C83,92 84,90 85,88
            C87,84 89,80 91,76
            C93,72 94,68 95,64
            C96,60 96,56 95,52
            C94,48 92,44 90,41
            C88,38 85,35 82,33
            C79,31 76,30 73,28
            C70,26 68,24 66,22
            C64,20 62,16 60,13
            C58,10 57,8 55,8 Z
          "
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Dotted route line from Kanyakumari (bottom ~60,122) to Kashmir (top ~58,14) */}
        <line
          x1="60"
          y1="122"
          x2="58"
          y2="14"
          stroke="#f59e0b"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Kashmir pin (north) — emerald */}
        {/* Pin body */}
        <circle
          cx="58"
          cy="20"
          r="6"
          fill="#10b981"
          stroke="white"
          strokeWidth="1.5"
        />
        {/* Pin dot */}
        <circle cx="58" cy="20" r="2.2" fill="white" />
        {/* Pin tail */}
        <line
          x1="58"
          y1="26"
          x2="58"
          y2="30"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Kanyakumari pin (south) — amber */}
        <circle
          cx="60"
          cy="116"
          r="6"
          fill="#f59e0b"
          stroke="white"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="116" r="2.2" fill="white" />
        <line
          x1="60"
          y1="122"
          x2="60"
          y2="126"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Small "K" label near Kashmir pin */}
        <text
          x="66"
          y="23"
          fontSize="7"
          fill="#10b981"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          KMR
        </text>
        {/* Small "KK" label near Kanyakumari pin */}
        <text
          x="66"
          y="119"
          fontSize="7"
          fill="#f59e0b"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          KK
        </text>
      </svg>
    </button>
  );
}

/** Full-screen modal/lightbox for the India map route image */
function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm w-full h-full max-w-none max-h-none m-0 p-0 border-none"
      aria-label="India route map"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* Modal content — stop propagation so clicking image doesn't close */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
          aria-label="Close map"
        >
          <X size={20} />
        </button>

        {/* Map image */}
        <img
          src="/assets/generated/india-map-route.dim_800x900.png"
          alt="India route map — Kanyakumari to Kashmir"
          className="block max-w-full max-h-[85vh] object-contain"
          style={{ display: "block" }}
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-center">
          <p className="text-white text-sm font-semibold tracking-wide">
            🗺️ Kanyakumari → Kashmir &nbsp;|&nbsp; LAKKI HOLIDAYS Route
          </p>
        </div>
      </div>
    </dialog>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────

export default function Header() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % cyclingWords.length);
        setWordVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo area */}
          <div className="flex items-center gap-3 min-h-[44px]">
            {/* Clickable India map SVG logo */}
            <IndiaMapLogo onClick={() => setMapModalOpen(true)} />

            {/* Brand text — navigates to Home */}
            <Link to="/" className="flex flex-col leading-tight">
              <div className="font-display font-bold text-xl leading-tight">
                LAKKI HOLIDAYS
              </div>
              <div className="text-xs opacity-80 flex items-center gap-1">
                <span>Making Travel</span>
                <span
                  className={`font-semibold transition-opacity duration-300 ${
                    wordVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {cyclingWords[wordIndex]}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                  currentPath === link.path
                    ? "bg-white/20 text-white"
                    : "hover:bg-white/10 text-primary-foreground/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919663202989"
              className="ml-2 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px] flex items-center"
            >
              📞 Call Now
            </a>
            {/* AI Chat button — desktop */}
            <button
              type="button"
              data-ocid="header.chat_button"
              onClick={() => setChatOpen((o) => !o)}
              className={`ml-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors min-h-[44px] flex items-center gap-1.5 ${
                chatOpen
                  ? "bg-white text-primary"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
              aria-label="Open travel assistant chat"
            >
              <MessageCircle size={16} />
              <span>AI Chat</span>
            </button>
            {deferredPrompt && (
              <button
                type="button"
                onClick={handleInstall}
                className="ml-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-semibold transition-colors min-h-[44px] flex items-center"
              >
                ⬇️ Download App
              </button>
            )}
          </nav>

          {/* Mobile right actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* AI Chat icon — mobile */}
            <button
              type="button"
              data-ocid="header.chat_button"
              onClick={() => setChatOpen((o) => !o)}
              className={`p-2.5 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                chatOpen
                  ? "bg-white text-primary"
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Open travel assistant chat"
            >
              <MessageCircle size={20} />
            </button>
            {deferredPrompt && (
              <button
                type="button"
                onClick={handleInstall}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                ⬇️ Install
              </button>
            )}
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="p-3 rounded-md hover:bg-white/10 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-white" />
              <div className="w-6 h-0.5 bg-white" />
              <div className="w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-primary border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                  currentPath === link.path
                    ? "bg-white/20 text-white"
                    : "hover:bg-white/10 text-primary-foreground/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919663202989"
              className="px-4 py-3 bg-accent text-accent-foreground rounded-md text-sm font-semibold text-center mt-1 min-h-[44px] flex items-center justify-center"
            >
              📞 Call Now
            </a>
          </div>
        )}
      </header>

      {/* India map route modal */}
      <MapModal open={mapModalOpen} onClose={() => setMapModalOpen(false)} />

      {/* AI Chatbot panel */}
      {chatOpen && <ChatbotPanel onClose={() => setChatOpen(false)} />}
    </>
  );
}
