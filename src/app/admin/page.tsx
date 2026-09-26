import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight, BarChart3, Bell, BookOpen, BriefcaseBusiness, CheckCircle2,
  ChevronRight, CircleDot, Clock3, FileText, Globe2, Mail, MessageSquare,
  Network, Plus, ShieldCheck, Sparkles, TriangleAlert, Users, Zap,
} from "lucide-react";
import { db } from "@/lib/firebaseAdmin";
import { demoActivity, estate, weeklyTraffic } from "@/lib/demo";

async function getCounts() {
  try {
    const [contacts, blogs, careers] = await Promise.all([
      db().collection("contactSubmissions").count().get(),
      db().collection("blogPosts").count().get(),
      db().collection("careers").count().get(),
    ]);
    return { contacts: contacts.data().count, blogs: blogs.data().count, careers: careers.data().count, connected: true };
  } catch {
    return { contacts: 24, blogs: 18, careers: 7, connected: false };
  }
}

const stage = [
  { n: "01", title: "Connect", text: "Systems, agents & tools", icon: Network },
  { n: "02", title: "Understand", text: "Inventory & ownership", icon: BarChart3 },
  { n: "03", title: "Govern", text: "Identity, policy & risk", icon: ShieldCheck },
  { n: "04", title: "Control", text: "Approvals & execution", icon: CheckCircle2 },
  { n: "05", title: "Observe", text: "Traces, incidents & audit", icon: CircleDot },
  { n: "06", title: "Improve", text: "Evaluation & posture", icon: Zap },
];

const statusTone: Record<string, string> = {
  Acting: "text-emerald-300 bg-emerald-300/[0.08] border-emerald-300/10",
  Watched: "text-amber-300 bg-amber-300/[0.08] border-amber-300/10",
};

