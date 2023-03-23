import {ISound} from './Types';
import {voiceContext, voiceNameContext, voices} from "./SoundBoard";
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

export const Speak: Function = (sound: ISound, duration?: number, argVoice?: SpeechSynthesisVoice) => {
	let synth = window.speechSynthesis
	let what = new SpeechSynthesisUtterance('')
	let localVoice: SpeechSynthesisVoice

	let filteredVoices = voices.filter(function (voice) {
		return voice.name == argVoice!.name
	})

	// if (filteredVoices.length === 1) {
	// 	localVoice = filteredVoices[0]
	// } else {
	// 	localVoice = argVoice ? argVoice : voices[0]
	// }

	for (let i = 0; i < voices.length; i++) {
		if (filteredVoices != undefined && voices[i] == filteredVoices[i]) {
			if (override) {
				what.voice = filteredVoices[i] as SpeechSynthesisVoice
			} else {
				what.voice = sound.voice as SpeechSynthesisVoice
			}
		} else {
			what.voice = argVoice as SpeechSynthesisVoice
		}
	}

	what.text = sound.pronunciation ? sound.pronunciation : sound.name
	what.volume = 1
	what.pitch = sound.pitch as number
	what.rate = 1
	console.log('attempting to say', sound.pronunciation?.toUpperCase(), 'as', what.voice!.name, 'for', duration, 'ms')
	synth.cancel()
	synth.speak(what)

	return what
}

export const MakeNoise: Function = (sound: ISound, duration?: number) => {
	let audioCtx: AudioContext
	if (window.AudioContext) {
		audioCtx = new (window.AudioContext)()
	} else {
		// @ts-ignore
		audioCtx = new (window.webkitAudioContext)()
	}

	const myArrayBuffer = audioCtx.createBuffer(
		1,
		22050,
		22050
	)

	let sweepLength = .5
	let attackTime = duration ? duration / 15 : .01
	let releaseTime = attackTime

	let basePitch: number = 300

	let pitch: number
	pitch = sound.pitch === 1 ? .999 : sound.pitch as number

	const fadeOut = (thisTone_osc: OscillatorNode, begin: number, end: number) => {
		let sweepEnv = audioCtx.createGain()
		sweepEnv.gain.linearRampToValueAtTime(0, end)
		thisTone_osc.connect(sweepEnv).connect(audioCtx.destination)
		thisTone_osc.stop(end)
	}

	const thisTone = (pitch: number, duration?: number) => {
		let thisTone_osc = audioCtx.createOscillator()
		thisTone_osc.setPeriodicWave(wave)
		thisTone_osc.frequency.value = basePitch / Math.pow(1.5, -pitch)

		let volumeCompensator: number = Math.pow(1.5, -pitch) / 5

		console.log('TONE:', thisTone_osc.frequency.value, 'hz', volumeCompensator.valueOf(), 'db')
		let sweepEnv = audioCtx.createGain()

		if (duration) {
			sweepEnv.gain.cancelScheduledValues(duration)
			sweepEnv.gain.setValueAtTime(0, duration)
			sweepEnv.gain.linearRampToValueAtTime(volumeCompensator, duration + (attackTime))
			sweepEnv.gain.linearRampToValueAtTime(0, duration + sweepLength - releaseTime)
			thisTone_osc.connect(sweepEnv).connect(audioCtx.destination)
			thisTone_osc.start(duration)
			thisTone_osc.stop(duration + sweepLength)
		} else {
			sweepEnv.gain.setValueAtTime(0, 0)
			sweepEnv.gain.linearRampToValueAtTime(volumeCompensator, (attackTime))
			thisTone_osc.connect(sweepEnv).connect(audioCtx.destination)
			thisTone_osc.start()
		}
		return thisTone_osc
	}

	// const source = audioCtx.createBufferSource()
	// source.buffer = myArrayBuffer
	// source.connect(audioCtx.destination)

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

	if (duration) {
		console.log('attempting to play', sound.name, 'for', duration, 'ms')
		thisTone(duration, pitch)
	} else {
		console.log('beginning to play', sound.name, 'until told otherwise')
		return thisTone(pitch)
	}

}
