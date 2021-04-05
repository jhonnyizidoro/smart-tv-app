import { render } from '@testing-library/react'
import SectionTitle from './SectionTitle'

test('section title is rendered', () => {
	const { container } = render(<SectionTitle>Categoria 1</SectionTitle>)
	expect(container).toBeInTheDocument()
})
