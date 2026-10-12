import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-foreground/10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          
          {/* Brand & Closing Narrative */}
          <div className="flex flex-col items-start max-w-md">
            <Link 
              href="/" 
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors mb-6" 
              aria-label="I-Vision Home"
            >
              <span className="font-logo text-brand-logo tracking-brand leading-none font-normal whitespace-nowrap">
                I-VISION
              </span>
            </Link>

            <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-3 leading-snug">
              See things differently.
            </h2>

            <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-8 max-w-sm">
              Eyewear shaped for the way you move through the world. Considered forms and everyday clarity.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-sans">
              <Link 
                href="/eyeglasses" 
                className="group inline-flex items-center font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
              >
                <span className="underline underline-offset-4 decoration-foreground/30 group-hover:decoration-foreground transition-colors">
                  Explore eyeglasses
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link 
                href="/sunglasses" 
                className="group inline-flex items-center text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
              >
                <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                  View sunglasses
                </span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Navigation Tracks */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 lg:gap-28">
            
            {/* Column 1: Collection */}
            <nav aria-label="Collections navigation">
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/45 block mb-5 font-medium">
                Collection
              </span>
              <ul className="flex flex-col space-y-3.5 text-xs font-sans uppercase tracking-[0.12em]">
                <li>
                  <Link 
                    href="/eyeglasses" 
                    className="text-foreground/75 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                  >
                    Eyeglasses
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/sunglasses" 
                    className="text-foreground/75 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                  >
                    Sunglasses
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/find-your-frame" 
                    className="text-foreground/75 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                  >
                    Find your frame
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Column 2: The House & Connect */}
            <div className="flex flex-col">
              <nav aria-label="About navigation">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/45 block mb-5 font-medium">
                  The House
                </span>
                <ul className="flex flex-col space-y-3.5 text-xs font-sans uppercase tracking-[0.12em] mb-8">
                  <li>
                    <Link 
                      href="/about" 
                      className="text-foreground/75 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
                    >
                      About I-Vision
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Social Channels (Dummy Display Icons — No Links) */}
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/45 block mb-3.5 font-medium">
                  Social
                </span>
                <div className="flex items-center gap-4 text-foreground/60 select-none" aria-label="Social media channels">
                  {/* Instagram */}
                  <span
                    className="hover:text-foreground transition-colors cursor-default"
                    title="Instagram"
                    aria-label="Instagram"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </span>

                  {/* X / Twitter */}
                  <span
                    className="hover:text-foreground transition-colors cursor-default"
                    title="X"
                    aria-label="X"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>

                  {/* Facebook */}
                  <span
                    className="hover:text-foreground transition-colors cursor-default"
                    title="Facebook"
                    aria-label="Facebook"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </span>

                  {/* Pinterest */}
                  <span
                    className="hover:text-foreground transition-colors cursor-default"
                    title="Pinterest"
                    aria-label="Pinterest"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
          <p className="text-sm font-sans tracking-wide text-foreground/50">
            © {currentYear} I-Vision.
          </p>
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-foreground/40">
                Developed by
              </span>
              <a 
                href="https://echo11.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
              >
                <Image 
                  src="/images/echo11.png" 
                  alt="Echo11 Labs" 
                  width={14} 
                  height={14} 
                  className="opacity-50 group-hover:opacity-100 transition-opacity rounded-sm" 
                />
                <span className="text-[11px] font-sans tracking-widest font-semibold text-foreground/60 group-hover:text-foreground transition-colors">
                  echo11.labs
                </span>
              </a>
            </div>
            <a 
              href="mailto:echo11.labs@gmail.com" 
              className="text-[10px] font-mono text-foreground/30 hover:text-foreground/70 transition-colors uppercase tracking-[0.15em] mt-0.5"
            >
              echo11.labs@gmail.com
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
