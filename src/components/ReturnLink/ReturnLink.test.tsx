import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ReturnLink from './ReturnLink'
import userEvent from '@testing-library/user-event'

const mockHistoryGoBack = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		goBack: mockHistoryGoBack,
	}),
}))

test('will go back when click or enter press', () => {
	const { container } = render(<ReturnLink isFocused />, { wrapper: BrowserRouter })

	userEvent.keyboard('{Enter}')
	expect(mockHistoryGoBack).toHaveBeenCalled()

	userEvent.click(container.children[0])
	expect(mockHistoryGoBack).toHaveBeenCalled()
})
