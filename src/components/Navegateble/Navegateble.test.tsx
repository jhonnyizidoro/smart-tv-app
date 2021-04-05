import { render } from '@testing-library/react'
import Navegateble from './Navegateble'
import userEvent from '@testing-library/user-event'

test('navigation is working', () => {
	const arrowRightMock = jest.fn()
	const arrowLeftMock = jest.fn()
	const arrowUpMock = jest.fn()
	const arrowDownMock = jest.fn()
	const enterMock = jest.fn()

	render(
		<Navegateble
			isNavegateble
			onEnterPress={enterMock}
			onRightArrowPress={arrowRightMock}
			onLeftArrowPress={arrowLeftMock}
			onDownArrowPress={arrowDownMock}
			onUpArrowPress={arrowUpMock}
		/>
	)

	userEvent.keyboard('{Enter}')
	expect(enterMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowUp}')
	expect(arrowUpMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowRight}')
	expect(arrowRightMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowLeft}')
	expect(arrowLeftMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	expect(arrowDownMock).toHaveBeenCalled()
})

test('navigation is blocked when unfocused', () => {
	const arrowRightMock = jest.fn()
	const arrowLeftMock = jest.fn()
	const arrowUpMock = jest.fn()
	const arrowDownMock = jest.fn()
	const enterMock = jest.fn()

	render(
		<Navegateble
			isNavegateble={false}
			onEnterPress={enterMock}
			onRightArrowPress={arrowRightMock}
			onLeftArrowPress={arrowLeftMock}
			onDownArrowPress={arrowDownMock}
			onUpArrowPress={arrowUpMock}
		/>
	)

	userEvent.keyboard('{Enter}')
	expect(enterMock).not.toHaveBeenCalled()

	userEvent.keyboard('{ArrowUp}')
	expect(arrowUpMock).not.toHaveBeenCalled()

	userEvent.keyboard('{ArrowRight}')
	expect(arrowRightMock).not.toHaveBeenCalled()

	userEvent.keyboard('{ArrowLeft}')
	expect(arrowLeftMock).not.toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	expect(arrowDownMock).not.toHaveBeenCalled()
})
