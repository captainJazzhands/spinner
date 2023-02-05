import React, {useContext, useState} from 'react'
import {voiceContext} from "./SoundBoard";
import './SoundBoard.css'

export function VoiceChoice(props: {
	CurrentVoice: any,
	VoiceUpdater: Function
}) {

	const voices = window.speechSynthesis.getVoices()
	let LanguageList: string[] = []

	let CurrentVoice = useContext(voiceContext)
	const [VoiceList, setVoiceList]: [SpeechSynthesisVoice[], Function] = useState([voices[0]])

	const [counter, setCounter]: [number, Function] = useState(0)

	const setCurrentVoice: Function = props.VoiceUpdater

	console.log('CurrentVoice', CurrentVoice.valueOf())

	let languageFilter: string = ''

	function PopulateLanguageList() {
		let LanguageListUnfiltered: string[] = []
		for (let i = 0; i < voices.length; i++) {
			let two = voices[i].lang.split('-')
			LanguageListUnfiltered.push(two[0])
		}
		LanguageList = [...new Set(LanguageListUnfiltered)] as string[]
	}

	function PopulateVoiceList() {
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

	PopulateLanguageList()
	if (counter < 5) {
		setVoiceList(PopulateVoiceList())
	}
	console.log('counter:', counter)

	if (speechSynthesis.onvoiceschanged !== undefined) {
		speechSynthesis.onvoiceschanged = PopulateVoiceList
	}

	function setVoiceLanguage(languageChoice: string) {
		languageFilter = languageChoice as string
		PopulateLanguageList()
		PopulateVoiceList()
		// console.log('language is now', languageFilter)
	}

	return (
		<div
			id={'VoiceChoice'}
		>
			{/*<label>Mode:</label>*/}

			<ul
				className={'DataSelectorList'}
			>
				{LanguageList.map(function (whichLang, i) {
					return (
						<li key={i}>
							<button
								key={i}
								onMouseUp={() => setVoiceLanguage(whichLang)
								}>
								{whichLang
								}
							</button>
						</li>
					)
				})}
			</ul>

			<ul
				className={'DataSelectorList'}
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
