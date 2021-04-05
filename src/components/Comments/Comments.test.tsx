import { render } from '@testing-library/react'
import { comments } from '../../test-utils/data'

import Comments from './Comments'
import userEvent from '@testing-library/user-event'

test('comments navigation is working', () => {
	const focusUpMock = jest.fn()
	const focusRightMock = jest.fn()
	const focusLeftMock = jest.fn()

	render(
		<Comments
			comments={comments}
			isFocused
			onFocusUp={focusUpMock}
			onFocusRight={focusRightMock}
			onFocusLeft={focusLeftMock}
		/>
	)

	userEvent.keyboard('{ArrowUp}')
	expect(focusUpMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowDown}')
	userEvent.keyboard('{ArrowUp}')
	userEvent.keyboard('{ArrowUp}')
	expect(focusUpMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowRight}')
	expect(focusRightMock).toHaveBeenCalled()

	userEvent.keyboard('{ArrowLeft}')
	expect(focusLeftMock).toHaveBeenCalled()
})
