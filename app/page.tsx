import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroScetion from "@/components/home/HeroScetion";
import BgGradient from "@/components/common/bgGradient";
import DemoSection from "@/components/home/dem-dection";
import HowITWorkSection from "@/components/home/howitWork";
import PRICING from "@/components/home/Pricing";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="relative w-full  ">
      <BgGradient />
      <div className=" flex flex-col">
        <HeroScetion />
        <DemoSection />
        <HowITWorkSection />
        <PRICING />
        <CTASection />
      </div>
    </div>
  );
}
