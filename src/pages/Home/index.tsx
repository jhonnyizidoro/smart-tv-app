import { FC, useCallback, useEffect, useState } from 'react'
import { useYoutubeApi } from '../../hooks/youtube-api'

import Banner from '../../components/Banner'
import Grid from '../../components/Grid'
import List from '../../components/List'

import './styles.scss'
import SearchForm from '../../components/SearchForm'

const HomePage: FC = () => {
	const { getVideosByCategory, getMostPopularVideos, getVideosById } = useYoutubeApi()

	const [focusedIndex, setFocusedIndex] = useState<number>(3)
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

	useEffect(() => {
		loadInitialData()
	}, [loadInitialData])

	return (
		<>
			<SearchForm isFocused={focusedIndex === 2} onFocusDown={() => setFocusedIndex(3)} />

			{bannerVideo && (
				<Banner
					video={bannerVideo}
					isFocused={focusedIndex === 3}
					onFocusUp={() => setFocusedIndex(2)}
					onFocusDown={() => setFocusedIndex(4)}
				/>
			)}

			<div className="home-page__main">
				<div className="home-page__main__left">
					{mostPopularVideos && (
						<Grid
							columns={3}
							title="Em alta"
							isFocused={focusedIndex === 4}
							videos={mostPopularVideos}
							onFocusUp={() => setFocusedIndex(3)}
							onFocusDown={() => setFocusedIndex(6)}
							onFocusRight={() => setFocusedIndex(5)}
						/>
					)}
				</div>

				<div className="home-page__main__right">
					{movieVideos && (
						<List
							videos={movieVideos}
							title="Filmes e animações"
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
							isFocused={focusedIndex === 6}
							onFocusUp={() => setFocusedIndex(4)}
							onFocusRight={() => setFocusedIndex(7)}
						/>
					)}
				</div>

				<div className="home-page__list">
					{musicVideos && (
						<List
							title="Músicas"
							videos={musicVideos}
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
							isFocused={focusedIndex === 8}
							title="Animais"
							videos={animalVideos}
							onFocusUp={() => setFocusedIndex(5)}
							onFocusLeft={() => setFocusedIndex(7)}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default HomePage
