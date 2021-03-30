import { FC } from 'react'

import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg'

import './styles.scss'

interface VideoStatisticsProps {
	video: VideosItem
}

const VideoStatistics: FC<VideoStatisticsProps> = ({ video }) => (
	<div className="video-statistics">
		<div className="video-statistics__title">{video.snippet.title}</div>
		<div className="video-statistics__items">
			<div className="video-statistics__item">
				<EyeIcon width={20} height={20} className="video-statistics__icon" />
				{video.statistics.viewCount}
			</div>
			<div className="video-statistics__item">
				<LikeIcon width={20} height={20} className="video-statistics__icon" />
				{video.statistics.likeCount}
			</div>
		</div>
	</div>
)

export default VideoStatistics
