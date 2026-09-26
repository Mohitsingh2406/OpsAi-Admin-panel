"use client";

import { Bell, ChevronRight, Command, HelpCircle, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const names: Record<string, string> = {
  "/admin": "Command Center",
  "/admin/activity": "Activity",
  "/admin/blog": "Blog",
  "/admin/contact": "Contacts",
  "/admin/careers": "Careers",
  "/admin/applications": "Applications",
  "/admin/media": "Media Library",
  "/admin/seo": "SEO & Pages",
  "/admin/system": "System Health",
  "/admin/settings": "Settings",
};

export default function Topbar({ email }: { email: string }) {
  const pathname = usePathname();
  const page = names[pathname] || "Admin";
  const initials = email.split("@")[0].slice(0, 2).toUpperCase();

  return (
    <header className="h-[76px] border-b border-white/[0.07] flex items-center justify-between px-8 shrink-0 bg-[#080909]/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/30">OpsAI</span><ChevronRight size={13} className="text-white/15" />
        <span className="text-white/75 font-medium">{page}</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="top-icon"><Search size={16} /><span className="hidden xl:inline text-[10px] text-white/30 ml-1">Search</span><kbd className="hidden xl:inline text-[9px] border border-white/10 rounded px-1.5 py-0.5 text-white/25">⌘K</kbd></button>
        <button className="top-icon"><HelpCircle size={16} /></button>
        <button className="top-icon relative"><Bell size={16} /><span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-300 rounded-full ring-2 ring-[#080909]" /></button>
        <div className="h-6 w-px bg-white/[0.08] mx-1" />
        <div className="flex items-center gap-2.5 pl-1">
          <div className="text-right hidden sm:block"><p className="text-white/70 text-xs font-medium">Admin</p><p className="text-white/25 text-[10px] mt-0.5">{email}</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/15 to-white/[0.03] border border-white/10 flex items-center justify-center"><span className="text-white/70 text-[11px] font-semibold">{initials}</span></div>
        </div>
      </div>
    </header>
  );
}
