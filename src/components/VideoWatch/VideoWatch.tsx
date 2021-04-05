import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { scrollElementToCenter } from '../../utils/scroll'

import './VideoWatch.scss'
import Navigable from '../Navigable'

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
			scrollElementToCenter(ref.current)
		}
	}, [isFocused])

	return (
		<Navigable
			isNavigable={isFocused}
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
		</Navigable>
	)
}

export default VideoWatch
