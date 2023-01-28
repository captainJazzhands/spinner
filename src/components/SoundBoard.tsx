import React, {
	Component,
	Context,
	useState,
	useEffect,
	Reducer,
	useContext,
	createContext, Ref, useRef, ComponentRef
} from 'react'
import * as Types from './Types'
import {Speak, MakeNoise} from './AudioCode'
import {SoundBoardStatus} from './SoundBoardStatus'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IRecordingSession, IButton, ISound, IStroopMode, ISequence} from './Types';
import {RecordingSessions} from './RecordingSessions';
import {StroopSwitch} from "./StroopSwitch";
import {Populator} from "./Populator";
import {TheButtons} from "./TheButtons";

//<editor-fold defaultstate='collapsed' desc='array: buttons list'>
let soundList: IButton[] = [
	{
		color: 'white',
		sound: {
			name: 'Malama',
			type: 'speech',
			pronunciation: 'mah lah ma',
			pitch: -4
		}
	},
	{
		color: 'gray',
		sound: {
			name: 'Yahweh',
			type: 'speech',
			pronunciation: 'yah wey',
			pitch: -3
		}
	},
	{
		color: 'yellow',
		sound: {
			name: 'Mr. Bits',
			type: 'speech',
			pronunciation: 'mister bits',
			pitch: -2
		}
	},
	{
		color: ['gray', 'white'],
		sound: {
			name: 'Mayday',
			type: 'speech',
			pronunciation: 'may day',
			pitch: -1
		}
	},
	{
		color: 'brown',
		sound: {
			name: 'Bae Bae',
			type: 'speech',
			pronunciation: 'bay bay',
			pitch: 0
		}
	},
	{
		color: 'red',
		sound: {
			name: 'Mr. Ball Legs',
			type: 'speech',
			pronunciation: 'mister ball legs',
			pitch: 1
		}
	},
	{
		color: 'black',
		sound: {
			name: 'Shaft',
			type: 'speech',
			pronunciation: 'bad mother fucker',
			pitch: 2
		}
	},
	{
		color: 'brown',
		sound: {
			name: 'Jeebus',
			type: 'speech',
			pronunciation: 'jeebus',
			pitch: 3
		}
	}
]

//</editor-fold>

let override = true
let realtime = true

let planck: number = 10

let playbackTimer: NodeJS.Timer
let downTimer: NodeJS.Timer
let downTimerOn: boolean = false
let playbackTimerOn: boolean = false
let elapsedTime: number = 0
let RecStart: number = 0
let duration: number = 0

let RecordingTimer: NodeJS.Timer

playbackTimerOn = false
downTimerOn = false

const voices = window.speechSynthesis.getVoices()
export const voiceContext: React.Context<any> = React.createContext(voices[0])
// export const voiceContext: React.Context<SpeechSynthesisVoice> = React.createContext(new SpeechSynthesisVoice())
export const RecordingContext: React.Context<IRecordingSession> = React.createContext(new IRecordingSession())
export const stroopContext: React.Context<any> = React.createContext("speech")
export const wordContext: React.Context<any> = React.createContext([""])
export let dataSourceContext: React.Context<any> = React.createContext("")

