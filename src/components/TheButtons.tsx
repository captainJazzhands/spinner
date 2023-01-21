import React, {
	Component,
	Context,
	useState,
	useEffect,
	useContext,
	createContext,
	Ref,
	useRef
} from 'react'
import * as Types from './Types'
import {Speak, MakeNoise} from './AudioCode'
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IRecordingSession, IButton, ISound, IStroopMode} from './Types';

//<editor-fold defaultstate='collapsed' desc='array: buttons list'>
let soundList: IButton[] = [
	{
		color: 'white',
		sound: {
			name: 'Malama',
			type: 'speech',
			pronunciation: 'mah lah ma',
			pitch: -4
		}
	},
	{
		color: 'gray',
		sound: {
			name: 'Yahweh',
			type: 'speech',
			pronunciation: 'yah wey',
			pitch: -3
		}
	},
	{
		color: 'yellow',
		sound: {
			name: 'Mr. Bits',
			type: 'speech',
			pronunciation: 'mister bits',
			pitch: -2
		}
	},
	{
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
		sound: {
			name: 'Bae Bae',
			type: 'speech',
			pronunciation: 'bay bay',
			pitch: 0
		}
	},
	{
		color: 'red',
		sound: {
			name: 'Mr. Ball Legs',
			type: 'speech',
			pronunciation: 'mister ball legs',
			pitch: 1
		}
	},
	{
		color: 'black',
		sound: {
			name: 'Shaft',
			type: 'speech',
			pronunciation: 'bad mother fucker',
			pitch: 2
		}
	},
	{
		color: 'brown',
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

// @ts-ignore
export function TheButtons({handleButtonPress}) {

	const [button, setButton]: [IButton, Function] = useState(new IButton(new ISound()))

	const buttonBoardRef: Ref<HTMLDivElement> = useRef(null)
	const buttonBoardDiv = buttonBoardRef.current

	return (
		<React.StrictMode>
			<div
				className={'box'}
				id={'buttonBoard'}
				ref={buttonBoardRef}
			>
				<div className={'' + button.color} id={'TheButtons'}>
					{soundList.map(function (oneButton: IButton, i: React.Key) {
						return <button
							key={i}
							name={oneButton.sound!.name}
							value={oneButton.sound!.name}
							className={oneButton.color ? oneButton.color.toString() : ''}
							//  ToDo: replace onClicks with addEventListeners()
							onMouseDown={() => handleButtonPress(oneButton, "down")}
							onMouseUp={() => handleButtonPress(oneButton, "up")}
						>{oneButton.sound!.name}</button>
					})}
				</div>
			</div>
		</React.StrictMode>
	)
}
