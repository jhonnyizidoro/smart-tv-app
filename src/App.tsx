import React, { FC, useCallback, useEffect } from 'react'
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

	const preventKeyScrolling = useCallback((event: KeyboardEvent) => {
		if ([32, 37, 38, 39, 40].includes(event.keyCode)) {
			event.preventDefault()
		}
	}, [])

	useEffect(() => {
		window.addEventListener('keydown', preventKeyScrolling)
		return () => window.removeEventListener('keydown', preventKeyScrolling)
	}, [preventKeyScrolling])

	return (
		<div className={`content content--${darkMode ? 'dark' : 'light'}`}>
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
