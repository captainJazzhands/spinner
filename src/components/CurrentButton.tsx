import React, {useEffect, useRef, useState} from 'react'
import {IButton, ISound, SoundType} from './Types'
import './SoundBoard.css'

export function CurrentButton(props: { thisButtonCurrent: IButton }) {

	let button: IButton, setButton: (value: (((prevState: IButton) => IButton) | IButton)) => void;
	if (props.thisButtonCurrent) {
		[button, setButton] = useState<IButton>(props.thisButtonCurrent);
	} else {
		[button, setButton] = useState<IButton>(new IButton('dave'));
	}

	return (
		<div className={' ' + button.color} id={'CurrentButton'}>
			<ul className={''}>
				{
					Object.keys(button).map((item, i, thing) => {
						return <li
							className={''}
							key={i}
						>
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
