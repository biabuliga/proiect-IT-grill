import { Instagram, Facebook, Youtube, Twitch } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-6">
      <div className="container">
        <div className="flex items-center justify-center gap-6">
          {/* Contact */}
          <p className="text-primary-foreground font-medium">
            Contact
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a
              href="https://twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              <Twitch className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
