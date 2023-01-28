import {
	ActionTypes,
	GameActions,
	IGameState,
	IGameContext
} from "./Types";
import {apiData} from "../apiData.json";

export const initialState: IGameState = {
	progress: 0
}

export function GameReducer(state: IGameState, action: GameActions): IGameState {
	console.log("reduced", JSON.stringify(action.type))

	switch (action.type) {
		// case "CREATE":
		// 	break;
		// case "SKIP":
		// 	break;

		// case "game_pause":
		// 	return {
		// 		status: "paused" ? "active" : "paused"
		// 	}
		case ActionTypes.game_start:
			console.log("START:", action.type, action.payload)
			return {
				...[state],
				progress: 1
			}

		case ActionTypes.game_end:
			console.log("END:", action.type, action.payload)
			return {
				...[state],
				progress: 0,
			}

		case ActionTypes.Progress:
			console.log("set_progress:", action.type, action.payload)
			return {
				...[state],
				progress: state.progress! + ((state.progress! > 0) ? Number(action.payload) + 1 : 4)
			}

		case ActionTypes.submit_response:
			// console.log("We have performed no logic, yet deem this response suitable:")
			console.log("submit_answer:", action.type, action.payload)
			return {
				...[state],
				progress: state.progress! + 1,
				// response: action.payload,
				// remediation: apiData[0].theJobs
			}

		default:
			throw new Error(`Error 56: invalid coffee: ${action.type}`)
	}
}
