"use client";

import { usePianoStore } from "@/store/usePianoStore";
import { Volume2, VolumeX } from "lucide-react";
import * as Tone from "tone";
import { useEffect } from "react";

export function VolumeControl() {
  const { volume, setVolume } = usePianoStore();
  
  useEffect(() => {
    // Map 0-100 to realistic decibel scale
    // If volume is 0, mute
    if (volume === 0) {
      Tone.Destination.mute = true;
    } else {
      Tone.Destination.mute = false;
      const db = (volume - 100) * 0.4; // 100 -> 0dB, 50 -> -20dB
      Tone.Destination.volume.rampTo(db, 0.1);
    }
  }, [volume]);

  return (
    <div className="flex items-center gap-2 text-slate-300">
      <button onClick={() => setVolume(volume > 0 ? 0 : 80)} className="hover:text-blue-400 transition-colors">
         {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={volume} 
        onChange={(e) => setVolume(Number(e.target.value))}
        className="hidden sm:block w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
}
