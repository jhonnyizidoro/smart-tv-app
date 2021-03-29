import { FC } from 'react'

import { useGlobalContext } from '../../contexts/global'

import './styles.scss'

const Checkbox: FC = () => {
	const { darkMode } = useGlobalContext()

	return (
		<div className={`checkbox ${darkMode ? 'checkbox--on' : 'checkbox--off'}`}>
			<div
				className={`checkbox__bullet ${
					darkMode ? 'checkbox__bullet--on' : 'checkbox__bullet--off'
				}`}
			/>
		</div>
	)
}

export default Checkbox
