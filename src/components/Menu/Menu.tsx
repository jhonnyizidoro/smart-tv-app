import { FC, useCallback, useState } from 'react'
import { useGlobalContext } from '../../contexts/global'
import { useHistory } from 'react-router-dom'

import Checkbox from '../Checkbox'
import Navigable from '../Navigable'

import './Menu.scss'

import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'

const Menu: FC<Focusable> = ({ isFocused, onFocusRight }) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(1)
	const { toggleDarkMode, darkMode } = useGlobalContext()
	const { push } = useHistory()

	const closeMenu = useCallback(() => {
		if (onFocusRight) {
			onFocusRight()
		}
	}, [onFocusRight])

	const redirect = useCallback(
		(url: string) => {
			push(url)
			closeMenu()
		},
		[closeMenu, push]
	)

	const handleUpArrowPress = () => {
		if (focusedIndex !== 1) {
			setFocusedIndex(focusedIndex - 1)
		}
	}

	const handleDownArrowPress = () => {
		if (focusedIndex !== 3) {
			setFocusedIndex(focusedIndex + 1)
		}
	}

	const handleEnterPress = () => {
		switch (focusedIndex) {
			case 1:
				redirect('/')
				break
			case 2:
				redirect('/favorites')
				break
			case 3:
				toggleDarkMode()
				break
			default:
				break
		}
	}

	return (
		<Navigable
			isNavigable={isFocused}
			onRightArrowPress={closeMenu}
			onEnterPress={handleEnterPress}
			onUpArrowPress={handleUpArrowPress}
			onDownArrowPress={handleDownArrowPress}
		>
			{isFocused && (
				<div
					className={`menu__background menu__background--${darkMode ? 'dark' : 'light'}`}
				/>
			)}
			<div
				className={`menu ${!isFocused && 'menu--hidden'} menu--${
					darkMode ? 'dark' : 'light'
				}`}
			>
				<div className="menu__close" onClick={closeMenu}>
					<CloseIcon height={15} width={15} className="menu__close__icon" />
				</div>

				<div className="menu__links">
					<div
						onClick={() => redirect('/')}
						className={`menu__item ${focusedIndex === 1 && 'menu__item--focused'}`}
					>
						<HomeIcon height={25} width={25} className="menu__icon" />
						Início
					</div>

					<div
						onClick={() => redirect('/favorites')}
						className={`menu__item ${focusedIndex === 2 && 'menu__item--focused'}`}
					>
						<StarIcon height={25} width={25} className="menu__icon" />
						Favoritos
					</div>
				</div>

				<div
					onClick={() => toggleDarkMode()}
					className={`menu__item ${focusedIndex === 3 && 'menu__item--focused'}`}
				>
					Modo escuro
					<Checkbox />
				</div>
			</div>
		</Navigable>
	)
}

export default Menu
