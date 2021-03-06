import { FC, useEffect, useRef } from 'react'
import { useGlobalContext } from '../../contexts/global'
import { scrollElementToCenter } from '../../utils/scroll'

import './ListItem.scss'

interface ListItemProps {
	video: VideosItem
	isFocused: boolean
	onClick: (video: VideosItem) => void
}

const ListItem: FC<ListItemProps> = ({ video, isFocused, onClick }) => {
	const ref = useRef<HTMLLIElement>(null)
	const { darkMode } = useGlobalContext()

	useEffect(() => {
		if (isFocused && ref.current) {
			scrollElementToCenter(ref.current)
		}
	}, [isFocused])

	return (
		<li
			ref={ref}
			onClick={() => onClick(video)}
			className={`list-item list-item--${darkMode ? 'dark' : 'light'}`}
		>
			<div className={`list-item__content ${isFocused && 'list-item__content--focused'}`}>
				<img
					className="list-item__image"
					src={video.snippet.thumbnails.medium.url}
					alt={`Thumbnail ${video.snippet.title}`}
				/>
				<div className="list-item__text">
					<h2 className="list-item__title">{video.snippet.title}</h2>
					<span className="list-item__subtitle">
						{video.statistics?.viewCount} visualizações
					</span>
				</div>
			</div>
		</li>
	)
}

export default ListItem
