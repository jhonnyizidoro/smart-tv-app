import { FC, useEffect, useRef } from 'react'

import './styles.scss'

interface CommentProps extends Navegateble {
	comment: CommentsItem
}

const Comment: FC<CommentProps> = ({ comment, isFocused }) => {
	const ref = useRef<HTMLLIElement>(null)

	useEffect(() => {
		if (isFocused && ref.current) {
			const centerPosition =
				ref.current.getBoundingClientRect().top -
				window.innerHeight / 2 +
				ref.current.getBoundingClientRect().height / 2

			window.scrollBy({
				left: 0,
				top: centerPosition,
				behavior: 'smooth',
			})
		}
	}, [isFocused])

	return (
		<li className={`comment ${isFocused && 'comment--focused'}`} ref={ref}>
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