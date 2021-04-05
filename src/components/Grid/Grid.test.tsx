import { render, screen } from '@testing-library/react'
import { videos } from '../../test-utils/data'

import Grid from './Grid'
import userEvent from '@testing-library/user-event'

test('is calling function on enter press or click', () => {
	const onItemSelectMock = jest.fn()
	const { container } = render(
		<Grid
			videos={videos}
			columns={4}
			onItemSelect={onItemSelectMock}
			isFocused
			title="Grid title"
		/>
	)
	userEvent.keyboard('{Enter}')
	expect(onItemSelectMock).toHaveBeenCalledWith(videos[0])

	const firstGridItem = container.querySelector('.grid__items > div')
	expect(firstGridItem).toBeInTheDocument()
	firstGridItem && userEvent.click(firstGridItem)
	expect(onItemSelectMock).toHaveBeenCalledWith(videos[0])
})

test('title is rendered', () => {
	const onItemSelectMock = jest.fn()
	render(
		<Grid
			videos={videos}
			columns={4}
			onItemSelect={onItemSelectMock}
			isFocused
			title="Grid title"
		/>
	)
	const title = screen.getByText(/grid title/im)
	expect(title).toBeInTheDocument()
})

test('navigation os working', () => {
	const focusUpMock = jest.fn()
	const focusDownMock = jest.fn()
	const focusRightMock = jest.fn()
	const focusLeftMock = jest.fn()

	render(
		<Grid
			videos={videos.slice(0, 4)}
			columns={4}
			onItemSelect={() => null}
			isFocused
			onFocusUp={focusUpMock}
			onFocusLeft={focusLeftMock}
			onFocusRight={focusRightMock}
			onFocusDown={focusDownMock}
		/>
	)

	userEvent.keyboard('{ArrowUp}')
	expect(focusUpMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowLeft}')
	expect(focusLeftMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	expect(focusDownMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowRight}')
	expect(focusRightMock).toHaveBeenCalled()
})
