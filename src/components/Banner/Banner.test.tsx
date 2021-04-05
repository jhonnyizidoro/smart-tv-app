import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { videos } from '../../test-utils/data'

import Banner from './Banner'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}))

test('banner will redirect when press enter', () => {
	render(<Banner video={videos[0]} isFocused />, { wrapper: BrowserRouter })
	userEvent.keyboard('{Enter}')
	expect(mockHistoryPush).toHaveBeenCalledWith(`/watch/${videos[0].id}`)
})

test('banner will redirect when clicked', () => {
	const { container } = render(<Banner video={videos[0]} isFocused />, {
		wrapper: BrowserRouter,
	})
	const button = container.querySelector('button')
	expect(button).toBeInTheDocument()
	button && userEvent.click(button)
	expect(mockHistoryPush).toHaveBeenCalledWith(`/watch/${videos[0].id}`)
})
