import { Link } from 'react-router';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 12a10 10 0 1 0-11.563 9.875v-6.987H7.9V12h2.537V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563V12h2.773l-.443 2.888h-2.33v6.987A10.002 10.002 0 0 0 22 12z"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.78 13.019H3.555V9h3.562v11.452z"/>
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-app bg-[rgb(var(--fm-surface))]/70 backdrop-blur">
      <div className="container-fm py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[rgb(var(--fm-primary))] to-[rgb(var(--fm-secondary))] text-white">
                <Briefcase size={18} />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Skill<span className="text-gradient">Forge</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The trusted marketplace where independent talent and ambitious teams meet to build, ship, and grow together.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-app">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted transition hover:text-app">Home</Link></li>
              <li><Link to="/allJobs" className="text-muted transition hover:text-app">All Jobs</Link></li>
              <li><Link to="/addJob" className="text-muted transition hover:text-app">Post a Job</Link></li>
              <li><Link to="/my-accepted-tasks" className="text-muted transition hover:text-app">My Accepted Tasks</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-app">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted transition hover:text-app">Privacy Policy</a></li>
              <li><a href="#" className="text-muted transition hover:text-app">Terms of Service</a></li>
              <li><a href="#" className="text-muted transition hover:text-app">Trust & Safety</a></li>
              <li><a href="#" className="text-muted transition hover:text-app">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-app">Get in touch</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[rgb(var(--fm-primary))]" />
                <span>21 Innovation Lane, Dhaka 1207, BD</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[rgb(var(--fm-primary))]" />
                <span>+880 1700 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-[rgb(var(--fm-primary))]" />
                <a href="mailto:hello@skillforge.app" className="hover:text-app">hello@skillforge.app</a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2">
              <a aria-label="Facebook" href="#" className="grid h-9 w-9 place-items-center rounded-full border border-app text-muted transition hover:border-[rgb(var(--fm-primary))] hover:text-[rgb(var(--fm-primary))]">
                <FacebookIcon />
              </a>
              <a aria-label="X" href="#" className="grid h-9 w-9 place-items-center rounded-full border border-app text-muted transition hover:border-[rgb(var(--fm-primary))] hover:text-[rgb(var(--fm-primary))]">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.058 2.25H8.08l4.261 5.638 5.903-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a aria-label="LinkedIn" href="#" className="grid h-9 w-9 place-items-center rounded-full border border-app text-muted transition hover:border-[rgb(var(--fm-primary))] hover:text-[rgb(var(--fm-primary))]">
                <LinkedinIcon />
              </a>
              <a aria-label="Instagram" href="#" className="grid h-9 w-9 place-items-center rounded-full border border-app text-muted transition hover:border-[rgb(var(--fm-primary))] hover:text-[rgb(var(--fm-primary))]">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-app">
        <div className="container-fm flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>&copy; {year} SkillForge. All rights reserved.</p>
          <p>Crafted with care for an independent workforce.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
