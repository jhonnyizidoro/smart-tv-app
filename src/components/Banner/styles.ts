import styled from 'styled-components'
import { colors, fonts } from '../../assets/styles/variables'

export const BannerWrapper = styled.div`
	border-radius: 0 0 35px 35px;
	margin: auto;
	overflow: hidden;
	padding-top: 42.3%;
	position: relative;
	width: calc(100vw - 40px);
`

export const BannerBackground = styled.iframe`
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 1;
`

export const BannerGradientOverlay = styled.div`
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.1),
		rgba(0, 0, 0, 0.45),
		rgba(0, 0, 0, 0.45),
		rgba(0, 0, 0, 0.1)
	);
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 2;
`

export const BannerContent = styled.div`
	left: 30px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 3;
`

export const BannerText = styled.div`
	color: ${colors.white};
	font-size: 1.1rem;
`

export const BannerTitle = styled.h1`
	color: ${colors.white};
	font-size: 2.5rem;
	font-weight: ${fonts.bold};
	margin: 15px 0;
	max-width: 600px;
	text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
`
