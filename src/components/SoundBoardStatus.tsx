import React, {Ref, useContext, useEffect, useRef, useState} from 'react'
import {IRecordingSession, IButton, ISound, ISequence} from './Types'
import {Speak, MakeNoise} from './AudioCode';
import './SoundBoard.css'
import {stroopContext} from './SoundBoard';

// console.clear()

let planck: number = 10
let playbackTimer: NodeJS.Timer
let downTimer: NodeJS.Timer
let downTimerOn: boolean = false
let playbackTimerOn: boolean = false
let elapsedTime: number = 0
let RecStart: number = 0
let duration: number = 0

let root = document.documentElement;

// root.addEventListener("mousemove", e => {
//   root.style.setProperty('--scroll-distance', e.clientX + "px");
// });

export function SoundBoardStatus(props: { Sequence: IButton[] }) {
	const [isPlaying, setIsPlaying] = useState(false)
	// const [tally, setTally]: [IButton[], Function] = useState([])
	// const [RecordingSession, setRecordingSession]: [IRecordingSession | IRecordingSession[], Function] = useState([])
	const [isRecording, setIsRecording] = useState(false)
	const stroopMode = useContext(stroopContext)

	let rs: IButton[] = props.Sequence

	playbackTimerOn = false
	downTimerOn = false

	const playbackButtons: Ref<any> = useRef(null)
	useEffect(() => {
			if (playbackButtons != null && isPlaying) {
				playbackButtons.current.classList.add('playing')
			} else {
				playbackButtons.current.classList.remove('playing')
			}
		},
		[isPlaying])

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

	const PlayButtStream = () => {
		StopEverything()
		resetCountdown()
		startPlaybackTimer()
		setIsPlaying(true)
		setIsRecording(false)
		let delta: number = 0
		const Sequence: IButton[] = props.Sequence // ? props.Sequence : new ISequence([new IButton(new ISound())]) as ISequence

		if (typeof (Sequence) === 'undefined') {
			console.log('shouldn’t have been undefined I guess')
		} else {
			Sequence.reduce(function (p: Promise<any>, button: IButton, i, ray) {
				return p.then(async () => {
					if (button.sound) {
						let x = i > 0 ? i - 1 : 0 as number
						delta = button.begin! - ray[x].begin!
						// console.log(delta, JSON.stringify(button))
						return await PlayButton(button).then(await delay.bind(null, delta)).then();
						// return delay.bind(null, button.begin).then(PlayButton(button));
					} else {
						console.log('giving up')
						return null
					}
				});
			}, Promise.resolve()).then(() => {
				setIsPlaying(false)
			}).catch((err: { toString: () => any }) => {
				console.log('error:', err.toString())
			});

		}

	}

	async function PlayButton(button: IButton) {

		if (stroopMode === 'speech') {
			Speak(button.sound)
		}
		if (stroopMode === 'tone') {
			MakeNoise(button.sound)
		}
	}

	function startPlaybackTimer() {
		downTimerOn = true
		RecStart = Date.now()
		playbackTimer = setInterval(() => {
			elapsedTime = Date.now() - RecStart
		}, planck)
		return true
	}

	function stopPlaybackTimer() {
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
		clearInterval(downTimer)
		clearInterval(playbackTimer)
		playbackTimerOn = false
		downTimerOn = false
		setIsPlaying(false)
		setIsRecording(false)
		// downTimer.unref()
		// playbackTimer.unref()
	}

	return (

		<div className={'box'} id={'SoundBoardStatus'}>

			<div className='LCD'>

				<span>{countdownTime}</span>

				<span>{elapsedTime}</span>

				<button
					className={playbackTimer ? 'playing' : 'stopped'}
					ref={playbackButtons}
					key={'playback'}
					value={'playback'}
					onClick={() => PlayButtStream()}
				>{'play'}</button>

				<button
					key={'stop'}
					value={'stop'}
					onClick={() => StopEverything()}
				>{'stop'}</button>

			</div>

			<div className={'wrapper'} id={''}>

				<ul className={'LCD scroller'}>
					{
						rs.map((button, index, sequence) => {
								root.style.setProperty('--sequence-item-count', index.toString());
								// root.style.setProperty('--scroll-distance', index * -2 + 'rem');
								return (<li
									className={'LCD ' + button.color}
									key={index}
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


// return await Promise.all(pt.map(PlayButton)).then(() => delay(pace))
// delay(countdownTime).then(r => {return Promise.all(sequence.map(PlayButton))})
//
// Promise.resolve()
// 	.then(() => buttStream.Sequence.map( async (oneButton: ISoundButton, i: React.Key) => {
// 		await Promise.resolve()
// 			// .then(() => speechSynthesis.cancel())
// 			.then(() => PlayButton(oneButton))
// 			.then(() => delay((pace - cumulative)))
// 	}))
// 	.then(() => setIsPlaying(false))
// 	.then(() => console.log('setIsPlaying(false)')
// 	)
//
// buttStream.Sequence.map(async (oneButton: ISoundButton, i: React.Key) => {
// 		await Promise.resolve()
// 		await delay((pace - cumulative))
// 			// .then(() => speechSynthesis.cancel())
// 			// .then(async () => await delay((pace - cumulative)))
// 			.then(() => PlayButton(oneButton))
// 			.then(() => setIsPlaying(false))
// 			.then(() => console.log('setIsPlaying(false)'))
// 	}
// )
//
//
// buttStream.Sequence.map(async (oneButton: ISoundButton, i: React.Key) => {
// 		await Promise.resolve()
// 		await delay((pace - cumulative))
// 			// .then(() => speechSynthesis.cancel())
// 			// .then(async () => await delay((pace - cumulative)))
// 			.then(() => PlayButton(oneButton))
// 			.then(() => setIsPlaying(false))
// 			.then(() => console.log('setIsPlaying(false)'))
// 	}
// )
//
// function isDupe(): boolean {
// 	return pt[pt.length - 1] === pt[pt.length - 2]
// }
//
// let classTag = () => {
// 	return isDupe() ? 'props dupe' : 'props'
// }
//
// let implementation: number = 2
// let soundTags = []
// let soundClassTag = ''
//
// if (implementation === 1) {
//
//  type 1
//  sound name, instance count, sound name…
//    <div className='props sound data-reps='3'>Outside</div>
//    <div className='props sound'>Hungry</div>
//    <div className='props'>Pets</div>
//
// 	for (let i = 0 i < pt.length i++) {
// 		if (i > 0 && pt[i][0] === pt[i - 1][0]) {
// 			soundClassTag = 'props dupe'
// 			soundTags.push(pt[i][0])
// 		} else {
// 			soundClassTag = 'props'
// 			soundTags.push(pt[i][0])
// 		}
// 		console.log(soundTags[i])
// 	}
//
// 	pt.map(function (button: any, i: React.Key) {
// 		return <div
// 			key={i}
// 			className={'props'}
// 		>
// 			{button}
// 		</div>
// 	})
// } else if (implementation === 2) {
//
//  type 2
//  sound name, delay till next, sound name…
//    <div className='props sound' data-gap='1270'>Outside</div>
//    <div className='props sound' data-gap='315'>Outside</div>
//    <div className='props sound' data-gap='626'>Outside</div>
//    <div className='props sound' data-gap='427'>Hungry</div>
//    <div className='props'>Pets</div>
//
// for (let i = 0 i < pt.length i++) {
// 	if (i > 0 && pt[i][0] === pt[i - 1][0]) {
// 		soundClassTag = 'props dupe'
// 		soundTags.push(pt[i][0])
// 	} else {
// 		soundClassTag = 'props'
// 		soundTags.push(pt[i][0])
// 	}
// 	console.log(soundTags[i])
// }
//
// 	pt.map(function (button: any, i: React.Key) {
// 		return <div
// 			key={i}
// 			className={'props'}
// 		>
// 			{button}
// 		</div>
// 	})
// }
//
//
//
// const MagicDiv: Ref<any> = forwardRef((props, ref) => {
// 	return <input {...props} ref={ref}/>
// })
//
// function AutoFocusInput() {
// 	const inputRef: Ref<any> = useRef(null)
// 	// This effect runs only once after the component mounts (like componentDidMount)
// 	useEffect(() => {
// 		// ref on function component is forwarded to a regular DOM element, 
// 		// so now the parent has access to the DOM node including its focus method.
// 		// Note that the ref usage is the same as a regular 
// 		// DOM element, like in example 1!
// 		inputRef.current.focus()
// 	}, [])
// 	// @ts-ignore
// 	return <MagicDiv ref={inputRef}/>
// }
//
//
//
// const tallyRefOuter: Ref<any> = React.createRef()
// const tallyRefForward: Ref<any> = React.forwardRef(tallyRefOuter)
//
// function ForwardTheRef(props:any, BackwardRef: Ref<undefined>) {
// 	const forwarded: Ref<any> = React.createRef()
// 	return {props, forwarded}
// }
//
// const refDiv: Ref<any> = forwardRef((props, ref: Ref<any>) => {
// 	return <div
// 		className={classTag()}
// 		ref={ref}
// 		id='ThingsTheButtonsSayRightNow'
// 		// onClick={() => DoTheButton(button.name, button.pronunciation)}
// 	>
// 		{props.button}
// 	</div>
// })
//
// ref={isDupe() ? ForwardTheRef : null}
