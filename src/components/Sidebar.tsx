"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity, BarChart3, Briefcase, FileText, Globe2, LayoutDashboard, LogOut,
  Mail, Megaphone, Newspaper, Search, Settings, ShieldCheck, Sparkles,
  UploadCloud, Users, X, ClipboardList
} from "lucide-react";
import { clearSessionData, logActivity } from "@/lib/audit-store";

const groups = [
  { label: "Content & People", links: [
    { href: "/admin/blog", label: "Blog", icon: Newspaper },
    { href: "/admin/contact", label: "Contacts", icon: Mail },
    { href: "/admin/careers", label: "Careers", icon: Briefcase },
    { href: "/admin/applications", label: "Applications", icon: Users },
  ]},
  { label: "System", links: [
    { href: "/admin/audit-trail", label: "Audit Trail", icon: ClipboardList }
  ]}
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    logActivity({
        action: "LOGOUT",
        module: "Authentication",
        description: "User logged out from the admin panel",
        status: "SUCCESS"
    });
    
    setTimeout(() => {
        clearSessionData();
        router.push("/login");
        router.refresh();
    }, 100);
  }

  return (
    <aside className="w-[272px] shrink-0 border-r border-white/[0.07] flex flex-col min-h-screen bg-[var(--surface)]/95 backdrop-blur-xl">
      <div className="h-[76px] px-5 border-b border-white/[0.07] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16 5 A 11 11 0 1 0 27 16" stroke="#f8faf9" strokeWidth="6.5" />
            <path d="M 16 1.75 A 14.25 14.25 0 0 1 30.25 16" stroke="var(--accent-2)" strokeWidth="2" />
            <path d="M 16 8.25 A 7.75 7.75 0 0 1 23.75 16" stroke="var(--accent-2)" strokeWidth="2" />
          </svg>
          <p className="text-white text-[19px] font-semibold tracking-tight">
            Ops<span className="text-[var(--accent-2)]">AI</span>
          </p>
        </Link>
        <div className="live-dot" title="System operational" />
      </div>

      <div className="px-3 py-4 border-b border-white/[0.05]">
        <button className="w-full h-10 rounded-xl bg-white/[0.035] border border-white/[0.07] px-3 flex items-center gap-2.5 text-left hover:bg-white/[0.06] transition-colors">
          <Search size={15} className="text-white/40" />
          <span className="text-xs text-white/35 flex-1">Search anything</span>
          <kbd className="text-[9px] text-white/30 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">{group.label}</p>
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const Icon = link.icon;
                const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href} className={`nav-item ${active ? "nav-active" : ""}`}>
                    <Icon size={16} strokeWidth={1.7} />
                    <span>{link.label}</span>
                    {link.label === "Contacts" && <span className="ml-auto nav-count">7</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/[0.07]">
        <Link href="/admin/settings" className="nav-item w-full mb-1">
          <Settings size={16} />
          <span>Settings</span>
        </Link>
        <button onClick={handleLogout} className="nav-item w-full text-white/40 hover:text-red-300 hover:bg-red-500/[0.06]">
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
