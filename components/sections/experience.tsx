import Image from "next/image";
import { PillLink } from "@/components/ui/pill-link";
import localImage from "@/assets/images/local.webp";
import estatuaImage from "@/assets/images/estatua.webp";

export function Experience() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative grid bg-aegean text-cream lg:min-h-[clamp(460px,31vw,620px)] lg:grid-cols-[44.6fr_38fr_17.4fr]"
    >
      {/* The shop */}
      <div data-reveal="clip" className="relative aspect-4/3 overflow-hidden lg:aspect-auto">
        <div data-reveal-zoom className="absolute inset-0">
          <div data-parallax="6" className="absolute inset-y-[-8%] inset-x-0">
            <Image
              src={localImage}
              alt="Interior de la tienda Mykono: nichos iluminados, bancos azules y el mural Good Yogurt Good Mood"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[88%_50%]"
            />
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="relative flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-[clamp(40px,4.6vw,84px)] lg:py-14">
        <div className="flex items-center gap-6">
          <p data-reveal="up" className="eyebrow text-[11.5px] text-cream/90">
            Mykono
          </p>
          <span data-reveal="line-x" className="block h-px w-28 bg-cream/40" />
        </div>
        <h2 id="nosotros-title" data-reveal="lines" className="display mt-6 text-[clamp(46px,4.3vw,84px)]">
          <span className="line-mask">
            <span className="line-inner">Más que</span>
          </span>
          <span className="line-mask">
            <span className="line-inner">un helado</span>
          </span>
        </h2>
        <p data-reveal="up" className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-cream/90 lg:text-[17px]">
          Un espacio para disfrutar, compartir y crear momentos más dulces.
        </p>
        <div data-reveal="up" className="mt-9">
          <PillLink variant="light" href="#contacto">
            Conócenos
          </PillLink>
        </div>
      </div>

      {/* Marble */}
      <div data-reveal="clip" className="relative hidden overflow-hidden bg-[#e7ddd1] lg:block">
        <div data-reveal-zoom className="absolute inset-0">
          <div data-parallax="10" className="absolute inset-y-[-10%] inset-x-0">
            <Image
              src={estatuaImage}
              alt=""
              fill
              placeholder="blur"
              sizes="18vw"
              className="object-cover object-[30%_50%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
