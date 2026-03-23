"use client";

import { useState, useEffect, useRef } from "react";
import { PianoKey } from "./PianoKey";
import { playNote, stopNote } from "@/lib/audio";
import { usePianoStore } from "@/store/usePianoStore";

export interface KeyConfig {
  note: string;
  keyboardKey: string;
  isBlack: boolean;
}

// 2 octaves from C4 to B5
const PIANO_NOTES: KeyConfig[] = [
  { note: 'C4', keyboardKey: 'a', isBlack: false },
  { note: 'C#4', keyboardKey: 'w', isBlack: true },
  { note: 'D4', keyboardKey: 's', isBlack: false },
  { note: 'D#4', keyboardKey: 'e', isBlack: true },
  { note: 'E4', keyboardKey: 'd', isBlack: false },
  { note: 'F4', keyboardKey: 'f', isBlack: false },
  { note: 'F#4', keyboardKey: 't', isBlack: true },
  { note: 'G4', keyboardKey: 'g', isBlack: false },
  { note: 'G#4', keyboardKey: 'y', isBlack: true },
  { note: 'A4', keyboardKey: 'h', isBlack: false },
  { note: 'A#4', keyboardKey: 'u', isBlack: true },
  { note: 'B4', keyboardKey: 'j', isBlack: false },
  { note: 'C5', keyboardKey: 'k', isBlack: false },
  { note: 'C#5', keyboardKey: 'o', isBlack: true },
  { note: 'D5', keyboardKey: 'l', isBlack: false },
  { note: 'D#5', keyboardKey: 'p', isBlack: true },
  { note: 'E5', keyboardKey: ';', isBlack: false },
  { note: 'F5', keyboardKey: '\'', isBlack: false },
];

export function Piano() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const playingRef = useRef<Set<string>>(new Set());
  const advanceNote = usePianoStore(s => s.advanceNote);

  const handlePlay = (note: string) => {
    if (!playingRef.current.has(note)) {
      playingRef.current.add(note);
      playNote(note);
      advanceNote(note);
      setActiveNotes(new Set(playingRef.current));
    }
  };

  const handleStop = (note: string) => {
    if (playingRef.current.has(note)) {
      playingRef.current.delete(note);
      stopNote(note);
      setActiveNotes(new Set(playingRef.current));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const config = PIANO_NOTES.find(n => n.keyboardKey === key);
      if (config) handlePlay(config.note);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const config = PIANO_NOTES.find(n => n.keyboardKey === key);
      if (config) handleStop(config.note);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const whiteKeys = PIANO_NOTES.filter(k => !k.isBlack);

  return (
    <div className="w-full max-w-5xl p-4 sm:p-6 md:p-8 rounded-b-[1.5rem] bg-gradient-to-b from-red-800 to-red-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative flex flex-col items-center justify-center border-t-[12px] border-red-950">
       <div className="absolute top-2 left-6 right-6 h-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-80" />
       <h2 className="absolute top-6 font-mono text-red-900/50 text-xl font-bold tracking-[0.5em] select-none pointer-events-none">GRAND</h2>
       
       <div className="relative mt-12 flex mb-2 h-48 sm:h-64 select-none bg-black p-1 sm:p-2 rounded-xl shadow-inner pb-4">
         {whiteKeys.map((wConfig) => {
            const noteChar = wConfig.note[0];
            const octave = wConfig.note[1];
            const blackKeyNote = `${noteChar}#${octave}`;
            const blackKeyConfig = PIANO_NOTES.find(n => n.note === blackKeyNote);

            return (
              <div className="relative" key={wConfig.note}>
                 <PianoKey 
                    note={wConfig.note} 
                    isBlack={false} 
                    keyboardKey={wConfig.keyboardKey} 
                    isActive={activeNotes.has(wConfig.note)}
                    onPlay={() => handlePlay(wConfig.note)} 
                    onStop={() => handleStop(wConfig.note)} 
                 />
                 {blackKeyConfig && (
                   <div className="absolute top-0 right-0 transform translate-x-1/2 z-10">
                      <PianoKey 
                         note={blackKeyConfig.note} 
                         isBlack={true} 
                         keyboardKey={blackKeyConfig.keyboardKey} 
                         isActive={activeNotes.has(blackKeyConfig.note)}
                         onPlay={() => handlePlay(blackKeyConfig.note)} 
                         onStop={() => handleStop(blackKeyConfig.note)} 
                      />
                   </div>
                 )}
              </div>
            );
         })}
       </div>
    </div>
  );
}
