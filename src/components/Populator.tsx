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
		                          handlePopulation: Function,
		                          setWordContext: Function,
		                          HotPanel: string
	                          }) {

	//  display available APIs
	//    select an API
	//  display selected API’s response
	//    select mulitple responses
	//    setContext(selection)

	const [Words, setWords]: [any, Function] = useState([])
	const [SpeechPart, setSpeechPart]: [any, Function] = useState([])
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

	const uniqueParts: any[] = [];
	Words.map((PoS: { part: string; }, idx: number) => {
		if (uniqueParts.indexOf(Words[idx].partOfSpeech) === -1) {
			uniqueParts.push(Words[idx].partOfSpeech)
		}
	})

	useEffect(() => {
		fetchData(WhichData)
	}, [WhichData])

	let isHot: boolean = (props.HotPanel.toString() === 'DataSelector')
	const filteredWords = Words.sort(randomSort).filter(function (theWord: { partOfSpeech: string; }) {
		return theWord.partOfSpeech == SpeechPart
	})

	const truncatedFilteredWords = filteredWords.slice(0, 8)

	truncatedFilteredWords.sort((a: number, b: number) => {
		a > b
	})

	// truncatedFilteredWords.sort(function compareFn(a: string, b: any) {
	// 	a === "a"
	// })

	function randomSort() {
		return 0.5 - Math.random()
	}

	return (
		<div
			className={isHot ? 'box HOT' : 'box COLD'}
			id={'DataSelectorDiv'}
		>
			<ul
				className={'buttonTile tintable'}
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

			<ul
				className={'DataSelectorList tintable'}
				id={'PartsOfSpeechList'}
			>{
				uniqueParts.map((item, r, thing) => {
					return <li
						className={''}
						key={r}
					>
							<span
								className={'meta'}
								onClick={() => setSpeechPart(uniqueParts[r])}
							>
								{uniqueParts[r]}
							</span>
					</li>
				})
			}
			</ul>

			<ul
				className={'DataSelectorList'}
			>{
				Object.keys(truncatedFilteredWords).map((item, i, thing) => {
					return <li
						className={''}
						key={i}
					>
							<span className={'meta'}>
								{truncatedFilteredWords[i].theWord}
							</span>
					</li>
				})
			}
			</ul>
			<div className={'tintable'}>
				<button onClick={() => props.setWordContext(truncatedFilteredWords)}>Use These Words</button>
			</div>
		</div>
	)

}
