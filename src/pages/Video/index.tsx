import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useYoutubeApi } from '../../hooks/youtube-api'

import List from '../../components/List'
import Preview from '../../components/Preview'
import ReturnLink from '../../components/ReturnLink'
import SearchForm from '../../components/SearchForm'
import Menu from '../../components/Menu'
import VideoWatch from '../../components/VideoWatch'
import VideoStatistics from '../../components/VideoStatistics'

import './styles.scss'

interface VideoPageParams {
	id: string
}

const VideoPage: FC = () => {
	const { getVideosById, getVideosByCategory, getCommentsByVideoId } = useYoutubeApi()
	const { id } = useParams<VideoPageParams>()

	const [focusedIndex, setFocusedIndex] = useState<number>(4)
	const [previewVideo, setPreviewVideo] = useState<VideosItem | null>()
	const [focusedIndexBeforePreview, setFocusedIndexBeforePreview] = useState<number>(3)
	const [focusedIndexBeforeMenu, setFocusedIndexBeforeMenu] = useState<number>(3)

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

	const showMenu = useCallback(() => {
		setFocusedIndexBeforeMenu(focusedIndex)
		setFocusedIndex(1)
	}, [focusedIndex])

	const hideMenu = useCallback(() => {
		setFocusedIndex(focusedIndexBeforeMenu)
	}, [focusedIndexBeforeMenu])

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
			<Menu isFocused={focusedIndex === 1} onFocusRight={() => hideMenu()} />

			<SearchForm
				isFocused={focusedIndex === 2}
				onFocusLeft={() => showMenu()}
				onFocusDown={() => setFocusedIndex(3)}
			/>

			<div className="video-page">
				<div className="video-page__content">
					<ReturnLink
						isFocused={focusedIndex === 3}
						onFocusUp={() => setFocusedIndex(2)}
						onFocusDown={() => setFocusedIndex(4)}
						onFocusRight={() => setFocusedIndex(7)}
					/>

					{video && (
						<VideoWatch
							video={video}
							isFocused={focusedIndex === 4}
							onFocusUp={() => setFocusedIndex(3)}
							onFocusRight={() => setFocusedIndex(7)}
						/>
					)}

					{video && <VideoStatistics video={video} />}
				</div>
				<div className="video-page__similar">
					{similarVideos && (
						<List
							title="Videos similares"
							videos={similarVideos}
							onItemSelect={showPreview}
							isFocused={focusedIndex === 7}
							onFocusLeft={() => setFocusedIndex(4)}
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
