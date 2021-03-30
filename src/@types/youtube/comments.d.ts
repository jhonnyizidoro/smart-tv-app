interface CommentsItem {
	kind: string
	etag: string
	id: string
	snippet: {
		videoId: string
		canReply: boolean
		totalReplyCount: number
		isPublic: boolean
		topLevelComment: {
			id: string
			kind: string
			etag: string
			snippet: {
				videoId: string
				textDisplay: string
				textOriginal: string
				authorDisplayName: string
				authorProfileImageUrl: string
				canRate: boolean
				viewerRating: string
				likeCount: number
				publishedAt: string
				updatedAt: string
				authorChannelId: {
					value: string
				}
			}
		}
	}
}

interface CommentsResponse {
	kind: string
	etag: string
	items: CommentsItem[]
}
