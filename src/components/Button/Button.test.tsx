import { render, screen } from '@testing-library/react'

import Button from './Button'

test('button text is correct', () => {
	render(<Button isBlue>This button is blue</Button>)
	const buttonElement = screen.getByText('This button is blue')
	expect(buttonElement).toBeInTheDocument()
})
