import { FC } from 'react'

import {
	GridItemWrapper,
	GridItemElement,
	GridItemImageWrapper,
	GridItemImage,
	GridItemContent,
	GridItemTitle,
	GridItemSubtitle,
} from './styles'

interface GridItemProps {
	video: VideosItem
}

const GridItem: FC<GridItemProps> = ({ video }) => (
	<GridItemWrapper>
		<GridItemElement>
			<GridItemImageWrapper>
				<GridItemImage
					src={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url}
					alt={`Thumbnail ${video.snippet.title}`}
				/>
			</GridItemImageWrapper>
			<GridItemContent>
				<GridItemTitle>{video.snippet.title}</GridItemTitle>
				<GridItemSubtitle>{video.statistics.viewCount} visualizações</GridItemSubtitle>
			</GridItemContent>
		</GridItemElement>
	</GridItemWrapper>
)
export default GridItem
