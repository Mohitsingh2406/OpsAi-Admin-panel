import { AuditActivity } from "@/lib/audit-store";
import { ActionBadge, StatusBadge } from "./ActivityTable";

interface SessionTimelineProps {
  activities: AuditActivity[];
  onSelect: (a: AuditActivity) => void;
}

export default function SessionTimeline({ activities, onSelect }: SessionTimelineProps) {
  // Group activities by session ID
  const sessions: Record<string, AuditActivity[]> = {};
  
  activities.forEach(a => {
    if (!sessions[a.sessionId]) {
      sessions[a.sessionId] = [];
    }
    sessions[a.sessionId].push(a);
  });

  const sessionIds = Object.keys(sessions).sort((a, b) => {
    // Sort sessions by latest activity
    const lastA = new Date(sessions[a][0].timestamp).getTime();
    const lastB = new Date(sessions[b][0].timestamp).getTime();
    return lastB - lastA;
  });

  if (activities.length === 0) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-white/30 text-xs">
        <p>No activity found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {sessionIds.map(sessionId => {
        const sessionActivities = sessions[sessionId].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        const employee = sessionActivities[0].employeeId;
        const dateStr = new Date(sessionActivities[0].timestamp).toDateString();

        return (
          <div key={sessionId} className="relative">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white/80">{employee}</h3>
              <p className="text-[10px] text-white/40">Session #{sessionId.replace("SESSION-", "")} • {dateStr}</p>
            </div>
            
            <div className="pl-4 border-l border-white/10 space-y-6 relative">
              {sessionActivities.map(activity => (
                <div 
                  key={activity.id} 
                  className="relative group cursor-pointer"
                  onClick={() => onSelect(activity)}
                >
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-white/20 ring-4 ring-[var(--surface-2)] group-hover:bg-[var(--accent-2)] transition-colors" />
                  
                  <div className="flex items-start gap-4">
                    <p className="text-xs text-white/40 w-16 shrink-0 mt-0.5">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </p>
                    
                    <div className="flex-1 bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg group-hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ActionBadge action={activity.action} />
                        <span className="text-[10px] text-white/30">{activity.module}</span>
                        {activity.status === "FAILED" && <span className="ml-auto"><StatusBadge status={activity.status} /></span>}
                      </div>
                      <p className="text-xs text-white/80">{activity.description}</p>
                      {activity.target && <p className="text-[10px] text-emerald-300/80 mt-1">{activity.target}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
