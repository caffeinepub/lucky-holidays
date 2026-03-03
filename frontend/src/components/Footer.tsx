import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'lucky-holidays');

  return (
    <footer className="bg-foreground text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img
                src="/assets/generated/lucky-holidays-logo.dim_200x200.png"
                alt="Lucky Holidays Logo"
                className="w-12 h-12 object-contain rounded-full border-2 border-primary"
              />
              <div>
                <div className="font-display font-bold text-lg text-primary">LUCKY HOLIDAYS</div>
                <div className="text-xs tracking-widest uppercase text-muted-foreground">Tours & Travels</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted travel partner for unforgettable journeys. We make every trip a cherished memory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-primary-foreground mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Vehicles', path: '/vehicles' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Ratings & Reviews', path: '/ratings' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-primary-foreground mb-4 text-base">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:9663202989" className="hover:text-primary transition-colors">
                  +91 9663202989
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:lakkiholidays@gmail.com" className="hover:text-primary transition-colors break-all">
                  lakkiholidays@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} LUCKY HOLIDAYS. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-primary fill-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
