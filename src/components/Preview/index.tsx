import { FC, useCallback, useEffect } from 'react'

import Button from '../Button'

import './styles.scss'

interface PreviewProps extends Navegateble {
	video: VideosItem
}
const Preview: FC<PreviewProps> = ({ video, isFocused, onFocusUp }) => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowUp':
					if (onFocusUp) {
						onFocusUp()
					}
					break
				default:
					break
			}
		},
		[isFocused, onFocusUp]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<div className="preview">
			<img
				className="preview__image"
				src={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url}
				alt={`Thumbnail ${video.snippet.title}`}
			/>
			<div className="preview__content">
				<div className="preview__title">{video.snippet.title}</div>
				<div className="preview__text">{video.snippet.description.slice(0, 250)}...</div>
				<div className="preview__buttons">
					<Button isBlue={false} isFocused>
						Assistir
					</Button>
				</div>
			</div>
			<div className="preview__video__overlay" />
			<div className="preview__video__wrapper">
				<iframe
					className="preview__video"
					src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0&mute=1&loop=1&playlist=${video.id}`}
					title={video.snippet.title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		</div>
	)
}

export default Preview
