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
import {IRecordingSession, IButton, ISound, IStroopMode} from './Types';

let override = true

let RecordingTimer: NodeJS.Timer
let elapsedTime: number = 0
let planck: number = 10
let delta: number = 0


export function TransportControls(this: any) {

	const [count, setCount]: [number, Function] = useState(0)
	const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)
	const [isRecording, setIsRecording]: [boolean, Function] = useState(false)
	const [RecordingStart, setRecordingStart]: [number, Function] = useState(0)
	const [RecordingStop, setRecordingStop]: [number, Function] = useState(Date.now())
	const [clickTime, setClickTime]: [number, Function] = useState(0)
	const [tally, setTally]: [IButton[], Function] = useState([])
	const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(new IRecordingSession())
	// const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState([  {SessionData: [] } , {Sequences:[] } , Function ] )
	const [button, setButton]: [IButton, Function] = useState(new IButton(new ISound()))

	const startRecordingTimer = () => {
		if (!isRecording) {
			setClickTime(Date.now())
			setRecordingStart(Date.now())
			RecordingTimer = setInterval(() => {
				elapsedTime = Date.now() - RecordingStart
			}, planck)
			setIsRecording(true)
		}
		return elapsedTime
	}

	function stopRecordingTimer() {
		if (isRecording) {
			setIsRecording(false)
			setRecordingStop(Date.now())
			elapsedTime = Date.now() - RecordingStart
			clearInterval(RecordingTimer)
			//  pinch off session?
		} else {
			setIsRecording(false)
		}
		return elapsedTime
	}

	function resetRecordingTimer() {
		setIsRecording(false)
		elapsedTime = 0
		setCount(0)
		//  delete session
		clearInterval(RecordingTimer)
		setTally([])
		setRecordingSession(
			[
				{SessionData: [{RecStart: RecordingStart}]},
				{
					Sequences: [
						// [...tally, button],
						// [...tally, button],
						// [...tally, button]
					]
				}
			]
		)
	}

	const buttonTally: Ref<any> = useRef(null)
	useEffect(() => {
		if ((buttonTally).current) {
			buttonTally.current.className = 'hot'
		}
	}, [count])

	const recordClockRef: Ref<HTMLDivElement> = useRef(null)
	const recordClockDiv = recordClockRef.current

	useEffect(() => {
		if (recordClockDiv) {
			if (isRecording) {
				recordClockDiv!.classList.add('recording')
				recordClockDiv!.classList.remove('playing')
			} else {
				recordClockDiv!.classList.remove('recording')
			}
			if (isPlaying) {
				recordClockDiv!.classList.add('playing')
				recordClockDiv!.classList.remove('recording')
			} else {
				recordClockDiv!.classList.remove('playing')
			}
		}
	}, [isRecording, recordClockDiv, isPlaying])

	const DoTheButton = (button: IButton) => {
		if (!isRecording) {
			startRecordingTimer()
		}
		let thisButton = Object.assign({}, button)
		if (count === 0) {
			thisButton.begin = 1
		} else {
			thisButton.begin = Date.now() - RecordingStart
		}
		delta = thisButton.begin - RecordingStart + Date.now()

		setButton(thisButton)

		function stop(thisButton: IButton) {
			thisButton.end = Date.now() - RecordingStart
		}

		setClickTime(Date.now())

		setCount((count: number) => count + 1)
		setTally((prevTally: IButton[]) => [...prevTally, thisButton])

		setRecordingSession(
			[
				{SessionData: [{RecStart: RecordingStart}]},
				{
					Sequences: [
						[...tally, thisButton],
						[...tally, thisButton]
					]
				}
			]
		)
	}

	return (
		<React.StrictMode>
			<div
				className={'pageLayout'}
				id={'TransportControls'}
			>
				<div id={'TheClock'}
				     ref={recordClockRef}
				>
					<button
						value={'StartRecording'}
						//  ToDoButNotToday: replace onClick with addEventListener()
						onClick={() => startRecordingTimer()}
						disabled={isRecording}
					>{'Record'}</button>

					<p className={'LCD'}>
						time since<br/>last click: {delta}
						<br/>
						session time: {Date.now() - RecordingStart}
						<br/>
						total clicks: {count}
					</p>

					<button
						value={'StopRecording'}
						//  ToDoButNotToday: replace onClick with addEventListener()
						onClick={() => stopRecordingTimer()}
						disabled={!isRecording}
					>{'stop'}</button>

					<button
						value={'reset'}
						//  ToDoButNotToday: replace onClick with addEventListener()
						onClick={() => resetRecordingTimer()}
						disabled={isRecording || elapsedTime === 0}
					>{'reset'}</button>

				</div>
			</div>

		</React.StrictMode>
	)
}
