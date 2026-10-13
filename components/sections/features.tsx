import { BowlIcon, HeartIcon, LeafIcon, SunIcon } from "@/components/ui/icons";

const FEATURES = [
  { Icon: LeafIcon, title: "Ingredientes", detail: "naturales" },
  { Icon: BowlIcon, title: "Helado griego", detail: "auténtico" },
  { Icon: HeartIcon, title: "Opciones", detail: "sin azúcar" },
  { Icon: SunIcon, title: "Fresco todos", detail: "los días" },
];

export function Features() {
  return (
    <section aria-label="Lo que nos hace diferentes" className="relative bg-cream">
      <div className="shell">
        <ul data-reveal="stagger" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4 lg:py-14">
          {FEATURES.map(({ Icon, title, detail }) => (
            <li key={title} className="group flex flex-col items-center text-center">
              <span className="grid size-16 place-items-center rounded-full text-aegean transition-[background-color,translate] duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:bg-aegean/6">
                <Icon className="size-11" />
              </span>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-aegean lg:text-base">
                {title}
                <span className="block font-medium text-aegean/65">{detail}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
