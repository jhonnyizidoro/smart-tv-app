import { FC, useEffect, useRef } from 'react'
import { useGlobalContext } from '../../contexts/global'
import { scrollElementToCenter } from '../../utils/scroll'

import Navigable from '../Navigable'

import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg'
import { ReactComponent as StarOutlinedIcon } from '../../assets/icons/star-outlined.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg'

import './VideoStatistics.scss'

interface VideoStatisticsProps extends Focusable {
	video: VideosItem
}

const VideoStatistics: FC<VideoStatisticsProps> = ({
	video,
	isFocused,
	onFocusUp,
	onFocusDown,
	onFocusRight,
	onFocusLeft,
}) => {
	const { favorites, toggleFromFavorites, darkMode } = useGlobalContext()
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isFocused && ref.current) {
			scrollElementToCenter(ref.current)
		}
	}, [isFocused])

	return (
		<Navigable
			isNavigable={isFocused}
			onUpArrowPress={onFocusUp}
			onDownArrowPress={onFocusDown}
			onLeftArrowPress={onFocusLeft}
			onRightArrowPress={onFocusRight}
			onEnterPress={() => toggleFromFavorites(video.id)}
		>
			<div
				ref={ref}
				className={`video-statistics video-statistics--${darkMode ? 'dark' : 'light'}`}
			>
				<div className="video-statistics__title">{video.snippet.title}</div>
				<div className="video-statistics__items">
					<div className="video-statistics__item">
						<EyeIcon width={20} height={20} className="video-statistics__icon" />
						{video.statistics?.viewCount}
					</div>
					<div className="video-statistics__item">
						<LikeIcon width={20} height={20} className="video-statistics__icon" />
						{video.statistics?.likeCount}
					</div>
					<div
						onClick={() => toggleFromFavorites(video.id)}
						className={`video-statistics__item video-statistics__item--clickable ${
							isFocused && 'video-statistics__item--focused'
						}`}
					>
						{favorites.includes(video.id) ? (
							<>
								<StarIcon width={20} height={20} className="video-statistics__icon" />
								Remover dos favoritos
							</>
						) : (
							<>
								<StarOutlinedIcon
									width={20}
									height={20}
									className="video-statistics__icon"
								/>
								Adicionar aos favoritos
							</>
						)}
					</div>
				</div>
			</div>
		</Navigable>
	)
}

export default VideoStatistics
