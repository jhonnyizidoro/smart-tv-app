import { FC, useCallback, useEffect, useRef } from 'react'

import './styles.scss'

interface VideoWatchProps extends Navegateble {
	video: VideosItem
}

const VideoWatch: FC<VideoWatchProps> = ({
	video,
	isFocused,
	onFocusRight,
	onFocusUp,
	onFocusDown,
	onFocusLeft,
}) => {
	const ref = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		if (isFocused && ref.current) {
			const centerPosition =
				ref.current.getBoundingClientRect().top -
				window.innerHeight / 2 +
				ref.current.getBoundingClientRect().height / 2

			window.scrollBy({
				left: 0,
				top: centerPosition,
				behavior: 'smooth',
			})
		}
	}, [isFocused])

	return (
		<div className={`video-watch ${isFocused && 'video-watch--focused'}`} ref={ref}>
			<iframe
				className="video-watch__iframe"
				src={`https://www.youtube.com/embed/${video.id}?autoplay=0&controls=0`}
				title={video.snippet.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	)
}

export default VideoWatch
