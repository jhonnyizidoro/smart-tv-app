import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../../contexts/global'

import Navegateble from '../Navegateble'

import './ReturnLink.scss'

import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg'

const ReturnLink: FC<Focusable> = ({
	isFocused,
	onFocusDown,
	onFocusUp,
	onFocusRight,
	onFocusLeft,
}) => {
	const { goBack } = useHistory()
	const { darkMode } = useGlobalContext()

	return (
		<Navegateble
			isNavegateble={isFocused}
			onEnterPress={goBack}
			onUpArrowPress={onFocusUp}
			onDownArrowPress={onFocusDown}
			onLeftArrowPress={onFocusLeft}
			onRightArrowPress={onFocusRight}
		>
			<div
				className={`return-link ${isFocused && 'return-link--focused'} return-link--${
					darkMode ? 'dark' : 'light'
				}`}
				onClick={goBack}
			>
				<ArrowLeftIcon
					height={25}
					width={25}
					className={`return-link__icon ${isFocused && 'return-link__icon--focused'}`}
				/>
				Voltar
			</div>
		</Navegateble>
	)
}

export default ReturnLink
