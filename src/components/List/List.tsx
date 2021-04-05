import { FC, useState } from 'react'

import SectionTitle from '../SectionTitle'
import ListItem from '../ListItem'
import Navigable from '../Navigable'

interface ListProps extends Focusable {
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

	const handleUpArrowPress = () => {
		if (focusedIndex === 1) {
			if (onFocusUp) {
				onFocusUp()
			}
		} else {
			setFocusedIndex(focusedIndex - 1)
		}
	}

	const handleDownArrowPress = () => {
		if (focusedIndex === videos.length) {
			if (onFocusDown) {
				onFocusDown()
			}
		} else {
			setFocusedIndex(focusedIndex + 1)
		}
	}

	return (
		<Navigable
			isNavigable={isFocused}
			onLeftArrowPress={onFocusLeft}
			onRightArrowPress={onFocusRight}
			onUpArrowPress={handleUpArrowPress}
			onDownArrowPress={handleDownArrowPress}
			onEnterPress={() => onItemSelect(videos[focusedIndex - 1])}
		>
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
		</Navigable>
	)
}

export default List
