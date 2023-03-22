import React, {Context, Ref, useEffect, useRef, useState} from 'react'
import {IButton, IRecordingSession, ISequence, IWord, ISound, IStroopMode} from './Types'
import {MakeNoise, Speak} from './AudioCode'
import {SoundBoardStatus} from './SoundBoardStatus'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {Directions} from './Directions';
import {StroopSwitch} from './StroopSwitch';
import {Populator} from './Populator';
import {TheButtons} from './TheButtons';
import {VoiceChoice} from './VoiceChoice';
import {RecordingSessions} from './RecordingSessions';

let override: boolean = true
let realtime: boolean = true
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
export const voiceNameContext: React.Context<string> = React.createContext('')
// export const voiceContext: React.Context<SpeechSynthesisVoice> = React.createContext(new SpeechSynthesisVoice())
export const RecordingContext: React.Context<IRecordingSession> = React.createContext(new IRecordingSession())
export const stroopContext: React.Context<any> = React.createContext('speech')
export const wordContext: React.Context<any> = React.createContext('')
export let dataSourceContext: React.Context<any> = React.createContext('')

export function TheSoundBoard(this: any) {

	const [debug, setDebug]: [number, Function] = useState(8)
	const [count, setCount]: [number, Function] = useState(0)
	const [isPlaying, setIsPlaying]: [boolean, Function] = useState(false)
	const [isRecording, setIsRecording]: [boolean, Function] = useState(false)
	const [shouldStop, setShouldStop]: [boolean, Function] = useState(false)
	const [shouldWriteToDisk, setShouldWriteToDisk]: [boolean, Function] = useState(false)
	const [shouldReadFromDisk, setShouldReadFromDisk]: [boolean, Function] = useState(true)
	const [RecordingStart, setRecordingStart]: [number, Function] = useState(0)
	const [RecordingStop, setRecordingStop]: [number, Function] = useState(Date.now())
	const [ButtonBegin, setButtonBegin]: [number, Function] = useState(0)
	const [tally, setTally]: [IButton[], Function] = useState([])
	const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(new IRecordingSession())
	const [ActiveSequence, setActiveSequence]: [ISequence, Function] = useState(new ISequence)
	const [SelectedSequences, setSelectedSequences]: [ISequence[], Function] = useState([new ISequence])
	const [button, setButton]: [IButton, Function] = useState(new IButton(''))
	const [StroopMode, setStroopMode]: [IStroopMode, Function] = useState('unsure')
	const [WordList, setWordList]: [[], Function] = useState([])
	const [HotPanel, setHotPanel]: [string, Function] = useState('Directions')
	const [ZoomLevel, setZoomLevel]: [number, Function] = useState(0)
	const [CurrentVoice, setCurrentVoice]: [SpeechSynthesisVoice, Function] = useState(voices[0])
	const [CurrentVoiceName, setCurrentVoiceName]: [string, Function] = useState('')

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
		let lsRS
		if (typeof localStorage.getItem('RecordingSession') === 'string') {
			lsRS = localStorage.getItem('RecordingSession')
			if (lsRS) {
				try {
					let lsRSobjects = JSON.parse(lsRS)
					if (lsRSobjects.Sequences) {
						return lsRSobjects.Sequences
					} else {
						return lsRSobjects
					}
				} catch (err) {
					if (debug > 7) {
						alert('getRecordingSessionFromDisk()' + err)
					}
					console.log(err)
				}
			}
		} else {
			return {}
		}
	}

	useEffect(() => {
		const rsArray = RecordingSession ? RecordingSession : RecordingSession as unknown as Array<any>
		if (shouldWriteToDisk && JSON.stringify(rsArray).length > 23) {
			localStorage.setItem('RecordingSession', JSON.stringify(rsArray))
		}
		setShouldWriteToDisk(false)
	}, [shouldWriteToDisk])

	useEffect(() => {
		if (shouldReadFromDisk) {
			let ls = localStorage.getItem('RecordingSession')
			if (ls != undefined) {
				if (ls.length > 1) {
					let newRS: IRecordingSession = JSON.parse(ls) as IRecordingSession
					if (newRS.Sequences != undefined) {
						setRecordingSession(newRS)
					} else {
						setRecordingSession(newRS) // because I’m storing it wrong
						//  or at least, was… am I still with Sequences[] resolved?
					}
				}
			}
		}
		setShouldReadFromDisk(false)
	}, [shouldReadFromDisk])

	function HandleRecordChange(sesh: IRecordingSession) {
		setActiveSequence(sesh)
		setHotPanel('SoundBoardStatus')
	}

	function ActiveSequenceSelector(sequence: ISequence) {
		setActiveSequence(sequence)
	}

	function MultipleSequenceSelector(sequences: ISequence[]) {
		setSelectedSequences(sequences)
	}

	function HandleSequenceDelete(victim: ISequence) {
		if (RecordingSession.Sequences) {
			let allSequences = RecordingSession.Sequences.slice(0)
			let mostSequences = allSequences  // but without victim
			setRecordingSession(
				{Sequences: mostSequences}
			)
			setShouldWriteToDisk(true)
		}
	}

	function HandleStroopChange(StroopMode: IStroopMode) {
		setStroopMode(StroopMode)
		switch (StroopMode) {
			case 'speech':
				setHotPanel('VoiceChoice')
				break;
			case 'text':
				setHotPanel('DataSelector')
				break;
			case 'color':
				setHotPanel('StroopSwitch')
				// setHotPanel('RoncoPocketColorPicker')
				break;
			case 'shape':
				setHotPanel('TheButtons')
				// setHotPanel('Shapely')
				break;
			case 'tone':
				setHotPanel('TheButtons')
				// setHotPanel('Toney')
				break;
			default:
				setHotPanel('StroopSwitch')
		}
	}

	function HandleWordListChange(ChosenWordList: IWord[]) {
		let NewWordList = ChosenWordList.slice(0)
		setWordList(NewWordList)
		console.log(JSON.stringify(NewWordList))
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
			setShouldStop(false)
			PlayButtStream(ActiveSequence)
		}
		if (requestedState === 'stop') {
			StopEverything()
			setHotPanel('SoundBarStatus')
		}
		if (requestedState === 'record') {
			setShouldStop(false)
			startRecordingTimer()
		}
		if (requestedState === 'reset') {
			setShouldStop(false)
			resetRecordingTimer()
		}
	}

	function HandleVoiceChange(NewVoice: SpeechSynthesisVoice) {
		console.log('current:', CurrentVoice.name, 'new:', NewVoice.name)
		setCurrentVoice(NewVoice)
	}

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
		setHotPanel('SoundBoardStatus')
		setUser(0)
		StopEverything()
		resetCountdown()
		startPlaybackTimer()
		setIsPlaying(true)
		setIsRecording(false)
		let delta: number = 0
		let localSeq
		// const Sequence: ISequence = RequestedSequence ? RequestedSequence : new ISequence([new IButton(new ISound())]) as ISequence

		if (!shouldStop) {
			if (RequestedSequence == undefined) {
				RequestedSequence = ActiveSequence
			}
			localSeq = Object.assign(RequestedSequence)
			if (RequestedSequence.ButtStream) {
				localSeq = Object.assign(RequestedSequence.ButtStream)
			}
			if (Array.isArray(localSeq)) {
				localSeq.reduce(function (p: Promise<any>, button: IButton, i: number, ray: { begin: any }[]) {
					return p.then(async () => {
						if (button.sound && button.begin) {
							let x = i > 0 ? i - 1 : 0 as number
							delta = button.begin - ray[x].begin
						} else {
							delta = 42
						}
						return await PlayButton(button).then(await delay.bind(null, delta)).then()
					})
				}, Promise.resolve()).then(() => {
					setIsPlaying(false)
					setUser(8675309)
				}).catch((err: { toString: () => any }) => {
					console.log('error:', err.toString())
				});
			} else {
				console.log('we failed to cast RequestedSequence as an object')
			}
		}
	}

	async function PlayButton(button: IButton) {
		let currentlyOscillating
		if (!shouldStop) {
			setIsPlaying(true)
			if (button.begin && button.end) {
				duration = Math.abs(button.end - button.begin)
				duration = duration < 1 ? 1 : duration
				duration = duration > 8675309 ? 666 : duration
			}
			if (button.begin && !button.end) {
				if (StroopMode === 'tone') {
					currentlyOscillating = MakeNoise(button.sound)
				}
			}

			if (StroopMode === 'speech') {
				let voice = voiceContext.Provider.name ? voiceContext.Provider.name.toString() : ''
				currentlyOscillating = Speak(button.sound, duration, voice)
			}
		}
		return currentlyOscillating
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

		if (!isRecording) {
			// we’re not touching a RecordingSession yet
			setTally([])
			if (getRecordingSessionFromDisk().length > 1) {
				setShouldReadFromDisk(true)
				setActiveSequence(getRecordingSessionFromDisk())
			} else {
				setActiveSequence(new ISequence())
			}
			setHotPanel('TheButtons')
			setRecordingStart(Date.now())
			RecordingTimer = setInterval(() => {
				elapsedTime = Date.now() - RecordingStart
			}, planck)
			setIsRecording(true)
			return elapsedTime
		}
		return elapsedTime
	}

	function stopRecordingTimer() {
		let localStorageSession: IRecordingSession = getRecordingSessionFromDisk()
		// setShouldWriteToDisk(true)

		if (RecordingSession.Sequences == undefined) {  //  pinch off first session
			if (localStorageSession.Sequences && localStorageSession.Sequences.length > 1) {
				setRecordingSession(localStorageSession)  //  read from disk
				// setShouldWriteToDisk(true)
			} else {
				setShouldWriteToDisk(true)
			}
		} else { //  pinch off another session
			let previousSequences: ISequence[]
			if (RecordingSession.Sequences && RecordingSession.Sequences.length > 0) {
				previousSequences = RecordingSession.Sequences.slice(0)
				setRecordingSession({Sequences: [...previousSequences, ActiveSequence]})
				setShouldWriteToDisk(true)
			} else {
				setRecordingSession({Sequences: [ActiveSequence]})
				setShouldWriteToDisk(true)
			}
			setTally([])
			// {SessionData: {RecStart}.RecStart > 0 ? {RecStart}.RecStart : {RecStart: RecordingStart}.RecStart},
		}
		// setHotPanel('ButtonBoardStatus')
		setIsRecording(false)
		setRecordingStop(Date.now())
		elapsedTime = Date.now() - RecordingStart
		clearInterval(RecordingTimer)
		return elapsedTime
	}

	function resetRecordingTimer() {
		setIsRecording(false)
		elapsedTime = 0
		setCount(0)
		//  delete session
		clearInterval(RecordingTimer)
		setTally([])
	}

	const buttonBoardRef: Ref<HTMLDivElement> = useRef(null)
	const buttonBoardDiv = buttonBoardRef.current

	useEffect(() => {
			if (buttonBoardDiv != null) {
				if (isPlaying) {
					buttonBoardDiv.style.opacity = '0.75'
					buttonBoardDiv.style.pointerEvents = 'none'
				} else {
					buttonBoardDiv.style.opacity = '1'
					buttonBoardDiv.style.pointerEvents = 'initial'
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

	const [current, setCurrent] = useState<{ OscillatorNode: { stop: (when: number) => void } }>()
	const HandleButtonPress = async (oneButton: IButton, direction: string) => {
		let thisButton = Object.assign({}, oneButton)
		if (direction === 'down') {
			if (count === 0) {
				thisButton.begin = 0
			} else {
				thisButton.begin = RecordingStart > 1 ? Date.now() - RecordingStart : 199
			}
			setButton(thisButton)
			setButtonBegin(Date.now())
			setCount((count: number) => count + 1)
			if (realtime) {
				// speechSynthesis.cancel()
				setCurrent(await PlayButton(thisButton))
			}
		} else if (direction === 'up') {
			if (thisButton.sound) {
				if (realtime && current) {
					if (current.OscillatorNode) {
						current.OscillatorNode.stop(0)
						console.log("never lands here")
						// @ts-ignore
					} else if (typeof current === OscillatorNode) {
						// @ts-ignore
						current.stop(0)
						console.log("here, either")
					} else { // @ts-ignore
						if (typeof current === SpeechSynthesisUtterance) {
							console.log('utterance', (Date.now() - ButtonBegin + 250) / 1000)
							// @ts-ignore
							current.stop((Date.now() - ButtonBegin + 250) / 1000)
						} else {
							console.log((Date.now() - ButtonBegin + 250) / 1000)
							// @ts-ignore
							current.stop((Date.now() - ButtonBegin + 250) / 1000)
						}
					}
				}
			}
			thisButton.end = RecordingStart > 1 ? Date.now() - RecordingStart : 11
			let completedButton = thisButton
			setTally((prevTally: IButton[]) => [...prevTally, completedButton])
			// setActiveSequence((prevSequences: IButton[]) => [...prevSequences, completedButton])
			setActiveSequence([...tally, thisButton])
		}
		return thisButton
	}

	// 	const DoTheButton = (button: IButton) => {
	// 	let thisButton = Object.assign({}, button)
	// 	if (user > 0) {
	// 		if (!isRecording) {
	// 			startRecordingTimer()
	// 		}
	// 	} else {
	// 		if (count === 0) {
	// 			thisButton.begin = 1
	// 		} else {
	// 			thisButton.begin = Date.now() - RecordingStart
	// 		}
	// 	}
	//
	// 	setButton(thisButton)
	//
	// 	setCount((count: number) => count + 1)
	// 	// shouldn’t hit tally until mouse up
	// 	// setTally((prevTally: IButton[]) => [...prevTally, thisButton])
	//
	// 	if (stroopContext.Provider.toString() === 'speech' && thisButton.sound) {
	// 		Speak(thisButton.sound)
	// 	}
	//
	// 	if (stroopContext.Provider.toString() === 'tone' && thisButton.sound) {
	// 		let duration = thisButton.begin && thisButton.end ? thisButton.end - thisButton.begin : 1
	// 		MakeNoise(thisButton.sound, duration)
	// 	}
	// }

	let TransportState = 'empty'
	if (isPlaying) {
		TransportState = 'playing'
	}
	if (isRecording) {
		TransportState = 'recording'
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
							<voiceNameContext.Provider value={CurrentVoiceName}>
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
										ActiveSequence={ActiveSequence}
										TransportState={TransportState}
										TransportTime={elapsedTime}
										HotPanel={HotPanel}
										HotPanelUpdater={setHotPanel}
										TransportStateChangeHandler={HandleTransportChange}
										Instructions={'Look Upon Your Creation'}
										RecordingSession={RecordingSession}
										RecordingSessionChangeHandler={HandleRecordChange}
										SequenceSelector={ActiveSequenceSelector}
									/>

									<RecordingSessions
										HotPanel={HotPanel}
										HotPanelUpdater={setHotPanel}
										Instructions={'Manage Your Recordings'}
										RecordingSession={RecordingSession}
										SessionChangeHandler={HandleRecordChange}
										SequenceDeleteHandler={HandleSequenceDelete}
										SequenceSelector={ActiveSequenceSelector}
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
										VoiceUpdater={HandleVoiceChange}
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
							</voiceNameContext.Provider>
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
