import { FC, useCallback, useEffect, useState } from 'react'
import keyCodes from '../../util/keyCodes'

import Comment from '../Comment'

import './Comments.scss'

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

			switch (event.keyCode) {
				case keyCodes.up:
					if (focusedIndex === 1) {
						if (onFocusUp) {
							onFocusUp()
						}
					} else {
						setFocusedIndex(focusedIndex - 1)
					}
					break
				case keyCodes.down:
					if (focusedIndex !== comments.length) {
						setFocusedIndex(focusedIndex + 1)
					}
					break
				case keyCodes.right:
					if (onFocusRight) {
						onFocusRight()
					}
					break
				case keyCodes.left:
					if (onFocusLeft) {
						onFocusLeft()
					}
					break
				default:
					break
			}
		},
		[comments.length, focusedIndex, isFocused, onFocusLeft, onFocusRight, onFocusUp]
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
