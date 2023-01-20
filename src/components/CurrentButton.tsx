import React, {Ref, useEffect, useRef, useState} from 'react'
import {IRecordingSession, IButton, ISound, SoundType, ISequence} from './Types'
import './SoundBoard.css'

export function CurrentButton(props: { CurrentButton: IButton }) {

	const button: IButton = props.CurrentButton ? props.CurrentButton : new IButton(new ISound())
	const sound: ISound = props.CurrentButton.sound ? props.CurrentButton.sound : new ISound()

	// console.log(button.color, button.status, button.sound, button.order)

	return (
		<div className={'box ' + button.color} id={'CurrentButton'}>
			{/*<label>Current Button:</label>*/}
			<ul className={'LCD'}>
				{
					Object.keys(button).map((item, i, thing) => {
						return <li
							className={'LCD'}
							key={i}
						>
							<span className={'meta'}>
								{thing[i].valueOf()}
							</span>
							<span className={'meta'}>
								{item}
							</span>
							<span className={'meta'}>
								{thing[i].toString()}
							</span>
						</li>
					})
				}
			</ul>
			<ul className={'LCD'}>
				{
					Object.keys(sound).map((item, i, thing) => {
						return <li
							className={'CurrentButton'}
							key={i}
						>
							<span className={'meta'}>
								{thing[i].toString()}
							</span>
							<span className={'meta'}>
								{sound.pronunciation}
							</span>
							{/*<span className={'meta'}>*/}
							{/*	{sound.begin}*/}
							{/*</span>*/}
						</li>
					})
				}
			</ul>
		</div>
	)
}
