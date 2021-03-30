import { useCallback } from 'react'

interface UseYoutubeApi {
	getCategories: () => Promise<CategoriesResponse>
	getVideosByCategory: (categoryId: string, maxResults: number) => Promise<VideosResponse>
	getMostPopularVideos: (maxResults: number) => Promise<VideosResponse>
	getVideosById: (id: string) => Promise<VideosResponse>
	getCommentsByVideoId: (videoId: string) => Promise<CommentsResponse>
	searchVideosByQuery: (query: string) => Promise<VideosResponse>
}

export const useYoutubeApi = (): UseYoutubeApi => {
	const sendRequestToYoutubeApi = async <T,>(route: string): Promise<T> => {
		const endpoint = `https://www.googleapis.com/youtube/v3/${route}&key=AIzaSyAzZkXec6XjL85wFVGL1md7F55FYL_ha2o`
		const res = await fetch(endpoint)
		const data = await res.json()
		return data as T
	}

	const getCategories = async (): Promise<CategoriesResponse> => {
		return await sendRequestToYoutubeApi<CategoriesResponse>(
			'videoCategories?part=snippet&maxResults=99&regionCode=BR&hl=pt_BR'
		)
	}

	const getVideosByCategory = async (
		categoryId: string,
		maxResults: number
	): Promise<VideosResponse> => {
		return await sendRequestToYoutubeApi<VideosResponse>(
			`videos?part=snippet,statistics&maxResults=${maxResults}&chart=mostPopular&videoCategoryId=${categoryId}`
		)
	}

	const getMostPopularVideos = async (maxResults: number): Promise<VideosResponse> => {
		return await sendRequestToYoutubeApi<VideosResponse>(
			`videos?part=snippet,statistics&maxResults=${maxResults}&chart=mostPopular`
		)
	}

	const getVideosById = async (id: string): Promise<VideosResponse> => {
		return await sendRequestToYoutubeApi<VideosResponse>(
			`videos?part=snippet,statistics&id=${id}`
		)
	}

	const getCommentsByVideoId = async (videoId: string): Promise<CommentsResponse> => {
		return await sendRequestToYoutubeApi<CommentsResponse>(
			`commentThreads?part=snippet&videoId=${videoId}`
		)
	}

	const searchVideosByQuery = async (query: string): Promise<VideosResponse> => {
		const videos = await sendRequestToYoutubeApi<VideosResponse>(
			`search?part=snippet&maxResults=64&type=video&q=${query}`
		)

		videos.items.forEach(item => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			item.id = item.id.videoId
		})

		return videos
	}

	return {
		getCategories: useCallback(getCategories, []),
		getVideosByCategory: useCallback(getVideosByCategory, []),
		getMostPopularVideos: useCallback(getMostPopularVideos, []),
		getVideosById: useCallback(getVideosById, []),
		getCommentsByVideoId: useCallback(getCommentsByVideoId, []),
		searchVideosByQuery: useCallback(searchVideosByQuery, []),
	}
}
