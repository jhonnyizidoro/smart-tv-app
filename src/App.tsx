import React, { FC } from 'react'
import { useGlobalContext } from './contexts/global'

import GlobalStyles from './assets/styles/global'

const App: FC = () => {
	const { darkMode } = useGlobalContext()

	return (
		<>
			<GlobalStyles darkMode={darkMode} />
			<h1>Hello World</h1>
		</>
	)
}

export default App
