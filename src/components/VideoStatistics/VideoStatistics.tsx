import { FC, useCallback, useEffect } from 'react'
import { useGlobalContext } from '../../contexts/global'
import keyCodes from '../../util/keyCodes'

import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg'
import { ReactComponent as StarOutlinedIcon } from '../../assets/icons/star-outlined.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg'

import './VideoStatistics.scss'

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
	const { favorites, toggleFromFavorites, darkMode } = useGlobalContext()

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.keyCode) {
				case keyCodes.down:
					if (onFocusDown) {
						onFocusDown()
					}
					break
				case keyCodes.up:
					if (onFocusUp) {
						onFocusUp()
					}
					break
				case keyCodes.right:
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case keyCodes.left:
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				case keyCodes.enter:
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
		<div className={`video-statistics video-statistics--${darkMode ? 'dark' : 'light'}`}>
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
	)
}

export default VideoStatistics
