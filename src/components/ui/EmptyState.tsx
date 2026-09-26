import { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-11 h-11 rounded-xl bg-surface-3 flex items-center justify-center mb-4">
        <Icon size={18} className="text-muted" strokeWidth={1.75} />
      </div>
      <p className="text-foreground text-sm font-medium">{title}</p>
      {description && <p className="text-muted text-xs mt-1.5 max-w-xs">{description}</p>}
    </div>
  );
}
