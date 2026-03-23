import { create } from 'zustand';

export interface PianoSong {
  name: string;
  notes: { note: string }[];
}

interface PianoState {
  showLabels: boolean;
  toggleLabels: () => void;
  volume: number;
  setVolume: (v: number) => void;
  currentSong: PianoSong | null;
  setCurrentSong: (song: PianoSong | null) => void;
  currentNoteIndex: number;
  setCurrentNoteIndex: (idx: number) => void;
  advanceNote: (playedNote: string) => void;
}

export const usePianoStore = create<PianoState>((set, get) => ({
  showLabels: true,
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),
  volume: 80,
  setVolume: (v) => set({ volume: v }),
  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song, currentNoteIndex: 0 }),
  currentNoteIndex: 0,
  setCurrentNoteIndex: (idx) => set({ currentNoteIndex: idx }),
  advanceNote: (playedNote) => {
    const { currentSong, currentNoteIndex } = get();
    if (!currentSong) return;
    
    if (currentNoteIndex < currentSong.notes.length) {
      const targetNote = currentSong.notes[currentNoteIndex];
      if (targetNote.note === playedNote) {
        set({ currentNoteIndex: currentNoteIndex + 1 });
      }
    }
  }
}));
