import { FC } from 'react'

import SectionTitle from '../SectionTitle'

interface ListProps {
	title: string
}

const List: FC<ListProps> = ({ title, children }) => (
	<div className="list">
		<SectionTitle>{title}</SectionTitle>
		<ul className="list__items">{children}</ul>
	</div>
)

export default List
