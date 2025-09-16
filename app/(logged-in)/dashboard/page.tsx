import BgGradient from "@/components/common/bgGradient";
import SummaryCard from "@/components/dashboard/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const UploadLimit = 5;
  const summaries = [
    {
      id: 1,
      title: "resume",
      description: "description",
      created_at: "2025-01-30 20:53:10.759642+00",
      summary_text: "",
      status: true,
    },
  ];
  return (
    <main className="min-h-screen  ">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4 ">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4l font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent ">
                Your Summaries
              </h1>
              <p className="text-gray-600 ">
                Transform your PDFs into concise,actinable insights{" "}
              </p>
            </div>
            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 ro-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 duration-300 group hover:no-underline"
            >
              <Link href={"/upload"} className="flex text-white items-center">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of {UploadLimit} uploads on the basic
                plan! {/* <br /> */}
                <Link
                  href={"/#pricing"}
                  className="text-rose-800 font-medium inline-flex items-center "
                >
                  <span className="underline underline-offset-4 decoration-rose-800">
                    {" "}
                    Click here to Upgrade To Pro
                  </span>{" "}
                  <ArrowRight className="w-4 h-4 inline-block" /> for unlimited
                  Uploads.
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard summary={summary} key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
