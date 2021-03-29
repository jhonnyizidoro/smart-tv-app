import { FC, useCallback, useEffect, useState } from 'react'
import { useYoutubeApi } from '../../hooks/youtube-api'

import Banner from '../../components/Banner'
import Grid from '../../components/Grid'
import GridItem from '../../components/GridItem'
import List from '../../components/List'
import ListItem from '../../components/ListItem'

import './styles.scss'

const HomePage: FC = () => {
	const { getVideosByCategory, getMostPopularVideos, getVideosById } = useYoutubeApi()

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
			{bannerVideo && <Banner video={bannerVideo} />}

			<div className="home-page__main">
				<div className="home-page__main__left">
					<Grid title="Em alta">
						{mostPopularVideos?.map(video => (
							<GridItem video={video} key={video.id} size="third" />
						))}
					</Grid>
				</div>
				<div className="home-page__main__right">
					<List title="Filmes e animações">
						{movieVideos?.map(video => (
							<ListItem video={video} key={video.id} />
						))}
					</List>
				</div>
			</div>

			<div className="home-page__lists">
				<div className="home-page__list">
					<List title="Veículos">
						{vehicleVideos?.map(video => (
							<ListItem video={video} key={video.id} />
						))}
					</List>
				</div>
				<div className="home-page__list">
					<List title="Músicas">
						{musicVideos?.map(video => (
							<ListItem video={video} key={video.id} />
						))}
					</List>
				</div>
				<div className="home-page__list">
					<List title="Animais">
						{animalVideos?.map(video => (
							<ListItem video={video} key={video.id} />
						))}
					</List>
				</div>
			</div>
		</>
	)
}

export default HomePage
