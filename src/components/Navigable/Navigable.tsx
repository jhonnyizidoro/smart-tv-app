import { FC, useCallback, useEffect } from 'react'

const keyCodes = {
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	enter: 13,
}

interface NavigableProps {
	isNavigable: boolean
	onDownArrowPress?: () => void
	onUpArrowPress?: () => void
	onLeftArrowPress?: () => void
	onRightArrowPress?: () => void
	onEnterPress?: () => void
}

const Navigable: FC<NavigableProps> = ({
	children,
	isNavigable,
	onRightArrowPress,
	onUpArrowPress,
	onLeftArrowPress,
	onDownArrowPress,
	onEnterPress,
}) => {
	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if (!isNavigable) {
				return
			}

			switch (event.keyCode) {
				case keyCodes.down:
					if (onDownArrowPress) {
						onDownArrowPress()
					}
					break
				case keyCodes.up:
					if (onUpArrowPress) {
						onUpArrowPress()
					}
					break
				case keyCodes.right:
					if (onRightArrowPress) {
						onRightArrowPress()
					}
					break
				case keyCodes.left:
					if (onLeftArrowPress) {
						onLeftArrowPress()
					}
					break
				case keyCodes.enter:
					if (onEnterPress) {
						onEnterPress()
					}
					break
				default:
					break
			}
		},
		[
			isNavigable,
			onEnterPress,
			onDownArrowPress,
			onLeftArrowPress,
			onRightArrowPress,
			onUpArrowPress,
		]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress)
		return () => document.removeEventListener('keydown', handleKeyPress)
	}, [handleKeyPress])

	return <>{children}</>
}

export default Navigable
