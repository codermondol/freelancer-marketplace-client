import { motion } from 'framer-motion';
import { GitMerge, Handshake, ShieldCheck, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Escrow-secured payments',
    body: 'Funds are released only after you approve the milestone — no surprises, no risk.',
  },
  {
    icon: Handshake,
    title: 'Vetted, verified talent',
    body: 'Every freelancer is identity-verified and reviewed by past clients before joining.',
  },
  {
    icon: GitMerge,
    title: 'Collaborate in one place',
    body: 'Messaging, files, milestones, and reviews — the entire workflow lives on SkillForge.',
  },
  {
    icon: Sparkles,
    title: 'Built for craft',
    body: 'Curated categories and tasteful tooling so quality work always rises to the top.',
  },
];

const AboutPlatform = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-[60%] -translate-y-1/2 rounded-full bg-[rgb(var(--fm-secondary))]/20 blur-3xl"
      />
      <div className="container-fm relative">
        <SectionHeader
          eyebrow="About SkillForge"
          title="A marketplace built on trust"
          subtitle="We obsess over the details — from clear briefs to fast payouts — so you can spend your time doing the work that matters."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-fm flex h-full flex-col gap-3 p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[rgb(var(--fm-primary))] to-[rgb(var(--fm-secondary))] text-white">
                  <Icon size={20} />
                </span>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;
