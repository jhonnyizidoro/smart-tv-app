import { FC, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { scrollToTop } from '../../utils/scroll'

import Navigable from '../Navigable'
import Button from '../Button'

import './Banner.scss'

interface BannerProps extends Focusable {
	video: VideosItem
}

const Banner: FC<BannerProps> = ({
	video,
	isFocused,
	onFocusDown,
	onFocusUp,
	onFocusLeft,
}) => {
	const { push } = useHistory()

	const redirectToVideoPage = useCallback(() => {
		push(`/watch/${video.id}`)
	}, [push, video])

	useEffect(() => {
		if (isFocused) {
			scrollToTop()
		}
	}, [isFocused])

	return (
		<Navigable
			isNavigable={isFocused}
			onDownArrowPress={onFocusDown}
			onUpArrowPress={onFocusUp}
			onLeftArrowPress={onFocusLeft}
			onEnterPress={redirectToVideoPage}
		>
			<div className="banner">
				<iframe
					className="banner__background"
					src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0&mute=1&loop=1&playlist=${video.id}`}
					title={video.snippet.title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
				<div className="banner__gradient__overlay" />
				<div className={`banner__content ${isFocused && 'banner__content--focused'}`}>
					<div className="banner__text">Em alta</div>
					<h1 className="banner__title">{video.snippet.title}</h1>
					<Button
						isBlue
						type="button"
						onClick={() => redirectToVideoPage()}
						aria-label={`assistir ${video.snippet.title}`}
					>
						Assistir
					</Button>
				</div>
			</div>
		</Navigable>
	)
}

export default Banner
