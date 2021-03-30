import { FC, useCallback, useEffect } from 'react'

import Button from '../Button'

import './styles.scss'

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
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.keyCode) {
				case 40:
					if (onFocusDown) {
						onFocusDown()
					}
					break
				case 38:
					if (onFocusUp) {
						onFocusUp()
					}
					break
				case 37:
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				default:
					break
			}
		},
		[isFocused, onFocusDown, onFocusLeft, onFocusUp]
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
					aria-label={`assistir ${video.snippet.title}`}
					type="button"
					isFocused={isFocused}
				>
					Assistir
				</Button>
			</div>
		</div>
	)
}

export default Banner
