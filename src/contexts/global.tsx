import { createContext, FC, useState, useContext, useCallback } from 'react'

interface GlobalContext extends DarkMode {
	toggleDarkMode: () => void
	favorites: string[]
	toggleFromFavorites: (videoId: string) => void
}

const GlobalContext = createContext<GlobalContext>({} as GlobalContext)

export const GlobalProvider: FC = ({ children }) => {
	const [darkMode, setDarkMode] = useState<boolean>(false)
	const [favorites, setFavorites] = useState<string[]>([])

	const toggleDarkMode = () => setDarkMode(!darkMode)

	const toggleFromFavorites = useCallback(
		(videoId: string) => {
			if (favorites.includes(videoId)) {
				setFavorites(favorites.filter(favoriteVideoId => favoriteVideoId !== videoId))
			} else {
				setFavorites([...favorites, videoId])
			}
		},
		[favorites]
	)

	return (
		<GlobalContext.Provider
			value={{ darkMode, toggleDarkMode, favorites, toggleFromFavorites }}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = (): GlobalContext => useContext(GlobalContext)
