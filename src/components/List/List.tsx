import { FC, useCallback, useEffect, useState } from 'react'
import keyCodes from '../../util/keyCodes'

import SectionTitle from '../SectionTitle'
import ListItem from '../ListItem'

interface ListProps extends Navegateble {
	title: string
	videos: VideosItem[]
	onItemSelect: (video: VideosItem) => void
}

const List: FC<ListProps> = ({
	title,
	isFocused,
	videos,
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
					if (focusedIndex === videos.length) {
						if (onFocusDown) {
							onFocusDown()
						}
					} else {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case keyCodes.up:
					if (focusedIndex === 1) {
						if (onFocusUp) {
							onFocusUp()
						}
					} else {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				case keyCodes.right:
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case keyCodes.left:
					if (onFocusLeft) {
						onFocusLeft()
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
		<div className="list">
			<SectionTitle>{title}</SectionTitle>
			<ul className="list__items">
				{videos.map((video, index) => (
					<ListItem
						video={video}
						key={video.id}
						isFocused={focusedIndex === index + 1 && isFocused}
						onClick={clickedVideo => onItemSelect(clickedVideo)}
					/>
				))}
			</ul>
		</div>
	)
}

export default List
