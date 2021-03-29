import { FC } from 'react'

import {
	BannerWrapper,
	BannerBackground,
	BannerGradientOverlay,
	BannerContent,
	BannerText,
	BannerTitle,
} from './styles'
import Button from '../Button'

interface BannerProps {
	video: VideosItem
}

const Banner: FC<BannerProps> = ({ video }) => (
	<BannerWrapper>
		<BannerBackground
			src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0&mute=1&loop`}
			title={video.snippet.title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
		<BannerGradientOverlay />
		<BannerContent>
			<BannerText>Em alta</BannerText>
			<BannerTitle>{video.snippet.title}</BannerTitle>
			<Button isBlue aria-label={`assistir ${video.snippet.title}`} type="button">
				Assistir
			</Button>
		</BannerContent>
	</BannerWrapper>
)

export default Banner
