import React, { FC } from 'react'
import { useGlobalContext } from './contexts/global'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import FavoritesPage from './pages/Favorites'
import VideoPage from './pages/Video'

import 'reset-css'
import './assets/styles/global.scss'
import './App.scss'

const App: FC = () => {
	const { darkMode } = useGlobalContext()

	return (
		<div className={darkMode ? 'content--dark' : 'content--light'}>
			<BrowserRouter>
				<Switch>
					<Route exact component={HomePage} path="/" />
					<Route exact component={SearchPage} path="/search/:query" />
					<Route exact component={FavoritesPage} path="/favorites" />
					<Route exact component={VideoPage} path="/watch/:id" />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
