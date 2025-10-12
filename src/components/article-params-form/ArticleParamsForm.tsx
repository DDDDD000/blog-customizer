import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import React, { useEffect, useState } from 'react';
import {
	ArticleState,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { Spacing } from '../spacing/Spacing';

type ArticleParamsFormProps = {
	articleState: ArticleState;
	onApply: (newState: ArticleState) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [localDraft, setLocalDraft] = useState(articleState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleChange = (fieldName: keyof ArticleState, value: OptionType) => {
		setLocalDraft((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	useEffect(() => {
		setLocalDraft(articleState);
	}, [articleState]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						onApply(localDraft);
					}}
					onReset={(event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						setLocalDraft(defaultArticleState);
						onApply(defaultArticleState);
					}}>
					<div>
						<Text
							as={'h2'}
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase
							family='open-sans'>
							Задайте параметры
						</Text>
						<Spacing size={50} />
						<Select
							selected={localDraft.fontFamilyOption}
							options={fontFamilyOptions}
							placeholder='Open Sans'
							title='шрифт'
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
						<Spacing size={50} />
						<RadioGroup
							selected={localDraft.fontSizeOption}
							options={fontSizeOptions}
							name='fontSizeRadioGroup'
							title='Размер шрифта'
							onChange={(option) => handleChange('fontSizeOption', option)}
						/>
						<Spacing size={50} />
						<Select
							selected={localDraft.fontColor}
							options={fontColors}
							placeholder='Черный'
							title='Цвет шрифта'
							onChange={(option) => handleChange('fontColor', option)}
						/>
						<Spacing size={50} />
						<Separator />
						<Spacing size={50} />
						<Select
							selected={localDraft.backgroundColor}
							options={backgroundColors}
							placeholder='Белый'
							title='Цвет фона'
							onChange={(option) => handleChange('backgroundColor', option)}
						/>
						<Spacing size={50} />
						<Select
							selected={localDraft.contentWidth}
							options={contentWidthArr}
							placeholder='Белый'
							title='Ширина контента'
							onChange={(option) => handleChange('contentWidth', option)}
						/>
						<Spacing size={207} />
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
