import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="w-[1440px] max-w-full mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-content/70 hover:text-neutral-content transition">Home</Link></li>
              <li><Link to="/jobs" className="text-neutral-content/70 hover:text-neutral-content transition">All Jobs</Link></li>
              <li><Link to="/about" className="text-neutral-content/70 hover:text-neutral-content transition">About</Link></li>
              <li><Link to="/contact" className="text-neutral-content/70 hover:text-neutral-content transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Important Link</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-primary hover:underline transition">Login Now</Link></li>
              <li><Link to="/myaddedjobs" className="text-primary hover:underline transition">Post a Job</Link></li>
              <li><Link to="/jobs" className="text-primary hover:underline transition">Find a Job</Link></li>
              <li><Link to="/myaccepttasks" className="text-primary hover:underline transition">My Accepted Tasks</Link></li>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h3 className="font-bold text-lg mb-4">Terms</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-content/70 hover:text-neutral-content transition">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-content/70 hover:text-neutral-content transition">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-content/70 hover:text-neutral-content transition">Bid Policy</a></li>
              <li><a href="#" className="text-neutral-content/70 hover:text-neutral-content transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
                <span className="text-neutral-content/70 text-sm">2118 Thornridge Cir. Syracuse, New York</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/>
                </svg>
                <span className="text-neutral-content/70 text-sm">+1-666-0121</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                </svg>
                <span className="text-neutral-content/70 text-sm">freelancerhub@gmail.com</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-5">
              <p className="font-bold mb-3">Follow Us</p>
              <div className="flex gap-2">
                {/* Facebook */}
                <a href="#" className="w-9 h-9 rounded-md bg-neutral-focus flex items-center justify-center hover:bg-primary transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                {/* X / Twitter */}
                <a href="#" className="w-9 h-9 rounded-md bg-neutral-focus flex items-center justify-center hover:bg-primary transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.058 2.25H8.08l4.261 5.638 5.903-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-9 h-9 rounded-md bg-neutral-focus flex items-center justify-center hover:bg-primary transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-9 h-9 rounded-md bg-neutral-focus flex items-center justify-center hover:bg-primary transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-content/10">
        <div className="w-[1440px] max-w-full mx-auto py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-neutral-content/50">
          <p>&copy; {new Date().getFullYear()} FreelancerHub. All rights reserved.</p>
          <p>Built with ❤️ for freelancers worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
