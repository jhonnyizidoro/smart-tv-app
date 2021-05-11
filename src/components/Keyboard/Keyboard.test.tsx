import { render, screen } from '@testing-library/react'
import Keyboard from './Keyboard'
import userEvent from '@testing-library/user-event'

test('keyboard down arrow is working', () => {
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

	for (let i = 0; i < 7; i++) {
		userEvent.keyboard('{ArrowDown}')
	}
	expect(focusDownMock).toHaveBeenCalled()
})

test('keyboard input is working', () => {
	const enterPressMock = jest.fn()

	render(<Keyboard isFocused onKeyPress={enterPressMock} />)

	userEvent.keyboard('{Enter}')
	expect(enterPressMock).toHaveBeenCalledWith('a')

	const button = screen.getByLabelText('Digitar 2')
	userEvent.click(button)
	expect(enterPressMock).toHaveBeenCalledWith('2')
})

test('keyboard up arrow is working', () => {
	const keyPressMock = jest.fn()

	render(<Keyboard isFocused onKeyPress={keyPressMock} />)

	for (let i = 0; i < 7; i++) {
		userEvent.keyboard('{ArrowDown}')
	}

	userEvent.keyboard('{ArrowUp}')
	userEvent.keyboard('{Enter}')

	expect(keyPressMock).toHaveBeenCalledWith('5')
})

test('keyboard right arrow is working', () => {
	const keyPressMock = jest.fn()

	render(<Keyboard isFocused onKeyPress={keyPressMock} />)

	for (let i = 0; i < 7; i++) {
		userEvent.keyboard('{ArrowRight}')
	}
	userEvent.keyboard('{Enter}')

	expect(keyPressMock).toHaveBeenCalledWith('f')
})

test('keyboard left arrow is working', () => {
	const keyPressMock = jest.fn()
	const focusLeftMock = jest.fn()

	render(<Keyboard isFocused onKeyPress={keyPressMock} onFocusLeft={focusLeftMock} />)

	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowLeft}')
	userEvent.keyboard('{Enter}')

	expect(keyPressMock).toHaveBeenCalledWith('b')

	userEvent.keyboard('{ArrowLeft}')
	userEvent.keyboard('{ArrowLeft}')

	expect(focusLeftMock).toHaveBeenCalled()
})
