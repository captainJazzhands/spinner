import React, {
	useState,
	useContext,
	useReducer, Reducer, useEffect
} from "react";
import * as Types from "./Types"
import {
	initialState,
	GameReducer
} from "./reducer"
import './ScoreBoard.css'

export const ScoreBoard = function (this: any, props: Types.IGameState) {

	const [state, dispatch] = useReducer(GameReducer, initialState)

	useEffect(() => {
		if (state.progress) {
			if (state.progress! < 1) {
				console.log('theSceneRef.current.classList.add(\'intro\')')
			} else {
				console.log('theSceneRef.current.classList.remove(\'intro\')')
			}
		}
	}, [state])

	return (
		<div id="ScoreBoard" className="interfaceWrapper">
			<div className="turn interfaceItem">{state.progress}</div>
			{/*<div className="score interfaceItem">{props.status}</div>*/}
			{/*<div className="status interfaceItem">{props.errors}</div>*/}
		</div>
	)
}
