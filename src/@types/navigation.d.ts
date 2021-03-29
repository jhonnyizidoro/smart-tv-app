interface Navegateble {
	isFocused: boolean
	onFocusDown?: () => void
	onFocusUp?: () => void
	onFocusLeft?: () => void
	onFocusRight?: () => void
}
