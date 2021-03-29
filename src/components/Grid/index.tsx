import { FC } from 'react'
import './styles.scss'

import SectionTitle from '../SectionTitle'

interface GridProps {
	title: string
}

const Grid: FC<GridProps> = ({ title, children }) => (
	<div className="grid">
		<SectionTitle>{title}</SectionTitle>
		<div className="grid__items">{children}</div>
	</div>
)

export default Grid
