import { FC, useCallback, useEffect, useState } from 'react'
import { useYoutubeApi } from '../../hooks/youtube-api'

const HomePage: FC = () => {
	const { getVideosByCategory, getMostPopularVideos } = useYoutubeApi()

	const [mostPopularVideos, setMostPopularVideos] = useState<VideosItem[]>()
	const [movieVideos, setMovieVideos] = useState<VideosItem[]>()
	const [vehicleVideos, setVehicleVideos] = useState<VideosItem[]>()
	const [musicVideos, setMusicVideos] = useState<VideosItem[]>()
	const [animalVideos, setAnimalVideos] = useState<VideosItem[]>()

	const loadInitialData = useCallback(async () => {
		const [
			mostPopularVideosResponse,
			movieVideosResponse,
			vehicleVideosResponse,
			musicVideosResponse,
			animalVideosResponse,
		] = await Promise.all([
			getMostPopularVideos(9),
			getVideosByCategory('1', 7),
			getVideosByCategory('2', 7),
			getVideosByCategory('10', 7),
			getVideosByCategory('15', 7),
		])

		setMostPopularVideos(mostPopularVideosResponse.items)
		setMovieVideos(movieVideosResponse.items)
		setVehicleVideos(vehicleVideosResponse.items)
		setMusicVideos(musicVideosResponse.items)
		setAnimalVideos(animalVideosResponse.items)
	}, [getMostPopularVideos, getVideosByCategory])

	useEffect(() => {
		loadInitialData()
	}, [loadInitialData])

	return <h1>Hello from home</h1>
}

export default HomePage
