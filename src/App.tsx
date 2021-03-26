import React, { FC } from 'react'
import { useGlobalContext } from './contexts/global'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import GlobalStyles from './assets/styles/global'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import FavoritesPage from './pages/Favorites'
import VideoPage from './pages/Video'

const App: FC = () => {
	const { darkMode } = useGlobalContext()

	return (
		<BrowserRouter>
			<GlobalStyles darkMode={darkMode} />
			<Switch>
				<Route exact component={HomePage} path="/" />
				<Route exact component={SearchPage} path="/search/:query" />
				<Route exact component={FavoritesPage} path="/favorites" />
				<Route exact component={VideoPage} path="/watch/:id" />
			</Switch>
		</BrowserRouter>
	)
}

export default App
