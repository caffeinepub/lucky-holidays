import { Link, useRouterState } from "@tanstack/react-router";
import { Car, Home, Info, Mail, Star } from "lucide-react";
import type { ReactNode } from "react";
import { SiWhatsapp } from "react-icons/si";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const bottomNavLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Info },
  { label: "Vehicles", path: "/vehicles", icon: Car },
  { label: "Contact", path: "/contact", icon: Mail },
  { label: "Ratings", path: "/ratings", icon: Star },
];

function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-stretch"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {bottomNavLinks.map(({ label, path, icon: Icon }) => {
        const isActive = currentPath === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon
              size={22}
              className={isActive ? "stroke-[2.5]" : "stroke-[1.5]"}
            />
            <span className="text-[10px] font-medium leading-none">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Extra bottom padding on mobile to account for bottom nav */}
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />

      {/* Bottom Navigation - mobile only */}
      <BottomNav />

      {/* WhatsApp Floating Button - raised above bottom nav on mobile */}
      <a
        href="https://wa.me/919663202989"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp size={28} />
      </a>
    </div>
  );
}
