import { FC, useCallback, useEffect, useState } from 'react'
import { useYoutubeApi } from '../../hooks/youtube-api'

import Banner from '../../components/Banner'
import Grid from '../../components/Grid'
import List from '../../components/List'
import SearchForm from '../../components/SearchForm'
import Menu from '../../components/Menu'
import Preview from '../../components/Preview'

import './styles.scss'

const HomePage: FC = () => {
	const { getVideosByCategory, getMostPopularVideos, getVideosById } = useYoutubeApi()

	const [focusedIndex, setFocusedIndex] = useState<number>(3)
	const [previewVideo, setPreviewVideo] = useState<VideosItem | null>()
	const [focusedIndexBeforePreview, setFocusedIndexBeforePreview] = useState<number>(3)
	const [focusedIndexBeforeMenu, setFocusedIndexBeforeMenu] = useState<number>(3)

	const [bannerVideo, setBannerVideo] = useState<VideosItem>()
	const [mostPopularVideos, setMostPopularVideos] = useState<VideosItem[]>()
	const [movieVideos, setMovieVideos] = useState<VideosItem[]>()
	const [vehicleVideos, setVehicleVideos] = useState<VideosItem[]>()
	const [musicVideos, setMusicVideos] = useState<VideosItem[]>()
	const [animalVideos, setAnimalVideos] = useState<VideosItem[]>()

	const loadInitialData = useCallback(async () => {
		const [
			bannerVideoResponse,
			mostPopularVideosResponse,
			movieVideosResponse,
			vehicleVideosResponse,
			musicVideosResponse,
			animalVideosResponse,
		] = await Promise.all([
			getVideosById('xXiSN8Tftjg'),
			getMostPopularVideos(9),
			getVideosByCategory('1', 7),
			getVideosByCategory('2', 7),
			getVideosByCategory('10', 7),
			getVideosByCategory('15', 7),
		])

		setBannerVideo(bannerVideoResponse.items[0])
		setMostPopularVideos(mostPopularVideosResponse.items)
		setMovieVideos(movieVideosResponse.items)
		setVehicleVideos(vehicleVideosResponse.items)
		setMusicVideos(musicVideosResponse.items)
		setAnimalVideos(animalVideosResponse.items)
	}, [getMostPopularVideos, getVideosById, getVideosByCategory])

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
			setFocusedIndex(9)
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
				onClick={() => setFocusedIndex(2)}
				onFocusDown={() => setFocusedIndex(3)}
			/>

			{bannerVideo && (
				<Banner
					video={bannerVideo}
					isFocused={focusedIndex === 3}
					onFocusUp={() => setFocusedIndex(2)}
					onFocusDown={() => setFocusedIndex(4)}
					onFocusLeft={() => showMenu()}
				/>
			)}

			<div className="home-page__main">
				<div className="home-page__main__left">
					{mostPopularVideos && (
						<Grid
							columns={3}
							title="Em alta"
							videos={mostPopularVideos}
							onItemSelect={showPreview}
							isFocused={focusedIndex === 4}
							onFocusUp={() => setFocusedIndex(3)}
							onFocusDown={() => setFocusedIndex(6)}
							onFocusLeft={() => showMenu()}
							onFocusRight={() => setFocusedIndex(5)}
						/>
					)}
				</div>

				<div className="home-page__main__right">
					{movieVideos && (
						<List
							videos={movieVideos}
							title="Filmes e animações"
							onItemSelect={showPreview}
							isFocused={focusedIndex === 5}
							onFocusUp={() => setFocusedIndex(3)}
							onFocusLeft={() => setFocusedIndex(4)}
							onFocusDown={() => setFocusedIndex(8)}
						/>
					)}
				</div>
			</div>

			<div className="home-page__lists">
				<div className="home-page__list">
					{vehicleVideos && (
						<List
							title="Veículos"
							videos={vehicleVideos}
							onItemSelect={showPreview}
							isFocused={focusedIndex === 6}
							onFocusUp={() => setFocusedIndex(4)}
							onFocusLeft={() => showMenu()}
							onFocusRight={() => setFocusedIndex(7)}
						/>
					)}
				</div>

				<div className="home-page__list">
					{musicVideos && (
						<List
							title="Músicas"
							videos={musicVideos}
							onItemSelect={showPreview}
							isFocused={focusedIndex === 7}
							onFocusUp={() => setFocusedIndex(4)}
							onFocusLeft={() => setFocusedIndex(6)}
							onFocusRight={() => setFocusedIndex(8)}
						/>
					)}
				</div>

				<div className="home-page__list">
					{animalVideos && (
						<List
							title="Animais"
							videos={animalVideos}
							onItemSelect={showPreview}
							isFocused={focusedIndex === 8}
							onFocusUp={() => setFocusedIndex(5)}
							onFocusLeft={() => setFocusedIndex(7)}
						/>
					)}
				</div>
			</div>

			{previewVideo && (
				<Preview
					video={previewVideo}
					isFocused={focusedIndex === 9}
					onFocusUp={() => hidePreview()}
				/>
			)}
		</>
	)
}

export default HomePage
