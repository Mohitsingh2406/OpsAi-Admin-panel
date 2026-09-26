"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type CareerFormValues = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  status: "open" | "closed";
};

const inputClass =
  "focus-ring mt-1.5 w-full h-10 rounded-lg bg-background border border-border-strong px-3.5 text-sm text-foreground transition-shadow";

export default function CareerForm({
  initial,
  jobId,
}: {
  initial?: Partial<CareerFormValues>;
  jobId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CareerFormValues>({
    title: initial?.title || "",
    department: initial?.department || "",
    location: initial?.location || "",
    type: initial?.type || "Full-time",
    description: initial?.description || "",
    status: initial?.status || "open",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof CareerFormValues>(key: K, value: CareerFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    setSaving(true);

    const url = jobId ? `/api/careers/${jobId}` : "/api/careers";
    const method = jobId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save the posting.");
      return;
    }

    router.push("/admin/careers");
    router.refresh();
  }

  return (
    <div>
      <Link
        href="/admin/careers"
        className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.75} />
        Back to careers
      </Link>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-muted text-xs font-medium">Role title</label>
            <input
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Founding engineer"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-muted text-xs font-medium">Department</label>
              <input
                value={values.department}
                onChange={(e) => update("department", e.target.value)}
                placeholder="Engineering"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-muted text-xs font-medium">Location</label>
              <input
                value={values.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Remote / Bengaluru"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Employment type</label>
            <input
              value={values.type}
              onChange={(e) => update("type", e.target.value)}
              placeholder="Full-time"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Description</label>
            <textarea
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              rows={8}
              placeholder="Role responsibilities and requirements…"
              className="focus-ring mt-1.5 w-full rounded-lg bg-background border border-border-strong p-3.5 text-sm text-foreground transition-shadow resize-y"
            />
          </div>
          <div>
            <label className="text-muted text-xs font-medium">Status</label>
            <select
              value={values.status}
              onChange={(e) => update("status", e.target.value as "open" | "closed")}
              className={inputClass}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
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
            {saving ? "Saving…" : jobId ? "Save changes" : "Create posting"}
          </Button>
          <Button href="/admin/careers" variant="ghost">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
