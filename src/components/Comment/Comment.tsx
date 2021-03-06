import { FC, useEffect, useRef } from 'react'
import { useGlobalContext } from '../../contexts/global'
import { scrollElementToCenter } from '../../utils/scroll'

import './Comment.scss'

interface CommentProps extends Focusable {
	comment: CommentsItem
}

const Comment: FC<CommentProps> = ({ comment, isFocused }) => {
	const ref = useRef<HTMLLIElement>(null)
	const { darkMode } = useGlobalContext()

	useEffect(() => {
		if (isFocused && ref.current) {
			scrollElementToCenter(ref.current)
		}
	}, [isFocused])

	return (
		<li
			className={`comment ${isFocused && 'comment--focused'} comment--${
				darkMode ? 'dark' : 'light'
			}`}
			ref={ref}
		>
			<div className="comment__image__wrapper">
				<img
					className="comment__image"
					src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
					alt={`Imagem de ${comment.snippet.topLevelComment.snippet.authorDisplayName}`}
				/>
			</div>

			<div className="comment__content">
				<div className="comment__title">
					{comment.snippet.topLevelComment.snippet.authorDisplayName}
				</div>

				<div className="comment__subtitle">
					{comment.snippet.topLevelComment.snippet.publishedAt}
				</div>

				<p className="comment__text">
					{comment.snippet.topLevelComment.snippet.textDisplay}
				</p>
			</div>
		</li>
	)
}

export default Comment
