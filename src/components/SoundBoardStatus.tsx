import React, {Ref, useContext, useEffect, useRef, useState} from 'react'
import {
	IRecordingSession,
	IButton,
	ISound,
	ISequence
} from './Types'
import {Speak, MakeNoise} from './AudioCode';
import './SoundBoard.css'
import {stroopContext} from './SoundBoard';
import {TransportControls} from "./TransportControls";

let root = document.documentElement

export function SoundBoardStatus(props: {
	Sequence: IButton[],
	HotPanel: string,
	TransportState: string,
	TransportStateChangeHandler: (requestedState: string) => void
}) {
	const [user, setUser]: [number, Function] = useState(8675309)
	const stroopMode = useContext(stroopContext)
	const [button, setButton]: [IButton, Function] = useState(new IButton(new ISound()))

	let rs: IButton[] = props.Sequence
	let begin = 0
	let duration = 0

	if (button.end && button.begin) {
		duration = button.end - button.begin
	}

	
	let isHot:boolean = (props.HotPanel.toString() === "SoundBoardStatus")
		
	return (
		<div
			className={isHot ? 'box HOT' : 'box COLD'}
			id={'SoundBoardStatus'}
		>
			<p>TransportState
				<span className={'LCD'}>
				{props.TransportState.toString()}
			</span>
			</p>

			<TransportControls
				TransportChange={props.TransportStateChangeHandler}
				TransportState={props.TransportState}/>
			<div
				className={'tintable'}
				id={'DotGraph'}
			>
				<ul>
					{
						rs.map((button, index, sequence) => {
								root.style.setProperty('--sequence-item-count', index.toString())
								if (button.end && button.begin) {
									duration = (button.end - button.begin) / 10
									begin = button.begin / 25
								}
								console.log(duration)
								return (<li
									className={' ' + button.color}
									key={index}
									style={{
										left: begin + "px",
										width: duration + "px",
										height: duration + "px",
										borderRadius: duration + "px"
									}}
									// onClick={props.HandleRecordChange}
								>)
									<span className={'meta'}>
								{button.sound!.toString()}
							</span>
									<span className={'meta'}>
								{button.sound!.pitch!.toString()}
							</span>
								</li>)
							}
						)
					}
				</ul>
			</div>
		</div>
	)
}
