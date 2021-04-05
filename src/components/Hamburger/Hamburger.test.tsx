import { render } from '@testing-library/react'
import Hamburger from './Hamburger'
import userEvent from '@testing-library/user-event'

test('component is firing onClick', () => {
	const onClickMock = jest.fn()

	const { container } = render(<Hamburger onClick={onClickMock} />)

	expect(container).toBeInTheDocument()

	userEvent.click(container.children[0])
	expect(onClickMock).toHaveBeenCalled()
})
