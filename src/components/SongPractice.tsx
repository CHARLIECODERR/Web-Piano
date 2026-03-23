"use client";

import { usePianoStore } from "@/store/usePianoStore";
import { SONGS } from "@/lib/songs";
import { Play, Square, CheckCircle2 } from "lucide-react";

export function SongPractice() {
  const { currentSong, setCurrentSong, currentNoteIndex } = usePianoStore();

  const isFinished = currentSong && currentNoteIndex >= currentSong.notes.length;

  return (
    <div className="w-full max-w-4xl p-6 bg-slate-900/60 rounded-[2rem] border border-slate-700 backdrop-blur-md shadow-xl flex flex-col items-center gap-6 relative overflow-hidden">
       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
       
       <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2 z-10 w-full justify-center">
         <Play className="w-5 h-5 text-blue-400" />
         Practice Mode
       </h3>
       
       <div className="flex flex-wrap justify-center gap-3 z-10 w-full">
          {SONGS.map(song => (
             <button 
               key={song.name}
               onClick={() => setCurrentSong(song)}
               className={`px-5 py-2.5 rounded-full font-medium transition-all shadow-sm ${currentSong?.name === song.name ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25 border-none' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 hover:border-slate-500'}`}
             >
               {song.name}
             </button>
          ))}
          {currentSong && (
             <button 
               onClick={() => setCurrentSong(null)}
               className="px-5 py-2.5 rounded-full font-medium bg-red-900/40 text-red-200 hover:bg-red-900/60 border border-red-900/50 transition-colors flex items-center gap-2 sm:ml-4"
             >
               <Square className="w-4 h-4" /> Stop
             </button>
          )}
       </div>

       {currentSong && !isFinished && (
          <div className="w-full flex flex-col items-center gap-3 mt-2 z-10">
             <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Next Note</div>
             <div className="flex flex-wrap justify-center gap-2 w-full max-h-48 overflow-y-auto p-4">
                {currentSong.notes.map((noteObj, idx) => {
                   const isActive = idx === currentNoteIndex;
                   const isPast = idx < currentNoteIndex;
                   return (
                     <div 
                       key={idx}
                       className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                          isActive 
                          ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 border-blue-400 text-white scale-110 shadow-[0_0_20px_rgba(59,130,246,0.6)] z-10 relative' 
                          : isPast 
                            ? 'bg-slate-800/80 border-slate-700 text-slate-500 opacity-60'
                            : 'bg-slate-800/80 border-slate-600/50 text-slate-300'
                       }`}
                     >
                       <span className={`font-bold ${isActive ? 'text-2xl drop-shadow-md' : 'text-xl'}`}>{noteObj.note}</span>
                     </div>
                   );
                })}
             </div>
          </div>
       )}

       {isFinished && (
         <div className="mt-4 flex flex-col items-center gap-2 text-green-400 animate-in fade-in zoom-in duration-500 z-10">
            <CheckCircle2 className="w-12 h-12" />
            <p className="text-xl font-bold text-white">Song Completed!</p>
            <button 
              onClick={() => setCurrentSong(currentSong)} 
              className="mt-2 px-6 py-2 bg-slate-800 text-slate-200 border border-slate-600 hover:bg-slate-700 rounded-full text-sm transition-colors"
            >
              Play Again
            </button>
         </div>
       )}
    </div>
  );
}
