import { FC, useCallback, useEffect } from 'react'
import Button from '../Button'
import './styles.scss'

interface BannerProps extends Navegateble {
	video: VideosItem
}

const Banner: FC<BannerProps> = ({ video, isFocused, onFocusDown }) => {
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
				default:
					break
			}
		},
		[isFocused, onFocusDown]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className={`banner ${isFocused && 'banner--focused'}`}>
			<iframe
				className="banner__background"
				src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0&mute=1&loop=1`}
				title={video.snippet.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className="banner__gradient__overlay" />
			<div className="banner__content">
				<div className="banner__text">Em alta</div>
				<h1 className="banner__title">{video.snippet.title}</h1>
				<Button isBlue aria-label={`assistir ${video.snippet.title}`} type="button">
					Assistir
				</Button>
			</div>
		</div>
	)
}

export default Banner
