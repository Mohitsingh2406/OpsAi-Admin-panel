"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Plus, Newspaper, Pencil, Trash2 } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: "draft" | "published";
};

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This can't be undone.")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <PageHeader
        title="Blog posts"
        subtitle="Manage published and draft posts for the blog."
        action={
          <Button href="/admin/blog/new" variant="primary" icon={Plus}>
            New post
          </Button>
        }
      />

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading && (
          <div className="px-5 py-4 text-muted text-sm">Loading…</div>
        )}

        {!loading && posts.length === 0 && (
          <EmptyState
            icon={Newspaper}
            title="No blog posts yet"
            description="Create your first post, or run npm run seed to add sample content."
          />
        )}

        {!loading && posts.length > 0 && (
          <div>
            <div className="flex px-5 py-3 border-b border-border text-muted text-xs font-medium">
              <div className="flex-[2]">Title</div>
              <div className="flex-1">Status</div>
              <div className="w-24 text-right">Actions</div>
            </div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center px-5 py-4 border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors group"
              >
                <div className="flex-[2] min-w-0 pr-4">
                  <p className="text-foreground text-sm font-medium truncate">{post.title}</p>
                  {post.excerpt && (
                    <p className="text-muted-2 text-xs truncate mt-0.5">{post.excerpt}</p>
                  )}
                </div>
                <div className="flex-1">
                  <Badge variant={post.status === "published" ? "success" : "warning"}>
                    {post.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="w-24 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-surface-3"
                    aria-label="Edit"
                  >
                    <Pencil size={14} strokeWidth={1.75} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted hover:text-danger hover:bg-danger-bg"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
