import { FC } from 'react'

import SectionTitle from '../SectionTitle'

import { GridWrapper, GridItems } from './styles'

interface GridProps {
	title: string
	rowSize: number
}

const Grid: FC<GridProps> = ({ title, rowSize, children }) => (
	<GridWrapper>
		<SectionTitle>{title}</SectionTitle>
		<GridItems rowSize={rowSize}>{children}</GridItems>
	</GridWrapper>
)

export default Grid
