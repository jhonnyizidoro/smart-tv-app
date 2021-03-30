import { FC, useEffect, useRef } from 'react'

import './styles.scss'

interface GridItemProps extends Navegateble {
	video: VideosItem
	size: 'quarter' | 'third'
}

const GridItem: FC<GridItemProps> = ({ video, size, isFocused }) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isFocused && ref.current) {
			const centerPosition =
				ref.current.getBoundingClientRect().top -
				window.innerHeight / 2 +
				ref.current.getBoundingClientRect().height / 2

			window.scrollBy({
				left: 0,
				top: centerPosition,
				behavior: 'smooth',
			})
		}
	}, [isFocused])

	return (
		<div className={`grid-item grid-item--${size}`} ref={ref}>
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
