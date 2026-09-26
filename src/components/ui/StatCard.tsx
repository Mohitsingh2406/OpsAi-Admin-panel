import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 hover:border-border-strong transition-colors">
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted text-xs font-medium tracking-wide">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center">
          <Icon size={16} className="text-muted" strokeWidth={1.75} />
        </div>
      </div>
      <p className="text-foreground text-3xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="text-muted-2 text-xs mt-2">{hint}</p>}
    </div>
  );
}
