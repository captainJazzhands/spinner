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
import {InstructionHeader} from "./InstructionHeader";

let root = document.documentElement

export function SoundBoardStatus(props: {
	Sequence: IButton[],
	HotPanel: string,
	HotPanelUpdater: Function,
	TransportState: string,
	Instructions: string,
	TransportStateChangeHandler: (requestedState: string) => void
}) {
	const [user, setUser]: [number, Function] = useState(8675309)
	const stroopMode = useContext(stroopContext)
	const [button, setButton]: [IButton, Function] = useState(new IButton())

	let rs: IButton[] = props.Sequence
	let begin = 0
	let duration = 0
	let gap = 0

	if (button.end && button.begin) {
		duration = button.end - button.begin
	}

	let isHot: boolean = (props.HotPanel.toLowerCase() === "soundboardstatus")
	let isRecording: boolean = (props.HotPanel.toLowerCase() === "recording")
	let isPlaying: boolean = (props.HotPanel.toLowerCase() === "playing")

	let classes: string[] = []

	if (isHot) {
		classes.push('HOT')
	} else if (isRecording) {
		classes.push('MEDIUM')
	} else if (isPlaying) {
		classes.push('HOT')
	} else {
		classes.push('COLD')
	}

	let sequenceBegin: number
	if (rs[0] !== undefined) {
		sequenceBegin = rs[0].begin ? rs[0].begin : -1
	} else {
		sequenceBegin = Date.now()
	}

	let sequenceDuration: number = 0

	const setHotPanel: Function = props.HotPanelUpdater

	return (
		<div
			className={'box ' + classes.slice()}
			id={'SoundBoardStatus'}
		>
			<InstructionHeader
				NavTarget={'SoundBoardStatus'}
				HeaderText={'Lay down a beat.'}
				HotPanelUpdater={setHotPanel}
			/>
			<div
				data-duration={sequenceDuration}
				className={'always-visible'}
				id={'DotGraph'}
			>
				{
					rs.map((button, index, sequence) => {
							root.style.setProperty('--sequence-item-count', index.toString())
							if (button.end && button.begin) {
								duration = (button.end - button.begin)
								begin = button.begin - sequenceBegin
								gap = rs[index - 1] ? button.begin - rs[index - 1].end! : 0
							}
							sequenceDuration = begin + duration + 1
							root.style.setProperty('--sequence-duration', sequenceDuration.toString())

							duration = duration / 10
							begin = begin / 10
							gap = gap / 10

							return (<>
								<div
									className={'gap'}
									key={index}
									style={{
										width: gap + "px",
									}}
									data-gap={gap}
								>
										<span className={'meta'}>
										{button.begin!.toString() + 'ms'}
									</span>
									<span className={'meta'}>
										{button.sound!.name!.toString()}
									</span>
									<span className={'meta'}>
										{duration.toString() + 'ms'}
									</span>
								</div>

								<div
									className={'press ' + button.color}
									key={index}
									style={{
										left: begin + "px",
										width: duration + "px",
										// height: duration + "px",
										borderRadius: duration + "px"
									}}
									data-begin={begin}
									data-duration={duration}
									// onClick={props.HandleRecordChange}
								>
										<span className={'meta'}>
										{button.begin!.toString() + 'ms'}
									</span>
									<span className={'meta'}>
										{button.sound!.name!.toString()}
									</span>
									<span className={'meta'}>
										{duration.toString() + 'ms'}
									</span>
								</div>
							</>)
						}
					)
				}

			</div>

			<TransportControls
				TransportChange={props.TransportStateChangeHandler}
				TransportState={props.TransportState}
			/>

		</div>
	)
}
