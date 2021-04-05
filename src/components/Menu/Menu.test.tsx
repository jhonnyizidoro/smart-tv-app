import { render, screen } from '@testing-library/react'
import Menu from './Menu'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

const mockHistoryPush = jest.fn()
const mockToggleDarkMode = jest.fn()

jest.mock('../../contexts/global', () => ({
	...jest.requireActual('../../contexts/global'),
	useGlobalContext: () => ({
		toggleDarkMode: mockToggleDarkMode,
	}),
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}))

test('menu navigation', () => {
	const focusRightMock = jest.fn()

	const { container } = render(<Menu isFocused onFocusRight={focusRightMock} />, {
		wrapper: BrowserRouter,
	})

	expect(container).toBeInTheDocument()

	userEvent.keyboard('{ArrowRight}')
	expect(focusRightMock).toHaveBeenCalled()

	userEvent.keyboard('{Enter}')
	expect(mockHistoryPush).toHaveBeenCalledWith('/')

	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{Enter}')
	expect(mockHistoryPush).toHaveBeenCalledWith('/favorites')
})

test('menu dark mode toggle', () => {
	const focusRightMock = jest.fn()

	const { container } = render(<Menu isFocused onFocusRight={focusRightMock} />)

	expect(container).toBeInTheDocument()
	const checkboxWrapper = screen.getByText(/modo escuro/i)
	expect(checkboxWrapper).toBeInTheDocument()
	userEvent.click(checkboxWrapper)
	expect(mockToggleDarkMode).toHaveBeenCalled()
})
