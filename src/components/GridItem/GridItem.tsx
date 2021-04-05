import { FC, useEffect, useRef } from 'react'
import { useGlobalContext } from '../../contexts/global'
import { scrollElementToCenter } from '../../utils/scroll'

import './GtidItem.scss'

interface GridItemProps {
	video: VideosItem
	isFocused: boolean
	size: 'quarter' | 'third'
	onClick: (video: VideosItem) => void
}

const GridItem: FC<GridItemProps> = ({ video, size, isFocused, onClick }) => {
	const ref = useRef<HTMLDivElement>(null)
	const { darkMode } = useGlobalContext()

	useEffect(() => {
		if (isFocused && ref.current) {
			scrollElementToCenter(ref.current)
		}
	}, [isFocused])

	return (
		<div
			ref={ref}
			onClick={() => onClick(video)}
			className={`grid-item grid-item--${size} grid-item--${darkMode ? 'dark' : 'light'}`}
		>
			<div className={`grid-item__content ${isFocused && 'grid-item__content--focused'}`}>
				<figure className="grid-item__image__wrapper">
					<img
						className="grid-item__image"
						src={
							video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url
						}
						alt={`Thumbnail ${video.snippet.title}`}
					/>
				</figure>
				<div className="grid-item__footer">
					<h2 className="grid-item__title">{video.snippet.title}</h2>
					<span className="grid-item__subtitle">
						{video.statistics
							? `${video.statistics.viewCount} visualizações`
							: video.snippet.publishedAt}
					</span>
				</div>
			</div>
		</div>
	)
}

export default GridItem
