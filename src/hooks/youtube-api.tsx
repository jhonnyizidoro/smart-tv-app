import { useCallback } from 'react'

interface UseYoutubeApi {
	getCategories: () => Promise<CategoriesResponse>
	getVideosByCategory: (categoryId: string, maxResults: number) => Promise<VideosResponse>
	getMostPopularVideos: (maxResults: number) => Promise<VideosResponse>
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

	return {
		getCategories: useCallback(getCategories, []),
		getVideosByCategory: useCallback(getVideosByCategory, []),
		getMostPopularVideos: useCallback(getMostPopularVideos, []),
	}
}
