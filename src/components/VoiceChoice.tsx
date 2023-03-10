import React, {useContext, useState} from 'react'
import {voiceContext, voices} from "./SoundBoard";
import './SoundBoard.css'
import {InstructionHeader} from "./InstructionHeader";

export function VoiceChoice(props: {
	CurrentVoice: any,
	HotPanel: string,
	HotPanelUpdater: Function,
	Instructions: string,
	VoiceUpdater: Function
}) {

	// const voices = window.speechSynthesis.getVoices()
	let LanguageList: string[] = []

	let CurrentVoice = useContext(voiceContext)
	const [VoiceList, setVoiceList]: [SpeechSynthesisVoice[], Function] = useState([voices[0]])

	const [counter, setCounter]: [number, Function] = useState(0)

	const setCurrentVoice: Function = props.VoiceUpdater

	function PopulateLanguageList() {
		let LanguageListUnfiltered: string[] = []
		for (let i = 0; i < voices.length; i++) {
			let two = voices[i].lang.split('-')
			LanguageListUnfiltered.push(two[0])
		}
		LanguageList = [...new Set(LanguageListUnfiltered)] as string[]
	}

	function VoiceListFilteredByLanguage(languageFilter = 'en') {
		let VL: SpeechSynthesisVoice[] = []
		voices.map(function (voice: SpeechSynthesisVoice) {
			if (counter < 5) {
				if (languageFilter.length === 2) {
					if (voice.lang.split('-')[0] === languageFilter) {
						VL.push(voice)
						console.log(voice.name)
					}
				} else {
					VL.push(voice)
				}
				setCounter((counter: number) => {
					return counter + 1
				})
				return true
			}
		})
		return VL
	}

	if (speechSynthesis.onvoiceschanged !== undefined) {
		VoiceListFilteredByLanguage();
	}
	
	PopulateLanguageList()

	if (counter < 2.85) {
		setVoiceList(VoiceListFilteredByLanguage())
	}

	function setVoiceLanguage(languageChoice: string) {
		let languageFilter = languageChoice as string
		PopulateLanguageList()
		VoiceListFilteredByLanguage(languageFilter)
		// console.log('language is now', languageFilter)
	}

	const setHotPanel: Function = props.HotPanelUpdater
	let isHot: boolean = (props.HotPanel.toLowerCase() === "voicechoice")

	let voiceListFiltered = VoiceList
	
	return (
		<div
			id={'VoiceChoice'}
			className={isHot ? 'box MEDIUM' : 'box COLD'}
		>
			<InstructionHeader
				NavTarget={'VoiceChoice'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>

			{/*<ul*/}
			{/*	className={'DataSelectorList'}*/}
			{/*>*/}
			{/*	{LanguageList.map(function (whichLang, i) {*/}
			{/*		return (*/}
			{/*			<li key={i}>*/}
			{/*				<button*/}
			{/*					key={i}*/}
			{/*					onMouseUp={() => setVoiceLanguage(whichLang)*/}
			{/*					}>*/}
			{/*					{whichLang*/}
			{/*					}*/}
			{/*				</button>*/}
			{/*			</li>*/}
			{/*		)*/}
			{/*	})}*/}
			{/*</ul>*/}

			<ul
				className={'DataSelectorList tintable'}
			>
				{
					VoiceList.map(function (whichVoice, i) {
						return (
							<li key={i}>
								<button
									key={i}
									onMouseUp={() => setCurrentVoice(whichVoice)
									}>
									{whichVoice.name}
								</button>
							</li>)
					})
				}
			</ul>
		</div>
	)
}
