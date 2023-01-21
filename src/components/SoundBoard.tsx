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
import * as Types from './Types'
import {Speak, MakeNoise} from './AudioCode'
import {SoundBoardStatus} from './SoundBoardStatus'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IRecordingSession, IButton, ISound, IStroopMode} from './Types';
import {RecordingSessions} from './RecordingSessions';
import {CurrentButton} from './CurrentButton';
import {StroopSwitch} from "./StroopSwitch";
import {VoiceChoice} from "./VoiceChoice";
import {TheButtons} from "./TheButtons";

let override = true
let realtime = true
let direction = ""

let RecordingTimer: NodeJS.Timer
let elapsedTime: number = 0
let planck: number = 10
let delta: number = 0

const voices = window.speechSynthesis.getVoices()
export const voiceContext: React.Context<any> = React.createContext(voices[0].name)
// export const voiceContext: React.Context<SpeechSynthesisVoice> = React.createContext(voices[0])
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
	const [StroopMode, setStroopMode]: [IStroopMode, Function] = useState('unsure')
	const [CurrentVoice, setCurrentVoice]: [Context<any>, Function] = useState(voiceContext)

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
		console.log('current:', CurrentVoice.displayName, 'new:', NewVoice.name)
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

	const handleButtonPress = (oneButton: IButton, direction: string) => {
		let thisButton = Object.assign({}, oneButton)
		if (direction === "down") {
			if (count === 0) {
				thisButton.begin = 1
			} else {
				thisButton.begin = Date.now() - RecordingStart
			}
			delta = thisButton.begin - RecordingStart + Date.now()
			setButton(thisButton)
			setCount((count: number) => count + 1)
		} else if (direction === "up") {
			thisButton = button
			thisButton.end = Date.now() - RecordingStart
			setTally((prevTally: IButton[]) => [...prevTally, thisButton])
			setRecordingSession(
				[
					{SessionData: [{RecStart: RecordingStart}]},
					{
						Sequences: [
							[...tally, thisButton]
						]
					}
				]
			)
		}
		if (realtime) {
			DoTheButton(thisButton)
		}
	}

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

		for (let i = 0; i < voices.length; i++) {
			if (voices[i].name === CurrentVoice.displayName) {
				if (override) {
					thisButton.sound.voice = voices[i] as SpeechSynthesisVoice
				} else {
					thisButton.sound.voice = voices[i] as SpeechSynthesisVoice
				}
			}
		}

		function stop(thisButton: IButton) {
			thisButton.end = Date.now() - RecordingStart
		}

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
				<soundContext.Provider value={RecordingSession}>
					<stroopContext.Provider value={StroopMode}>
						<voiceContext.Provider value={CurrentVoice}>
							<div
								className={'box'}
								id={'stroopSwitch'}
							>
								<StroopSwitch
									StroopMode={StroopMode}
									StroopUpdater={HandleStroopChange}
								/>
								<VoiceChoice
									CurrentVoice={CurrentVoice}
									VoiceUpdater={HandleVoiceChange}
								/>
							</div>
							<SoundBoardStatus
								Sequence={tally}
							/>
							<div
								className={'box'}
								id='buttonBoard'
								ref={buttonBoardRef}
							>
								<TheButtons
									handleButtonPress={handleButtonPress}
								/>
							</div>

							{/*<RecordingSessions*/}
							{/*	RSP={RecordingSession}*/}
							{/*	UpdaterFunction={HandleRecordChange}*/}
							{/*/>*/}

							<CurrentButton
								CurrentButton={button}
							/>
						</voiceContext.Provider>
					</stroopContext.Provider>
				</soundContext.Provider>
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
