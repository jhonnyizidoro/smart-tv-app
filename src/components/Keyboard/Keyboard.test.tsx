import { render, screen } from '@testing-library/react'
import Keyboard from './Keyboard'
import userEvent from '@testing-library/user-event'

test('keyboard navigation is working', () => {
	const focusLeftMock = jest.fn()
	const focusDownMock = jest.fn()

	render(
		<Keyboard
			isFocused
			onKeyPress={() => null}
			onFocusDown={focusDownMock}
			onFocusLeft={focusLeftMock}
		/>
	)

	userEvent.keyboard('{ArrowLeft}')
	expect(focusLeftMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowDown}')
	expect(focusDownMock).toHaveBeenCalled()
})

test('keyboard input is working', () => {
	const enterPressMock = jest.fn()

	render(<Keyboard isFocused onKeyPress={enterPressMock} />)

	userEvent.keyboard('{Enter}')
	expect(enterPressMock).toHaveBeenCalledWith('1')

	const button = screen.getByLabelText('Digitar 2')
	userEvent.click(button)
	expect(enterPressMock).toHaveBeenCalledWith('2')
})
