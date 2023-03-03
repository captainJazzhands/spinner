import {ISound} from './Types';
import {voiceContext, voices} from "./SoundBoard";
import React, {useContext} from "react";

let override = true

let noteContext: AudioContext
noteContext = new AudioContext()

window.addEventListener('load', init, false);

function init() {
	try {
		// Fix up for prefixing
		noteContext = new AudioContext()
	} catch (e) {
		alert('Web Audio API is not supported in this browser');
	}
}

const real = new Float32Array(2)
const imag = new Float32Array(2)
const ac = new AudioContext()
const osc = ac.createOscillator()

real[0] = 0
imag[0] = 0
real[1] = 1
imag[1] = 0
real[2] = 0
imag[2] = 1
const wave = ac.createPeriodicWave(real, imag)

osc.setPeriodicWave(wave)
osc.connect(ac.destination)

const localVoices = window.speechSynthesis.getVoices()
const CurrentVoice: SpeechSynthesisVoice = voiceContext ? useContext(voiceContext) : localVoices[0]

export const Speak: Function = (sound: ISound) => {
	let localVoice = CurrentVoice
	let synth = window.speechSynthesis
	let what = new SpeechSynthesisUtterance('')
	// for (let i = 0; i < voices.length; i++) {
	// 	if (voices[i].name === CurrentVoice.name) {
	// 		if (override) {
	// 			what.voice = localVoice as SpeechSynthesisVoice
	// 		} else {
	// 			what.voice = sound.voice as SpeechSynthesisVoice
	// 		}
	// 	} else {
	// 		what.voice = localVoice as SpeechSynthesisVoice
	// 	}
	// }
	what.voice = localVoice as SpeechSynthesisVoice
	what.text = sound.pronunciation ? sound.pronunciation : sound.name
	what.volume = 1
	what.pitch = sound.pitch as number
	what.rate = 1
	console.log('attempting to say', what, sound.pronunciation)
	// synth.cancel()
	synth.speak(what)
}

export const MakeNoise: Function = (sound: ISound, duration: number) => {
	// const [buttonMode, setButtonMode] = useState('tone')

	let audioCtx: AudioContext
	if (window.AudioContext) {
		audioCtx = new (window.AudioContext)()
	} else {
		// @ts-ignore
		audioCtx = new (window.webkitAudioContext)()
	}

	duration = duration / 100

	const myArrayBuffer = audioCtx.createBuffer(
		2,
		audioCtx.sampleRate * duration,
		audioCtx.sampleRate
	)

	let sweepLength = .5
	let attackTime = duration / 5
	let releaseTime = duration / 5

	let basePitch: number = 600

	let pitch: number = 0
	pitch = sound.pitch === 1 ? .999 : sound.pitch as number

	const thisTone = (duration: number, pitch: number) => {
		let osc = audioCtx.createOscillator()
		osc.setPeriodicWave(wave)
		osc.frequency.value = basePitch / Math.pow(2, -pitch)

		let volumeCompensator: number = Math.pow(2, -pitch / 12)

		console.log('TONE:', osc.frequency.value, 'hz', volumeCompensator.valueOf())

		let sweepEnv = audioCtx.createGain()
		sweepEnv.gain.cancelScheduledValues(duration)
		sweepEnv.gain.setValueAtTime(0, duration)
		sweepEnv.gain.linearRampToValueAtTime(volumeCompensator, duration + attackTime)
		sweepEnv.gain.linearRampToValueAtTime(0, duration + sweepLength - releaseTime)

		osc.connect(sweepEnv).connect(audioCtx.destination)
		osc.start(duration)
		osc.stop(duration + sweepLength)
	}

	const source = audioCtx.createBufferSource()
	source.buffer = myArrayBuffer
	source.connect(audioCtx.destination)
	// source.start()

	// pitch -3: toneFreq=55
	// 440 / 8
	// 440 / Math.pow(2, Math.abs(pitch))
	//
	// pitch -2: toneFreq=110
	// 440 / 4
	// 440 / Math.pow(2, Math.abs(pitch))
	//
	// pitch -1: toneFreq=220
	// 440 / 2
	// 440 * .5
	// 440 / Math.pow(2, Math.abs(pitch))
	//
	// pitch 0: toneFreq=440
	//
	// pitch 1: toneFreq=880
	// 440 * 2
	// 440 * Math.pow(2, Math.abs(pitch))
	//
	// pitch 2: toneFreq=1760
	// 440 * 4
	// 440 * Math.pow(2, Math.abs(pitch))
	//
	// pitch 3: toneFreq=3520
	// 440 * 8
	// 440 * Math.pow(2, Math.abs(pitch))
	thisTone(duration, pitch)

}


