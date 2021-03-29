import { ButtonHTMLAttributes, FC } from 'react'
import './styles.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isBlue: boolean
}

const Button: FC<ButtonProps> = ({ isBlue, ...otherProps }) => (
	<button
		className={`button ${isBlue ? 'button--blue' : 'button--white'}`}
		{...otherProps}
	/>
)

export default Button
