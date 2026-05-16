import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Briefcase, LogOut, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { to: '/', label: 'Home', exact: true },
  { to: '/allJobs', label: 'All Jobs' },
  { to: '/addJob', label: 'Add a Job', private: true },
  { to: '/my-accepted-tasks', label: 'My Accepted Tasks', private: true },
  { to: '/myAddedJobs', label: 'My Added Jobs', private: true },
];

const NavBar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.message || 'Sign out failed');
    }
  };

  const visibleItems = navItems.filter((item) => !item.private || !!user);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition ${
        scrolled
          ? 'border-b border-app bg-[rgb(var(--fm-surface))]/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-fm flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[rgb(var(--fm-primary))] to-[rgb(var(--fm-secondary))] text-white shadow-lg shadow-[rgb(var(--fm-primary))]/30">
            <Briefcase size={18} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Skill<span className="text-gradient">Forge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `nav-link-fm ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <div className="group relative">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?background=6d28d9&color=fff&name=${encodeURIComponent(
                      user.displayName || user.email || 'U'
                    )}`
                  }
                  alt={user.displayName || 'user'}
                  className="h-10 w-10 cursor-pointer rounded-full border-2 border-[rgb(var(--fm-primary))]/50 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute right-0 top-full mt-2 min-w-[180px] origin-top-right rounded-xl border border-app bg-surface p-3 text-sm opacity-0 shadow-2xl shadow-black/10 transition group-hover:pointer-events-auto group-hover:opacity-100">
                  <p className="font-semibold">{user.displayName || 'User'}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn-fm btn-fm-ghost hidden md:inline-flex"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="btn-fm btn-fm-ghost">
                Login
              </Link>
              <Link to="/register" className="btn-fm btn-fm-primary">
                Register
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-app bg-surface lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-fm pb-4">
            <div className="rounded-2xl border border-app bg-surface p-3 shadow-xl">
              <ul className="flex flex-col">
                {visibleItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.exact}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm font-medium ${
                          isActive
                            ? 'bg-[rgb(var(--fm-primary))]/10 text-[rgb(var(--fm-primary))]'
                            : 'text-app hover:bg-[rgb(var(--fm-primary))]/5'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-col gap-2 border-t border-app pt-3">
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="btn-fm btn-fm-ghost w-full"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="btn-fm btn-fm-ghost w-full"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="btn-fm btn-fm-primary w-full"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
