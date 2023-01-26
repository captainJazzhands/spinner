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

export function RecordingSessions(props: {
	Sessions: IRecordingSession,
	SessionChangeHandler: any,
	HotPanel: string
}) {

	let seqs

	if (props.Sessions && props.Sessions.Sequences) {
		seqs = props.Sessions.Sequences
	} else {
		seqs = [new IButton()]
	}
	let isHot: boolean = (props.HotPanel === "RecordingSessions")

	return (
		<div
			className={isHot ? 'box HOT' : 'box NOT'}
			id={'RecordingSessions'}
		>
			<p>
				You have <span className={'LCD'}>{seqs.length}</span> recordings.
			</p>

			<div
				className={'wrapper'}
				id={'DotGraph'}
			>
				{/*<ul>*/}
				{/*	{*/}
				{/*		sessions.map((session, index, sequence) => {*/}
				{/*				return (<li*/}
				{/*					className={'sequence-length-' + session.Sequence.length}*/}
				{/*					key={index}*/}
				{/*					// onClick={props.SessionChangeHandler(Event.target)}*/}
				{/*				>)*/}
				{/*					<span className={'meta'}>*/}
				{/*				{index}*/}
				{/*			</span>*/}
				{/*					<span className={'meta'}>*/}
				{/*				{}*/}
				{/*			</span>*/}
				{/*				</li>)*/}
				{/*			}*/}
				{/*		)*/}
				{/*	}*/}
				{/*</ul>*/}
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
