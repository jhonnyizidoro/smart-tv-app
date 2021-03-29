import styled from 'styled-components'
import { colors } from '../../assets/styles/variables'

export const SectionTitleElement = styled.h2`
	color: ${colors.lightBlue};
	font-size: 1.2rem;
	padding-left: 30px;
	position: relative;

	&::before {
		background: ${colors.blue};
		border-radius: 50%;
		content: '';
		display: block;
		height: 8px;
		left: 15px;
		position: absolute;
		top: 4px;
		width: 8px;
	}
`
