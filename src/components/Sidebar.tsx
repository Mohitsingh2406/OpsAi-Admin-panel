"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity, BarChart3, Briefcase, FileText, Globe2, LayoutDashboard, LogOut,
  Mail, Megaphone, Newspaper, Search, Settings, ShieldCheck, Sparkles,
  UploadCloud, Users, X,
} from "lucide-react";

const groups = [
  { label: "Overview", links: [
    { href: "/admin", label: "Command Center", icon: LayoutDashboard },
    { href: "/admin/activity", label: "Activity", icon: Activity },
  ]},
  { label: "Content & People", links: [
    { href: "/admin/blog", label: "Blog", icon: Newspaper },
    { href: "/admin/contact", label: "Contacts", icon: Mail },
    { href: "/admin/careers", label: "Careers", icon: Briefcase },
    { href: "/admin/applications", label: "Applications", icon: Users },
    { href: "/admin/media", label: "Media Library", icon: UploadCloud },
  ]},
  { label: "Website", links: [
    { href: "/admin/seo", label: "SEO & Pages", icon: Globe2 },
  ]},
  { label: "System", links: [
    { href: "/admin/system", label: "System Health", icon: ShieldCheck },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-[272px] shrink-0 border-r border-white/[0.07] flex flex-col min-h-screen bg-[#080909]/95 backdrop-blur-xl">
      <div className="h-[76px] px-5 border-b border-white/[0.07] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="brand-mark"><span>O</span></div>
          <div>
            <p className="text-white text-[15px] font-semibold tracking-tight">Ops<span className="text-white/40">AI</span></p>
            <p className="text-[9px] text-white/35 uppercase tracking-[0.22em] mt-0.5">Control Center</p>
          </div>
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

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
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
        <a href="https://opsai.co.in" target="_blank" rel="noopener noreferrer" className="nav-item mb-1">
          <Globe2 size={16} />
          <span>View live website</span>
          <span className="ml-auto text-white/20">↗</span>
        </a>
        <button onClick={handleLogout} className="nav-item w-full text-white/40 hover:text-red-300 hover:bg-red-500/[0.06]">
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
        <div className="mt-3 rounded-xl bg-white/[0.025] border border-white/[0.06] p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={12} className="text-emerald-300" />
            <span className="text-[10px] font-medium text-white/65">Demo environment</span>
          </div>
          <p className="text-[9px] text-white/30 leading-relaxed">Sample content is enabled so you can explore the full console before connecting production data.</p>
        </div>
      </div>
    </aside>
  );
}
