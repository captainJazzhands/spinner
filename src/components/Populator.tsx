import React, {
	useState,
	useEffect,
	Ref,
	useRef
} from 'react'
import axios, {RawAxiosRequestConfig} from "axios"
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

export function Populator(props:
	                          {
		                          handlePopulation(RequestedSource: any): Function,
		                          HotPanel: string
	                          }) {

	//  display available APIs
	//    select an API
	//  display selected API’s response
	//    select mulitple responses
	//    setContext(selection)

	const [Words, setWords]: [any, Function] = useState([])
	const [WhichData, setWhichData]: [any, Function] = useState([])

	const APIlist = [
		{
			url: "http://world.openWordfacts.org/api/v0/product/737628064502.json",
			shortName: "food facts",
			longName: "Food Facts from Open World Facts, who conveniently offers a free API for people like us to play with."
		}, {
			url: "https://localhost:7000/api/Words",
			shortName: "words",
			longName: "English words, served by an API on localhost that I put together in .Net to play with because CORS, am I right?"
		}
	]

	const fetchWords = async () => {
		try {
			const DataSource = await axios(
				APIlist[1].url.toString()
			)
			setWords(DataSource.data)
		} catch (err) {
			console.error(err)
		}
	}

	const fetchData = async (WhichDataAxios: RawAxiosRequestConfig<string>) => {
		try {
			const DataSource = await axios(
				WhichDataAxios
			)
			setWords(DataSource.data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchData(WhichData)
	}, [WhichData])
	let filterString = 'pronoun'
	let partString = 'verb'
	let isHot: boolean = (props.HotPanel.toString() === 'DataSelector')
	const filteredWords = Words.filter(function (theWord: { partOfSpeech: string; }) {
		return theWord.partOfSpeech == filterString
	})
	const partsOfSpeech = Words.filter(function (partOfSpeech: { partOfSpeech: string; }) {
		return partOfSpeech.partOfSpeech == partString
	})
	// const uniqueParts = Words.filter(function (partOfSpeech: { partOfSpeech: string; }) {
	// 	return partOfSpeech.partOfSpeech == partString
	// })
	// const uniqueParts = partsOfSpeech.filter((PartOfSpeech: string, idx: number) => partsOfSpeech.indexOf(PartOfSpeech) === idx)

	const uniqueParts: any[] = [];
	partsOfSpeech.map((PoS: { part: any; }) => {
		if (partsOfSpeech.indexOf(PoS.part) === -1) {
			uniqueParts.push(partsOfSpeech.part)
		}
	})

	return (
		<div
			className={isHot ? 'box HOT' : 'box NOT'}
			id={'DataSelectorDiv'}
		>
			{/*<button onClick={fetchWords}>get Word</button>*/}

			<ul
				className={'buttonTile'}
				id={'DataSelectorList'}
			>{
				Object.keys(APIlist).map((item, i, thing) => {
					return <li
						className={'dataSource'}
						key={i}
					>
						<div className={'shortName'}
						     onClick={() => setWhichData(APIlist[i])}
						>
							{APIlist[i].shortName}
						</div>
						<p className={'longName'}>
							{APIlist[i].longName}
						</p>
					</li>
				})
			}
			</ul>

			{/*<ul>{*/}
			{/*	uniqueParts.map((item, r, thing) => {*/}
			{/*		return <li*/}
			{/*			className={''}*/}
			{/*			key={r}*/}
			{/*		>*/}
			{/*				<span className={'meta'}>*/}
			{/*					{uniqueParts[r].shortName}*/}
			{/*				</span>*/}
			{/*		</li>*/}
			{/*	})*/}
			{/*}*/}
			{/*</ul>*/}

			<ul>{
				Object.keys(filteredWords).map((item, i, thing) => {
					return <li
						className={''}
						key={i}
					>
							<span className={'meta'}>
								{filteredWords[i].theWord}
							</span>
						<span className={'meta'}>
								{filteredWords[i].partOfSpeech}
							</span>
					</li>
				})
			}
			</ul>

		</div>
	)

}
