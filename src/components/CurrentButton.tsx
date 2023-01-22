import React, {useEffect, useRef, useState} from 'react'
import {IButton, ISound, SoundType} from './Types'
import './SoundBoard.css'

export function CurrentButton(props: { thisButtonCurrent: IButton }) {

	const button: IButton = props.thisButtonCurrent ? props.thisButtonCurrent : new IButton(new ISound()) // call it a lazy null check?

	return (
		<div className={' ' + button.color} id={'CurrentButton'}>
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
							<span className={'meta'}>
								{button.sound ? button.sound!.pronunciation : ""}
							</span>
							<span className={'meta'}>
								{button.begin}
							</span>
							<span className={'meta'}>
								{button.end}
							</span>
						</li>
					})
				}
			</ul>
		</div>
	)
}
