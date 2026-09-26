"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
};

const inputClass =
  "focus-ring mt-1.5 w-full h-10 rounded-lg bg-background border border-border-strong px-3.5 text-sm text-foreground transition-shadow";

export default function BlogForm({
  initial,
  postId,
}: {
  initial?: Partial<BlogFormValues>;
  postId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>({
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    status: initial?.status || "draft",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title.trim() || !values.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setError("");
    setSaving(true);

    const url = postId ? `/api/blog/${postId}` : "/api/blog";
    const method = postId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save the post.");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.75} />
        Back to blog posts
      </Link>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-muted text-xs font-medium">Title</label>
            <input
              value={values.title}
              onChange={(e) => {
                update("title", e.target.value);
                if (!postId) update("slug", slugify(e.target.value));
              }}
              placeholder="The control layer for enterprise AI"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Slug</label>
            <input
              value={values.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="control-layer-for-enterprise-ai"
              className={`${inputClass} font-mono text-xs`}
            />
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Excerpt</label>
            <input
              value={values.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              placeholder="A short one-line summary"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Content</label>
            <textarea
              value={values.content}
              onChange={(e) => update("content", e.target.value)}
              rows={10}
              placeholder="Write the post in markdown…"
              className="focus-ring mt-1.5 w-full rounded-lg bg-background border border-border-strong p-3.5 text-sm text-foreground transition-shadow resize-y"
            />
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Status</label>
            <select
              value={values.status}
              onChange={(e) => update("status", e.target.value as "draft" | "published")}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-danger-bg border border-[rgba(239,111,99,0.25)] rounded-lg px-3 py-2 mt-4">
            <p className="text-danger text-xs">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-2 mt-5">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : postId ? "Save changes" : "Create post"}
          </Button>
          <Button href="/admin/blog" variant="ghost">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
