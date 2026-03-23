import * as Tone from 'tone';

let synth: Tone.PolySynth | null = null;

export const initAudio = async () => {
  await Tone.start();
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.005,
        decay: 1,
        sustain: 0.3,
        release: 1,
      },
    });
    
    const reverb = new Tone.Reverb({ decay: 2.5, preDelay: 0.1 });
    const volume = new Tone.Volume(-5);
    
    synth.chain(reverb, volume, Tone.Destination);
  }
};

export const playNote = async (note: string) => {
  await initAudio();
  if (synth) {
    // Avoid re-triggering the same note if already held down
    synth.triggerAttack(note);
  }
};

export const stopNote = (note: string) => {
  if (synth) {
    synth.triggerRelease([note]);
  }
};

export const toggleMute = (muted: boolean) => {
    Tone.Destination.mute = muted;
};
