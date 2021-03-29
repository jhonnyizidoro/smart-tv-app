import { FC } from 'react'
import './styles.scss'

interface ListItemProps {
	video: VideosItem
}

const ListItem: FC<ListItemProps> = ({ video }) => (
	<li className="list-item">
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
