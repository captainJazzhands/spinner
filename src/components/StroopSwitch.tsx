import React, {Context, Ref, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {IRecordingSession, IButton, ISound, SoundType, ISequence, IStroopMode} from './Types'
import {soundContext, stroopContext, voiceContext} from "./SoundBoard";
import './SoundBoard.css'

export function StroopSwitch(props: {
	StroopMode: IStroopMode,
	CurrentVoice: SpeechSynthesisVoice,
	StroopUpdater: Function,
	VoiceUpdater: Function
}) {

	const voices = window.speechSynthesis.getVoices()
	let LanguageList: string[] = []

	let StroopMode: IStroopMode = useContext(stroopContext)
	let CurrentVoice = useContext(voiceContext)
	const [VoiceList, setVoiceList]: [SpeechSynthesisVoice[], Function] = useState([voices[0]])

	const [counter, setCounter]: [number, Function] = useState(0)

	const setStroopMode: Function = props.StroopUpdater
	const setCurrentVoice: Function = props.VoiceUpdater

	console.log('StroopMode', StroopMode.toString())
	console.log('CurrentVoice', CurrentVoice.valueOf())

	let languageFilter: string = ''

	function PopulateLanguageList() {
		let LanguageListUnfiltered: string[] = []
		for (let i = 0; i < voices.length; i++) {
			let two = voices[i].lang.split('-')
			LanguageListUnfiltered.push(two[0])
		}
		// @ts-ignore
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

	// if (speechSynthesis.onvoiceschanged !== undefined) {
	// 	speechSynthesis.onvoiceschanged = PopulateVoiceList
	// }

	function setVoiceLanguage(languageChoice: string) {
		languageFilter = languageChoice as string
		PopulateLanguageList()
		PopulateVoiceList()
		// console.log('language is now', languageFilter)
	}

	// const VoiceListButtons: Ref<any> = useRef(null)

	// useEffect(() => {
	// 		VoiceListButtons.
	// 	},
	// 	[VoiceList])

	// function isAlready(theString: string, theArray: []) {
// 	return theString in theArray;
// }
//
// const LanguageFilter = useMemo(() => VoiceSelector.filter(isAlready), [VoiceSelector])

	return (
		<div
			className={'box'}
			id={'stroopSwitch'}
		>
			{/*<label>Mode:</label>*/}

			<div className={'mode'}>
				<button
					// ToDoButNotToday: enumerate IStroopMode
					onClick={() => setStroopMode('uncertain')}
				>uncertain
				</button>
				<button
					onClick={() => setStroopMode('text')}
				>text
				</button>
				<button
					onClick={() => setStroopMode('speech')}
				>speech
				</button>
				<button
					onClick={() => setStroopMode('color')}
				>color
				</button>
				<button
					onClick={() => setStroopMode('sound')}
				>sound
				</button>
				<button
					onClick={() => setStroopMode('tone')}
				>tone
				</button>
			</div>

			<div className={'language'}>
				{LanguageList.map(function (whichLang, i) {
					return <button
						key={i}
						onMouseDown={() => console.log(
							languageFilter, 'becomes', whichLang
						)}
						onMouseUp={() => setVoiceLanguage(whichLang)
						}>
						{whichLang
						}
					</button>
				})
				}
			</div>

			<div
				className={'voice'}
			>
				{
					VoiceList.map(function (whichVoice, i) {
						return <button
							key={i}
							onMouseDown={() => console.log(
								CurrentVoice.name, 'becomes', whichVoice.name
								// CurrentVoice.name, 'becomes', whoseVoice.getAttribute('data-name')
							)}
							onMouseUp={() => setCurrentVoice(whichVoice)
							}>
							{whichVoice.name}
						</button>
					})
				}

			</div>

		</div>
	)
}
