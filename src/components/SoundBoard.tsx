import React, {
	Component,
	Context,
	useState,
	useEffect,
	useReducer,
	Reducer,
	useContext,
	createContext, Ref, useRef
} from 'react'
import * as Types from './Types'
import {Speak, MakeNoise} from './AudioCode'
import {SoundBoardStatus} from './SoundBoardStatus'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IRecordingSession, IButton, ISound, IStroopMode} from './Types';
import {RecordingSessions} from './RecordingSessions';
import {CurrentButton} from './CurrentButton';
import {StroopSwitch} from "./StroopSwitch";
// import {AST} from 'eslint'
// import Token = AST.Token

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

let RecordingTimer: NodeJS.Timer
let elapsedTime: number = 0
let planck: number = 10
let delta: number = 0

const voices = window.speechSynthesis.getVoices()
export const voiceContext: React.Context<SpeechSynthesisVoice> = React.createContext(voices[1])
export const soundContext: React.Context<IRecordingSession> = React.createContext(new IRecordingSession())
export const stroopContext: React.Context<any> = React.createContext("speech")

export function TheSoundBoard(this: any) {

	const [count, setCount]: [number, Function] = useState(0)
	const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)
	const [isRecording, setIsRecording]: [boolean, Function] = useState(false)
	const [RecordingStart, setRecordingStart]: [number, Function] = useState(0)
	const [RecordingStop, setRecordingStop]: [number, Function] = useState(Date.now())
	const [clickTime, setClickTime]: [number, Function] = useState(0)
	// let tally:IButton[] = []
	// const tallyContext = React.createContext([])
	// const setTally = useContext(tallyContext)
	const [tally, setTally]: [IButton[], Function] = useState([])
	const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(new IRecordingSession())
	// const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState([  {SessionData: [] } , {Sequences:[] } , Function ] )
	const [button, setButton]: [IButton, Function] = useState(new IButton(new ISound()))
	const [StroopMode, setStroopMode]: [IStroopMode, Function] = useState('uncertain')
	const [CurrentVoice, setCurrentVoice]: [SpeechSynthesisVoice, Function] = useState(voices[3])

	const [userID, setUserID]: [number, Function] = useState(666)
	const [sessionID, setSessionID]: [number, Function] = useState(0)
	const [sessionStart, setSessionStart]: [number, Function] = useState(0)
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
		console.log('HRC', typeof sesh)
		setRecordingSession(sesh)
	}

	function HandleStroopChange(StroopMode: IStroopMode) {
		setStroopMode(StroopMode)
	}

	function HandleVoiceChange(NewVoice: SpeechSynthesisVoice) {
		console.log('current:', CurrentVoice.name, 'new:', NewVoice.name)
		setCurrentVoice(NewVoice)
	}

	// let color: string = button.color ? button.color!.toString() : ''

	function compare(sequenceA: any[], sequenceB: any[]) {
		setComparison(null)
		for (let note in sequenceA) {
			// if (challenge.length >= sequence.length)
			// @ts-ignore
			Comparison.push([note[0].toString(), sequenceB[0].toString()])
		} //  or maybe should be map()  TODO
	}

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

	// const buttonTally: Ref<any> = useRef(null)
	// useEffect(() => {
	// 	if ((buttonTally ?? null).current) {
	// 		buttonTally.current.className = 'hot'
	// 	}
	// }, [count])	

	const buttonTally: Ref<any> = useRef(null)
	useEffect(() => {
		if ((buttonTally).current) {
			buttonTally.current.className = 'hot'
		}
	}, [count])

	const buttonBoardRef: Ref<HTMLDivElement> = useRef(null)
	const buttonBoardDiv = buttonBoardRef.current

	const stroopModeRef: Ref<HTMLDivElement> = useRef(null)
	const stroopModeDiv = stroopModeRef.current

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

		thisButton.sound.voice = CurrentVoice
		
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

		if (stroopContext.Provider.toString() === 'speech' && thisButton.sound) {
			// let what: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()
			// what.text = thisButton.sound?.pronunciation as string
			Speak(thisButton.sound)
		}

		if (stroopContext.Provider.toString() === 'tone' && thisButton.sound) {
			let duration = thisButton.end! - thisButton.begin
			MakeNoise(thisButton.sound, duration)
		}

	}

	return (
		<React.StrictMode>
			<div
				className={'pageLayout'}
			>

				<stroopContext.Provider value={StroopMode}>

					<StroopSwitch
						StroopMode={StroopMode}
						CurrentVoice={CurrentVoice}
						StroopUpdater={HandleStroopChange}
						VoiceUpdater={HandleVoiceChange}
					/>
					<SoundBoardStatus
						Sequence={tally}
					/>

					<soundContext.Provider value={RecordingSession}>

						<div
							className={'box'}
							id='buttonBoard'
							ref={buttonBoardRef}
						>

							{/*<h1>Do your buttons!</h1>*/}

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

							<div className={'' + button.color} id={'TheButtons'}>
								{soundList.map(function (oneButton: IButton, i: React.Key) {
									return <button
										key={i}
										name={oneButton.sound!.name}
										value={oneButton.sound!.name}
										className={oneButton.color ? oneButton.color.toString() : ''}
										//  ToDoButNotToday: replace onClick with addEventListener()
										onMouseDown={() => DoTheButton(oneButton)}
									>{oneButton.sound!.name}</button>
								})}
							</div>
						</div>

						<RecordingSessions
							RSP={RecordingSession}
							UpdaterFunction={HandleRecordChange}
						/>
					</soundContext.Provider>

					<CurrentButton
						CurrentButton={button}
					/>

				</stroopContext.Provider>


			</div>

		</React.StrictMode>
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
