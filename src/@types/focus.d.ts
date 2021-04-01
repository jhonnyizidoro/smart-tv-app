interface Focusable {
	isFocused: boolean
	onFocusDown?: () => void
	onFocusUp?: () => void
	onFocusLeft?: () => void
	onFocusRight?: () => void
}
