import { render } from '@testing-library/react'
import { videos } from '../../test-utils/data'
import userEvent from '@testing-library/user-event'
import VideoWatch from './VideoWatch'

test('video watch is focusable', () => {
	const focusUpMock = jest.fn()
	const focusDownMock = jest.fn()
	const focusRightMock = jest.fn()
	const focusLeftMock = jest.fn()

	render(
		<VideoWatch
			video={videos[0]}
			isFocused
			onFocusLeft={focusLeftMock}
			onFocusDown={focusDownMock}
			onFocusRight={focusRightMock}
			onFocusUp={focusUpMock}
		/>
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
