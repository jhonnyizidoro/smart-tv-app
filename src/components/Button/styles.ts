import styled, { css } from 'styled-components'
import { colors, fonts } from '../../assets/styles/variables'

interface ButtonStyles {
	isBlue: boolean
}

const getButtonStyles = ({ isBlue }: ButtonStyles) => {
	if (isBlue) {
		return css`
			background: ${colors.blue};
			color: ${colors.white};
		`
	} else {
		return css`
			background: ${colors.white};
			color: ${colors.blue};
		`
	}
}

export const ButtonElement = styled.button<ButtonStyles>`
	${getButtonStyles};
	border: 0;
	border-radius: 99px;
	font-weight: ${fonts.bold};
	outline: 0;
	padding: 7px 35px;
`
