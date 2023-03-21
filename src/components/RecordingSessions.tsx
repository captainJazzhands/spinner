import React, {Ref, useContext, useEffect, useRef, useState} from 'react'
import {
	IRecordingSession,
	IButton
} from './Types'
import './SoundBoard.css'
import {stroopContext} from './SoundBoard';
import {TransportControls} from "./TransportControls";
import {InstructionHeader} from "./InstructionHeader";

export function RecordingSessions(props: {
	HotPanel: string,
	HotPanelUpdater: Function,
	Instructions: string,
	RecordingSession: IRecordingSession,
	SequenceSelector: Function,
	SessionChangeHandler: Function
	SequenceDeleteHandler: Function
}) {

	let seqs: IButton[]

	if (props.RecordingSession) {
		if (props.RecordingSession.Sequences && props.RecordingSession.Sequences.length > 1) {
			// @ts-ignore
			seqs = props.RecordingSession.Sequences
		} else {
			seqs = [new IButton('')]
		}
	} else {
		seqs = [new IButton('')]
	}
	const buttonCount = seqs.filter(i => i != undefined).length

	const setHotPanel: Function = props.HotPanelUpdater
	const selectSequence: Function = props.SequenceSelector
	const deleteSequence: Function = props.SequenceDeleteHandler
	let isHot: boolean = (props.HotPanel.toLowerCase() === "recordingsession")

	return (
		<div
			className={isHot ? 'box HOT' : 'box COLD'}
			id={'RecordingSession'}
		>
			<InstructionHeader
				NavTarget={'RecordingSession'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>
			<span>
				You have <span className={'LCD'}>{seqs.length}</span> recordings.
			</span>

			<ul>
				{
					seqs.map((sequence, index, button_array) => {
							return (<li
								className={'recording-session'}
								key={index}
								value={'add'}
							>
								<div className={'mini-list'}>
									{button_array.map((item, idx, item_array) => (
										<section key={idx}>
											<span className={'meta'}>
												{item.sound?.name ? item.sound.name.toString() : ''}
											</span>
											<span className={'meta'}>
												{item.begin ? item.begin.toString() : ''}
											</span>
										</section>
									))}
								</div>
								<button
									value={'SelectSequence'}
									onClick={() => selectSequence}
								>{'Select'}</button>
								<span className={'meta'}>
									Recording #{index}
								</span>
								<span className={'meta'}>
									{button_array.filter(i => i != undefined).length}
								</span>

							</li>)
						}
					)
				}
			</ul>

		</div>
	)
}
