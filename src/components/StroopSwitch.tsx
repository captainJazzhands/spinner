import React, {Context, Ref, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {IRecordingSession, IButton, ISound, SoundType, ISequence, IStroopMode} from './Types'
import {soundContext, stroopContext, voiceContext} from "./SoundBoard";
import './SoundBoard.css'

export function StroopSwitch(props: {
	StroopMode: IStroopMode,
	StroopUpdater: Function
}) {

	let StroopMode: IStroopMode = useContext(stroopContext)

	const [counter, setCounter]: [number, Function] = useState(0)

	const setStroopMode: Function = props.StroopUpdater

	console.log('StroopMode', StroopMode.toString())

	return (
		<React.StrictMode>
			<div
				className={'box'}
				id={'stroopSwitch'}
			>
				<button
					// ToDoButNotToday: enumerate IStroopMode
					onClick={() => setStroopMode('unsure')}
				>unsure
				</button>
				<button
					onClick={() => setStroopMode('text')}
				>text
				</button>
				<button
					onClick={() => setStroopMode('speech')}
				>speech
				</button>
				<button
					onClick={() => setStroopMode('color')}
				>color
				</button>
				<button
					onClick={() => setStroopMode('sound')}
				>sound
				</button>
				<button
					onClick={() => setStroopMode('tone')}
				>tone
				</button>
			</div>
		</React.StrictMode>
	)
}
