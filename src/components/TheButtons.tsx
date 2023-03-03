import React, {
	Component,
	Context,
	useState,
	useContext,
	Ref,
	useRef
} from 'react'
import * as Types from './Types'
import {Speak, MakeNoise} from './AudioCode'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IRecordingSession, IButton, ISound, IStroopMode} from './Types'
import {stroopContext, voiceContext, wordContext} from "./SoundBoard"
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
		color: ['gray', 'white'],
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
		color: 'black',
		name: 'Shaft',
		sound: {
			name: 'Shaft',
			type: 'speech',
			pronunciation: 'bad mother fucker',
			pitch: 2
		}
	},
	{
		color: 'brown',
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
	WordList: [],
	Instructions: string,
	HandleButtonPress: Function
}) {

	// const [WordList, setWordList] = useState(useContext(wordContext) !== undefined ? useContext(wordContext) : [])
	const [CurrentVoice, setCurrentVoice] = useState(useContext(voiceContext) !== undefined ? useContext(voiceContext) : null)

	const buildButtonList = () => {
		let newButton: IButton = new IButton('bob')
		let newButtonList: IButton[] = [newButton]

		if (newButton !== undefined && newButton.sound !== undefined) {
			props.WordList.map(function (oneWord: [], i) {
				newButton = props.WordList[i]
				newButton.name = props.WordList[i]
				newButton.sound!.type = "speech"
				newButton.sound!.pronunciation = props.WordList[i]
				newButton.sound!.voice = CurrentVoice ? CurrentVoice : undefined
				newButton.color = "rebeccapurple"
				newButtonList.push(newButton)
			})
			return newButtonList
		} else {
			return soundList
		}
	}

	const [button, setButton]: [IButton, Function] = useState(new IButton())

	const buttonBoardRef: Ref<HTMLDivElement> = useRef(null)
	// const buttonBoardDiv = buttonBoardRef.current

	const setHotPanel: Function = props.HotPanelUpdater
	let isHot: boolean = (props.HotPanel.toString() === "TheButtons")

	return (
		<div
			className={isHot ? 'box MEDIUM' : 'box COLD'}
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
				{buildButtonList().map(function (oneButton: IButton, i: React.Key) {
					return <button
						key={i}
						name={oneButton.sound!.name}
						value={oneButton.sound!.name}
						className={oneButton.color ? oneButton.color.toString() : ''}
						//  ToDo: replace onClicks with addEventListeners()
						onMouseDown={() => props.HandleButtonPress(oneButton, "down")}
						onMouseUp={() => props.HandleButtonPress(oneButton, "up")}
					>{oneButton.sound!.name}</button>
				})}
			</div>
		</div>
	)
}
