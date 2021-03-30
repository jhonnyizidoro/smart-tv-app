import { FC, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../../contexts/global'

import './styles.scss'

import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg'

const ReturnLink: FC<Navegateble> = ({
	isFocused,
	onFocusDown,
	onFocusUp,
	onFocusRight,
	onFocusLeft,
}) => {
	const { goBack } = useHistory()
	const { darkMode } = useGlobalContext()

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.keyCode) {
				case 40:
					if (onFocusDown) {
						onFocusDown()
					}
					break
				case 38:
					if (onFocusUp) {
						onFocusUp()
					}
					break
				case 39:
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 37:
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				case 13:
					goBack()
					break
				default:
					break
			}
		},
		[goBack, isFocused, onFocusDown, onFocusLeft, onFocusRight, onFocusUp]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div
			className={`return-link ${isFocused && 'return-link--focused'} return-link--${
				darkMode ? 'dark' : 'light'
			}`}
			onClick={goBack}
		>
			<ArrowLeftIcon
				height={25}
				width={25}
				className={`return-link__icon ${isFocused && 'return-link__icon--focused'}`}
			/>
			Voltar
		</div>
	)
}

export default ReturnLink
