import { FC, useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../../contexts/global'
import { useHistory } from 'react-router-dom'

import Checkbox from '../Checkbox'

import './styles.scss'

import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg'

const Menu: FC<Navegateble> = ({ isFocused, onFocusRight }) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(1)
	const { toggleDarkMode } = useGlobalContext()
	const { push } = useHistory()

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.keyCode) {
				case 39:
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 40:
					if (focusedIndex !== 4) {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case 38:
					if (focusedIndex !== 1) {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				case 13:
					switch (focusedIndex) {
						case 1:
							push('/')
							break
						case 2:
							push('/favorites')
							break
						case 3:
							toggleDarkMode()
							break
						default:
							break
					}
					break
				default:
					break
			}
		},
		[focusedIndex, isFocused, onFocusRight, push, toggleDarkMode]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<>
			{isFocused && <div className="menu__background" />}
			<div className={`menu ${!isFocused && 'menu--hidden'}`}>
				<div className="menu__links">
					<div className={`menu__item ${focusedIndex === 1 && 'menu__item--focused'}`}>
						<HomeIcon height={25} width={25} className="menu__icon" />
						Início
					</div>

					<div className={`menu__item ${focusedIndex === 2 && 'menu__item--focused'}`}>
						<StarIcon height={25} width={25} className="menu__icon" />
						Favoritos
					</div>
				</div>

				<div className={`menu__item ${focusedIndex === 3 && 'menu__item--focused'}`}>
					Modo escuro
					<Checkbox />
				</div>
			</div>
		</>
	)
}

export default Menu
