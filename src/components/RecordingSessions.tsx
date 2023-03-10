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

	if (props.Sessions && props.Sessions.Sequences) {
		seqs = props.Sessions.Sequences
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

			<button
				value={'NewRecording'}
				onClick={() => props.SessionChangeHandler}
				// disabled={props.TransportState != "recording"}
			>{'+'}</button>

			{/*<ul>*/}
			{/*	{*/}
			{/*		seqs.map((session, index, sequence) => {*/}
			{/*				return (<li*/}
			{/*					className={'sequence-length-' + typeof (session)}*/}
			{/*					key={index}*/}
			{/*					value={'add'}*/}
			{/*					onClick={props.SessionChangeHandler('Event')}*/}
			{/*				>)*/}
			{/*					<span className={'meta'}>*/}
			{/*					{index}*/}
			{/*				</span>*/}
			{/*					<span className={'meta'}>*/}
			{/*					{JSON.stringify(session)}*/}
			{/*				</span>*/}
			{/*				</li>)*/}
			{/*			}*/}
			{/*		)*/}
			{/*	}*/}
			{/*</ul>*/}

		</div>
	)
}
