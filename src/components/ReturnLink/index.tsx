import { FC, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.scss'

import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg'

const ReturnLink: FC<Navegateble> = ({
	isFocused,
	onFocusDown,
	onFocusUp,
	onFocusRight,
}) => {
	const { goBack } = useHistory()

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
				case 'ArrowUp':
					if (onFocusUp) {
						onFocusUp()
					}
					break
				case 'ArrowRight':
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 'Enter':
				case 'NumpadEnter':
					goBack()
					break
				default:
					break
			}
		},
		[goBack, isFocused, onFocusDown, onFocusRight, onFocusUp]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div
			className={`return-link ${isFocused && 'return-link--focused'}`}
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
