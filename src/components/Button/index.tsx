import { ButtonHTMLAttributes, FC, useCallback, useEffect } from 'react'

import './styles.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Navegateble {
	isBlue: boolean
	onEnterPress?: () => void
}

const Button: FC<ButtonProps> = ({ isBlue, isFocused, onEnterPress, ...otherProps }) => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.keyCode) {
				case 13:
					if (onEnterPress) {
						onEnterPress()
					}
					break
				default:
					break
			}
		},
		[isFocused, onEnterPress]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	let className
	if (isBlue) {
		className = isFocused ? 'button--blue' : 'button--blue-inverse'
	} else {
		className = isFocused ? 'button--white' : 'button--white-inverse'
	}

	return <button className={`button ${className}`} {...otherProps} />
}

export default Button
