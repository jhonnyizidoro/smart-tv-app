interface CategoriesItem {
	kind: string
	etag: string
	id: string
	snippet: {
		titile: string
		assignable: boolean
		channelId: string
	}
}

interface CategoriesResponse {
	kind: string
	etag: string
	items: CategoriesItem[]
}
