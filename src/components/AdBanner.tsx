"use client";
import { useEffect } from "react";

interface AdBannerProps {
  dataAdClient: string;
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
}

export function AdBanner({
  dataAdClient,
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err: any) {
      // Ignore errors (often from AdBlockers)
    }
  }, []);

  return (
    <div className="w-full flex justify-center overflow-hidden my-4 z-10 px-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-center w-full max-w-[728px] min-h-[90px] relative">
        <span className="absolute text-slate-500 text-xs tracking-widest uppercase">Advertisement</span>
        <ins
          className="adsbygoogle relative z-10 w-full"
          style={{ display: "block", minWidth: "250px", minHeight: "50px" }}
          data-ad-client={dataAdClient}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
      </div>
    </div>
  );
}
