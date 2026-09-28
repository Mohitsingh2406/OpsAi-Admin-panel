import { AuditActivity } from "@/lib/audit-store";

interface ActivityTableProps {
  activities: AuditActivity[];
  onSelect: (a: AuditActivity) => void;
}

export default function ActivityTable({ activities, onSelect }: ActivityTableProps) {
  if (activities.length === 0) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-white/30 text-xs">
        <p>No activity found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.06] text-[10px] text-white/40 uppercase tracking-wider">
            <th className="px-4 py-3 font-medium">Timestamp</th>
            <th className="px-4 py-3 font-medium">Employee</th>
            <th className="px-4 py-3 font-medium">Action</th>
            <th className="px-4 py-3 font-medium">Module</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs text-white/70">
          {activities.map((activity) => (
            <tr 
              key={activity.id} 
              onClick={() => onSelect(activity)}
              className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 whitespace-nowrap">
                {new Date(activity.timestamp).toLocaleString(undefined, { 
                    month: 'short', day: 'numeric', year: 'numeric', 
                    hour: 'numeric', minute: '2-digit' 
                })}
              </td>
              <td className="px-4 py-3">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white/80">{activity.employeeId}</span>
              </td>
              <td className="px-4 py-3">
                <ActionBadge action={activity.action} />
              </td>
              <td className="px-4 py-3">{activity.module}</td>
              <td className="px-4 py-3 max-w-[200px] truncate">{activity.description}</td>
              <td className="px-4 py-3 text-right">
                <StatusBadge status={activity.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ActionBadge({ action }: { action: string }) {
  let colorClass = "bg-white/5 text-white/60 border border-white/10";
  if (action === "CREATE") colorClass = "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20";
  else if (action === "UPDATE") colorClass = "bg-blue-400/10 text-blue-400 border border-blue-400/20";
  else if (action === "DELETE") colorClass = "bg-red-400/10 text-red-400 border border-red-400/20";
  else if (action === "EXPORT") colorClass = "bg-purple-400/10 text-purple-400 border border-purple-400/20";
  else if (action === "LOGIN" || action === "LOGOUT") colorClass = "bg-orange-400/10 text-orange-400 border border-orange-400/20";

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-medium tracking-wide uppercase ${colorClass}`}>
      {action}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isSuccess = status === "SUCCESS";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${isSuccess ? 'bg-emerald-400/5 text-emerald-400 border-emerald-400/10' : 'bg-red-400/5 text-red-400 border-red-400/10'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isSuccess ? 'bg-emerald-400' : 'bg-red-400'}`} />
      {status}
    </span>
  );
}
