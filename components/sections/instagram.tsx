import Image from "next/image";
import { ArrowUpRight, InstagramIcon } from "@/components/ui/icons";
import ig1 from "@/assets/images/ig-1.webp";
import ig2 from "@/assets/images/ig-2.webp";
import ig3 from "@/assets/images/ig-3.webp";
import ig4 from "@/assets/images/ig-4.webp";

export const INSTAGRAM_URL = "https://www.instagram.com/mykono_greekfrozenyogurt/";

const POSTS = [
  { image: ig1, alt: "Vaso Mykono de yogurt griego natural con granola" },
  { image: ig2, alt: "Latte con helado griego en vaso Mykono" },
  { image: ig3, alt: "Helado de pistache servido en un tazón azul" },
  { image: ig4, alt: "Barra y bancos azules dentro de la tienda Mykono" },
];

export function Instagram() {
  return (
    <section aria-labelledby="instagram-title" className="bg-cream pb-20 pt-6 lg:pb-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,0.37fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <div className="flex items-center gap-5">
            <p data-reveal="up" className="eyebrow text-[11px] text-ink/75">
              Síguenos en
            </p>
            <span data-reveal="line-x" className="block h-px w-24 bg-aegean/45" />
          </div>
          <h2 id="instagram-title" data-reveal="lines" className="display mt-3 text-[clamp(40px,3.2vw,58px)] text-aegean">
            <span className="line-mask">
              <span className="line-inner">Instagram</span>
            </span>
          </h2>
          <a
            data-reveal="up"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-aegean"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
              @mykono_greekfrozenyogurt
            </span>
            <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul data-reveal="stagger" className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {POSTS.map((post) => (
            <li key={post.alt}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`${post.alt} — ver en Instagram`}
                className="group relative block aspect-[29/30] overflow-hidden rounded-md bg-cream-deep"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 24vw, 46vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 grid place-items-center bg-aegean/0 text-cream transition-colors duration-500 group-hover:bg-aegean/40">
                  <InstagramIcon className="size-8 scale-75 opacity-0 transition-[opacity,scale] duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
