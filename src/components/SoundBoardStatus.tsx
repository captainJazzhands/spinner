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

let scaleMagic = 5

export function SoundBoardStatus(props: {
	Sequence: IButton[],
	TransportState: string,
	TransportStateChangeHandler: (requestedState: string) => Function
}) {
	const [user, setUser]: [number, Function] = useState(8675309)
	const [isPlaying, setIsPlaying] = useState(false)
	// const [tally, setTally]: [IButton[], Function] = useState([])
	// const [RecordingSession, setRecordingSession]: [IRecordingSession | IRecordingSession[], Function] = useState([])
	const [isRecording, setIsRecording] = useState(false)
	const stroopMode = useContext(stroopContext)

	let rs: IButton[] = props.Sequence

	const playbackButtons: Ref<any> = useRef(null)
	useEffect(() => {
			if (playbackButtons != null) {
				if (playbackButtons.current != null) {
					if (isPlaying) {
						playbackButtons.current.classList.add('playing')
					} else {
						playbackButtons.current.classList.remove('playing')
					}
				}
			}
		},
		[isPlaying])

	return (
		<React.StrictMode>
			<div className={'box'} id={'SoundBoardStatus'}>
				<div
					className={'wrapper'}
					id={'DotGraph'}
				>
					<ul className={' scroller'}>
						{
							rs.map((button, index, sequence) => {
									let scaleCurrent = Math.abs(scaleMagic - index * 5)
									root.style.setProperty('--sequence-item-count', index.toString());
									return (<li
										className={' ' + button.color}
										style={{
											left: Math.round((button.begin ? button.begin : 0) / 100).toString() + 'px',
											width: Math.round((button.end ? button.end : 1920 - (button.begin ? button.begin : 1080)) / 10).toString() + 'px',
											// width: Math.round((button.end ? button.end : 1 - (button.begin ? button.begin : 1)) * scaleCurrent).toString() + 'px',
											// height: Math.round((button.end ? button.end : 1 - (button.begin ? button.begin : 1)) * scaleCurrent).toString() + 'px'
										}}
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
				<TransportControls
					TransportChange={props.TransportStateChangeHandler}
				/>
			</div>
		</React.StrictMode>
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
