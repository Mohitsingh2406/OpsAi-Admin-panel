import { AuditActivity } from "@/lib/audit-store";
import { X, ArrowRight } from "lucide-react";
import { ActionBadge, StatusBadge } from "./ActivityTable";

interface Props {
  activity: AuditActivity;
  onClose: () => void;
}

export default function ActivityDetailsModal({ activity, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-md h-full bg-[var(--surface)] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right"
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Activity Details</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Employee ID" value={activity.employeeId} />
            <Detail label="Session ID" value={activity.sessionId.replace("SESSION-", "")} />
            <Detail label="Timestamp" value={new Date(activity.timestamp).toLocaleString()} />
            <Detail label="Status" value={<StatusBadge status={activity.status} />} />
          </div>

          <div className="h-px bg-white/10 w-full" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 w-20 shrink-0">Action</span>
              <ActionBadge action={activity.action} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 w-20 shrink-0">Module</span>
              <span className="text-sm font-medium">{activity.module}</span>
            </div>
            {activity.target && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20 shrink-0">Target</span>
                <span className="text-sm text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded">{activity.target}</span>
              </div>
            )}
            <div className="flex items-start gap-3">
              <span className="text-xs text-white/40 w-20 shrink-0 mt-0.5">Description</span>
              <span className="text-sm">{activity.description}</span>
            </div>
          </div>

          {activity.previousValue && activity.newValue && (
            <>
              <div className="h-px bg-white/10 w-full" />
              <div>
                <p className="text-xs text-white/40 mb-3">Changes</p>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1 bg-red-400/10 text-red-300 p-2.5 rounded text-sm text-center line-through decoration-red-400/30">
                    {activity.previousValue}
                  </div>
                  <div className="px-3 text-white/30">
                    <ArrowRight size={16} />
                  </div>
                  <div className="flex-1 bg-emerald-400/10 text-emerald-300 p-2.5 rounded text-sm text-center">
                    {activity.newValue}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="mt-8 text-[10px] text-white/20 text-center font-mono">
            Record ID: {activity.id}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{label}</p>
      <div className="text-sm font-medium text-white/80">{value}</div>
    </div>
  );
}
