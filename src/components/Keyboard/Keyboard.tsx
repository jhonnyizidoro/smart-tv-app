import { FC, useMemo, useState } from 'react'
import { useGlobalContext } from '../../contexts/global'

import Navigable from '../Navigable'

import './Keyboard.scss'

interface KeyboardProps extends Focusable {
	onKeyPress: (input: string) => void
}

const Keyboard: FC<KeyboardProps> = ({ onKeyPress, onFocusLeft, onFocusDown }) => {
	const [focusedRow, setFocusedRow] = useState<number>(0)
	const [focusedIndex, setFocusedIndex] = useState<number>(0)
	const { darkMode } = useGlobalContext()

	const keymap = useMemo(
		() => [
			['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter'],
			['z', 'x', 'c', 'v', 'b', 'n', 'm'],
		],
		[]
	)

	const handleUpArrowPress = () => {
		if (focusedRow !== 0) {
			setFocusedRow(focusedRow - 1)
		}
	}

	const handleDownArrowPress = () => {
		if (focusedRow !== 3) {
			if (keymap[focusedRow + 1].length - 1 < focusedIndex) {
				setFocusedIndex(keymap[focusedRow + 1].length - 1)
			}
			setFocusedRow(focusedRow + 1)
		} else {
			if (onFocusDown) {
				onFocusDown()
			}
		}
	}

	const handleRightArrowPress = () => {
		if (focusedIndex < keymap[focusedRow].length - 1) {
			setFocusedIndex(focusedIndex + 1)
		}
	}

	const handleLeftArrowPress = () => {
		if (focusedIndex !== 0) {
			setFocusedIndex(focusedIndex - 1)
		} else {
			if (onFocusLeft) {
				onFocusLeft()
			}
		}
	}

	return (
		<Navigable
			isNavigable
			onUpArrowPress={handleUpArrowPress}
			onDownArrowPress={handleDownArrowPress}
			onLeftArrowPress={handleLeftArrowPress}
			onRightArrowPress={handleRightArrowPress}
			onEnterPress={() => onKeyPress(keymap[focusedRow][focusedIndex])}
		>
			<div className={`keyboard keyboard--${darkMode ? 'dark' : 'light'}`}>
				{keymap.map((row, rowIndex) => (
					<div className="keyboard__row" key={rowIndex}>
						{row.map((key, index) => (
							<button
								key={key}
								aria-label={`Digitar ${key}`}
								onClick={() => onKeyPress(key)}
								className={`keyboard__key keyboard__key--${
									key !== 'enter' && key !== 'backspace' && key !== ' '
										? 'regular'
										: 'large'
								} ${
									index === focusedIndex &&
									rowIndex === focusedRow &&
									'keyboard__key--focused'
								}`}
							>
								{key}
							</button>
						))}
					</div>
				))}
			</div>
		</Navigable>
	)
}

export default Keyboard