// const noteBuffer = noteContext.createBuffer(2, noteContext.sampleRate / 3, noteContext.sampleRate)

// // Fill the buffer with white noise;
// //just random values between -1.0 and 1.0
// for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
// 	// This gives us the actual ArrayBuffer that contains the data
// 	const nowBuffering = myArrayBuffer.getChannelData(channel);
// 	for (let i = 0; i < myArrayBuffer.length; i++) {
// 		// Math.random() is in [0; 1.0]
// 		// audio needs to be in [-1.0; 1.0]
// 		nowBuffering[i] = Math.random() * .2 - 2;
// 	}
// }

// const wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);


// let VolumeSample: {
// 	play: () => void;
// 	gainNode: AudioNode | null;
// 	// gainNode: {
// 	// 	prototype?: GainNode;
// 	// 	new(context: BaseAudioContext, options?: GainOptions): GainNode
// 	// 	connect(destination: AudioDestinationNode): void;
// 	// } | null;
// 	noteOff: () => void;
// 	stop: () => void;
// 	playing: boolean;
// 	toggle: () => void;
// 	source: undefined;
// 	GainNode: null;
// 	connect: () => void;
// 	changeVolume: () => void
// } = {
// 	gainNode: null,
// 	GainNode: null,
// 	source: undefined,
// 	playing: false,
// 	noteOff: function () {
// 	},
// 	connect: function () {
// 	},
// 	stop: function () {
// 	},
// 	play: function () {
// 	},
// 	toggle: function () {
// 	},
// 	changeVolume: function () {
// 	}
// };
// VolumeSample.gainNode = null
//
// VolumeSample.play = function () {
// 	// if (!noteContext.createGain) {
// 	// 	noteContext.createGain = noteContext.createGainNode()
// 	// }
// 	this.gainNode = noteContext.createGain()
// 	let source = noteContext.createBufferSource()
// 	source.buffer = Buffer
//
// 	// Connect source to a gain node
// 	source.connect(this.gainNode)
// 	// Connect gain node to destination
// 	this.gainNode?.connect(noteContext.destination)
//
// 	// Start playback in a loop
// 	source.loop = true;
// 	if (!source.start)
// 		source.start = source.noteOn;
// 	source.start(0);
// 	this.source = source;
// };
//
// VolumeSample.changeVolume = function (element: { value: string; max: string; }) {
// 	const volume = element.value;
// 	const fraction = parseInt(element.value) / parseInt(element.max);
// 	// Let's use an x*x curve (x-squared) since simple linear (x) does not
// 	// sound as good.
// 	// this.gainNode.gain.value = fraction * fraction;
// };
//
// VolumeSample.stop = function () {
// 	if (!this.stop)
// 		this.stop = this.noteOff;
// 	this.stop();
// };
//
// VolumeSample.toggle = function () {
// 	this.playing ? this.stop() : this.play();
// 	this.playing = !this.playing;
// };
//
//
// function playSound(this: any, buffer: AudioBuffer | null) {
//
// 	if (!noteContext.createGain)
// 		noteContext.createGain = noteContext.createGainNode
// 	this.gainNode = noteContext.createGain()
// 	let source: AudioBufferSourceNode = noteContext.createBufferSource()    // creates a sound source
// 	source.buffer = buffer    // tell the source which sound to play
//
// 	let gainNode: GainNode = noteContext.createGain()
//
// 	source.connect(this.gainNode)
//
// 	this.gainNode.connect(noteContext.destination)
//
// 	this.gainNode.gain.value = 0.017
//
// 	source.connect(noteContext.destination)   // connect the source to the context's destination (the speakers)
// 	source.start(0)   // play the source now
//
// }
