import type { LucideIcon } from "lucide-react";
import { Activity, ArrowUpRight, Bell, FileText, Globe2, Mail, ShieldCheck, Users } from "lucide-react";
import { demoActivity } from "@/lib/demo";

export default function ActivityPage() {
  return <div className="space-y-6">
    <Header eyebrow="Observe" title="Activity" subtitle="A chronological record of important website and admin events." />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Mini label="Events today" value="42" icon={Activity} /><Mini label="Content changes" value="18" icon={FileText} /><Mini label="People events" value="11" icon={Users} /><Mini label="System checks" value="13" icon={ShieldCheck} />
    </div>
    <div className="card overflow-hidden"><div className="px-5 py-4 border-b border-white/[0.06] flex justify-between"><div><p className="eyebrow">Event stream</p><h2 className="text-sm font-semibold mt-1">Latest activity</h2></div><span className="text-[9px] text-white/25">Demo stream</span></div>
      {demoActivity.concat(demoActivity).map((a, i) => <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.05] last:border-0"><div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center"><EventIcon type={a.icon} /></div><div className="flex-1 min-w-0"><p className="text-xs text-white/70 truncate">{a.title}</p><p className="text-[10px] text-white/25 mt-1">{a.meta}</p></div><span className="hidden sm:block text-[9px] text-white/20">event-{String(i + 1).padStart(4, "0")}</span><ArrowUpRight size={13} className="text-white/15" /></div>)}
    </div>
  </div>
}
function Header({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) { return <div><p className="eyebrow">{eyebrow}</p><h1 className="text-2xl font-semibold tracking-[-0.04em] mt-1">{title}</h1><p className="text-xs text-white/32 mt-2">{subtitle}</p></div> }
function Mini({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) { return <div className="card p-4"><Icon size={15} className="text-white/30" /><p className="metric-value text-2xl font-semibold mt-3">{value}</p><p className="text-[9px] text-white/28 mt-1">{label}</p></div> }
function EventIcon({ type }: { type: string }) { const p = { size: 14 }; if (type === "message") return <Mail {...p} className="text-blue-300" />; if (type === "file" || type === "edit") return <FileText {...p} className="text-emerald-300" />; if (type === "briefcase" || type === "user") return <Users {...p} className="text-amber-300" />; if (type === "shield") return <ShieldCheck {...p} className="text-violet-300" />; return <Globe2 {...p} className="text-cyan-300" /> }
