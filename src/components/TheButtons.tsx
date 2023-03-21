import React, {
	Component,
	Context,
	useState,
	useContext,
	Ref,
	useRef, useEffect
} from 'react'
import * as Types from './Types'
import {Speak, MakeNoise} from './AudioCode'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IRecordingSession, IButton, ISound, IWord, IStroopMode} from './Types'
import {stroopContext, voiceContext, voices, wordContext} from "./SoundBoard"
import {InstructionHeader} from "./InstructionHeader";

//<editor-fold defaultstate='collapsed' desc='array: buttons list'>
let soundList: IButton[] = [
	{
		color: 'white',
		name: 'Malama',
		sound: {
			name: 'Malama',
			type: 'speech',
			pronunciation: 'mah lah ma',
			pitch: -4
		}
	},
	{
		color: 'gray',
		name: 'Yahweh',
		sound: {
			name: 'Yahweh',
			type: 'speech',
			pronunciation: 'yah wey',
			pitch: -3
		}
	},
	{
		color: 'yellow',
		name: 'Mr. Bits',
		sound: {
			name: 'Mr. Bits',
			type: 'speech',
			pronunciation: 'mister bits',
			pitch: -2
		}
	},
	{
		name: 'Mayday',
		color: 'purple',
		// color: ['gray', 'white'],
		sound: {
			name: 'Mayday',
			type: 'speech',
			pronunciation: 'may day',
			pitch: -1
		}
	},
	{
		color: 'brown',
		name: 'Bae Bae',
		sound: {
			name: 'Bae Bae',
			type: 'speech',
			pronunciation: 'bay bay',
			pitch: 0
		}
	},
	{
		color: 'red',
		name: 'Mr. Ball Legs',
		sound: {
			name: 'Mr. Ball Legs',
			type: 'speech',
			pronunciation: 'mister ball legs',
			pitch: 1
		}
	},
	{
		color: 'green',
		name: 'Shaft',
		sound: {
			name: 'Shaft',
			type: 'speech',
			pronunciation: 'bad mother fucker',
			pitch: 2
		}
	},
	{
		color: 'blue',
		name: 'Jeebus',
		sound: {
			name: 'Jeebus',
			type: 'speech',
			pronunciation: 'jeebus',
			pitch: 3
		}
	}
]

//</editor-fold>

let override = true

export function TheButtons(props: {
	HotPanel: string,
	HotPanelUpdater: Function,
	WordList: IWord[],
	Instructions: string,
	HandleButtonPress: Function
}) {

	const [SoundList, setSoundList] = useState(soundList)
	const [WordList, setWordList] = useState(props.WordList)
	const [CurrentVoice, setCurrentVoice] = useState(useContext(voiceContext))
	const [button, setButton]: [IButton, Function] = useState(new IButton(''))
	const buttonBoardRef: Ref<HTMLDivElement> = useRef(null)

	useEffect(() => {
			try {
				//  new plan: update text in existing IButton[]
				if (props.WordList && props.WordList.length >= 8) {
					for (let i = 0; i < 8; i++) {
						console.log('kilroy')
						soundList[i].name = props.WordList[i].theWord

						if (soundList[i] != undefined && soundList[i].sound != undefined) {
							// @ts-ignore
							if (soundList[i].sound.pronunciation != undefined) {
								// @ts-ignore
								soundList[i].sound.name = props.WordList[i].theWord
								// @ts-ignore
								soundList[i].sound.pronunciation = props.WordList[i].theWord
							} else {
								//  bail
							}
						}

					}
				}
				setWordList(props.WordList)
				setSoundList(soundList)
			} catch (err) {
				console.log('Failed to update button text from Populator choices, defaults remain.')
				// buildButtonList = soundList
			}
		},
		[props.WordList])

	const setHotPanel: Function = props.HotPanelUpdater
	let isHot: boolean = (props.HotPanel.toString() === "TheButtons")

	return (
		<div
			className={isHot ? 'box HOT' : 'box MEDIUM'}
			id={'buttonBoard'}
			ref={buttonBoardRef}
		>

			<InstructionHeader
				NavTarget={'TheButtons'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>

			<div
				className={'' + button.color}
				id={'TheButtons'}
			>
				{SoundList.map((oneButton: IButton, i: React.Key) => {
					return <button
						key={i}
						name={oneButton.name}
						value={oneButton.name}
						className={oneButton.color ? oneButton.color.toString() : ''}
						onMouseDown={() => props.HandleButtonPress(oneButton, "down")}
						onMouseUp={() => props.HandleButtonPress(oneButton, "up")}
					>{oneButton.name}</button>
				})}
			</div>
		</div>
	)
}
