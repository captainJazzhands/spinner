import React, {Ref, useContext, useEffect, useRef, useState} from 'react'
import {
	IRecordingSession,
	IButton,
	ISound,
	ISequence,
	ISlider
} from './Types'
import './SoundBoard.css'
import {
	stroopContext,
	voiceContext,
	RecordingContext
} from './SoundBoard';
import {TransportControls} from "./TransportControls";
import {InstructionHeader} from "./InstructionHeader";
import * as timers from "timers";
import {RecordingSessions} from "./RecordingSessions";

let root = document.documentElement

export function SoundBoardStatus(props: {
	ActiveSequence: ISequence,
	HotPanel: string,
	HotPanelUpdater: Function,
	TransportState: string,
	TransportTime: number,
	Instructions: string,
	RecordingSession: IRecordingSession,
	TransportStateChangeHandler: (requestedState: string) => void,
	RecordingSessionChangeHandler: (sesh: IRecordingSession) => void
	SequenceSelector: (sequence: ISequence) => void
}) {
	const stroopMode = useContext(stroopContext)
	const [[ZoomLower, ZoomLevel, ZoomUpper], setZoomLevel]: [number[], Function] = useState([1, 50, 100])
	const [[GraphHeightLower, GraphHeight, GraphHeightUpper], setGraphHeight]: [number[], Function] = useState([-250, 50, 150])
	const [button, setButton]: [IButton, Function] = useState(new IButton(''))


	function throttle(fn: Function, ms: number) {
		let timeout: any

		function exec() {
			fn.call(fn, ms)
		}

		if (fn != undefined && ms != undefined) {
			timeout = setTimeout(exec, ms)
		} else {
			console.error('callback function and the timeout must be supplied')
		}
	}

	let ActiveSequence = props.ActiveSequence
	// let ActiveSequence: ISequence = (props.ActiveSequence.ButtStream) ? JSON.parse(JSON.stringify(props.ActiveSequence.ButtStream)) : JSON.parse(JSON.stringify(props.ActiveSequence))
	// let rs: Array<IButton>
	// if (ActiveSequence) {
	// 	rs = ActiveSequence as unknown as Array<IButton>
	// 	if (ActiveSequence.ButtStream) {
	// 		rs = ActiveSequence.ButtStream as Array<IButton>
	// 	}
	// }

	let begin = 0
	let duration = 0
	let gap = 0

	if (button.end && button.begin) {
		duration = button.end - button.begin
	}

	let isHot: boolean = (props.HotPanel.toLowerCase().slice(16) === "soundboardstatus")
	let isRecording: boolean = (props.HotPanel.toLowerCase() === "recording")
	let isPlaying: boolean = (props.HotPanel.toLowerCase() === "playing")

	let classes: string[] = []

	if (!isHot && isRecording) {
		classes.push('MEDIUM')
	} else if (!isHot && isPlaying) {
		classes.push('MEDIUM')
	} else if (isHot) {
		classes.push('HOT')
	} else {
		classes.push('COLD')
	}

	let sequenceDuration: number = 0

	const setHotPanel: Function = props.HotPanelUpdater

	function manageSliderValues(chosenValue: number, SliderLower: number, SliderUpper: number, min: number, max: number) {
		let threshold: number = .75
		let factor: number = 1.5
		let newLower: number = SliderLower
		let newUpper: number = SliderUpper

		if (chosenValue > min && chosenValue < max) {
			if (chosenValue < SliderLower + (SliderLower * (1 - threshold))) {
				newLower = Math.abs(chosenValue / factor) - factor - chosenValue
				newUpper = chosenValue * factor + chosenValue
			}
			if (chosenValue > (SliderUpper * threshold)) {
				newLower = Math.abs(chosenValue / factor) - factor - chosenValue
				newUpper = chosenValue * factor + chosenValue
			}
		}
		return [newLower > min ? newLower : min, chosenValue, newUpper > max ? newUpper : max]
	}

	let ScaleSlider = new ISlider(50)


	root.style.setProperty('--zoom-level', ZoomLevel.toString())

	function changeZoomLevel(event: React.ChangeEvent<HTMLInputElement>) {
		let chosenValue: number = event.target ? parseInt(event.target.value) : ZoomLevel
		root.style.setProperty('--zoom-level', ZoomLevel.toString())
		setZoomLevel([1, chosenValue, 200])
		// setZoomLevel(manageSliderValues(chosenValue, ZoomLower, ZoomUpper, 1, 150))
	}

	function changeGraphHeightUnthrottled(evt: React.ChangeEvent<HTMLInputElement>, fn: Function, ms: number) {
		throttle(changeGraphHeight, ms)
	}

	root.style.setProperty('--graph-height', GraphHeight.toString())

	function changeGraphHeight(event: React.ChangeEvent<HTMLInputElement>) {
		let chosenValue: number = event.target ? parseInt(event.target.value) : GraphHeight
		root.style.setProperty('--graph-height', GraphHeight.toString())
		setGraphHeight(manageSliderValues(chosenValue, GraphHeightLower, GraphHeightUpper, 1, 100))
	}

	function getWindowDimensions() {
		const {innerWidth: windowWidth, innerHeight: windowHeight} = window;
		return {
			windowWidth,
			windowHeight
		};
	}

	function useWindowDimensions(): { windowWidth: number; windowHeight: number } {
		const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
		useEffect(() => {
			function handleResize() {
				setWindowDimensions(getWindowDimensions());
			}

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);
		return windowDimensions;
	}

	const {windowHeight, windowWidth} = useWindowDimensions()

// let renderRS: Array<IButton> = []

	// useEffect(() => {
	// 		if (rs && Array.isArray(rs)) {
	// 			// @ts-ignore
	// 			if (rs.ButtStream) {
	// 				// @ts-ignore
	// 				rs = rs.ButtStream
	// 			} else {
	// 				renderRS = rs.map((button, index, buttstream) => {
	// 					return (button)
	// 				})
	// 			}
	// 		} else {
	// 			let tempRS = rs as Array<IButton>
	// 			if (renderRS.length > 1) {
	// 				renderRS = tempRS.map((button, index, buttstream) => {
	// 					return (button)
	// 				})
	// 			} else {
	// 				renderRS = (ActiveSequence && ActiveSequence.ButtStream) ? ActiveSequence.ButtStream : tempRS
	// 				console.log(button.sound ? button.sound.name : ' ', Date.now().toString())
	// 			}
	// 		}
	// 	},
	// 	[props.ActiveSequence])

	// let ASBS: IButton[]
	// 	if (ActiveSequence) {
	// 		ASBS = ActiveSequence.ButtStream ? ActiveSequence.ButtStream : ActiveSequence.ButtStream
	// 	} else {
	// 		ASBS = [new IButton('okay')]
	// 	}
	//
	return (
		<div
			className={'box ' + classes.slice()}
			id={'SoundBoardStatus'}
		>
			<InstructionHeader
				NavTarget={'SoundBoardStatus'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>

			<div className={'control-group-floater'}>
				<div className={'sequence-summary'}>
					<span className={'meta'}>
						{ActiveSequence.id ? 'Recording #' + ActiveSequence.id : ''}
					</span>
					<span className={'meta'}>
						{(ActiveSequence.ButtStream ? ActiveSequence.ButtStream.length - 1000 : 0) / 1000}
						:{ActiveSequence.ButtStream ? ActiveSequence.ButtStream.length / 1000 : 0}
					</span>
					<span className={'meta'}>
						{ActiveSequence.ButtStream ? ActiveSequence.ButtStream.filter(i => i != undefined).length : 0} items
					</span>
				</div>
			</div>

			<div
				className={'always-visible'}
				id={'DotGraph'}
			>

				<div
					className={'tablature'}
					data-duration={sequenceDuration ? sequenceDuration : 667}
				>

					{
						ActiveSequence.ButtStream ? ActiveSequence.ButtStream.map((button: IButton, index: number) => {
								root.style.setProperty('--sequence-item-count', (index + 1).toString())
								if (button.end && button.begin) {
									duration = (button.end - button.begin)
									begin = button.begin
									gap = ActiveSequence.ButtStream[index - 1] ? button.begin - ActiveSequence.ButtStream[index - 1].end! : 0
								}
								sequenceDuration = begin + duration + 1
								root.style.setProperty('--sequence-duration', sequenceDuration.toString())
								let zoomCalc: number = 0
								zoomCalc = 1 / (sequenceDuration / 900) * windowWidth - (index / 50)
								root.style.setProperty('--zoom-level', zoomCalc.toString())
								// duration = duration > 5000 ? duration / 1000 : .5
								duration = duration / 1000
								begin = begin / 1000
								gap = gap / 1000

								return (<div
									className={'press-gap-pair'}
									key={begin}
								>
									<div
										className={'press ' + button.color}
										style={{
											width: duration > .3 ? duration + 'px' : '.3px',
										}}
										data-begin={begin}
										data-duration={sequenceDuration}
									>
										<div className={'meta'}>
											{button.begin ? button.begin.toString() + 'ms' : ''}
										</div>
										<div className={'meta'}>
											{button.sound ? button.sound!.name!.toString() : ''}
										</div>
										<div className={'meta'}>
											{duration.toString() + 'ms'}
										</div>
									</div>

									{index + 1 < ActiveSequence.ButtStream.length ? (<div
										className={'gap'}
										style={{
											width: gap + "px",
										}}
										data-gap={gap}
									>
										<div className={'meta'}>
											{button.begin ? button.begin.toString() + 'ms' : ''}
										</div>
									</div>) : ''}

								</div>)
							}
						) : ''
					}
				</div>

				<div id={'playhead'}>
					<div id={'thumb'}>
						&nbsp;
					</div>
					<div id={'bar'}>
						&nbsp;
					</div>
				</div>

			</div>

			<div
				id={'CurrentSessionStatus'}
				className={'control-group'}
			>

				<p className={'LCD'}>
					{props.TransportTime ? props.TransportTime : ''}
				</p>

				<TransportControls
					TransportChange={props.TransportStateChangeHandler}
					TransportState={props.TransportState}
				/>

			</div>

		</div>
	)
}
