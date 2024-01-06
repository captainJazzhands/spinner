import React, {
	useState,
	useEffect
} from 'react'
import {TheSoundBoard} from "./SoundBoard";
import axios, {RawAxiosRequestConfig} from "axios"
// import useSession, {UseSessionProvider} from 'react-session-hook'
import './SoundBoard.css'
import {IButton, ISound, IStroopMode} from './Types';
import {InstructionHeader} from "./InstructionHeader";

export function Populator(props:
	                          {
		                          handleDataSource: Function,
		                          WordList: Array<any>,
		                          setWordList: Function,
		                          Instructions: string,
		                          HotPanel: string,
		                          HotPanelUpdater: Function
	                          }) {

	//  display available APIs
	//    select an API
	//  display selected API’s response
	//    select mulitple responses
	//    setContext(selection)

	const [SpeechPart, setSpeechPart]: [any, Function] = useState([])
	const [APISource, setAPISource]: [any, Function] = useState([])
	const [APIData, setAPIData]: [any, Function] = useState([])
	const setWordList = props.setWordList
	const [PlayerChoseWords, setPlayerChoseWords]: [boolean, Function] = useState(false)
	const [ButtonEnabled_DataSource, setButtonEnabled_DataSource]: [boolean, Function] = useState(true)
	const [ButtonEnabled_SpeechParts, setButtonEnabled_SpeechParts]: [boolean, Function] = useState(false)
	const [ButtonEnabled_UseThese, setButtonEnabled_UseThese]: [boolean, Function] = useState(false)
	const [debug, setDebug]: [number, Function] = useState(8)

	const APIlist = [
		{
			url: "https://world.openWordfacts.org/api/v0/product/737628064502.json",
			shortName: "food facts",
			longName: "Food Facts from Open World Facts, who conveniently offers a free API for people like us to play with."
		}, {
			url: "https://localhost:7000/api/Words",
			shortName: "words",
			longName: "English words, served by an API on localhost that I put together in .Net to play with, because CORS."
		}
	]

	// const fetchWords = async () => {
	// 	try {
	// 		const DataSource = await axios(
	// 			APIlist[1].url.toString()
	// 		)
	// 		setWordList(DataSource.data)
	// 	} catch (err) {
	// 		console.error(err)
	// 	}
	// }

	const fetchData = async (WhichDataAxios: RawAxiosRequestConfig<string>) => {
		try {
			const DataSource = await axios(
				WhichDataAxios
			)
			setAPIData(DataSource.data)
		} catch (err) {
			console.error(err)
		}
	}

	const uniqueParts: any[] = []
	if (APIData != undefined) {
		APIData.map((PoS: { part: string; }, idx: number) => {
			if (uniqueParts.indexOf(APIData[idx].partOfSpeech) === -1) {
				uniqueParts.push(APIData[idx].partOfSpeech)
			}
		})
	}

	useEffect(() => {
		fetchData(APISource)
	}, [APISource])

	function HandleAPISourceChange(newSource: { url: string; shortName: string; longName: string; }) {
		setAPISource(newSource)
		setButtonEnabled_SpeechParts(true)
	}

	function HandleSpeechPartChange(newPart: any) {
		setSpeechPart(newPart)
		setButtonEnabled_UseThese(true)
	}

	const setHotPanel: Function = props.HotPanelUpdater
	let isHot: boolean = (props.HotPanel.toString().toLowerCase().slice(0, 12) === 'stroopswitch')
	let isRelevant: boolean = (props.HotPanel.toString().toLowerCase().slice(5) === 'words')
	const APIWords: any = APIData.slice(0)
	const filteredWords = APIWords.sort(randomSort).filter(function (theWord: { partOfSpeech: string; }) {
			return theWord.partOfSpeech == SpeechPart
		}
	)

	const PopulateStuff = () => {
		try {
			setWordList(truncatedFilteredWords)
			setPlayerChoseWords(true)
			if (debug > 3) {
				console.log(JSON.stringify(truncatedFilteredWords))
			}
		} catch (err) {
			console.error(err)
		}
	}

	const truncatedFilteredWords = filteredWords.slice(0, 8)

	truncatedFilteredWords.sort((a: number, b: number) => a - b)

	// truncatedFilteredWords.sort(function compareFn(a: string, b: any) {
	// 	a === "a"
	// })

	function randomSort() {
		return 0.5 - Math.random()
	}

	return (
		<section
			className={isRelevant ? 'relevant' : 'irrelevant'}
			id={'Populator'}
		>

			<InstructionHeader
				NavTarget={'Populator'}
				HeaderText={props.Instructions}
				HotPanelUpdater={setHotPanel}
			/>

			<section
				className={'buttonTile tintable'}
			>{
				Object.keys(APIlist).map((item, i, thing) => {
					return <button
						onClick={() => HandleAPISourceChange(APIlist[i])}
						disabled={!ButtonEnabled_DataSource}
						className={'dataSource texty'}
						key={i}
					>
						<title className={'shortName'}>
							{APIlist[i].shortName}
						</title>
						<p className={'longName'}>
							{APIlist[i].longName}
						</p>
					</button>
				})
			}
			</section>

			<section
				className={'DataSelectorList tintable'}
				id={'PartsOfSpeechList'}
			>{
				uniqueParts.map((item, r, thing) => {
					return <button
						onClick={() => HandleSpeechPartChange(uniqueParts[r])}
						disabled={!ButtonEnabled_SpeechParts}
						className={''}
						key={r}
					>
							<span
								className={'meta'}
							>
								{uniqueParts[r]}
							</span>
					</button>
				})
			}
			</section>

			<ul
				className={'DataSelectorList tintable'}
				id={'eightWords'}
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

				<button
					onClick={() => PopulateStuff()}
					disabled={!ButtonEnabled_UseThese}
					className={''}
				>
					use these
				</button>
			</div>
		</section>
	)

}
