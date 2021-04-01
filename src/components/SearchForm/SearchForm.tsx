import { FC, FormEvent, useCallback, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import Keyboard from '../Keyboard'

import './SearchForm.scss'

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg'

interface SearchFormProps extends Navegateble {
	onClick: () => void
}

const SearchForm: FC<SearchFormProps> = ({
	isFocused,
	onFocusDown,
	onClick,
	onFocusLeft,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const { push } = useHistory()

	const handleClose = useCallback(() => {
		if (onFocusDown) {
			onFocusDown()
		}
	}, [onFocusDown])

	const handleFocusLeft = useCallback(() => {
		if (onFocusLeft) {
			onFocusLeft()
		}
	}, [onFocusLeft])

	const handleSubmit = useCallback(
		(event: FormEvent | null = null) => {
			if (event) {
				event.preventDefault()
			}
			if (inputRef.current?.value) {
				push(`/search/${inputRef.current.value}`)
			}
		},
		[push]
	)

	const handleKeyboardKeyPress = useCallback(
		(input: string) => {
			const currentInputValue = inputRef.current?.value || ''

			switch (input) {
				case 'backspace':
					if (inputRef.current) {
						inputRef.current.value = currentInputValue.slice(0, -1)
					}
					break
				case 'enter':
					if (inputRef.current) {
						handleSubmit()
					}
					break
				default:
					if (inputRef.current) {
						inputRef.current.value = currentInputValue + input
					}
					break
			}
		},
		[handleSubmit]
	)

	useEffect(() => {
		if (isFocused) {
			window.scrollBy({
				left: 0,
				top: -window.innerHeight,
				behavior: 'smooth',
			})
		}
	}, [isFocused])

	return (
		<>
			<form
				className="search-form"
				ref={formRef}
				onSubmit={handleSubmit}
				onClick={onClick}
			>
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

				{isFocused && (
					<div
						className="search-form__close__icon__wrapper"
						onClick={event => {
							event.stopPropagation()
							handleClose()
						}}
					>
						<ArrowLeftIcon width={25} height={25} className="search-form__close__icon" />
					</div>
				)}
			</form>

			{isFocused && (
				<Keyboard
					isFocused
					onFocusDown={handleClose}
					onFocusLeft={handleFocusLeft}
					onKeyPress={handleKeyboardKeyPress}
				/>
			)}
		</>
	)
}

export default SearchForm
