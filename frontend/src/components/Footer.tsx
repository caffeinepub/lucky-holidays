import { useNavigate } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'lucky-holidays');

  return (
    <footer className="text-white" style={{ backgroundColor: '#1a4731' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold text-yellow-300 tracking-widest mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              LUCKY HOLIDAYS
            </h3>
            <p className="text-green-200 text-sm leading-relaxed mb-4">
              Your trusted travel partner for unforgettable journeys across South India and beyond. Comfort, safety, and memories — guaranteed.
            </p>
            <p className="text-green-300 text-xs">
              ❤️ Swaroop Team
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-yellow-200 mb-4 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Vehicles', path: '/vehicles' },
                { label: 'Ratings & Reviews', path: '/ratings' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate({ to: link.path })}
                    className="text-green-200 hover:text-yellow-300 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-yellow-200 mb-4 tracking-wide uppercase text-sm">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-yellow-300 flex-shrink-0" />
                <a href="tel:9663202989" className="text-green-200 hover:text-yellow-300 text-sm transition-colors">
                  9663202989
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-yellow-300 flex-shrink-0" />
                <a href="mailto:lakkiholidays@gmail.com" className="text-green-200 hover:text-yellow-300 text-sm transition-colors break-all">
                  lakkiholidays@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-yellow-300 flex-shrink-0 mt-0.5" />
                <span className="text-green-200 text-sm">Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-green-400">
          <p>© {year} Lucky Holidays. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-red-400 fill-red-400 mx-0.5" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors mx-0.5"
            >
              caffeine.ai
            </a>
            {' '}Swaroop Team
          </p>
        </div>
      </div>
    </footer>
  );
}
