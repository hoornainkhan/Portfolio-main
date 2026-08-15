import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer select-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-cream hover:bg-accent-soft focus-visible:bg-accent-soft",
  outline:
    "border border-accent/60 text-ink bg-white/20 hover:border-accent hover:bg-accent/5 focus-visible:border-accent",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}