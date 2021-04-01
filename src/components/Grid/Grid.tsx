import { FC, useState } from 'react'

import SectionTitle from '../SectionTitle'
import GridItem from '../GridItem'
import Navegateble from '../Navegateble'

import './Grid.scss'

interface GridProps extends Focusable {
	title?: string
	videos: VideosItem[]
	columns: 3 | 4
	onItemSelect: (video: VideosItem) => void
}

const Grid: FC<GridProps> = ({
	title,
	videos,
	columns,
	onItemSelect,
	isFocused,
	onFocusRight,
	onFocusLeft,
	onFocusDown,
	onFocusUp,
}) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(1)

	const handleUpArrowPress = () => {
		if (focusedIndex <= columns) {
			if (onFocusUp) {
				onFocusUp()
			}
		} else {
			setFocusedIndex(focusedIndex - columns)
		}
	}

	const handleDownArrowPress = () => {
		if (focusedIndex > videos.length - columns) {
			if (onFocusDown) {
				onFocusDown()
			}
		} else {
			setFocusedIndex(focusedIndex + columns)
		}
	}

	const handleRightArrowPress = () => {
		if (focusedIndex % columns === 0) {
			if (onFocusRight) {
				onFocusRight()
			}
		} else if (focusedIndex < videos.length) {
			setFocusedIndex(focusedIndex + 1)
		}
	}

	const handleLeftArrowPress = () => {
		if (focusedIndex % columns === 1) {
			if (onFocusLeft) {
				onFocusLeft()
			}
		} else {
			setFocusedIndex(focusedIndex - 1)
		}
	}

	return (
		<Navegateble
			isNavegateble={isFocused}
			onUpArrowPress={handleUpArrowPress}
			onLeftArrowPress={handleLeftArrowPress}
			onDownArrowPress={handleDownArrowPress}
			onRightArrowPress={handleRightArrowPress}
			onEnterPress={() => onItemSelect(videos[focusedIndex - 1])}
		>
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
		</Navegateble>
	)
}

export default Grid
