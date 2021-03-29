interface VideosThumbnail {
	height: number
	width: number
	url: string
}

interface VideosItem {
	id: string
	etag: string
	kind: string
	statistics: VideoStatistics
	snippet: {
		title: string
		categoryId: string
		channelId: string
		channelTitle: string
		description: string
		liveBroadcastContent: string
		publishedAt: string
		tags: string[]
		thumbnails: {
			default: VideosThumbnail
			high: VideosThumbnail
			maxres: VideosThumbnail
			medium: VideosThumbnail
			standard: VideosThumbnail
		}
		localized: {
			title: string
			description: string
		}
	}
}

interface VideosResponse {
	etag: string
	kind: string
	items: VideosItem[]
	pageInfo: {
		resultsPerPage: number
		totalResults: number
	}
}
