import styled from 'styled-components'
import { colors } from '../../assets/styles/variables'

export const ListItemWrapper = styled.div`
	padding: 15px;
`

export const ListItemElement = styled.li`
	align-items: center;
	background: ${colors.white};
	border-radius: 7px;
	box-shadow: 14px 17px 23px rgba(0, 0, 0, 0.06);
	display: flex;
	padding: 20px;
`

export const ListItemImage = styled.img`
	border-radius: 7px;
	height: 70px;
	margin-right: 15px;
`

export const ListItemContent = styled.div``

export const ListItemTitle = styled.h3`
	color: ${colors.dark};
	line-height: 1.3;
	margin-bottom: 5px;
	max-height: 40px;
	overflow: hidden;
`

export const ListItemSubtitle = styled.span`
	color: ${colors.lightGray};
	font-size: 0.9rem;
`
