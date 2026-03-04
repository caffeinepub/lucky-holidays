import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function Header() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);

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
    </>
  );
}
