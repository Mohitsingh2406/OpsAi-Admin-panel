"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { Mail, Trash2, Building2, ChevronDown } from "lucide-react";

type Submission = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  read: boolean;
};

export default function ContactListPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    setItems(data.submissions || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function toggleOpen(item: Submission) {
    setOpenId(openId === item.id ? null : item.id);
    if (!item.read) {
      await fetch(`/api/contact/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, read: true } : i)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    load();
  }

  const unreadCount = items.filter((i) => !i.read).length;

  function initials(name: string) {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div>
      <PageHeader
        title="Contact submissions"
        subtitle={
          unreadCount > 0
            ? `Messages sent through the site's contact form · ${unreadCount} unread`
            : "Messages sent through the site's contact form."
        }
      />

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading && <div className="px-5 py-4 text-muted text-sm">Loading…</div>}

        {!loading && items.length === 0 && (
          <EmptyState
            icon={Mail}
            title="No messages yet"
            description="Submissions from the site's contact form will show up here. Run npm run seed for sample data."
          />
        )}

        {items.map((item) => (
          <div key={item.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleOpen(item)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-2 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-surface-3 border border-border-strong flex items-center justify-center shrink-0">
                <span className="text-foreground text-xs font-medium">{initials(item.name)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-accent-2 shrink-0" />}
                  <p className={`text-sm truncate ${item.read ? "text-foreground" : "text-foreground font-medium"}`}>
                    {item.name}
                  </p>
                  <span className="text-muted-2 text-xs truncate">{item.email}</span>
                </div>
                <p className="text-muted text-xs truncate mt-0.5">{item.message}</p>
              </div>
              <ChevronDown
                size={16}
                strokeWidth={1.75}
                className={`text-muted shrink-0 transition-transform ${openId === item.id ? "rotate-180" : ""}`}
              />
            </button>

            {openId === item.id && (
              <div className="px-5 pb-5 pl-[4.25rem]">
                {item.company && (
                  <div className="flex items-center gap-1.5 text-muted-2 text-xs mb-2">
                    <Building2 size={12} strokeWidth={1.75} />
                    {item.company}
                  </div>
                )}
                <p className="text-foreground text-sm whitespace-pre-wrap leading-relaxed bg-background border border-border rounded-lg p-3.5">
                  {item.message}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-surface-2 border border-border-strong text-foreground text-xs font-medium hover:bg-surface-3"
                  >
                    <Mail size={13} strokeWidth={1.75} />
                    Reply by email
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-muted text-xs font-medium hover:text-danger hover:bg-danger-bg"
                  >
                    <Trash2 size={13} strokeWidth={1.75} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
