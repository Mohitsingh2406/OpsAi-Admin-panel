"use client";

import { useEffect, useState } from "react";
import { getActivities, AuditActivity } from "@/lib/audit-store";
import ActivityTable from "@/components/AuditTrail/ActivityTable";
import SessionTimeline from "@/components/AuditTrail/SessionTimeline";
import Filters from "@/components/AuditTrail/Filters";
import ActivityDetailsModal from "@/components/AuditTrail/ActivityDetailsModal";
import { Search, ShieldAlert, ShieldCheck } from "lucide-react";

export default function AuditTrailPage() {
  const [activities, setActivities] = useState<AuditActivity[]>([]);
  const [view, setView] = useState<"table" | "timeline">("table");
  const [selectedActivity, setSelectedActivity] = useState<AuditActivity | null>(null);
  
  // Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [actionFilter, setActionFilter] = useState("ALL");
  
  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const filtered = activities.filter(a => {
    const matchesSearch = 
      a.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchesAction = actionFilter === "ALL" || a.action === actionFilter;
    
    return matchesSearch && matchesStatus && matchesAction;
  });

  // Summary stats
  const total = activities.length;
  const today = activities.filter(a => new Date(a.timestamp).toDateString() === new Date().toDateString()).length;
  const activeSessions = new Set(activities.map(a => a.sessionId)).size;
  const failed = activities.filter(a => a.status === "FAILED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">System</p>
          <h1 className="text-2xl font-semibold tracking-[-0.04em] mt-1">Audit Trail</h1>
          <p className="text-xs text-white/30 mt-2">Track administrative activity, changes and sessions across the OpsAI platform.</p>
        </div>
        <div className="flex bg-[var(--surface-2)] p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setView("table")} 
            className={`px-4 py-1.5 text-xs font-medium rounded-md ${view === "table" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/70"}`}
          >
            Activity Table
          </button>
          <button 
            onClick={() => setView("timeline")} 
            className={`px-4 py-1.5 text-xs font-medium rounded-md ${view === "timeline" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/70"}`}
          >
            Session Timeline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Total Activities" value={total.toString()} />
        <Stat label="Today's Activities" value={today.toString()} />
        <Stat label="Active Sessions" value={activeSessions.toString()} />
        <Stat label="Failed Actions" value={failed.toString()} isFailed={failed > 0} />
      </div>

      <div className="card overflow-hidden bg-[var(--surface-2)] border border-white/10 rounded-2xl">
        <Filters 
          search={search} setSearch={setSearch}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          actionFilter={actionFilter} setActionFilter={setActionFilter}
        />
        
        {view === "table" ? (
          <ActivityTable activities={filtered} onSelect={setSelectedActivity} />
        ) : (
          <SessionTimeline activities={filtered} onSelect={setSelectedActivity} />
        )}
      </div>

      {selectedActivity && (
        <ActivityDetailsModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
      )}
    </div>
  );
}

function Stat({ label, value, isFailed }: { label: string; value: string; isFailed?: boolean }) {
  return (
    <div className="card p-4 border border-white/5 bg-[var(--surface-2)] rounded-xl">
      <div className="flex justify-between items-start">
        <p className="metric-value text-2xl font-semibold">{value}</p>
        {isFailed !== undefined && (
          isFailed ? <ShieldAlert size={16} className="text-red-400" /> : <ShieldCheck size={16} className="text-emerald-400" />
        )}
      </div>
      <p className="text-[9px] text-white/30 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}
