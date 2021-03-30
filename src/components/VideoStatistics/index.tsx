import { FC, useCallback, useEffect } from 'react'
import { useGlobalContext } from '../../contexts/global'

import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg'
import { ReactComponent as StarOutlinedIcon } from '../../assets/icons/star-outlined.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg'

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
	const { favorites, toggleFromFavorites } = useGlobalContext()

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
				case 'Enter':
				case 'NumpadEnter':
					toggleFromFavorites(video.id)
					break
				default:
					break
			}
		},
		[
			isFocused,
			onFocusDown,
			onFocusLeft,
			onFocusRight,
			onFocusUp,
			toggleFromFavorites,
			video,
		]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className="video-statistics">
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
					className={`video-statistics__item ${
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
	)
}

export default VideoStatistics
