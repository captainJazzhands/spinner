import React, {} from 'react'
import {IRecordingSession, IButton, ISound, SoundType, ISequence, IStroopMode} from './Types'
import {voiceContext, stroopContext, RecordingContext} from "./SoundBoard";
import './SoundBoard.css'
import {CurrentButton} from "./CurrentButton";

export function Playback(props: {
	Sequence: IButton[],
	Instructions: string
}) {

	let TheStream = props.Sequence ? props.Sequence : []
	let root = document.documentElement

	const DoTheButton = () => {
		// goes here
	}

	root.style.setProperty('--playback-item-count', TheStream.length.toString());
	// TheStream.Sequence.forEach(DoTheButton)

	return (
		<div
			className={'box'}
			id={'Playback'}
		>

			<article className={'instruction'}>{props.Instructions}</article>

			<CurrentButton
				thisButtonCurrent={typeof (props.Sequence) !== 'undefined' ? Object.assign(props.Sequence) : ""}
			/>
		</div>
	)
}
