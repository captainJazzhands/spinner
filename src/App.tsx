/*jshint esversion: 5 */

import React, {
	createContext,
	useContext,
	useReducer
} from 'react';
import {Route, Routes} from 'react-router';
import {BrowserRouter} from "react-router-dom";
import {redirect} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import {createGlobalStyle} from 'styled-components';
import '../src/sanitize.css-main/sanitize.css'
import {TheSoundBoard} from "./components/SoundBoard";
// import {UseSessionProvider} from 'react-session-hook'
import {GameReducer, initialState} from "./components/reducer";
import {ActionTypes, GameActions, IGameContext, IGameState} from "./components/Types";

let GlobalStyles = createGlobalStyle`
  html {
    --color-text: white;
    --color-background: blue;
    --color-primary: rebeccapurple;
    --hotFacet: 4;
  }
`

export const GameContext = createContext(
	// GameReducer
	{
		state: initialState,
		dispatch: ActionTypes.Skip
	}
)

export function App() {
	const displayName = App.name

	const [state, dispatch] = useReducer(
		GameReducer,
		initialState
	)

	return (
		<Layout>
			<GlobalStyles/>
			{/*<Route*/}
			{/*	exact path='/'*/}
			{/*	component={TheSoundBoard}*/}
			{/*/>*/}
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<TheSoundBoard/>}
					/>
					<Route
						path={ApplicationPaths.ApiAuthorizationPrefix}
						// @ts-ignore
						component={ApiAuthorizationRoutes}
					/>
				</Routes>
			</BrowserRouter>


			<GameContext.Provider
				// @ts-ignore
				value={[state, dispatch]}
			>
			</GameContext.Provider>

			{/*<ErrorBoundary>*/}
			{/*</ErrorBoundary>*/}
			{/*<AuthorizeRoute*/}
			{/*	path='/fetch-data'*/}
			{/*	component={FetchData}*/}
			{/*/>*/}
		</Layout>
	);
}

export default App
