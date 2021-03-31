import { FC } from 'react'

import './styles.scss'

interface HamburgerProps {
	onClick: () => void
}

const Hamburger: FC<HamburgerProps> = ({ onClick }) => (
	<div className="hamburger" onClick={onClick}>
		<div className="hamburger__top" />
		<div className="hamburger__center" />
		<div className="hamburger__bottom" />
	</div>
)

export default Hamburger
