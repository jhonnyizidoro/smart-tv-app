import { FC } from 'react'

import SectionTitle from '../SectionTitle'

import { ListWrapper, ListItems } from './styles'

interface ListProps {
	title: string
}

const List: FC<ListProps> = ({ title, children }) => (
	<ListWrapper>
		<SectionTitle>{title}</SectionTitle>
		<ListItems>{children}</ListItems>
	</ListWrapper>
)

export default List
