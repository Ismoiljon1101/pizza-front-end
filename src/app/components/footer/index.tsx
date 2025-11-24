import React from "react";
import { Link } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Orders", href: "/orders", protected: true },
  { label: "Help", href: "/help" },
];

const contactInfo = [
  { label: "Location", value: "Downtown, Dubai", icon: "📍" },
  { label: "Phone", value: "+971 4 554 7777", icon: "📞" },
  { label: "Email", value: "contact@pizzahouse.com", icon: "✉️" },
  { label: "Hours", value: "Open 24/7", icon: "🕒" },
];

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <footer className="relative mt-12 md:mt-24 pt-8 md:pt-12 pb-6 md:pb-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-primary/10 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-2 md:px-4">
        <div className="glass rounded-xl md:rounded-[2rem] p-4 md:p-8 lg:p-12 relative overflow-hidden border border-white/20">
          <div className="grid gap-6 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-3 md:space-y-4 lg:col-span-1">
              <Link to="/" className="inline-block">
                <img className="w-20 md:w-28 drop-shadow-md hover:scale-105 transition-transform duration-300" src={"/icons/burak.svg"} alt="brand logo" />
              </Link>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Welcome to pizza paradise! Crafted with passion, delivered with heart 24/7.
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                {["facebook", "twitter", "instagram", "youtube"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="glass-panel flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full transition-all hover:bg-primary hover:text-white hover:scale-110 group"
                  >
                    <img
                      src={`/icons/${icon}.svg`}
                      alt={icon}
                      className="h-3 w-3 md:h-4 md:w-4 opacity-60 transition group-hover:opacity-100 group-hover:brightness-200"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary mb-3 md:mb-4">
                Explore
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.map((item) => {
                  if (item.protected && !authMember) return null;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-xs md:text-sm text-muted-foreground transition-all hover:text-primary hover:pl-2 flex items-center gap-2"
                      >
                        <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary/50" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Column 1 */}
            <div>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary mb-3 md:mb-4">
                Contact
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {contactInfo.slice(0, 2).map((item) => (
                  <li key={item.label} className="flex items-start gap-2 md:gap-3 group">
                    <span className="flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm md:text-base group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
                        {item.label}
                      </span>
                      <p className="text-xs md:text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column 2 */}
            <div>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary mb-3 md:mb-4">
                Info
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {contactInfo.slice(2).map((item) => (
                  <li key={item.label} className="flex items-start gap-2 md:gap-3 group">
                    <span className="flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm md:text-base group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
                        {item.label}
                      </span>
                      <p className="text-xs md:text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-10 border-t border-white/10 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-[10px] md:text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Pizza House. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
