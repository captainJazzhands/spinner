import React, {Context, Ref, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {IRecordingSession, IButton, ISound, SoundType, ISequence, IStroopMode} from './Types'
import {RecordingContext, stroopContext, voiceContext} from "./SoundBoard";
import './SoundBoard.css'

export function StroopSwitch(props: {
	StroopMode: IStroopMode,
	StroopUpdater: Function,
	HotPanel: string
}) {

	let StroopMode: IStroopMode = useContext(stroopContext)
	const setStroopMode: Function = props.StroopUpdater
	let isHot: boolean = (props.HotPanel.toString() === "StroopSwitch" || props.HotPanel.toString() === "unsure")

	return (
		<div
			id={'stroopSwitch'}
			className={isHot ? 'box HOT' : 'box COLD'}
		>
			<button
				// ToDoButNotToday: enumerate IStroopMode
				className={'unsure'}
				onClick={() => setStroopMode('unsure')}
			>unsure
			</button>
			<button
				className={'text'}
				onClick={() => setStroopMode('text')}
			>text
			</button>
			<button
				className={'speech'}
				onClick={() => setStroopMode('speech')}
			>speech
			</button>
			<button
				className={'color'}
				onClick={() => setStroopMode('color')}
			>color
			</button>
			<button
				className={'shape'}
				onClick={() => setStroopMode('shape')}
			>color
			</button>
			<button
				className={'sound'}
				onClick={() => setStroopMode('sound')}
			>sound
			</button>
			<button
				className={'tone'}
				onClick={() => setStroopMode('tone')}
			>tone
			</button>
		</div>
	)
}
