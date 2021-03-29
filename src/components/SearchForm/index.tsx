import { FC, useCallback, useEffect } from 'react'
import './styles.scss'

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

const SearchForm: FC<Navegateble> = ({ isFocused, onFocusDown }) => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowDown':
					if (onFocusDown) {
						onFocusDown()
					}
					break
				default:
					break
			}
		},
		[isFocused, onFocusDown]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className="search-form">
			<input
				type="text"
				className={`search-form__input ${
					isFocused ? 'search-form__input--focused' : 'search-form__input--collapsed'
				}`}
				placeholder="Pesquisar vídeos"
			/>
			<div className="search-form__icon__wrapper">
				<SearchIcon width={25} height={25} className="search-form__icon" />
			</div>
		</div>
	)
}

export default SearchForm
