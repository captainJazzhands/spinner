import React from 'react'
import './SoundBoard.css'
import {InstructionHeader} from "./InstructionHeader";


export function Directions(props: {
	HotPanelUpdater: Function,
	Instructions: string,
	HotPanel: string
}) {

	const setHotPanel: Function = props.HotPanelUpdater

	let isHot: boolean = (props.HotPanel.toString().toLowerCase() === "directions")

	return (
		<div
			id={'Directions'}
			className={isHot ? 'box HOT' : 'box COLD'}
		>
			<InstructionHeader
				NavTarget={'Directions'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>

			<div
				id={'DirectionsContent'}
				className={''}
			>
				<p className={''}>
					First choose a voice by putting me in Speech mode.
					Then choose some words by putting me in Text mode.
					Or you can do those the other way ’round, matters not.
				</p>

				<p className={''}>
					You can now record a sequence by tapping the eight buttons showing your chosen words.
					The sequence you record will appear above the buttons.
					When you are done, click Stop to stop recording.
					If not, I will automatically stop recording after ten seconds.
				</p>

				<button
					className={'texty'}
					onClick={() => setHotPanel('StroopSwitch')}
				>Got it!
				</button>

				<div
					id={'PanelNavigation'}
					className={''}
				>

				</div>

			</div>

		</div>
	)
}
