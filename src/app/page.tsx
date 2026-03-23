"use client";

import { Settings, Info, Music } from "lucide-react";
import { Piano } from "@/components/Piano";
import { SongPractice } from "@/components/SongPractice";
import { usePianoStore } from "@/store/usePianoStore";

import { VolumeControl } from "@/components/VolumeControl";
import { AdBanner } from "@/components/AdBanner";

export default function Home() {
  const { showLabels, toggleLabels } = usePianoStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-br from-slate-900 to-black text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center py-4 px-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Music className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
            Web Piano
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <VolumeControl />
          <div className="w-px h-6 bg-slate-700 mx-1 hidden sm:block"></div>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:block" title="About">
            <Info className="w-5 h-5 text-slate-300" />
          </button>
          <button  
            onClick={toggleLabels}
            className={`p-2 rounded-full transition-colors ${showLabels ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10 text-slate-300'}`}
            title="Toggle Key Labels"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center justify-center my-8 md:my-12">
        <div className="text-center mb-8">
          <p className="text-slate-400 max-w-md mx-auto">
            Play a 2-octave piano keyboard utilizing natural mapping (ASDF... for white keys, WETY... for black keys) or by clicking.
          </p>
        </div>

        {/* Piano Component */}
        <div className="w-full flex justify-center py-6">
           <Piano />
        </div>

        {/* Practice Mode */}
        <SongPractice />
        
        {/* AdSense Unit Placeholder */}
        <div className="w-full mt-12 mb-4">
          <AdBanner dataAdClient="ca-pub-YOUR-ID-HERE" dataAdSlot="YOUR-SLOT-HERE" />
        </div>
      </main>

      {/* Footer / Controls Placeholder */}
      <footer className="w-full max-w-5xl py-6 px-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
           Learning Mode Available
        </div>
        <div>
          Web Piano v2.0
        </div>
      </footer>
    </div>
  );
}
