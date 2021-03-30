import { FC, useEffect, useRef } from 'react'

import './styles.scss'

interface ListItemProps {
	video: VideosItem
	isFocused: boolean
}

const ListItem: FC<ListItemProps> = ({ video, isFocused }) => {
	const ref = useRef<HTMLLIElement>(null)

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
		<li className={`list-item ${isFocused && 'list-item--focused'}`} ref={ref}>
			<div className="list-item__content">
				<img
					className="list-item__image"
					src={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url}
					alt={`Thumbnail ${video.snippet.title}`}
				/>
				<div className="list-item__text">
					<h2 className="list-item__title">{video.snippet.title}</h2>
					<span className="list-item__subtitle">
						{video.statistics.viewCount} visualizações
					</span>
				</div>
			</div>
		</li>
	)
}

export default ListItem
