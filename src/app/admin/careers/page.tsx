"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Plus, Briefcase, Pencil, Trash2, MapPin } from "lucide-react";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: "open" | "closed";
};

export default function CareersListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/careers");
    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this job posting? This can't be undone.")) return;
    await fetch(`/api/careers/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <PageHeader
        title="Careers"
        subtitle="Manage open roles listed on the careers page."
        action={
          <Button href="/admin/careers/new" variant="primary" icon={Plus}>
            New posting
          </Button>
        }
      />

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading && <div className="px-5 py-4 text-muted text-sm">Loading…</div>}

        {!loading && jobs.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No job postings yet"
            description="Add your first role, or run npm run seed to add sample content."
          />
        )}

        {!loading && jobs.length > 0 && (
          <div>
            <div className="flex px-5 py-3 border-b border-border text-muted text-xs font-medium">
              <div className="flex-[2]">Role</div>
              <div className="flex-1">Location</div>
              <div className="flex-1">Status</div>
              <div className="w-24 text-right">Actions</div>
            </div>
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center px-5 py-4 border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors group"
              >
                <div className="flex-[2] min-w-0 pr-4">
                  <p className="text-foreground text-sm font-medium truncate">{job.title}</p>
                  <p className="text-muted-2 text-xs truncate mt-0.5">
                    {job.department} · {job.type}
                  </p>
                </div>
                <div className="flex-1 flex items-center gap-1 text-muted text-xs">
                  <MapPin size={12} strokeWidth={1.75} />
                  {job.location}
                </div>
                <div className="flex-1">
                  <Badge variant={job.status === "open" ? "success" : "neutral"}>
                    {job.status === "open" ? "Open" : "Closed"}
                  </Badge>
                </div>
                <div className="w-24 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/careers/${job.id}/edit`}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-surface-3"
                    aria-label="Edit"
                  >
                    <Pencil size={14} strokeWidth={1.75} />
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
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
