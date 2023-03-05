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
	const [[ZoomLower, ZoomLevel, ZoomUpper], setZoomLevel]: [number[], Function] = useState([1, 50, 100])
	const [[GraphHeightLower, GraphHeight, GraphHeightUpper], setGraphHeight]: [number[], Function] = useState([1, 50, 100])
	const [button, setButton]: [IButton, Function] = useState(new IButton())

	function throttle(fn: Function, ms: number) {
		let timeout: any

		function exec() {
			fn.call(fn, ms)
		}

		if (fn !== undefined && ms !== undefined) {
			timeout = setTimeout(exec, ms)
		} else {
			console.error('callback function and the timeout must be supplied')
		}
	}

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

	function manageSliderValues(chosenValue: number, SliderLower: number, SliderUpper: number, min: number, max: number) {
		let threshold: number = .85
		let factor: number = 3.5
		let newLower: number = SliderLower
		let newUpper: number = SliderUpper

		if (chosenValue > SliderLower && chosenValue < SliderUpper) {
			if (
				chosenValue < SliderLower + (SliderLower / (1 - threshold))
			) {
				newLower = (chosenValue / factor) > SliderLower ? (chosenValue / factor) : SliderLower
				newUpper = (chosenValue * factor) < SliderUpper ? (chosenValue * factor) : SliderUpper
			}
			if (
				chosenValue > (SliderUpper * threshold)
			) {
				newLower = (chosenValue / factor) > SliderLower ? (chosenValue / factor) : SliderLower
				newUpper = (chosenValue * factor) < SliderUpper ? (chosenValue * factor) : SliderUpper
			}
		}
		return [newLower, chosenValue, newUpper]
	}

	const changeZoomLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
		let chosenValue: number = event.target ? parseInt(event.target.value) : ZoomLevel
		root.style.setProperty('--zoom-level', ZoomLevel.toString())
		throttle(setZoomLevel(manageSliderValues(chosenValue, ZoomLower, ZoomUpper, 1, 750)), 900)
	}

	const changeGraphHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
		let chosenValue: number = event.target ? parseInt(event.target.value) : GraphHeight
		root.style.setProperty('--graph-height', GraphHeight.toString())
		throttle(setGraphHeight(manageSliderValues(chosenValue, GraphHeightLower, GraphHeightUpper, 1, 1000)), 955)
	}

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
				className={'always-visible'}
				id={'DotGraph'}
			>
				<div
					className={'tablature'}
					data-duration={sequenceDuration}
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
										key={index + '_gap'}
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
											width: duration + "px",
										}}
										data-begin={begin}
										data-duration={sequenceDuration}
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
			</div>

			<div
				id={''}
				className={'control-group'}
			>
				<div
					className={'range-slider'}
					id={'ZoomLevelControl'}
				>
					<label>{Math.round(ZoomLower)}</label>
					<label>{Math.round(ZoomUpper)}</label>
					<input
						type='range'
						onChange={changeZoomLevel}
						min={ZoomLower}
						max={ZoomUpper}
						step={1}
						value={Math.round(ZoomLevel)}
						className='custom-slider'>
					</input>
					<label className={'slider-value'}>
						{Math.round(ZoomLevel * 100) / 100}
					</label>
				</div>

				<TransportControls
					TransportChange={props.TransportStateChangeHandler}
					TransportState={props.TransportState}
				/>

				<div
					className={'range-slider'}
					id={'GraphHeightControl'}
				>
					<label>{Math.round(GraphHeightLower)}</label>
					<label>{Math.round(GraphHeightUpper)}</label>
					<input
						type='range'
						onChange={changeGraphHeight}
						min={GraphHeightLower}
						max={GraphHeightUpper}
						step={1}
						value={Math.round(GraphHeight)}
						className='custom-slider'>
					</input>
					<label className={'slider-value'}>
						{Math.round(GraphHeight * 100) / 100}
					</label>
				</div>


			</div>

		</div>
	)
}
