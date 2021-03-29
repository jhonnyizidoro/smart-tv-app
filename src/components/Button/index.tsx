import { ButtonHTMLAttributes, FC } from 'react'

import { ButtonElement } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isBlue: boolean
}

const Button: FC<ButtonProps> = props => <ButtonElement {...props} />

export default Button
