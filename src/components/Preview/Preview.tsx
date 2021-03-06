import { FC, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../../contexts/global'

import Navigable from '../Navigable'
import Button from '../Button'

import './Preview.scss'

interface PreviewProps extends Focusable {
	video: VideosItem
}
const Preview: FC<PreviewProps> = ({ video, isFocused, onFocusUp }) => {
	const { push } = useHistory()
	const { darkMode } = useGlobalContext()

	const redirectToVideoPage = useCallback(() => {
		push(`/watch/${video.id}`)
		if (onFocusUp) {
			onFocusUp()
		}
	}, [onFocusUp, push, video])

	return (
		<Navigable
			isNavigable={isFocused}
			onUpArrowPress={onFocusUp}
			onEnterPress={redirectToVideoPage}
		>
			<div className={`preview preview--${darkMode ? 'dark' : 'blue'}`}>
				<img
					className="preview__image"
					src={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url}
					alt={`Thumbnail ${video.snippet.title}`}
				/>
				<div className="preview__content">
					<div className="preview__title">{video.snippet.title}</div>
					<div className="preview__text">
						{video.snippet.description.slice(0, 250)}...
					</div>
					<div className="preview__buttons">
						<Button isBlue={darkMode} onClick={() => redirectToVideoPage()}>
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
		</Navigable>
	)
}

export default Preview
