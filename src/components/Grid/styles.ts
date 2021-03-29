import styled from 'styled-components'

interface GrisItemsStyles {
	rowSize: number
}

export const GridWrapper = styled.section``

export const GridTitle = styled.h2``

export const GridItems = styled.div<GrisItemsStyles>`
	display: flex;
	flex-wrap: wrap;
	> div {
		width: ${({ rowSize }) => 100 / rowSize}%;
	}
`
