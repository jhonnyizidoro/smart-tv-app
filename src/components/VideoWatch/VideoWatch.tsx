import { FC, useCallback, useEffect, useRef, useState } from 'react'

import './VideoWatch.scss'

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
	const ref = useRef<HTMLIFrameElement>(null)
	const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(true)

	const playVideo = useCallback(() => {
		ref.current?.contentWindow?.postMessage(
			'{"event":"command","func":"playVideo","args":""}',
			'*'
		)
		setVideoIsPlaying(true)
	}, [])

	const stopVideo = useCallback(() => {
		ref.current?.contentWindow?.postMessage(
			'{"event":"command","func":"stopVideo","args":""}',
			'*'
		)
		setVideoIsPlaying(false)
	}, [])

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
				case 39:
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 37:
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				case 13:
					videoIsPlaying ? stopVideo() : playVideo()
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
			playVideo,
			stopVideo,
			videoIsPlaying,
		]
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
		<div className={`video-watch ${isFocused && 'video-watch--focused'}`}>
			<iframe
				ref={ref}
				className="video-watch__iframe"
				src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=1&enablejsapi=1`}
				title={video.snippet.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	)
}

export default VideoWatch
