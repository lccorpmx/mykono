import { Preloader } from "@/components/layout/preloader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FlavorScroll } from "@/components/flavors/flavor-scroll";
import { FruitSprite } from "@/components/flavors/fruit-sprite";
import { Flotantes } from "@/components/sections/flotantes";
import { Sabores } from "@/components/sections/sabores";
import { Experience } from "@/components/sections/experience";
import { Marquee } from "@/components/sections/marquee";
import { Instagram } from "@/components/sections/instagram";
import { RevealController } from "@/components/motion/reveal-controller";

export default function Home() {
  return (
    <>
      <Preloader />
      <FruitSprite />
      <Header />
      <main>
        <Hero />
        <Features />
        <FlavorScroll />
        <Flotantes />
        <Sabores />
        <Experience />
        <Marquee />
        <Instagram />
      </main>
      <Footer />
      <RevealController />
    </>
  );
}
