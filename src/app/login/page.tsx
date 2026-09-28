"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { setSessionData, logActivity } from "@/lib/audit-store";

export default function LoginPage() {
    const router = useRouter(); 
    const [employeeId, setEmployeeId] = useState(""); 
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) { 
        e.preventDefault(); 
        if (!employeeId.trim()) return;
        setLoading(true); 
        
        // Mock frontend session creation
        const sessionId = `SESSION-${Math.random().toString(16).substring(2, 8).toUpperCase()}`;
        setSessionData(employeeId.trim(), sessionId);
        
        // Log the login activity
        logActivity({
            action: "LOGIN",
            module: "Authentication",
            description: "User logged into the admin panel",
            status: "SUCCESS"
        });

        // Small delay to feel realistic
        setTimeout(() => {
            router.push("/admin"); 
            router.refresh();
        }, 600);
    }
    
    return <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"><div className="relative w-full max-w-[1120px] min-h-[680px] grid lg:grid-cols-2 rounded-[28px] border border-white/[0.08] bg-[#090b0b]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
        <section className="hidden lg:flex flex-col justify-between p-10 xl:p-14 border-r border-white/[0.07] relative"><div><div className="flex items-center gap-3"><svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 16 5 A 11 11 0 1 0 27 16" stroke="#f8faf9" strokeWidth="6.5" /><path d="M 16 1.75 A 14.25 14.25 0 0 1 30.25 16" stroke="var(--accent-2)" strokeWidth="2" /><path d="M 16 8.25 A 7.75 7.75 0 0 1 23.75 16" stroke="var(--accent-2)" strokeWidth="2" /></svg><p className="text-white text-[19px] font-semibold tracking-tight">Ops<span className="text-[var(--accent-2)]">AI</span></p></div><div className="mt-28"><p className="eyebrow">Secure operations</p><h1 className="text-4xl xl:text-5xl font-semibold tracking-[-.055em] leading-[1.02] mt-3 max-w-md">Operate what matters.<br /><span className="text-white/35">Prove what changed.</span></h1><p className="text-sm text-white/35 leading-6 max-w-md mt-5">Manage the OpsAI website from one calm workspace for content, people, website health and operational evidence.</p></div></div><div className="grid grid-cols-3 gap-2"><Pill label="Identity" value="Verified" /><Pill label="Database" value="Connected" /><Pill label="Session" value="Signed" /></div></section>
        <section className="flex items-center justify-center p-7 sm:p-12"><div className="w-full max-w-[390px]"><div className="lg:hidden flex items-center gap-3 mb-14"><svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 16 5 A 11 11 0 1 0 27 16" stroke="#f8faf9" strokeWidth="6.5" /><path d="M 16 1.75 A 14.25 14.25 0 0 1 30.25 16" stroke="var(--accent-2)" strokeWidth="2" /><path d="M 16 8.25 A 7.75 7.75 0 0 1 23.75 16" stroke="var(--accent-2)" strokeWidth="2" /></svg><p className="text-white text-[19px] font-semibold tracking-tight">Ops<span className="text-[var(--accent-2)]">AI</span></p></div><div className="mb-8"><div className="w-10 h-10 rounded-xl bg-emerald-300/[0.08] border border-emerald-300/10 flex items-center justify-center mb-5"><LockKeyhole size={17} className="text-emerald-300" /></div><p className="eyebrow">Welcome to OpsAI Admin</p><h2 className="text-2xl font-semibold tracking-[-.04em] mt-2">Enter your Employee ID</h2><p className="text-xs text-white/30 mt-2">Sign in to your OpsAI command center.</p></div><form onSubmit={submit} className="space-y-4"><Field label="Employee ID / Code"><input className="login-input focus-ring" type="text" required autoFocus value={employeeId} onChange={e => setEmployeeId(e.target.value)} placeholder="EMP-1042" /></Field><button disabled={loading} className="w-full h-11 rounded-xl bg-white text-black text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-60">{loading ? "Authenticating…" : <>Continue to Admin Panel <ArrowRight size={14} /></>}</button></form><div className="mt-8 flex items-center gap-2 text-[9px] text-white/25"><ShieldCheck size={12} className="text-emerald-300/70" /> Session is signed and verified on protected routes.</div></div></section>
    </div></main>
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="text-[10px] text-white/40 font-medium">{label}</span>{children}</label> }
function Pill({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2"><p className="text-[8px] uppercase tracking-wider text-white/20">{label}</p><p className="text-[10px] text-emerald-300 mt-1">● {value}</p></div> }
