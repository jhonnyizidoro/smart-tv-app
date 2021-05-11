import { FC, useCallback, useMemo, useState } from 'react'

import Navigable from '../Navigable'
import { useGlobalContext } from '../../contexts/global'

import './Keyboard.scss'

interface KeyboardProps extends Focusable {
	onKeyPress: (input: string) => void
}

const Keyboard: FC<KeyboardProps> = ({ onKeyPress, onFocusLeft, onFocusDown }) => {
	const [focusedRow, setFocusedRow] = useState<number>(0)
	const [focusedColumn, setFocusedColumn] = useState<number>(0)
	const [focusedColumnBeforeLastRow, setFocusedColumnBeforeLastRow] = useState<number>(0)
	const { darkMode } = useGlobalContext()

	const keymap = useMemo(
		() => [
			['a', 'b', 'c', 'd', 'e', 'f'],
			['g', 'h', 'i', 'j', 'k', 'l'],
			['m', 'n', 'o', 'p', 'q', 'r'],
			['s', 't', 'u', 'v', 'w', 'x'],
			['y', 'z', '1', '2', '3', '4'],
			['5', '6', '7', '8', '9', '0'],
			['backspace', 'space', 'enter'],
		],
		[]
	)

	const handleUpArrowPress = (): void => {
		if (focusedRow !== 0) {
			if (focusedRow === keymap.length - 1) {
				const newFocusedColumn =
					focusedColumn < 3 && focusedColumnBeforeLastRow % 2 === 1
						? focusedColumnBeforeLastRow
						: focusedColumn * 2

				setFocusedColumn(newFocusedColumn)
			}
			setFocusedRow(focusedRow - 1)
		}
	}

	const handleDownArrowPress = (): void => {
		if (focusedRow !== keymap.length - 1) {
			if (focusedRow === keymap.length - 2) {
				setFocusedColumnBeforeLastRow(focusedColumn)

				const newFocusedColumn = Math.floor(focusedColumn / 2)
				setFocusedColumn(newFocusedColumn)
			}
			setFocusedRow(focusedRow + 1)
		} else {
			onFocusDown?.()
		}
	}

	const handleRightArrowPress = () => {
		if (focusedColumn < keymap[focusedRow].length - 1) {
			setFocusedColumn(focusedColumn + 1)
		}
	}

	const handleLeftArrowPress = useCallback(() => {
		if (focusedColumn !== 0) {
			setFocusedColumn(focusedColumn - 1)
		} else {
			onFocusLeft?.()
		}
	}, [focusedColumn, onFocusLeft])

	const handleEnterPress = useCallback(() => {
		onKeyPress(keymap[focusedRow][focusedColumn])
	}, [focusedColumn, focusedRow, keymap, onKeyPress])

	return (
		<Navigable
			isNavigable
			onUpArrowPress={handleUpArrowPress}
			onDownArrowPress={handleDownArrowPress}
			onLeftArrowPress={handleLeftArrowPress}
			onRightArrowPress={handleRightArrowPress}
			onEnterPress={handleEnterPress}
		>
			<div className={`keyboard keyboard--${darkMode ? 'dark' : 'light'}`}>
				{keymap.map((row, rowIndex) => (
					<div className="keyboard__row" key={rowIndex}>
						{row.map((key, columnIndex) => (
							<button
								key={key}
								aria-label={`Digitar ${key}`}
								onClick={() => onKeyPress(key)}
								className={`keyboard__key keyboard__key--${
									key.length === 1 ? 'regular' : 'large'
								} ${
									columnIndex === focusedColumn &&
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
