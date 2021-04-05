import { FC, useState } from 'react'

import Comment from '../Comment'
import Navigable from '../Navigable'

import './Comments.scss'

interface CommentsProps extends Focusable {
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

	const handleUpArrowPress = () => {
		if (focusedIndex === 1) {
			if (onFocusUp) {
				onFocusUp()
			}
		} else {
			setFocusedIndex(focusedIndex - 1)
		}
	}

	const handleDownArrowPress = () => {
		if (focusedIndex !== comments.length) {
			setFocusedIndex(focusedIndex + 1)
		}
	}

	return (
		<Navigable
			isNavigable={isFocused}
			onLeftArrowPress={onFocusLeft}
			onRightArrowPress={onFocusRight}
			onUpArrowPress={handleUpArrowPress}
			onDownArrowPress={handleDownArrowPress}
		>
			<ul className="comments">
				{comments.map((comment, index) => (
					<Comment
						comment={comment}
						key={comment.id}
						isFocused={focusedIndex === index + 1 && isFocused}
					/>
				))}
			</ul>
		</Navigable>
	)
}
export default Comments
