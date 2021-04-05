import { render, screen } from '@testing-library/react'
import { videos } from '../../test-utils/data'

import VideoStatistics from './VideoStatistics'
import { GlobalProvider } from '../../contexts/global'
import userEvent from '@testing-library/user-event'

test('video statistics focus', () => {
	const focusUpMock = jest.fn()
	const focusDownMock = jest.fn()
	const focusRightMock = jest.fn()
	const focusLeftMock = jest.fn()

	render(
		<VideoStatistics
			video={videos[0]}
			isFocused
			onFocusLeft={focusLeftMock}
			onFocusDown={focusDownMock}
			onFocusRight={focusRightMock}
			onFocusUp={focusUpMock}
		/>,
		{ wrapper: GlobalProvider }
	)

	userEvent.keyboard('{ArrowUp}')
	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowRight}')
	userEvent.keyboard('{ArrowLeft}')

	expect(focusLeftMock).toHaveBeenCalled()
	expect(focusDownMock).toHaveBeenCalled()
	expect(focusRightMock).toHaveBeenCalled()
	expect(focusUpMock).toHaveBeenCalled()
})

test('video toggle from favorites', () => {
	render(<VideoStatistics video={videos[0]} isFocused />, {
		wrapper: GlobalProvider,
	})

	userEvent.keyboard('{Enter}')

	const addedToFavoritesLink = screen.getByText(/Remover dos favoritos/gim)
	expect(addedToFavoritesLink).toBeInTheDocument()

	userEvent.click(addedToFavoritesLink)
	const addToFavoritesLink = screen.getByText(/Adicionar aos favoritos/gim)
	expect(addToFavoritesLink).toBeInTheDocument()
})
