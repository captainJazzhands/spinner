import React from "react";

export type path = { fullPath: string }

export type IStroopMode = "unsure" | "text" | "speech" | "color" | "sound" | "tone"

export class IRecordingSession {
	SessionData: ISessionData;
	Sequences: ISequence[];
	HandleRecordChange!: Function;

	constructor() {
		this.SessionData = new ISessionData();
		this.Sequences = [new ISequence([new IButton(new ISound())])];
	}

	getName(): string {
		return "this.name";
	}
}

export class ISessionData {
	Performer?: string;
	RecStart?: number;
	RecStop?: number;
	status?: string;

	constructor(
		Performer?: string,
		RecStart?: number,
		RecStop?: number,
		status?: string
	) {
		this.Performer = Performer;
		this.RecStart = Date.now();
		this.RecStop = Date.now();
		this.status = status;
	}
}

export class ISequence {
	Sequence: IButton[];

	constructor(
		Sequence: IButton[]
	) {
		this.Sequence = Sequence
	}
}

export class ISound {
	name: string;
	type: SoundType;
	pronunciation: string;
	instrument?: string;
	voice?: SpeechSynthesisVoice;
	key?: string;
	volume?: number;
	pitch?: number;
	// begin?: number;
	duration?: number;
	pan?: number;

	constructor(
		name: string = "",
		type: SoundType = "speech",
		pronunciation: string = "",
		voice: SpeechSynthesisVoice = {} as SpeechSynthesisVoice,
		instrument: string = "",
		key: string = "",
		volume: number = 1,
		pitch: number = 1,
		// begin: number = Date.now(),
		duration: number = 0,
		pan: number = 0
	) {
		this.name = name;
		this.type = type;
		this.pronunciation = "";
		this.instrument = "";
		this.voice = voice;
		this.key = "";
		this.volume = 1;
		this.pitch = 1;
		// this.begin = begin;
		this.duration = duration;
		this.pan = pan;
	}
}

export class IButton {
	sound: ISound;
	color?: string | string[];
	begin?: number;
	end?: number;
	status?: string;
	order?: number;

	constructor(
		sound: ISound,
		color?: string,
		begin?: number,
		end?: number,
		status?: string,
		order?: number
	) {
		this.sound = sound;
		this.color = color;
		this.begin = 0;
		this.end = 0;
		this.status = status;
		this.order = order;
	}
}

export type SoundType = "speech" | "tone" | "file"
