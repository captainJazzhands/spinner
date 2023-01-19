import React from "react";

export type FieldType = "textbox" | "textarea" | "dropdown" | "radio" | "checkbox"

export type path = { fullPath: string }

export interface IFields {
	[key: string]: IFieldProps
}

export type IFieldProps = {
	id: number
	label?: string
	FieldType?: FieldType | string
	options?: string[]
	value?: any
	validation?: IValidation
}

export interface IValues {
	[key: string]: any
}

export interface IQuestions {
	[key: string]: IAnswerFields
}

export type IStroopMode = "uncertain" | "text" | "speech" | "color" | "sound" | "tone"

export interface IGameState {
	turn?: number
	status?: TGameStatus
	errors?: IErrors
	job?: IJobProps
	remediation?: IRemediationProps
	progress: number
}

export interface IGameContext {
	state: IGameState
	dispatch: ActionTypes
}

export interface IGameProps {
	action: string
	fields: IFields | IQuestions
	render?: () => React.ReactNode
}

export interface IQuestionProps {
	[index: number]: number | string

	id: number
	ask: string
	QuestionType?: FieldType | string
	options?: string[]
	answers: string[]
	CorrectAnswer: number | number[]
}

export interface IAnswerFields {
	[key: number]: number

	answers: string[]
	FieldType?: FieldType | string
}

export interface IJobProps {
	[index: number]: number

	id: number
	where: string
	title: string
	hero: path
	// hero: string
	dateStart: Date
	dateEnd: Date
	bodyCopy: string
	tags?: string[]
}

export interface IRemediationProps {
	[index: number]: number

	id: number
	hero: path
	// hero: string
	headline: string
	bodyCopy: string
	tags: string[]
}

export interface IErrors {
	[key: string]: string
}

export interface IValidation {
	rule: (values: IValues, fieldName: string, args: any) => string
	args?: any
}

export type TPlayerStatus = "active" | "watching" | "error" | string
export type IPlayer = {
	name: string
	initials: string
	color: string
	score: number
	status: TPlayerStatus
}
export type TGameStatus = "running" | "paused" | "error" | string

// export interface IGameState {
// 	players?: IPlayer[]
// 	progress?: number
// 	status?: TGameStatus
// 	correct?: []
// 	remediation?: IRemediationProps
// 	perspective?: number
// 	errors?: IErrors
// 	children?: JSX.Element | JSX.Element[]
// }
//
export interface IQuestionContext {
	setState: (values: IValues) => void
	answers: ([])
	action: (dispatch: any) => void
	validate?: (fieldName: string) => void
}

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
			type: Key;
		}
		: {
			type: Key;
			payload: M[Key];
		}
};

export enum ActionTypes {
	stub = "0",
	game_start = "game_start",
	game_end = "game_end",
	submit_response = "submit_answer",
	Skip = "SKIP",
	Progress = "PROGRESS",
	Remediate = "REMEDIATE",
	Create = "CREATE"
}

type ActionPayload = {
	[ActionTypes.stub]: {
		progress: number;
	}
	[ActionTypes.game_start]: {
		progress: number;
	}
	[ActionTypes.game_end]: {
		progress: number;
	}
	[ActionTypes.Skip]: {
		progress: number;
	}
	[ActionTypes.Progress]: {
		progress: number;
	}
	[ActionTypes.submit_response]: {
		answer: IAnswerFields
	}
	[ActionTypes.Create]: {
		progress: number;
		name: string;
	};
}

export type GameActions = ActionMap<ActionPayload>[
	keyof ActionMap<ActionPayload>
	];

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
