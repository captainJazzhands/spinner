import React, {Ref, useContext, useEffect, useRef, useState} from 'react'
import {
	IRecordingSession,
	IButton, ISequence
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

	let seqs: ISequence[] = []

	if (props.RecordingSession) {
		if (props.RecordingSession.Sequences && props.RecordingSession.Sequences.length > 1) {
			seqs = props.RecordingSession.Sequences
		} else {
		}
	} else {
	}
	const buttonCount = seqs.filter(i => i != undefined).length

	const setHotPanel: Function = props.HotPanelUpdater
	const selectSequence: Function = props.SequenceSelector
	const deleteSequence: Function = props.SequenceDeleteHandler
	let isHot: boolean = (props.HotPanel.toLowerCase() === "recordingsessions")

	return (
		<div
			className={isHot ? 'box HOT' : 'box COLD'}
			id={'RecordingSession'}
		>
			<InstructionHeader
				NavTarget={'RecordingSessions'}
				HeaderText={(seqs.length > 1) ? 'Manage ' + seqs.length + ' Recordings' : props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>
			{/*<span>*/}
			{/*	You have <span className={'LCD'}>{seqs.length}</span> recordings.*/}
			{/*</span>*/}

			<ul>
				{
					seqs.map((singleSequence, idx, button_array) => {
							return <li
								className={'recording-session'}
								key={idx}
								value={'add'}
							>
								<div className={'sequence-commands'}>
									<button
										value={'SelectSequence'}
										onClick={() => selectSequence(singleSequence)}
									>{'Select'}
									</button>
									{/*<button*/}
									{/*	value={'DeleteSequence'}*/}
									{/*	onClick={() => deleteSequence()}*/}
									{/*>{'Delete'}*/}
									{/*</button>*/}
								</div>

								<div className={'sequence-info'}>

									<div className={'sequence-summary'}>
										<span className={'meta'}>
											Recording #{idx}
										</span>
										<span className={'meta'}>
											{singleSequence.ButtStream?.length}
										</span>
										{/*<span className={'meta'}>*/}
										{/*	{button_array.filter(i => i != undefined).length}*/}
										{/*</span>*/}
									</div>

									<div className={'mini-list'}>
										{(singleSequence.ButtStream != undefined && singleSequence.ButtStream.length > 0) ? singleSequence.ButtStream.map((item, idx, item_array) =>
											<div
												className={'press-gap-pair'}
												key={idx}
											>
											<span className={(item.color != undefined) ? ('press ' + item.color!.toString()) : ('press')}>
												{item.begin ? item.begin.toString() : ''}
												{(item.begin && item.end) ? (item.end - item.begin).toString() : ''}
											</span>
												<span className={'gap'}>
												{item.begin ? item.begin.toString() : ''}
													{(item.begin && item.end) ? (item.end - item.begin).toString() : ''}
											</span>
											</div>) : <span className={'meta'}>nada</span>
										}
									</div>
								</div>

							</li>
						}
					)
				}
			</ul>

		</div>
	)
}