export default async function DashboardPage() {
  const counts = await getCounts();
  const unread = 7;
  const published = 12;
  const openRoles = 4;

  return (
    <div className="space-y-6">
      <section className="card data-grid relative overflow-hidden p-6 lg:p-7">
        <div className="absolute -right-24 -top-28 w-80 h-80 rounded-full bg-emerald-300/[0.035] blur-3xl" />
        <div className="relative flex flex-col xl:flex-row xl:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3"><span className="eyebrow">OpsAI Control Center</span><span className="px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider text-emerald-300 bg-emerald-300/[0.08] border border-emerald-300/10">Demo data</span></div>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-[-0.04em] text-white">Operate the website with confidence.</h1>
            <p className="text-sm text-white/38 max-w-2xl mt-2 leading-6">One place to manage content, people, website health and the operational signals around opsai.co.in.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/blog/new" className="h-10 px-4 rounded-xl bg-white text-black text-xs font-semibold flex items-center gap-2 hover:bg-white/90"><Plus size={14}/> New article</Link>
            <Link href="/admin/careers/new" className="h-10 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/75 text-xs font-medium flex items-center gap-2 hover:bg-white/[0.07]"><BriefcaseBusiness size={14}/> Post role</Link>
          </div>
        </div>
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
          <Metric label="Contact enquiries" value={counts.contacts} delta="+18%" icon={Mail} />
          <Metric label="Published articles" value={published} delta="+3 this month" icon={BookOpen} />
          <Metric label="Open positions" value={openRoles} delta="24 applications" icon={BriefcaseBusiness} />
          <Metric label="Unread inbox" value={unread} delta="Needs attention" icon={Bell} alert />
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        <div className="card p-5 lg:p-6">
          <div className="flex items-start justify-between mb-5"><div><p className="eyebrow">Website activity</p><h2 className="text-base font-semibold text-white mt-1">Content traffic</h2></div><div className="text-right"><p className="metric-value text-xl font-semibold text-white">18.4k</p><p className="text-[10px] text-emerald-300 mt-0.5">↑ 12.8% this week</p></div></div>
          <div className="h-40 flex items-end gap-2 px-1">
            {weeklyTraffic.map((v, i) => <div key={i} className="flex-1 h-full flex items-end group"><div className="w-full rounded-t-md bg-gradient-to-t from-emerald-300/[0.13] to-emerald-200/[0.65] group-hover:from-emerald-300/[0.2]" style={{height:`${v}%`}} /></div>)}
          </div>
          <div className="flex justify-between mt-3 text-[9px] text-white/20"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </div>
        <div className="card p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5"><div><p className="eyebrow">System pulse</p><h2 className="text-base font-semibold text-white mt-1">All services operational</h2></div><CheckCircle2 size={19} className="text-emerald-300" /></div>
          <div className="space-y-2.5">
            {["Authentication", "Firestore", "Content API", "Career API", "Contact API"].map((name) => <div key={name} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0"><span className="text-xs text-white/55">{name}</span><span className="flex items-center gap-1.5 text-[10px] text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-300"/>Operational</span></div>)}
          </div>
          <Link href="/admin/system" className="mt-4 flex items-center justify-between text-[10px] text-white/35 hover:text-white/65">View system health <ArrowUpRight size={13}/></Link>
        </div>
      </section>

      <section className="card p-5 lg:p-6">
        <div className="flex items-end justify-between mb-5"><div><p className="eyebrow">Product language</p><h2 className="text-base font-semibold text-white mt-1">The OpsAI operating loop</h2><p className="text-xs text-white/30 mt-1">The admin experience mirrors the six-stage structure of the public product.</p></div><Link href="/admin/system" className="hidden sm:flex items-center gap-1 text-[10px] text-white/35 hover:text-white">Explore system <ArrowUpRight size={12}/></Link></div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
          {stage.map((s, i) => { const Icon = s.icon; return <div key={s.title} className="group relative rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 hover:bg-white/[0.035] hover:border-white/[0.1] transition"><div className="flex items-center justify-between mb-6"><span className="text-[9px] text-white/20 font-mono">{s.n}</span><Icon size={14} className="text-white/35 group-hover:text-emerald-300 transition"/></div><p className="text-xs font-medium text-white/80">{s.title}</p><p className="text-[9px] leading-4 text-white/28 mt-1">{s.text}</p>{i<5 && <span className="hidden xl:block absolute -right-2 top-1/2 text-white/10">→</span>}</div> })}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-6">
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between"><div><p className="eyebrow">Sample estate</p><h2 className="text-sm font-semibold text-white mt-1">AI systems under observation</h2></div><span className="text-[9px] text-white/25">Illustrative data</span></div>
          <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-[9px] uppercase tracking-wider text-white/20"><th className="px-5 py-3 font-medium">System</th><th className="px-4 py-3 font-medium">Owner</th><th className="px-4 py-3 font-medium">Autonomy</th><th className="px-4 py-3 font-medium">State</th></tr></thead><tbody>{estate.map((row)=><tr key={row.name} className="border-t border-white/[0.05] hover:bg-white/[0.02]"><td className="px-5 py-3.5"><p className="font-mono text-[11px] text-white/75">{row.name}</p><p className="text-[9px] text-white/22 mt-0.5">{row.system}</p></td><td className="px-4 py-3.5 text-[10px] text-white/45">{row.owner}</td><td className="px-4 py-3.5 text-[10px] text-white/45">{row.autonomy}</td><td className="px-4 py-3.5"><span className={`px-2 py-1 rounded-full border text-[9px] ${statusTone[row.state]}`}>{row.state}</span></td></tr>)}</tbody></table></div>
        </div>
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between"><div><p className="eyebrow">Latest activity</p><h2 className="text-sm font-semibold text-white mt-1">What changed</h2></div><Link href="/admin/activity" className="text-[10px] text-white/30 hover:text-white">View all</Link></div>
          <div>{demoActivity.slice(0,6).map((a,i)=><div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-white/[0.05] last:border-0"><div className="mt-0.5 w-7 h-7 rounded-lg bg-white/[0.035] border border-white/[0.05] flex items-center justify-center"><ActivityIcon type={a.icon}/></div><div className="min-w-0"><p className="text-[11px] text-white/70 leading-4 truncate">{a.title}</p><p className="text-[9px] text-white/25 mt-0.5">{a.meta}</p></div></div>)}</div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Quick href="/admin/contact" icon={MessageSquare} title="Review inbox" sub="7 unread messages" />
        <Quick href="/admin/blog/new" icon={FileText} title="Write article" sub="Create a new post" />
        <Quick href="/admin/applications" icon={Users} title="Review applicants" sub="24 active applications" />
        <Quick href="/admin/seo" icon={Globe2} title="Check SEO" sub="5 tracked pages" />
      </section>
    </div>
  );
}

function Metric({ label, value, delta, icon: Icon, alert=false }: {label:string;value:number|string;delta:string;icon:LucideIcon;alert?:boolean}) { return <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4"><div className="flex items-center justify-between"><span className="text-[10px] text-white/35">{label}</span><Icon size={14} className={alert?"text-amber-300":"text-white/25"}/></div><div className="flex items-end gap-2 mt-3"><span className="metric-value text-2xl font-semibold text-white">{value}</span><span className={`text-[9px] mb-1 ${alert?"text-amber-300":"text-emerald-300"}`}>{delta}</span></div></div> }
function ActivityIcon({type}:{type:string}) { const props={size:13,strokeWidth:1.7}; if(type==="message") return <Mail {...props} className="text-blue-300"/>; if(type==="file") return <FileText {...props} className="text-emerald-300"/>; if(type==="briefcase") return <BriefcaseBusiness {...props} className="text-amber-300"/>; if(type==="shield") return <ShieldCheck {...props} className="text-violet-300"/>; if(type==="globe") return <Globe2 {...props} className="text-cyan-300"/>; return <Sparkles {...props} className="text-white/45"/> }
function Quick({href,icon:Icon,title,sub}:{href:string;icon:LucideIcon;title:string;sub:string}) { return <Link href={href} className="card card-hover p-4 flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center"><Icon size={15} className="text-white/45"/></div><div className="min-w-0"><p className="text-xs font-medium text-white/70">{title}</p><p className="text-[9px] text-white/25 mt-1 truncate">{sub}</p></div><ChevronRight size={13} className="ml-auto text-white/15"/></Link> }
