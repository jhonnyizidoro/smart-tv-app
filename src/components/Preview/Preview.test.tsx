import { render } from '@testing-library/react'
import { videos } from '../../test-utils/data'
import Preview from './Preview'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}))

test('will redirect on enter press', () => {
	const { container } = render(<Preview video={videos[0]} isFocused />, {
		wrapper: BrowserRouter,
	})

	userEvent.keyboard('{Enter}')
	expect(mockHistoryPush).toHaveBeenCalledWith(`/watch/${videos[0].id}`)

	const buttons = container.querySelector('.preview__buttons')
	expect(buttons).toBeInTheDocument()

	buttons && userEvent.click(buttons.children[0])
	expect(mockHistoryPush).toHaveBeenCalledWith(`/watch/${videos[0].id}`)
})
