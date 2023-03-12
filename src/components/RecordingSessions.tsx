import React, {Ref, useContext, useEffect, useRef, useState} from 'react'
import {
	IRecordingSession,
	IButton,
	ISound,
	ISequence
} from './Types'
import './SoundBoard.css'
import {stroopContext} from './SoundBoard';
import {TransportControls} from "./TransportControls";

export function RecordingSessions(props: {
	Sessions: IRecordingSession,
	SessionChangeHandler: Function
}) {

	let seqs: (ISequence | IButton)[]

	if (props.Sessions) {
		if (props.Sessions.Sequences && props.Sessions.Sequences.length > 1) {
			seqs = props.Sessions.Sequences
		} else {
			seqs = [new IButton()]
		}
	} else {
		seqs = [new IButton()]
	}

	return (
		<div
			className={''}
			id={'RecordingSessions'}
		>
			<span>
				You have <span className={'LCD'}>{seqs.length}</span> recordings.
			</span>

			<ul>
				{
					seqs.map((sequence, index, button_maybe) => {
							return (<li
								className={'recording-session'}
								key={index}
								value={'add'}
							>)
								<span className={'meta'}>
									Recording #{index}
								</span>
								<button
									value={'SelectRecording'}
									onClick={() => props.SessionChangeHandler(sequence)}
								>{'SELECT'}</button>

							</li>)
						}
					)
				}
			</ul>

		</div>
	)
}
