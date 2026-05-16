import { Link } from 'react-router';
import { ArrowUpRight, CalendarDays, Tag, UserRound } from 'lucide-react';

const formatDate = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const FALLBACK =
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=60&auto=format&fit=crop';

const JobCard = ({ job }) => {
  if (!job) return null;
  const { _id, title, postedBy, category, summary, coverImage, postedAt } = job;
  return (
    <article className="card-fm flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={coverImage || FALLBACK}
          onError={(e) => {
            e.currentTarget.src = FALLBACK;
          }}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip-fm">
            <Tag size={12} /> {category || 'General'}
          </span>
          {postedAt && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <CalendarDays size={12} /> {formatDate(postedAt)}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-app">
          {title}
        </h3>
        <p className="clamp-3 text-sm text-muted">{summary}</p>
        <div className="mt-auto flex items-center justify-between border-t border-app pt-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <UserRound size={14} />
            <span className="truncate">{postedBy}</span>
          </div>
          <Link
            to={`/allJobs/${_id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--fm-primary))] transition hover:gap-2"
          >
            View Details <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
