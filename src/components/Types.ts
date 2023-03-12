import React from "react";

export type path = { fullPath: string }

export type IStroopMode = "unsure" | "text" | "speech" | "color" | "shape" | "tone"

export class IRecordingSession {
	Sequences?: ISequence[];
	HandleRecordChange!: Function;

	constructor() {
		 this.Sequences = [];
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

// export type ISequence = {
// 	Sequence?: IButton[];
// }

export class ISequence {
	SessionData?: ISessionData;
	Sequence: IButton[] | undefined;
	id: number;

	constructor(
		Sequence?: IButton[]
	) {
		this.SessionData = new ISessionData();
		this.Sequence = Sequence
		this.id = Date.now()
	}
}

export class ISound {
	name: string;
	type: SoundType;
	pronunciation?: string;
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
		// this.pronunciation = "";
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
	name?: string;
	type?: string;
	sound?: ISound;
	color?: string | string[];
	begin?: number;
	end?: number;
	status?: string;
	order?: number;

	constructor(
		name?: string,
		sound?: ISound,
		color?: string,
		begin?: number,
		end?: number,
		status?: string,
		order?: number
	) {
		this.name = name;
		this.sound = sound;
		this.color = color;
		this.begin = 0;
		this.end = 0;
		this.status = status;
		this.order = order;
	}
}

export class ISlider {
	value: number;
	name?: string;
	lower?: number;
	upper?: number;
	color?: string | string[];
	min?: number;
	max?: number;

	constructor(
		value: number,
		name?: string,
		lower?: number,
		upper?: number,
		min?: number,
		max?: number,
	) {
		this.value = value;
		this.name = name;
		this.lower = 1;
		this.upper = value * 5;
		this.min = 1;
		this.max = value * 5;
	}
}

export type SoundType = "speech" | "tone" | "file"
