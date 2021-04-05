import { render, screen } from '@testing-library/react'
import { GlobalProvider } from '../../contexts/global'
import { comments } from '../../test-utils/data'
import Comment from './Comment'

test('image will be rendered with correct alt text', () => {
	const comment = comments[0]
	render(<Comment comment={comment} isFocused />, { wrapper: GlobalProvider })
	const img = screen.getByAltText(
		`Imagem de ${comment.snippet.topLevelComment.snippet.authorDisplayName}`
	)
	expect(img).toBeInTheDocument()
})
