import { FC, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import keyCodes from '../../util/keyCodes'

import Button from '../Button'

import './Banner.scss'

interface BannerProps extends Navegateble {
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
		if (onFocusUp) {
			onFocusUp()
		}
	}, [onFocusUp, push, video])

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
				case keyCodes.left:
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				case keyCodes.enter:
					redirectToVideoPage()
					break
				default:
					break
			}
		},
		[isFocused, onFocusDown, onFocusLeft, onFocusUp, redirectToVideoPage]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	useEffect(() => {
		if (isFocused) {
			window.scrollBy({
				left: 0,
				top: -window.innerHeight,
				behavior: 'smooth',
			})
		}
	}, [isFocused])

	return (
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
	)
}

export default Banner
