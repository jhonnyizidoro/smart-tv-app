import { createGlobalStyle, css } from 'styled-components'
import resetCSS from 'styled-reset'
import { colors, fonts } from './variables'

import ProximaNovaRegular from '../fonts/ProximaNova-Regular.ttf'
import ProximaNovaBold from '../fonts/ProximaNova-Bold.ttf'

const getBodyBackgroundColor = ({ darkMode }: DarkMode) => {
	if (darkMode) {
		return css`
			background: ${colors.dark};
		`
	} else {
		return css`
			background: ${colors.light};
		`
	}
}

const GlobalStyles = createGlobalStyle<DarkMode>`
  ${resetCSS};

  @font-face {
    font-family: 'Proxima Nova';
    src: url('${ProximaNovaRegular}');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('${ProximaNovaBold}');
    font-weight: 700;
  }

  body {
    ${getBodyBackgroundColor};
  }

  body,
  input,
  button {
    font-family: 'Proxima Nova', sans-serif;
    font-size: 16px;
    font-weight: ${fonts.regular};
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyles
