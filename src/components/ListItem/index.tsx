import { FC } from 'react'

import {
	ListItemWrapper,
	ListItemElement,
	ListItemImage,
	ListItemContent,
	ListItemTitle,
	ListItemSubtitle,
} from './styles'

interface ListItemProps {
	video: VideosItem
}

const ListItem: FC<ListItemProps> = ({ video }) => (
	<ListItemWrapper>
		<ListItemElement>
			<ListItemImage
				src={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url}
				alt={`Thumbnail ${video.snippet.title}`}
			/>
			<ListItemContent>
				<ListItemTitle>{video.snippet.title}</ListItemTitle>
				<ListItemSubtitle>{video.statistics.viewCount} visualizações</ListItemSubtitle>
			</ListItemContent>
		</ListItemElement>
	</ListItemWrapper>
)

export default ListItem
