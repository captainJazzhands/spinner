import React, {Context, Ref, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {IStroopMode} from './Types'
import {stroopContext, voiceContext} from "./SoundBoard";
import './SoundBoard.css'
import {VoiceChoice} from "./VoiceChoice";
import {InstructionHeader} from "./InstructionHeader";

export function StroopSwitch(props: {
	StroopMode: IStroopMode,
	StroopUpdater: Function,
	Instructions: string,
	HotPanel: string,
	HotPanelUpdater: Function
}) {

	const setHotPanel: Function = props.HotPanelUpdater
	let StroopMode: IStroopMode = useContext(stroopContext)
	const setStroopMode: Function = props.StroopUpdater
	// let isHot: boolean = (props.HotPanel.toString().toLowerCase() === 'stroopswitch')

	return (
		<div
			id={'stroopSwitch'}
			className={'box COLD'}
		>
			<InstructionHeader
				NavTarget={'StroopSwitch'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>
			<div
				id={'stroopButtons'}
				className={'DataSelectorList'}
			>
				{/*<button*/}
				{/*	// ToDoButNotToday: enumerate IStroopMode*/}
				{/*	className={'unsure'}*/}
				{/*	onClick={() => setStroopMode('unsure')}*/}
				{/*>unsure*/}
				{/*</button>*/}
				<button
					className={'text'}
					onClick={() => setStroopMode('text')}
				>text
				</button>
				<button
					className={'speech'}
					onClick={() => setStroopMode('speech')}
				>speech
				</button>
				{/*<button*/}
				{/*	className={'color'}*/}
				{/*	onClick={() => setStroopMode('color')}*/}
				{/*>color*/}
				{/*</button>*/}
				{/*<button*/}
				{/*	className={'shape'}*/}
				{/*	onClick={() => setStroopMode('shape')}*/}
				{/*>shape*/}
				{/*</button>*/}
				{/*<button*/}
				{/*	className={'sound'}*/}
				{/*	onClick={() => setStroopMode('sound')}*/}
				{/*>sound*/}
				{/*</button>*/}
				<button
					className={'tone'}
					onClick={() => setStroopMode('tone')}
				>tone
				</button>
			</div>

		</div>
	)
}
