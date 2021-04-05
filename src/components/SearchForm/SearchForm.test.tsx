import { render, screen } from '@testing-library/react'
import SearchForm from './SearchForm'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}))

test('search form focus', () => {
	const focusDownMock = jest.fn()
	const focusLeftMock = jest.fn()
	const clickMock = jest.fn()

	render(
		<SearchForm
			isFocused
			onClick={clickMock}
			onFocusDown={focusDownMock}
			onFocusLeft={focusLeftMock}
		/>,
		{ wrapper: BrowserRouter }
	)

	userEvent.keyboard('{ArrowLeft}')
	expect(focusLeftMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')
	expect(focusDownMock).toHaveBeenCalled()
})

test('search form redirect', () => {
	const { container } = render(<SearchForm isFocused onClick={() => null} />, {
		wrapper: BrowserRouter,
	})

	const input = screen.getByLabelText('Insira os termos de busca') as HTMLInputElement
	expect(input).toBeInTheDocument()

	input.value = 'query'

	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')

	userEvent.keyboard('{Enter}')
	expect(mockHistoryPush).toHaveBeenCalledWith('/search/query')

	const form = container.querySelector('form') as HTMLFormElement

	input.value = 'query-2'
	form.submit()
	expect(mockHistoryPush).toHaveBeenCalledWith('/search/query-2')
})
