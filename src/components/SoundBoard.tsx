import React, {Context, Ref, useEffect, useRef, useState} from 'react'
import {IButton, IRecordingSession, ISequence, ISound, IStroopMode} from './Types'
import {MakeNoise, Speak} from './AudioCode'
import {SoundBoardStatus} from './SoundBoardStatus'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {Directions} from "./Directions";
import {StroopSwitch} from "./StroopSwitch";
import {Populator} from "./Populator";
import {TheButtons} from "./TheButtons";
import {VoiceChoice} from "./VoiceChoice";
import {RecordingSessions} from "./RecordingSessions";
import {debug} from "util";

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

export const voices = window.speechSynthesis.getVoices()
export const voiceContext: React.Context<SpeechSynthesisVoice> = React.createContext(voices[0])
// export const voiceContext: React.Context<SpeechSynthesisVoice> = React.createContext(new SpeechSynthesisVoice())
export const RecordingContext: React.Context<IRecordingSession> = React.createContext(new IRecordingSession())
export const stroopContext: React.Context<any> = React.createContext("speech")
export const wordContext: React.Context<any> = React.createContext("")
export let dataSourceContext: React.Context<any> = React.createContext("")

export function TheSoundBoard(this: any) {

	const [count, setCount]: [number, Function] = useState(0)
	const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)
	const [isRecording, setIsRecording]: [boolean, Function] = useState(false)
	const [shouldWriteToDisk, setShouldWriteToDisk]: [boolean, Function] = useState(false)
	const [RecordingStart, setRecordingStart]: [number, Function] = useState(0)
	const [RecordingStop, setRecordingStop]: [number, Function] = useState(Date.now())
	const [clickTime, setClickTime]: [number, Function] = useState(0)
	const [tally, setTally]: [IButton[], Function] = useState([])
	const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(new IRecordingSession())
	const [ActiveSequence, setActiveSequence]: [ISequence, Function] = useState(new ISequence)
	const [button, setButton]: [IButton, Function] = useState(new IButton)
	const [StroopMode, setStroopMode]: [IStroopMode, Function] = useState('unsure')
	const [WordList, setWordList]: [[], Function] = useState([])
	const [HotPanel, setHotPanel]: [string, Function] = useState('Directions')
	const [ZoomLevel, setZoomLevel]: [number, Function] = useState(0)
	const [CurrentVoice, setCurrentVoice]: [SpeechSynthesisVoice, Function] = useState(voices[0])

	const [user, setUser]: [number, Function] = useState(6668675309)
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

	function getRecordingSessionFromDisk() {
		if (typeof localStorage.getItem('RecordingSession') === 'string') {
			// @ts-ignore
			return JSON.parse(localStorage.getItem('RecordingSession'))
		} else {
			return ''
		}
	}

	useEffect(() => {   //  onLoad()?
		const rsArray = RecordingSession ? [...[RecordingSession]] : [[[[['']]]]]
		if (shouldWriteToDisk) {
			localStorage.setItem('RecordingSession', JSON.stringify(rsArray))
		} else {
			//  write anyway until I work out conditions
		}
		setShouldWriteToDisk(false)
	}, [shouldWriteToDisk])

	function HandleRecordChange(sesh: IRecordingSession) {
		// setRecordingSession(sesh)
	}

	function HandleStroopChange(StroopMode: IStroopMode) {
		setStroopMode(StroopMode)

		switch (StroopMode) {
			case "speech":
				setHotPanel("VoiceChoice")
				break;
			case "text":
				setHotPanel("DataSelector")
				break;
			case "color":
				setHotPanel("StroopSwitch")
				// setHotPanel("RoncoPocketColorPicker")
				break;
			case "shape":
				setHotPanel("TheButtons")
				// setHotPanel("Shapely")
				break;
			case "tone":
				setHotPanel("TheButtons")
				// setHotPanel("Toney")
				break;
			default:
				setHotPanel("StroopSwitch")
		}
	}

	function HandleWordListChange(WordList: any) {
		let localVar = WordList
		setWordList(localVar)
		console.log(JSON.stringify(localVar))
	}

	function HandleDataSource(requestedSource: string) {
		if (requestedSource) {  //  perhaps some type checking?
			dataSourceContext = requestedSource as unknown as Context<URL>
		}
	}

	function HandleTransportChange(requestedState: string): void {
		if (requestedState === 'play') {
			// @ts-ignore
			// PlayButtStream(RecordingSession[1].Sequences)
			PlayButtStream(ActiveSequence)
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


	// // setter
	// localStorage.setItem('myData', JSON.stringify(RecordingSession));
	// // getter
	// localStorage.getItem('myData');
	// // remove
	// localStorage.removeItem('myData');
	// // remove all
	// localStorage.clear();
	//

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
						return await PlayButton(button).then(await delay.bind(null, delta)).then()
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
		if (button.end && button.begin) {
			duration = button.end - button.begin
		}
		if (StroopMode === 'speech') {
			Speak(button.sound, duration)
		}
		if (StroopMode === 'tone') {
			MakeNoise(button.sound, duration)
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

	function compare(sequences: ISequence[]) {
		setComparison(null)
		for (let note in sequences) {
			// if (challenge.length >= sequence.length)
			// @ts-ignore
			Comparison.push([note[0].toString(), sequences[0].toString()])
		} //  or maybe should be map()  TODO
	}

	function startRecordingTimer() {

		// we’re not touching a RecordingSession yet

		setTally([])

		// setRecordingSession(
		// 	[
		// 		{SessionData: [{RecStart}] ? [{RecStart}] : [{RecStart: RecordingStart}]},
		// 		{Sequences: RecordingSession.Sequences}
		// 	]
		// )

		setHotPanel("TheButtons")

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
			// setShouldWriteToDisk(true)

			if (RecordingSession === undefined || RecordingSession.Sequences === undefined) {  //  pinch off first session
				setRecordingSession({Sequences: tally})
				setShouldWriteToDisk(true)
			} else { //  pinch off another session
				let previousSequences = RecordingSession.Sequences  //.slice(0)
				// let slicedTally = tally.slice(0)
				// {SessionData: {RecStart}.RecStart > 0 ? {RecStart}.RecStart : {RecStart: RecordingStart}.RecStart},
				setRecordingSession({Sequences: [...previousSequences, tally]})
				setShouldWriteToDisk(true)
			}

			clearInterval(RecordingTimer)

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
		// setRecordingSession(
		// 	[
		// 		// {SessionData: [{RecStart: RecordingStart}]},
		// 		{
		// 			Sequences: [
		// 				// [...tally, button],
		// 				// [...tally, button],
		// 				// [...tally, button]
		// 			]
		// 		}
		// 	]
		// )
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

			if (ActiveSequence.Sequence !== undefined) {
				ActiveSequence.Sequence.push(thisButton)
			} else {
				ActiveSequence.Sequence = [new IButton()]
			}

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

								<Directions
									HotPanel={HotPanel}
									HotPanelUpdater={setHotPanel}
									Instructions={'How To Play'}
								/>

								<StroopSwitch
									StroopMode={StroopMode}
									StroopUpdater={HandleStroopChange}
									HotPanel={HotPanel}
									HotPanelUpdater={setHotPanel}
									Instructions={'Select A Mode'}
								/>

								<SoundBoardStatus
									Sequence={tally}
									TransportState={TransportState}
									TransportTime={elapsedTime}
									HotPanel={HotPanel}
									HotPanelUpdater={setHotPanel}
									TransportStateChangeHandler={HandleTransportChange}
									Instructions={'Record A Few Seconds'}
									RecordingSession={RecordingSession}
									RecordingSessionChangeHandler={HandleRecordChange}
								/>

								<Populator
									handleDataSource={HandleDataSource}
									HotPanel={HotPanel}
									HotPanelUpdater={setHotPanel}
									Instructions={'Choose Your Words'}
									WordList={WordList}
									setWordList={HandleWordListChange}
								/>

								<VoiceChoice
									CurrentVoice={voiceContext}
									VoiceUpdater={setCurrentVoice}
									HotPanel={HotPanel}
									HotPanelUpdater={setHotPanel}
									Instructions={'Pick A Voice'}
								/>

								<TheButtons
									WordList={WordList}
									HandleButtonPress={HandleButtonPress}
									HotPanel={HotPanel}
									HotPanelUpdater={setHotPanel}
									Instructions={'Get Rhythm'}
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
