const styles = {
  success: "text-success bg-success-bg",
  warning: "text-warning bg-warning-bg",
  danger: "text-danger bg-danger-bg",
  neutral: "text-muted bg-surface-3",
  accent: "text-accent-2 bg-[rgba(143,140,255,0.12)]",
} as const;

export default function Badge({
  children,
  variant = "neutral",
  dot = true,
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  dot?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
