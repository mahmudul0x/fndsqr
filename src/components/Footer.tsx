import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground pb-24 md:pb-8">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="font-heading text-2xl font-bold mb-4">Friends Square</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            A cozy modern dining experience in Dinajpur, Bangladesh. Where families and friends gather.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/menu", label: "Our Menu" },
              { to: "/reservation", label: "Book a Table" },
              { to: "/events", label: "Events" },
              { to: "/gallery", label: "Gallery" },
              { to: "/about", label: "About Us" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+880 1752 441799</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>Nayanpur Rd, Dinajpur, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>11 AM – 11 PM Daily</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Follow Us</h4>
          <a
            href="https://www.facebook.com/profile.php?id=61556723062242"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <Facebook className="w-5 h-5" />
            <span className="text-sm">Facebook</span>
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} Friends Square Restaurant. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
