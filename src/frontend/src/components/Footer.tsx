import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Vehicles", path: "/vehicles" },
  { label: "Contact", path: "/contact" },
  { label: "Ratings", path: "/ratings" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/lucky-holidays-highway-logo.dim_200x200.png"
                alt="LAKKI HOLIDAYS"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="font-display font-bold text-xl">
                  LAKKI HOLIDAYS
                </div>
                <div className="text-sm opacity-70">Your Travel Partner</div>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Making every journey memorable with comfortable, affordable, and
              reliable travel experiences across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:+919663202989" className="hover:underline">
                  +91 96632 02989
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <a
                  href="mailto:lakkiholidays@gmail.com"
                  className="hover:underline"
                >
                  lakkiholidays@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🕐</span>
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm opacity-70">
          <span>© {year} LAKKI HOLIDAYS. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400 fill-red-400" />{" "}
            by Swaroop Team
          </span>
        </div>
      </div>
    </footer>
  );
}
