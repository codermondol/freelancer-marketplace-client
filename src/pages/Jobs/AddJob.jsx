import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Image as ImageIcon, Loader2, Plus } from "lucide-react";
import axiosInstance from "../../lib/axiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import jobCategories from "./jobCategories";

const FALLBACK_PREVIEW =
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=60&auto=format&fit=crop";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    category: jobCategories[0],
    summary: "",
    coverImage: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post("/jobs", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Your job is live on the marketplace!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate("/myAddedJobs");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Could not create the job.",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.coverImage.trim()) {
      toast.error("Title, summary, and cover image are required.");
      return;
    }
    mutation.mutate({
      title: form.title.trim(),
      category: form.category,
      summary: form.summary.trim(),
      coverImage: form.coverImage.trim(),
      postedBy: user?.displayName || "Anonymous",
      userEmail: user?.email,
    });
  };

  return (
    <section className="container-fm py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <span className="chip-fm">Post a job</span>
          <h1 className="heading-fm mt-3 text-3xl sm:text-4xl">
            Tell us what needs to be{" "}
            <span className="text-gradient">built</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Give freelancers the context they need to send their best proposals.
          </p>
        </div>

        <div className="card-fm grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_260px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-semibold"
              >
                Job title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Build a responsive landing page in React"
                className="input-fm"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Posted by
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input-fm bg-[rgb(var(--fm-bg))]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  User email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input-fm bg-[rgb(var(--fm-bg))]/40"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-semibold"
              >
                Category
              </label>
              <select
                id="category"
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
              <label
                htmlFor="coverImage"
                className="mb-1 block text-sm font-semibold"
              >
                Cover image URL
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="url"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://i.ibb.co/.../cover.jpg"
                className="input-fm"
                required
              />
              <p className="mt-1 text-xs text-muted">
                Use any direct image URL (imgbb, Unsplash, etc.).
              </p>
            </div>

            <div>
              <label
                htmlFor="summary"
                className="mb-1 block text-sm font-semibold"
              >
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={6}
                placeholder="Describe the deliverable, timelines, and any tech stack preferences."
                className="input-fm resize-y"
                required
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn-fm btn-fm-primary w-full"
            >
              {mutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Plus size={16} />
              )}
              {mutation.isPending ? "Posting…" : "Post the job"}
            </button>
          </form>

          <aside className="space-y-4">
            <p className="text-sm font-semibold">Preview</p>
            <div className="overflow-hidden rounded-2xl border border-app bg-[rgb(var(--fm-bg))]/40">
              <div className="aspect-video w-full overflow-hidden bg-[rgb(var(--fm-bg))]/40">
                {form.coverImage ? (
                  <img
                    src={form.coverImage}
                    alt="preview"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_PREVIEW;
                    }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted">
                    <ImageIcon size={28} />
                  </div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <span className="chip-fm">{form.category}</span>
                <h4 className="line-clamp-2 text-sm font-bold">
                  {form.title || "Your job title appears here"}
                </h4>
                <p className="clamp-3 text-xs text-muted">
                  {form.summary ||
                    "Your summary will preview live as you type."}
                </p>
                <p className="text-xs text-muted">
                  — {user?.displayName || "You"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
};

export default AddJob;
