import { FC } from 'react'
import { useGlobalContext } from '../../contexts/global'

import './PageTitle.scss'

const PageTitle: FC = ({ children }) => {
	const { darkMode } = useGlobalContext()

	return (
		<h1 className={`page-title page-title--${darkMode ? 'dark' : 'light'}`}>
			{children}
		</h1>
	)
}

export default PageTitle
