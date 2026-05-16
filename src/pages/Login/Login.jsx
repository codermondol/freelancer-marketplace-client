import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.1-5c-2 1.4-4.5 2.1-7.2 2.1-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.2 5.8l6.1 5C40.9 35.4 44 30.1 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
);

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const redirectTo = location.state?.from?.pathname || '/';

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email and password are required.');
      return;
    }
    setSubmitting(true);
    try {
      await signInUser(form.email, form.password);
      toast.success('Welcome back!');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message?.replace('Firebase:', '').trim() || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google.');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message?.replace('Firebase:', '').trim() || 'Google sign-in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-fm grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden flex-col gap-6 lg:flex"
      >
        <span className="chip-fm w-fit">For freelancers and clients</span>
        <h1 className="heading-fm text-4xl lg:text-5xl">
          Sign in to your <span className="text-gradient">SkillForge</span> dashboard.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted">
          Pick up where you left off, accept new tasks, or post your next project — all in one place.
        </p>
        <img
          src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=900&q=70&auto=format&fit=crop"
          alt="Freelancer working"
          className="aspect-[5/4] w-full rounded-3xl object-cover shadow-2xl shadow-[rgb(var(--fm-primary))]/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <div className="card-fm p-7 sm:p-8">
          <div className="mb-6">
            <h2 className="heading-fm text-2xl">Welcome back</h2>
            <p className="mt-1 text-sm text-muted">
              Log in to continue exploring projects and proposals.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                className="input-fm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="input-fm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-app"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <span className="text-xs text-muted">Forgot password?</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-fm btn-fm-primary w-full"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
              {submitting ? 'Signing in…' : 'Login'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-[rgb(var(--fm-border))]" />
            OR
            <span className="h-px flex-1 bg-[rgb(var(--fm-border))]" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className="btn-fm btn-fm-ghost w-full"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            New to SkillForge?{' '}
            <Link to="/register" className="font-semibold text-[rgb(var(--fm-primary))] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
