/*jshint esversion: 5 */

import React, {} from 'react';
import {Route, Routes} from 'react-router';
import {BrowserRouter} from "react-router-dom";
import {Layout} from './components/Layout';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import {createGlobalStyle} from 'styled-components';
import '../src/sanitize.css-main/sanitize.css'
import {TheSoundBoard} from "./components/SoundBoard";

let GlobalStyles = createGlobalStyle`
  html {
    --color-text: white;
    --color-background: blue;
    --color-primary: rebeccapurple;
  }
`

export function App() {
	const displayName = App.name

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
		</Layout>
	);
}

export default App
