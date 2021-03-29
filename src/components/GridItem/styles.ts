import styled from 'styled-components'
import { colors } from '../../assets/styles/variables'

export const GridItemWrapper = styled.div`
	padding: 15px;
`

export const GridItemElement = styled.div`
	background: ${colors.white};
	border-radius: 7px;
	box-shadow: 14px 17px 23px rgba(0, 0, 0, 0.06);
	height: 100%;
	overflow: hidden;
`

export const GridItemImageWrapper = styled.figure`
	padding-top: 55%;
	position: relative;
`

export const GridItemImage = styled.img`
	height: 100%;
	object-fit: cover;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
`

export const GridItemContent = styled.div`
	padding: 20px;
`

export const GridItemTitle = styled.h3`
	color: ${colors.dark};
	font-size: 1.1rem;
	line-height: 1.3;
	margin-bottom: 10px;
	max-height: 44px;
	overflow: hidden;
`

export const GridItemSubtitle = styled.span`
	color: ${colors.lightGray};
`
