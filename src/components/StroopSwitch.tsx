import React, {Context, Ref, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {IStroopMode, IWord} from './Types'
import {stroopContext, voiceContext, voices} from "./SoundBoard";
import './SoundBoard.css'
import {VoiceChoice} from "./VoiceChoice";
import {InstructionHeader} from "./InstructionHeader";
import {Populator} from "./Populator";

export let dataSourceContext: React.Context<any> = React.createContext('')

export function StroopSwitch(props: {
	StroopMode: IStroopMode,
	StroopUpdater: Function,
	Instructions: string,
	HotPanel: string,
	HotPanelUpdater: Function
}) {

	const [StroopMode, setStroopMode]: [IStroopMode, Function] = useState('unsure')
	const [WordList, setWordList]: [[], Function] = useState([])
	const [CurrentVoice, setCurrentVoice]: [SpeechSynthesisVoice, Function] = useState(voices[0])
	const [HotPanel, setHotPanel]: [string, Function] = [props.HotPanel, props.HotPanelUpdater]

	function setStroopAndHot(hot: string, stroop: IStroopMode) {
		setStroopMode(stroop)
		setHotPanel(hot + '-' + stroop)
	}

	// const setHotPanel: Function = props.HotPanelUpdater
	let isHot: boolean = (props.HotPanel.toString().toLowerCase().slice(0,12) === 'stroopswitch')
	
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

	function HandleVoiceChange(NewVoice: SpeechSynthesisVoice) {
		console.log('current:', CurrentVoice.name, 'new:', NewVoice.name)
		setCurrentVoice(NewVoice)
	}

	return (
		<div
			id={'stroopSwitch'}
			className={isHot ? 'box HOT' : 'box COLD'}
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
					onClick={() => setStroopAndHot('StroopSwitch', 'text')}
				>text
				</button>

				<button
					className={'speech'}
					onClick={() => setStroopAndHot('StroopSwitch', 'speech')}
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
					onClick={() => setStroopAndHot('StroopSwitch', 'tone')}
				>tone
				</button>


			</div>

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

		</div>
	)
}
