import { FC, useCallback, useEffect } from 'react'

import Checkbox from '../Checkbox'

import './styles.scss'

import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg'
import { ReactComponent as HistoryIcon } from '../../assets/icons/history.svg'

const Menu: FC<Navegateble> = ({ isFocused, onFocusRight }) => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowRight':
					if (onFocusRight) {
						onFocusRight()
					}
					break
				default:
					break
			}
		},
		[isFocused, onFocusRight]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<>
			{isFocused && <div className="menu__background" />}
			<div className={`menu ${!isFocused && 'menu--hidden'}`}>
				<div className="menu__item">
					<HomeIcon height={25} width={25} className="menu__icon" />
					Início
				</div>

				<div className="menu__item">
					<StarIcon height={25} width={25} className="menu__icon" />
					Favoritos
				</div>

				<div className="menu__item">
					<HistoryIcon height={25} width={25} className="menu__icon" />
					Favoritos
				</div>

				<div className="menu__footer">
					Modo escuro
					<Checkbox />
				</div>
			</div>
		</>
	)
}

export default Menu
