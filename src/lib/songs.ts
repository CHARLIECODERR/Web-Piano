import { PianoSong } from "@/store/usePianoStore";

export const SONGS: PianoSong[] = [
  {
    name: "Ode to Joy",
    notes: [
      { note: 'E4' }, { note: 'E4' }, { note: 'F4' }, { note: 'G4' },
      { note: 'G4' }, { note: 'F4' }, { note: 'E4' }, { note: 'D4' },
      { note: 'C4' }, { note: 'C4' }, { note: 'D4' }, { note: 'E4' },
      { note: 'E4' }, { note: 'D4' }, { note: 'D4' },
    ]
  },
  {
    name: "Twinkle Twinkle",
    notes: [
      { note: 'C4' }, { note: 'C4' }, { note: 'G4' }, { note: 'G4' },
      { note: 'A4' }, { note: 'A4' }, { note: 'G4' },
      { note: 'F4' }, { note: 'F4' }, { note: 'E4' }, { note: 'E4' },
      { note: 'D4' }, { note: 'D4' }, { note: 'C4' },
    ]
  }
];
