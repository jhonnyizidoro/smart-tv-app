import { render } from '@testing-library/react'
import { GlobalProvider } from '../../contexts/global'

import Checkbox from './Checkbox'

test('checkbox will change the dark mode', () => {
	const { container } = render(<Checkbox />, { wrapper: GlobalProvider })
	expect(container).toBeInTheDocument()
})
