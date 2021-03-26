import { createContext, FC, useState, useContext } from 'react'

interface GlobalContext {
	darkMode: boolean
	toggleDarkMode: () => void
}

const GlobalContext = createContext<GlobalContext>({} as GlobalContext)

export const GlobalProvider: FC = ({ children }) => {
	const [darkMode, setDarkMode] = useState<boolean>(false)

	const toggleDarkMode = () => setDarkMode(!darkMode)

	return (
		<GlobalContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = (): GlobalContext => useContext(GlobalContext)
