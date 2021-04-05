import { render } from '@testing-library/react'
import { videos } from '../../test-utils/data'
import List from './List'
import userEvent from '@testing-library/user-event'

test('navigation is working', () => {
	const focusUpMock = jest.fn()
	const focusDownMock = jest.fn()
	const focusRightMock = jest.fn()
	const focusLeftMock = jest.fn()

	const { container } = render(
		<List
			title="List title"
			videos={videos.slice(0, 1)}
			onItemSelect={() => null}
			isFocused
			onFocusUp={focusUpMock}
			onFocusLeft={focusLeftMock}
			onFocusRight={focusRightMock}
			onFocusDown={focusDownMock}
		/>
	)

	expect(container).toBeInTheDocument()

	userEvent.keyboard('{ArrowUp}')
	expect(focusUpMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	expect(focusDownMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowLeft}')
	expect(focusLeftMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowRight}')
	expect(focusRightMock).toHaveBeenCalled()
})

test('onItemSelect is being fired', () => {
	const itemSelectMock = jest.fn()

	const { container } = render(
		<List
			title="List title"
			videos={videos.slice(0, 1)}
			onItemSelect={itemSelectMock}
			isFocused
		/>
	)

	userEvent.keyboard('{Enter}')
	expect(itemSelectMock).toHaveBeenCalledWith(videos[0])

	const firstListItem = container.querySelector('.list__items')
	firstListItem && userEvent.click(firstListItem.children[0])
	expect(itemSelectMock).toHaveBeenCalledWith(videos[0])
})
