import { render, screen } from '@testing-library/react'
import { videos } from '../../test-utils/data'

import GridItem from './GridItem'
import userEvent from '@testing-library/user-event'

test('grid item is rendered', () => {
	const onItemSelectMock = jest.fn()

	const { container } = render(
		<GridItem video={videos[0]} isFocused size="quarter" onClick={onItemSelectMock} />
	)

	expect(container).toBeInTheDocument()
})

test('grid item navigations', () => {
	const onItemSelectMock = jest.fn()

	const { container } = render(
		<GridItem video={videos[0]} isFocused size="quarter" onClick={onItemSelectMock} />
	)

	userEvent.click(container.children[0])
	expect(onItemSelectMock).toHaveBeenCalledWith(videos[0])
})
