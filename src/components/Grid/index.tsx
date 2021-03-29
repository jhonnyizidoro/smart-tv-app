import { FC, useCallback, useEffect, useState } from 'react'

import SectionTitle from '../SectionTitle'
import GridItem from '../GridItem'

import './styles.scss'

interface GridProps extends Navegateble {
	title: string
	videos: VideosItem[]
	columns: 3 | 4
}

const Grid: FC<GridProps> = ({
	title,
	videos,
	isFocused,
	columns,
	onFocusRight,
	onFocusLeft,
	onFocusDown,
	onFocusUp,
}) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(1)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowDown':
					if (focusedIndex > videos.length - columns) {
						if (onFocusDown) {
							onFocusDown()
						}
					} else {
						setFocusedIndex(focusedIndex + columns)
					}
					break
				case 'ArrowUp':
					if (focusedIndex <= columns) {
						if (onFocusUp) {
							onFocusUp()
						}
					} else {
						setFocusedIndex(focusedIndex - columns)
					}
					break
				case 'ArrowRight':
					if (focusedIndex % columns === 0) {
						if (onFocusRight) {
							onFocusRight()
						}
					} else {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case 'ArrowLeft':
					if (focusedIndex % columns === 1) {
						if (onFocusLeft) {
							onFocusLeft()
						}
					} else {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				default:
					break
			}
		},
		[
			columns,
			focusedIndex,
			isFocused,
			onFocusDown,
			onFocusLeft,
			onFocusRight,
			onFocusUp,
			videos,
		]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className="grid">
			<SectionTitle>{title}</SectionTitle>
			<div className="grid__items">
				{videos.map((video, index) => (
					<GridItem
						video={video}
						key={video.id}
						size={columns === 4 ? 'quarter' : 'third'}
						isFocused={focusedIndex === index + 1 && isFocused}
					/>
				))}
			</div>
		</div>
	)
}

export default Grid
