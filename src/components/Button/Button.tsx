import { ButtonHTMLAttributes, FC } from 'react'

import './Button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isBlue: boolean
}

const Button: FC<ButtonProps> = ({ isBlue, ...otherProps }) => (
	<button className={`button button--${isBlue ? 'blue' : 'white'}`} {...otherProps} />
)

export default Button
