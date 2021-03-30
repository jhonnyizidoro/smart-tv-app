import { FC, useCallback, useEffect } from 'react'

import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg'

import './styles.scss'

interface VideoStatisticsProps extends Navegateble {
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
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowDown':
					if (onFocusDown) {
						onFocusDown()
					}
					break
				case 'ArrowUp':
					if (onFocusUp) {
						onFocusUp()
					}
					break
				case 'ArrowRight':
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 'ArrowLeft':
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				default:
					break
			}
		},
		[isFocused, onFocusDown, onFocusLeft, onFocusRight, onFocusUp]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className={`video-statistics ${isFocused && 'video-statistics--focused'}`}>
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
}

export default VideoStatistics
