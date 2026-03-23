"use client";
import { usePianoStore } from "@/store/usePianoStore";

interface PianoKeyProps {
  note: string;
  keyboardKey: string;
  isBlack: boolean;
  isActive: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function PianoKey({ note, keyboardKey, isBlack, isActive, onPlay, onStop }: PianoKeyProps) {
  const showLabels = usePianoStore((s) => s.showLabels);

  return (
    <div
      className={`flex flex-col justify-end items-center pb-2 cursor-pointer transition-all duration-75 select-none font-sans border border-t-0
        ${
          isBlack
            ? "w-8 sm:w-10 md:w-12 h-32 sm:h-40 bg-slate-900 border-black rounded-b border-x-2 border-b-[6px] shadow-2xl z-10 text-slate-300"
            : "w-12 sm:w-14 md:w-16 h-48 sm:h-64 bg-white border-slate-300 rounded-b-md text-slate-800 shadow-sm hover:bg-slate-50"
        }
        ${
          isActive
            ? isBlack
              ? "bg-slate-700 border-b-2 translate-y-1 scale-y-95 shadow-md"
              : "bg-slate-200 border-blue-400 translate-y-1 shadow-inner"
            : ""
        }
      `}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        onPlay();
      }}
      onPointerUp={(e) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        onStop();
      }}
      onPointerCancel={() => onStop()}
    >
      <span
        className={`font-bold text-xs sm:text-sm uppercase ${!showLabels ? "opacity-0" : "opacity-100"} transition-opacity`}
      >
        {keyboardKey}
      </span>
      {isBlack && (
        <span className={`text-[10px] mt-1 ${!showLabels ? "opacity-0" : "opacity-100"}`}>
          {note}
        </span>
      )}
      {!isBlack && (
        <span className={`text-xs text-slate-400 mt-2 ${!showLabels ? "opacity-0" : "opacity-100"}`}>
          {note}
        </span>
      )}
    </div>
  );
}
