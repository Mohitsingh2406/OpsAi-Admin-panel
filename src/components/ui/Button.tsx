import { LucideIcon } from "lucide-react";
import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium h-9 px-4 transition-colors disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent-2 text-background hover:opacity-90 shadow-[0_0_15px_rgba(73,222,178,0.2)]",
  secondary: "bg-surface-2 text-foreground border border-border-strong hover:bg-surface-3",
  ghost: "text-muted hover:text-foreground hover:bg-surface-2",
  danger: "text-danger hover:bg-danger-bg",
} as const;

type Variant = keyof typeof variants;

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: LucideIcon;
  className?: string;
};

type ClickButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  children: React.ReactNode;
  variant?: Variant;
  icon?: LucideIcon;
  className?: string;
};

export default function Button(props: LinkButtonProps | ClickButtonProps) {
  const { children, variant = "secondary", icon: Icon, className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon && <Icon size={15} strokeWidth={2} />}
      {children}
    </>
  );

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { href: _href, children: _c, variant: _v, icon: _i, className: _cl, ...rest } = props;
  void _href;
  void _c;
  void _v;
  void _i;
  void _cl;

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
