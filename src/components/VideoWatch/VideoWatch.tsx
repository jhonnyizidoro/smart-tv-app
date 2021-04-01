import { FC, useCallback, useEffect, useRef, useState } from 'react'

import './VideoWatch.scss'
import Navegateble from '../Navegateble'

interface VideoWatchProps extends Focusable {
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

	const stopOrPlayVideo = useCallback(() => {
		const action = videoIsPlaying ? 'stopVideo' : 'playVideo'
		ref.current?.contentWindow?.postMessage(
			`{ "event": "command", "func": "${action}", "args": "" }`,
			'*'
		)
		setVideoIsPlaying(!videoIsPlaying)
	}, [videoIsPlaying])

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
		<Navegateble
			isNavegateble={isFocused}
			onUpArrowPress={onFocusUp}
			onEnterPress={stopOrPlayVideo}
			onDownArrowPress={onFocusDown}
			onLeftArrowPress={onFocusLeft}
			onRightArrowPress={onFocusRight}
		>
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
		</Navegateble>
	)
}

export default VideoWatch
