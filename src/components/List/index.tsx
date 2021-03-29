import { FC, useCallback, useEffect, useState } from 'react'

import SectionTitle from '../SectionTitle'
import ListItem from '../ListItem'

interface ListProps extends Navegateble {
	title: string
	videos: VideosItem[]
}

const List: FC<ListProps> = ({
	title,
	isFocused,
	videos,
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
					if (focusedIndex === videos.length) {
						if (onFocusDown) {
							onFocusDown()
						}
					} else {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case 'ArrowUp':
					if (focusedIndex === 1) {
						if (onFocusUp) {
							onFocusUp()
						}
					} else {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				case 'ArrowRight':
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 'ArrowLeft':
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				default:
					break
			}
		},
		[focusedIndex, isFocused, onFocusDown, onFocusLeft, onFocusRight, onFocusUp, videos]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className="list">
			<SectionTitle>{title}</SectionTitle>
			<ul className="list__items">
				{videos.map((video, index) => (
					<ListItem
						video={video}
						key={video.id}
						isFocused={focusedIndex === index + 1 && isFocused}
					/>
				))}
			</ul>
		</div>
	)
}

export default List
