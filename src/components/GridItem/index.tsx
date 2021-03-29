import { FC } from 'react'
import './styles.scss'

interface GridItemProps {
	video: VideosItem
	size: 'full' | 'half' | 'quarter' | 'third'
}

const GridItem: FC<GridItemProps> = ({ video, size }) => (
	<div className={`grid-item grid-item--${size}`}>
		<div className="grid-item__content">
			<figure className="grid-item__image__wrapper">
				<img
					className="grid-item__image"
					src={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url}
					alt={`Thumbnail ${video.snippet.title}`}
				/>
			</figure>
			<div className="grid-item__footer">
				<h2 className="grid-item__title">{video.snippet.title}</h2>
				<span className="grid-item__subtitle">
					{video.statistics.viewCount} visualizações
				</span>
			</div>
		</div>
	</div>
)
export default GridItem
