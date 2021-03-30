import { FC, useCallback, useEffect, useState } from 'react'

import Comment from '../Comment'

import './styles.scss'

interface CommentsProps extends Navegateble {
	comments: CommentsItem[]
}

const Comments: FC<CommentsProps> = ({
	comments,
	isFocused,
	onFocusRight,
	onFocusLeft,
	onFocusUp,
}) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(1)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowUp':
					if (focusedIndex === 1) {
						if (onFocusUp) {
							onFocusUp()
						}
					} else {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				case 'ArrowDown':
					if (focusedIndex !== comments.length) {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case 'ArrowRight':
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case 'ArrowLeft':
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				default:
					break
			}
		},
		[focusedIndex, isFocused, onFocusLeft, onFocusRight, onFocusUp]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<ul className="comments">
			{comments.map((comment, index) => (
				<Comment
					comment={comment}
					key={comment.id}
					isFocused={focusedIndex === index + 1 && isFocused}
				/>
			))}
		</ul>
	)
}
export default Comments
