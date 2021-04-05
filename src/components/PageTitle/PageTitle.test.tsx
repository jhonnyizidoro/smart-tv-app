import { render, screen } from '@testing-library/react'
import PageTitle from './PageTitle'

test('page title is rendered', () => {
	render(<PageTitle>Page title</PageTitle>)
	const title = screen.getByText(/page title/i)
	expect(title).toBeInTheDocument()
})
