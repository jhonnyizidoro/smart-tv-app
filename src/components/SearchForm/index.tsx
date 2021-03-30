import { FC, FormEvent, useCallback, useEffect, useRef } from 'react'
import Keyboard from 'react-simple-keyboard'

import 'react-simple-keyboard/build/css/index.css'
import './styles.scss'

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

const SearchForm: FC<Navegateble> = ({ isFocused, onFocusDown, onFocusLeft }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const formRef = useRef<HTMLFormElement>(null)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isFocused) {
				return
			}

			switch (event.code) {
				case 'ArrowDown':
					if (onFocusDown) {
						onFocusDown()
					}
					break
				case 'ArrowLeft':
					if (onFocusLeft && !inputRef.current?.value) {
						onFocusLeft()
					}
					break
				default:
					break
			}
		},
		[isFocused, onFocusDown, onFocusLeft]
	)

	const handleKeyboardInput = useCallback((input: string) => {
		if (inputRef.current) {
			inputRef.current.value = input
		}
	}, [])

	const handleSubmit = useCallback((event: FormEvent | null = null) => {
		if (event) {
			event.preventDefault()
		}
		if (inputRef.current) {
			console.log(inputRef.current.value)
		}
	}, [])

	const handleKeyboardKeyPress = useCallback(
		(key: string) => {
			if (key === '{enter}' && formRef.current) {
				handleSubmit()
			}
		},
		[handleSubmit]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<>
			<form className="search-form" ref={formRef} onSubmit={handleSubmit}>
				<input
					type="text"
					name="query"
					ref={inputRef}
					placeholder="Pesquisar vídeos"
					aria-label="Insira os termos de busca"
					className={`search-form__input ${
						isFocused ? 'search-form__input--focused' : 'search-form__input--collapsed'
					}`}
				/>
				<div className="search-form__icon__wrapper">
					<SearchIcon width={25} height={25} className="search-form__icon" />
				</div>
			</form>

			{isFocused && (
				<div className="search-form__keyboard">
					<Keyboard onChange={handleKeyboardInput} onKeyPress={handleKeyboardKeyPress} />
				</div>
			)}
		</>
	)
}

export default SearchForm
