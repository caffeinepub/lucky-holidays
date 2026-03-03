import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Plane } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Ratings', path: '/ratings' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
              <img
                src="/assets/generated/lucky-holidays-logo.dim_200x200.png"
                alt="Lucky Holidays Logo"
                className="w-full h-full object-contain rounded-full border-2 border-primary group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg md:text-xl text-primary tracking-wide">
                LUCKY HOLIDAYS
              </span>
              <span className="text-xs text-muted-foreground font-body tracking-widest uppercase">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-200
                  ${isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-primary-foreground hover:bg-white/10'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary-foreground hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-foreground border-t border-white/10 px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  px-4 py-3 rounded-md text-sm font-body font-medium transition-all duration-200
                  ${isActive(link.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary-foreground hover:bg-white/10'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
