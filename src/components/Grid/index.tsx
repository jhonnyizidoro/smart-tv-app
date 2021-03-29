import { FC } from 'react'

import { GridWrapper, GridTitle, GridItems } from './styles'

interface GridProps {
	title: string
	rowSize: number
}

const Grid: FC<GridProps> = ({ title, rowSize, children }) => (
	<GridWrapper>
		<GridTitle>{title}</GridTitle>
		<GridItems rowSize={rowSize}>{children}</GridItems>
	</GridWrapper>
)

export default Grid
