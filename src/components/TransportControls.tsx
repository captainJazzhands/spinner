import React, {
	Component,
	Context,
	useState,
	useEffect,
	useContext,
	createContext,
	Ref,
	useRef
} from 'react'
import {Speak, MakeNoise} from './AudioCode'
import {IRecordingSession, IButton, ISound, ISequence, IStroopMode} from './Types';

let override = true

export function TransportControls(props: {
	TransportState: string
	TransportChange: (requestedState: string) => Function
}) {

	const TransportControlsRef: Ref<HTMLDivElement> = useRef(null)
	const TransportControlsDiv = TransportControlsRef.current

	useEffect(() => {
			if (TransportControlsDiv != null) {
				if (props.TransportState === 'playing') {
					TransportControlsDiv.classList.add('playing')
				} else {
					TransportControlsDiv.classList.remove('playing')
				}
			}
		},
		[props.TransportState])

	const StartRecordingRef: Ref<HTMLDivElement> = useRef(null)
	const StartRecordingBtn = StartRecordingRef.current

	useEffect(() => {
			if (StartRecordingBtn != null) {
				if (props.TransportState === 'recording') {
					StartRecordingBtn.classList.add('recording')
				} else {
					StartRecordingBtn.classList.remove('recording')
				}
			}
		},
		[props.TransportState])

	return (
		<div
			className={'pageLayout'}
			id={'TransportControls'}
			ref={TransportControlsRef}
		>
				<button
					value={'StartRecording'}
					onClick={() => props.TransportChange("record")}
					// disabled={props.TransportState === "playing" || props.TransportState === "recording"}
				>{'Record'}</button>

				<button
					value={'StopRecording'}
					onClick={() => props.TransportChange("stop")}
					// disabled={props.TransportState != "recording"}
				>{'stop'}</button>

				<button
					key={'playback'}
					value={'playback'}
					// disabled={props.TransportState === "empty" || props.TransportState !== "playing"}
					onClick={() => props.TransportChange("play")}
				>{'play'}</button>

				<button
					value={'reset'}
					onClick={() => props.TransportChange("reset")}
					// disabled={props.TransportState === "empty" || props.TransportState === "recording"}
				>{'reset'}</button>
		</div>
	)
}
