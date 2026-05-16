import { Link, useRouteError } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();
  const is404 = !error || error?.status === 404;
  const code = is404 ? '404' : error?.status || 'Err';

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1000px 600px at 50% 0%, rgba(167,139,250,0.18), transparent 70%),radial-gradient(800px 500px at 50% 100%, rgba(56,189,248,0.15), transparent 70%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-fm relative max-w-lg p-10 text-center"
      >
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[rgb(var(--fm-primary))] to-[rgb(var(--fm-secondary))] text-white">
          <SearchX size={28} />
        </div>
        <p className="heading-fm select-none text-7xl leading-none sm:text-8xl">
          <span className="text-gradient">{code}</span>
        </p>
        <h1 className="mt-2 heading-fm text-2xl">
          {is404 ? 'Page not found' : 'Something went wrong'}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          {is404
            ? "The page you're looking for doesn't exist or has been moved."
            : error?.statusText || error?.message || 'An unexpected error occurred.'}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-fm btn-fm-primary">
            <Home size={16} /> Back to home
          </Link>
          <button type="button" onClick={() => window.history.back()} className="btn-fm btn-fm-ghost">
            <ArrowLeft size={16} /> Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
