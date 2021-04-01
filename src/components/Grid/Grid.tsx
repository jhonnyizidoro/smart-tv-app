import { FC, useCallback, useEffect, useState } from 'react'
import keyCodes from '../../util/keyCodes'

import SectionTitle from '../SectionTitle'
import GridItem from '../GridItem'

import './Grid.scss'

interface GridProps extends Navegateble {
	title?: string
	videos: VideosItem[]
	columns: 3 | 4
	onItemSelect: (video: VideosItem) => void
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
	onItemSelect,
}) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(1)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.keyCode) {
				case keyCodes.down:
					if (focusedIndex > videos.length - columns) {
						if (onFocusDown) {
							onFocusDown()
						}
					} else {
						setFocusedIndex(focusedIndex + columns)
					}
					break
				case keyCodes.up:
					if (focusedIndex <= columns) {
						if (onFocusUp) {
							onFocusUp()
						}
					} else {
						setFocusedIndex(focusedIndex - columns)
					}
					break
				case keyCodes.right:
					if (focusedIndex % columns === 0) {
						if (onFocusRight) {
							onFocusRight()
						}
					} else if (focusedIndex < videos.length) {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case keyCodes.left:
					if (focusedIndex % columns === 1) {
						if (onFocusLeft) {
							onFocusLeft()
						}
					} else {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				case keyCodes.enter:
					onItemSelect(videos[focusedIndex - 1])
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
			onItemSelect,
			videos,
		]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className="grid">
			{title && <SectionTitle>{title}</SectionTitle>}
			<div className="grid__items">
				{videos.map((video, index) => (
					<GridItem
						video={video}
						key={video.id}
						size={columns === 4 ? 'quarter' : 'third'}
						isFocused={focusedIndex === index + 1 && isFocused}
						onClick={clickedVideo => onItemSelect(clickedVideo)}
					/>
				))}
			</div>
		</div>
	)
}

export default Grid
