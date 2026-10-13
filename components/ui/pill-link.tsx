import { ChevronRight } from "./icons";

type Variant = "solid" | "light" | "outline";

const variants: Record<Variant, { base: string; fill: string }> = {
  solid: {
    base: "bg-aegean text-cream hover:text-aegean",
    fill: "bg-cream",
  },
  light: {
    base: "bg-marble text-aegean hover:text-cream",
    fill: "bg-gold",
  },
  outline: {
    base: "border-[1.5px] border-aegean text-aegean hover:text-cream",
    fill: "bg-aegean",
  },
};

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: React.ReactNode;
};

/** Pill CTA with a liquid fill that rises on hover and a chevron that nudges forward. */
export function PillLink({ variant = "solid", className = "", children, ...props }: Props) {
  const v = variants[variant];
  return (
    <a
      className={`group relative isolate inline-flex h-[54px] items-center gap-5 overflow-hidden rounded-full pl-8 pr-7 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ease-out-expo ${v.base} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 -z-10 h-full translate-y-[102%] rounded-[50%_50%_0_0/18px_18px_0_0] transition-[translate,border-radius] duration-600 ease-out-expo group-hover:translate-y-0 group-hover:rounded-none ${v.fill}`}
      />
      <span>{children}</span>
      <ChevronRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </a>
  );
}
