import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Menu, X, Phone } from 'lucide-react';

const cyclingWords = ['Adventures', 'Journeys', 'Memories', 'Escapes', 'Experiences'];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % cyclingWords.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'Ratings', path: '/ratings' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#1a4731' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Brand */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Inline SVG Highway Road Junction Logo */}
            <svg
              width="52"
              height="52"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              {/* Outer circle */}
              <circle cx="100" cy="100" r="90" stroke="#f5c842" strokeWidth="6" fill="none" />
              {/* Single road coming from bottom merging into dual road going up */}
              {/* Single lane bottom */}
              <rect x="88" y="130" width="24" height="60" rx="4" stroke="#f5c842" strokeWidth="5" fill="none" />
              {/* Center dashed line on single road */}
              <line x1="100" y1="140" x2="100" y2="155" stroke="#f5c842" strokeWidth="3" strokeDasharray="6 5" />
              <line x1="100" y1="163" x2="100" y2="178" stroke="#f5c842" strokeWidth="3" strokeDasharray="6 5" />
              {/* Merge/fork zone */}
              <path d="M88 130 Q70 100 55 60" stroke="#f5c842" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M112 130 Q130 100 145 60" stroke="#f5c842" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Left lane top */}
              <rect x="42" y="20" width="22" height="45" rx="4" stroke="#f5c842" strokeWidth="5" fill="none" />
              {/* Right lane top */}
              <rect x="136" y="20" width="22" height="45" rx="4" stroke="#f5c842" strokeWidth="5" fill="none" />
              {/* Dashes on left lane */}
              <line x1="53" y1="28" x2="53" y2="38" stroke="#f5c842" strokeWidth="2.5" strokeDasharray="5 4" />
              <line x1="53" y1="44" x2="53" y2="54" stroke="#f5c842" strokeWidth="2.5" strokeDasharray="5 4" />
              {/* Dashes on right lane */}
              <line x1="147" y1="28" x2="147" y2="38" stroke="#f5c842" strokeWidth="2.5" strokeDasharray="5 4" />
              <line x1="147" y1="44" x2="147" y2="54" stroke="#f5c842" strokeWidth="2.5" strokeDasharray="5 4" />
            </svg>

            <div className="flex flex-col leading-tight">
              <span className="text-3xl md:text-4xl font-extrabold tracking-widest text-yellow-300 drop-shadow-sm" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.12em' }}>
                LUCKY HOLIDAYS
              </span>
              <span className="text-xs font-medium tracking-wider" style={{ color: '#a8d5b5' }}>
                Unforgettable{' '}
                <span
                  className="inline-block transition-opacity duration-300 font-semibold text-yellow-200"
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  {cyclingWords[wordIndex]}
                </span>
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-yellow-400 text-green-900'
                    : 'text-green-100 hover:bg-green-700 hover:text-yellow-200'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:9663202989"
              className="ml-3 flex items-center gap-2 bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 transition-colors"
            >
              <Phone size={14} />
              Call Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-green-100 hover:bg-green-700 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-green-700" style={{ backgroundColor: '#1a4731' }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate({ to: link.path });
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-yellow-400 text-green-900'
                    : 'text-green-100 hover:bg-green-700 hover:text-yellow-200'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:9663202989"
              className="flex items-center gap-2 w-full bg-yellow-400 text-green-900 px-4 py-3 rounded-md text-sm font-bold hover:bg-yellow-300 transition-colors mt-2"
            >
              <Phone size={14} />
              Call: 9663202989
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
