import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Loader2, ShieldAlert, Trash2 } from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';

const DeleteJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: job, isLoading, isError, error } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(`/jobs/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Job deleted.');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      navigate('/myAddedJobs');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || 'Delete failed.');
    },
  });

  if (isLoading) return <LoadingSpinner fullscreen />;
  if (isError) {
    return (
      <div className="container-fm py-16 text-center text-red-500">
        {error?.message || 'Failed to load this job.'}
      </div>
    );
  }

  return (
    <section className="container-fm py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl"
      >
        <div className="card-fm space-y-5 p-7 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-500/10 text-red-500">
            <ShieldAlert size={28} />
          </div>
          <h1 className="heading-fm text-2xl">Delete this job?</h1>
          <p className="text-sm text-muted">
            You're about to permanently delete the job titled{' '}
            <span className="font-semibold text-app">"{job?.title}"</span>. This action cannot be undone.
          </p>

          {job?.coverImage && (
            <img
              src={job.coverImage}
              alt={job.title}
              className="mx-auto aspect-video w-full max-w-md rounded-xl object-cover"
            />
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-fm btn-fm-ghost sm:flex-1"
            >
              Keep job
            </button>
            <button
              type="button"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="btn-fm btn-fm-danger sm:flex-1"
            >
              {mutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              {mutation.isPending ? 'Deleting…' : 'Yes, delete'}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DeleteJob;
