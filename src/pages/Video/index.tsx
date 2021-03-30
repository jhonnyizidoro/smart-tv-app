import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useYoutubeApi } from '../../hooks/youtube-api'

import List from '../../components/List'
import Preview from '../../components/Preview'

import './styles.scss'

interface VideoPageParams {
	id: string
}

const VideoPage: FC = () => {
	const { getVideosById, getVideosByCategory, getCommentsByVideoId } = useYoutubeApi()
	const { id } = useParams<VideoPageParams>()

	const [focusedIndex, setFocusedIndex] = useState<number>(7)
	const [previewVideo, setPreviewVideo] = useState<VideosItem | null>()
	const [focusedIndexBeforePreview, setFocusedIndexBeforePreview] = useState<number>(3)

	const [video, setVideo] = useState<VideosItem>()
	const [similarVideos, setSimilarVideos] = useState<VideosItem[]>()
	const [comments, setComments] = useState<CommentsItem[]>()

	const loadInitialData = useCallback(async () => {
		const [videoResponse, commentsResponse] = await Promise.all([
			getVideosById(id),
			getCommentsByVideoId(id),
		])

		setVideo(videoResponse.items[0])
		setComments(commentsResponse.items)

		const categoryId = videoResponse.items[0].snippet.categoryId
		const similarVideosResponse = await getVideosByCategory(categoryId, 15)

		setSimilarVideos(similarVideosResponse.items)
	}, [getCommentsByVideoId, getVideosByCategory, getVideosById, id])

	const showPreview = useCallback(
		(video: VideosItem) => {
			setFocusedIndexBeforePreview(focusedIndex)
			setFocusedIndex(8)
			setPreviewVideo(video)
		},
		[focusedIndex]
	)

	const hidePreview = useCallback(() => {
		setPreviewVideo(null)
		setFocusedIndex(focusedIndexBeforePreview)
	}, [focusedIndexBeforePreview])

	useEffect(() => {
		loadInitialData()
	}, [loadInitialData])

	return (
		<>
			<div className="video-page">
				<div className="video-page__content">*</div>
				<div className="video-page__similar">
					{similarVideos && (
						<List
							title="Videos similares"
							videos={similarVideos}
							onItemSelect={showPreview}
							isFocused={focusedIndex === 7}
						/>
					)}
				</div>
			</div>

			{previewVideo && (
				<Preview
					video={previewVideo}
					isFocused={focusedIndex === 8}
					onFocusUp={() => hidePreview()}
				/>
			)}
		</>
	)
}

export default VideoPage
