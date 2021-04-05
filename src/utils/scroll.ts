export const scrollElementToCenter = (element: HTMLElement): void => {
	const boundingClientRect = element.getBoundingClientRect()

	const centerPosition =
		boundingClientRect.top - window.innerHeight / 2 + boundingClientRect.height / 2

	window.scrollBy({
		left: 0,
		top: centerPosition,
		behavior: 'smooth',
	})
}

export const scrollToTop = (): void => {
	window.scrollBy({
		left: 0,
		top: -window.innerHeight,
		behavior: 'smooth',
	})
}
