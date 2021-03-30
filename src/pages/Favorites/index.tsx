import { FC, useCallback, useEffect, useState } from 'react'
import { useYoutubeApi } from '../../hooks/youtube-api'
import { useGlobalContext } from '../../contexts/global'

import Menu from '../../components/Menu'
import SearchForm from '../../components/SearchForm'
import PageTitle from '../../components/PageTitle'
import ReturnLink from '../../components/ReturnLink'
import Grid from '../../components/Grid'
import Preview from '../../components/Preview'

import './styles.scss'

const FavoritesPage: FC = () => {
	const { getVideosById } = useYoutubeApi()
	const { favorites } = useGlobalContext()

	const [focusedIndex, setFocusedIndex] = useState<number>(4)
	const [previewVideo, setPreviewVideo] = useState<VideosItem | null>()
	const [focusedIndexBeforePreview, setFocusedIndexBeforePreview] = useState<number>(4)
	const [focusedIndexBeforeMenu, setFocusedIndexBeforeMenu] = useState<number>(4)

	const [videos, setVideos] = useState<VideosItem[]>()

	const loadInitialData = useCallback(async () => {
		const ids = favorites.join(',')
		const videosResponse = await getVideosById(ids)
		setVideos(videosResponse.items)
	}, [favorites, getVideosById])

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
			setFocusedIndex(5)
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

			<div className="favorites-page">
				<div className="favorites-page__header">
					<PageTitle>Favoritos</PageTitle>

					<ReturnLink
						isFocused={focusedIndex === 3}
						onFocusLeft={() => showMenu()}
						onFocusUp={() => setFocusedIndex(2)}
						onFocusDown={() => setFocusedIndex(4)}
					/>
				</div>

				{videos && (
					<Grid
						videos={videos}
						columns={4}
						onItemSelect={showPreview}
						isFocused={focusedIndex === 4}
						onFocusLeft={() => showMenu()}
						onFocusUp={() => setFocusedIndex(3)}
					/>
				)}
			</div>

			{previewVideo && (
				<Preview
					video={previewVideo}
					isFocused={focusedIndex === 5}
					onFocusUp={() => hidePreview()}
				/>
			)}
		</>
	)
}

export default FavoritesPage
