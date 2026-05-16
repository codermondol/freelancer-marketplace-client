import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Star } from 'lucide-react';

const showcase = [
  {
    name: 'Aarav Sen',
    role: 'Brand Designer',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&q=70&auto=format&fit=crop',
  },
  {
    name: 'Maya Khan',
    role: 'Web Developer',
    img: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=160&q=70&auto=format&fit=crop',
  },
  {
    name: 'Tashi Wang',
    role: 'Motion Artist',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=70&auto=format&fit=crop',
  },
];

const Banner = () => {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-[rgb(var(--fm-primary))]/30 blur-3xl"
      />
      <div className="container-fm relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <span className="chip-fm w-fit">
              <Sparkles size={14} /> Verified freelance marketplace
            </span>

            <h1 className="heading-fm text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Hire reliable talent.
              <br />
              <span className="text-gradient">Ship work that lasts.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              SkillForge connects ambitious teams with vetted independent
              professionals. Post a project, review proposals, and collaborate
              with confidence — escrow protection and milestone tracking
              included.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/addJob" className="btn-fm btn-fm-primary">
                Create a Job <ArrowRight size={16} />
              </Link>
              <Link to="/allJobs" className="btn-fm btn-fm-ghost">
                Browse Jobs
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[rgb(var(--fm-primary))]" />
                Escrow protected payments
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[rgb(var(--fm-primary))]" />
                Identity-verified talent
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-3xl bg-[rgb(var(--fm-secondary))]/30 blur-2xl sm:block" />
            <div className="absolute -bottom-8 -right-6 hidden h-32 w-32 rounded-3xl bg-[rgb(var(--fm-primary))]/30 blur-2xl sm:block" />

            <div className="card-fm relative space-y-4 overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Live talent board</p>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  72 online now
                </span>
              </div>

              <ul className="space-y-3">
                {showcase.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 rounded-2xl border border-app bg-[rgb(var(--fm-bg))]/40 p-3"
                  >
                    <img
                      src={s.img}
                      alt={s.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{s.name}</p>
                      <p className="text-xs text-muted">{s.role}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={12} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 border-t border-app pt-4 text-center">
                <div>
                  <p className="heading-fm text-2xl">12k+</p>
                  <p className="text-xs text-muted">Active jobs</p>
                </div>
                <div>
                  <p className="heading-fm text-2xl">98%</p>
                  <p className="text-xs text-muted">Completion</p>
                </div>
                <div>
                  <p className="heading-fm text-2xl">4.9</p>
                  <p className="text-xs text-muted">Avg rating</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
