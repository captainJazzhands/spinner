import React, {
	useState,
	useEffect,
	Ref,
	useRef
} from 'react'
import axios from "axios"
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IButton, ISound, IStroopMode} from './Types';

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

export function Populator(handleSelection: any) {

	const [foods, setFoods]: [any, Function] = useState([])

	const fetchFood = async () => {
		try {
			const foodList = await axios(
				"https://localhost:7000/api/Swatches"
				// "http://world.openfoodfacts.org/api/v0/product/737628064502.json"
			)
			setFoods(foodList.data)
		} catch (err) {
			console.error(err)
		}
	}
	useEffect(() => {
		fetchFood()
	}, [])

	return (
		<div
			className={'box'}
			id={'DataSelection'}
		>
			<p>Foods: {foods.data}</p>
			<button onClick={fetchFood}>get food</button>
		</div>
	)

}
