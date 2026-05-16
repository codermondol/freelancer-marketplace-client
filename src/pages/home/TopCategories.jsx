import { Link } from 'react-router';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';

const categories = [
  {
    name: 'Web Development',
    description: 'React, Next.js, full-stack engineers',
    image:
      'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=900&q=60&auto=format&fit=crop',
  },
  {
    name: 'Digital Marketing',
    description: 'SEO, Ads, growth specialists',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=60&auto=format&fit=crop',
  },
  {
    name: 'Graphics Designing',
    description: 'Branding, logo, illustration',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=900&q=60&auto=format&fit=crop',
  },
  {
    name: 'Content Writing',
    description: 'Copywriting, blogs, scripts',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=60&auto=format&fit=crop',
  },
  {
    name: 'Video & Animation',
    description: 'Editing, motion, explainer',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=60&auto=format&fit=crop',
  },
  {
    name: 'Mobile Development',
    description: 'React Native, Flutter, iOS, Android',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=60&auto=format&fit=crop',
  },
];

const TopCategories = () => {
  return (
    <section className="container-fm py-16 sm:py-20">
      <SectionHeader
        eyebrow="Top categories"
        title="Find experts across every craft"
        subtitle="From product design to performance engineering, browse the categories that move your business forward."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Link
              to={`/allJobs?category=${encodeURIComponent(cat.name)}`}
              className="card-fm group relative block h-44 overflow-hidden sm:h-56"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-base font-bold sm:text-lg">{cat.name}</h3>
                <p className="text-xs opacity-80 sm:text-sm">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TopCategories;
