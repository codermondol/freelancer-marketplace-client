import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Loader2, Save } from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import jobCategories from './jobCategories';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: '',
    category: jobCategories[0],
    summary: '',
    coverImage: '',
  });

  const { data: job, isLoading, isError, error } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/${id}`);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || '',
        category: job.category || jobCategories[0],
        summary: job.summary || '',
        coverImage: job.coverImage || '',
      });
    }
  }, [job]);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.patch(`/jobs/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Job updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      navigate('/myAddedJobs');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || 'Update failed.');
    },
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

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
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 text-center">
          <span className="chip-fm">Edit posting</span>
          <h1 className="heading-fm mt-3 text-3xl sm:text-4xl">
            Update your <span className="text-gradient">job</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Refine the title, category, summary or cover image — changes go live instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-fm space-y-5 p-6 sm:p-8">
          <div>
            <label className="mb-1 block text-sm font-semibold">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input-fm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-fm"
            >
              {jobCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Cover image URL</label>
            <input
              type="url"
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              className="input-fm"
              required
            />
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="preview"
                className="mt-2 aspect-video w-full rounded-xl object-cover"
              />
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Summary</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={6}
              className="input-fm resize-y"
              required
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn-fm btn-fm-primary sm:flex-1"
            >
              {mutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {mutation.isPending ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-fm btn-fm-ghost sm:w-44"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateJob;