export function TheSoundBoard(this: any) {

	const [count, setCount]: [number, Function] = useState(0)
	const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)
	const [isRecording, setIsRecording]: [boolean, Function] = useState(false)
	const [RecordingStart, setRecordingStart]: [number, Function] = useState(0)
	const [RecordingStop, setRecordingStop]: [number, Function] = useState(Date.now())
	const [clickTime, setClickTime]: [number, Function] = useState(0)
	const [tally, setTally]: [IButton[], Function] = useState([])
	const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(new IRecordingSession())
	const [button, setButton]: [IButton, Function] = useState(new IButton(new ISound()))
	const [StroopMode, setStroopMode]: [IStroopMode, Function] = useState('unsure')
	const [WordList, setWordList]: [string[], Function] = useState([''])
	const [HotPanel, setHotPanel]: [string, Function] = useState('DataSelector')
	const [CurrentVoice, setCurrentVoice]: [Context<any>, Function] = useState(voiceContext)

	const [user, setUser]: [number, Function] = useState(8675309)
	const [Comparison, setComparison]: [[], Function] = useState([])

	// const session = useSession()
	// let newToken: any
	// const handleLogin = () => session.setSession({token: newToken})
	// const handleLogout = () => session.removeSession()
	//
	//  page loads
	//  playing a sound or clicking Record:
	//    starts countup timer
	//    creates a session if one is not already loaded
	//    for now, we’ll blow away session on StartRecording()  TODO
	//
	//  session object:
	//    timestamp recording started
	//    timestamp recording ended
	//    sequence[]: the set of notes recorded
	//    challenges[]: challenge attempts
	//
	//  click Stop (or click outside of UI):
	//    stops countup timer
	//    final note in sequence[]
	//    timestamp recording ended
	//    display sequence[] in compete list
	//
	//  with a sequence to run against, display instructions to do so
	//
	//  click Challenge (or just play a sound):
	//    starts countup timer
	//    adds new attempt to challenges[]
	//    no realtime comparison for now TODO
	//
	//  click Stop (or click outside of UI):
	//    stop countup timer
	//    append final note to challenge[]
	//    append timestamp recording ended
	//    display sequence[] in challenge list
	//    compare()
	//
	//  we will compare:
	//    note type
	//    note value
	//    note start
	//    note end
	//    note preroll

	function HandleRecordChange(sesh: IRecordingSession) {
		// const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(new IRecordingSession())
		setRecordingSession(sesh)
		setHotPanel("SoundBoardStatus")
	}

	function HandleStroopChange(StroopMode: IStroopMode) {
		setStroopMode(StroopMode)
		setHotPanel("DataSelector")
	}

	function HandleWordContext(WordList: any) {
		setWordList(WordList)
		setHotPanel("TheButtons")
	}

	function HandlePopulation(requestedSource: string) {
		if (requestedSource) {  //  perhaps some type checking?
			dataSourceContext = requestedSource as unknown as Context<URL>
		}
	}

	function HandleTransportChange(requestedState: string): void {
		if (requestedState === 'play') {
			// @ts-ignore
			PlayButtStream(RecordingSession[1].Sequences)
		}
		if (requestedState === 'stop') {
			StopEverything()
		}
		if (requestedState === 'record') {
			startRecordingTimer()
		}
		if (requestedState === 'reset') {
			resetRecordingTimer()
		}
	}

	// function HandleVoiceChange(NewVoice: SpeechSynthesisVoice) {
	// 	console.log('current:', CurrentVoice.displayName, 'new:', NewVoice.name)
	// 	setCurrentVoice(NewVoice)
	// }

	// let color: string = button.color ? button.color!.toString() : ''

	const resetCountdown = () => {
		if (!downTimerOn) {
			elapsedTime = RecStart - Date.now()
		}
	}

	const countdownTime: number = 2600
	const pace: number = 3500

	async function delay(duration: number | undefined, data: any) {
		return new Promise(resolve => {
			setTimeout(resolve.bind(null, data), duration);
		});
	}

	const PlayButtStream = (RequestedSequence: ISequence | null) => {
		setHotPanel("SoundBoardStatus")
		setUser(0)
		StopEverything()
		resetCountdown()
		startPlaybackTimer()
		setIsPlaying(true)
		setIsRecording(false)
		let delta: number = 0
		let localSeq
		// const Sequence: ISequence = RequestedSequence ? RequestedSequence : new ISequence([new IButton(new ISound())]) as ISequence

		if (RequestedSequence) {
			if (typeof (RequestedSequence) !== 'undefined') {
				localSeq = Object.assign(RequestedSequence)
			}
			if (RequestedSequence.Sequence) {
				localSeq = Object.assign(RequestedSequence.Sequence)
			}
			localSeq.reduce(function (p: Promise<any>, button: IButton, i: number, ray: { begin: any }[]) {
				return p.then(async () => {
					if (button.sound && button.begin) {
						let x = i > 0 ? i - 1 : 0 as number
						delta = button.begin - ray[x].begin
						return await PlayButton(button).then(await delay.bind(null, delta)).then();
					} else {
						console.log('giving up')
						return null
					}
				})
			}, Promise.resolve()).then(() => {
				setIsPlaying(false)
				setUser(8675309)
			}).catch((err: { toString: () => any }) => {
				console.log('error:', err.toString())
			});
		} else {
			console.log('shouldn’t have been undefined I guess')
		}
	}

	async function PlayButton(button: IButton) {
		setIsPlaying(true)
		if (StroopMode === 'speech') {
			Speak(button.sound)
		}
		if (StroopMode === 'tone') {
			MakeNoise(button.sound)
		}
	}

	function startPlaybackTimer() {
		downTimerOn = true
		setIsPlaying(true)
		playbackTimer = setInterval(() => {
			elapsedTime = Date.now() - RecStart
		}, planck)
		return true
	}

	function stopPlaybackTimer() {
		setIsPlaying(false)
		let result: number = playbackTimer ? 0 : Date.now() - RecStart
		playbackTimerOn = false
		clearInterval(playbackTimer)
		return result
	}

	const stopCountdown = () => {
		clearInterval(downTimer)
		downTimerOn = false
	}

	const StopEverything = () => {
		speechSynthesis.pause()
		speechSynthesis.cancel()
		stopCountdown()
		stopPlaybackTimer()
		stopRecordingTimer()
		clearInterval(downTimer)
		clearInterval(playbackTimer)
		playbackTimerOn = false
		downTimerOn = false
		setIsPlaying(false)
		setIsRecording(false)
	}

	function compare(sequenceA: any[], sequenceB: any[]) {
		setComparison(null)
		for (let note in sequenceA) {
			// if (challenge.length >= sequence.length)
			// @ts-ignore
			Comparison.push([note[0].toString(), sequenceB[0].toString()])
		} //  or maybe should be map()  TODO
	}

	const startRecordingTimer = () => {
		setHotPanel("ButtonBoard")
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
		setHotPanel("ButtonBoardStatus")
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

	const buttonBoardRef: Ref<HTMLDivElement> = useRef(null)
	const buttonBoardDiv = buttonBoardRef.current

	useEffect(() => {
			if (buttonBoardDiv != null) {
				if (isPlaying) {
					buttonBoardDiv.style.opacity = "0.75"
					buttonBoardDiv.style.pointerEvents = "none"
				} else {
					buttonBoardDiv.style.opacity = "1"
					buttonBoardDiv.style.pointerEvents = "initial"
				}
			}
		},
		[isPlaying, isRecording])

	const pageLayoutRef: Ref<HTMLDivElement> = useRef(null)
	const pageLayoutDiv = pageLayoutRef.current

	useEffect(() => {
			if (pageLayoutDiv != null) {
				pageLayoutDiv.className = StroopMode.toString()
			}
		},
		[StroopMode])

	const recordClockRef: Ref<HTMLDivElement> = useRef(null)
	const recordClockDiv = recordClockRef.current

	useEffect(() => {
		if (recordClockDiv && recordClockDiv.classList) {
			if (isRecording) {
				recordClockDiv.classList.add('recording')
				recordClockDiv.classList.remove('playing')
			} else {
				recordClockDiv.classList.remove('recording')
			}
			if (isPlaying) {
				recordClockDiv.classList.add('playing')
				recordClockDiv.classList.remove('recording')
			} else {
				recordClockDiv.classList.remove('playing')
			}
		}
	}, [isRecording, recordClockDiv, isPlaying])

	const DoTheButton = (button: IButton) => {
		let thisButton = Object.assign({}, button)
		if (user > 0) {
			if (!isRecording) {
				startRecordingTimer()
			}
		} else {
			if (count === 0) {
				thisButton.begin = 1
			} else {
				thisButton.begin = Date.now() - RecordingStart
			}
		}

		for (let i = 0; i < voices.length; i++) {
			if (CurrentVoice.displayName) {
				if (voices[i].name === CurrentVoice.displayName) {
					if (override && thisButton.sound) {
						thisButton.sound.voice = voices[i] as SpeechSynthesisVoice
					} else if (thisButton.sound) {
						thisButton.sound.voice = voices[i] as SpeechSynthesisVoice
					}
				}
			}
		}

		setButton(thisButton)

		function stop(thisButton: IButton) {
			thisButton.end = Date.now() - RecordingStart
		}

		// setClickTime(Date.now())

		setCount((count: number) => count + 1)
		// shouldn’t hit tally until mouse up
		// setTally((prevTally: IButton[]) => [...prevTally, thisButton])

		if (stroopContext.Provider.toString() === 'speech' && thisButton.sound) {
			// let what: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()
			// what.text = thisButton.sound?.pronunciation as string
			Speak(thisButton.sound)
		}

		if (stroopContext.Provider.toString() === 'tone' && thisButton.sound) {
			let duration = thisButton.end ? thisButton.end - thisButton.begin! : 1
			MakeNoise(thisButton.sound, duration)
		}
	}

	const HandleButtonPress = (oneButton: IButton, direction: string) => {
		let thisButton = Object.assign({}, oneButton)
		if (direction === "down") {
			if (count === 0) {
				thisButton.begin = 1
			} else {
				thisButton.begin = Date.now() - RecordingStart
			}
			// setButton(thisButton)
			setCount((count: number) => count + 1)
		} else if (direction === "up") {
			thisButton = button
			thisButton.end = Date.now() - RecordingStart
			let completedButton = thisButton
			setTally((prevTally: IButton[]) => [...prevTally, completedButton])
			setRecordingSession(
				[
					{SessionData: [{RecStart: RecordingStart}]},
					{
						Sequences:
							[...tally, completedButton]

					}
				]
			)
		}
		if (realtime) {
			DoTheButton(thisButton)
		}
		return thisButton
	}

	let TransportState = "empty"
	if (isPlaying) {
		TransportState = "playing"
	}
	if (isRecording) {
		TransportState = "recording"
	}

	return (
		<div
			id={'pageLayout'}
			ref={pageLayoutRef}
		>
			<stroopContext.Provider value={HotPanel}>
				<stroopContext.Provider value={StroopMode}>
					<wordContext.Provider value={WordList}>
						<voiceContext.Provider value={CurrentVoice}>
							<RecordingContext.Provider value={RecordingSession}>

								<SoundBoardStatus
									Sequence={tally}
									TransportState={TransportState}
									HotPanel={HotPanel}
									TransportStateChangeHandler={HandleTransportChange}
								/>

								<Populator
									handlePopulation={HandlePopulation}
									HotPanel={HotPanel}
									setWordContext={HandleWordContext}
								/>

								<StroopSwitch
									StroopMode={StroopMode}
									StroopUpdater={HandleStroopChange}
									HotPanel={HotPanel}
								/>

								{/*<RecordingSessions*/}
								{/*	Sessions={RecordingSession}*/}
								{/*	SessionChangeHandler={HandleRecordChange}*/}
								{/*	HotPanel={HotPanel}*/}
								{/*/>*/}

								<TheButtons
									HandleButtonPress={HandleButtonPress}
									HotPanel={HotPanel}
								/>

							</RecordingContext.Provider>
						</voiceContext.Provider>
					</wordContext.Provider>
				</stroopContext.Provider>
			</stroopContext.Provider>

		</div>

	)
}

// function compare(sequence:any[], challenge:any[]){
//   setComparison(null)
//   for(let note in sequence){
//     // if (challenge.length >= sequence.length)
//       // @ts-ignore
//    Comparison.push([note[0].toString(), sequence[0].toString()])
//     } //  or maybe should be map()  TODO
//   }
//

//	
//	
// 	sample code from Stack Overflow:
//	
// 	// Here is a simple example of a UserProfile
// 	// closure that will hold the user's name.
//
// 	var UserProfile = (function () {
// 		var full_name = '';
//
// 		var getName = function () {
// 			return full_name;    // Or pull this from cookie/localStorage
// 		};
//
// 		var setName = function (name) {
// 			full_name = name;
// 			// Also set this in cookie/localStorage
// 		};
//
// 		return {
// 			getName: getName,
// 			setName: setName
// 		}
//
// 	})();
//
// 	export default UserProfile;
//
// // When a user logs in, you can populate this
// // object with user name, email address etc.
//
// import UserProfile from './UserProfile';
//
// UserProfile.setName('Some Guy');
//
// // Then you can get this data from any
// // component in your app when needed.
//
// import UserProfile from './UserProfile';
//
// UserProfile.getName();
//
// setSession([...session, {}])
