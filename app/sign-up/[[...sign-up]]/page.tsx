import BgGradient from "@/components/common/bgGradient";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
                <BgGradient className="from-rose-400 via-rose-300 to-orange-200 " />
          <SignUp
        //     appearance={{
        //       elements: {
        //         cardBox: "border! shadow-none! rounded-lg!",
        //       },
        //     }}
          />
        </div>
      </section>
    </div>
  );
}