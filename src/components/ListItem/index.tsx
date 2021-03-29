import { FC } from 'react'

import './styles.scss'

interface ListItemProps {
	video: VideosItem
	isFocused: boolean
}

const ListItem: FC<ListItemProps> = ({ video, isFocused }) => (
	<li className={`list-item ${isFocused && 'list-item--focused'}`}>
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

export default ListItem
