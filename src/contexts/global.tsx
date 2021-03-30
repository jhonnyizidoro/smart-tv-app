import { createContext, FC, useState, useContext, useCallback } from 'react'

interface GlobalContext extends DarkMode {
	toggleDarkMode: () => void
	favorites: string[]
	toggleFromFavorites: (videoId: string) => void
}

const GlobalContext = createContext<GlobalContext>({} as GlobalContext)

export const GlobalProvider: FC = ({ children }) => {
	const storedFavorites = localStorage.getItem('favorites')
	const favoritesInit = storedFavorites?.split(',') || []

	const storedDarkMode = localStorage.getItem('darkMode')
	const darkModeInit = storedDarkMode === 'true'

	const [darkMode, setDarkMode] = useState<boolean>(darkModeInit)
	const [favorites, setFavorites] = useState<string[]>(favoritesInit)

	const toggleDarkMode = () => {
		localStorage.setItem('darkMode', String(!darkMode))
		setDarkMode(!darkMode)
	}

	const toggleFromFavorites = useCallback(
		(videoId: string) => {
			const newFavorites = favorites.includes(videoId)
				? favorites.filter(favoriteVideoId => favoriteVideoId !== videoId)
				: [...favorites, videoId]

			setFavorites(newFavorites)
			localStorage.setItem('favorites', newFavorites.join(','))
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
