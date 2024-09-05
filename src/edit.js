import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { Spinner } from '@wordpress/components'
import TeamMembers from './TeamMembers'
import { useEffect } from '@wordpress/element'
import {
	PanelBody,
	RangeControl,
	ColorPalette,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components'
import { InspectorControls } from '@wordpress/block-editor'

export default function Edit({ setAttributes, attributes }) {
	const blockProps = useBlockProps()
	const { headerColor, headerSize, generalColor, positionSize } = attributes

	const teamMembers = useSelect(select => {
		return select('core').getEntityRecords('postType', 'team_member', {
			per_page: -1,
			_embed: true,
		})
	}, [])

	useEffect(() => {
		if (teamMembers && teamMembers.length > 0) {
			setAttributes({ teamMembers })
		}
	}, [teamMembers])

	if (!teamMembers) {
		return (
			<p {...blockProps}>
				<Spinner />
			</p>
		)
	}

	if (teamMembers.length === 0) {
		return <p {...blockProps}>Nie znaleziono członków zespolu</p>
	}

	const resetHeaderSize = () => {
		setAttributes({ headerSize: 1.4 })
	}

	const resetPositionSize = () => {
		setAttributes({ positionSize: 1.1 })
	}

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title='Ustawienia nagłówka'>
					<RangeControl
						label='Rozmiar nagłówka (REM)'
						value={headerSize}
						onChange={value => setAttributes({ headerSize: value })}
						min={1}
						max={100}
					></RangeControl>
					<Button isSecondary onClick={resetHeaderSize}>
						Zresetuj rozmiar nagłówka
					</Button>
					<Divider />

					<ColorPalette
						label='Kolor nagłówka'
						value={headerColor}
						onChange={color => setAttributes({ headerColor: color })}
					></ColorPalette>
				</PanelBody>
				<PanelBody title='Ustawienia stanowiska'>
					<RangeControl
						label='Rozmiar stanowiska (REM)'
						value={positionSize}
						onChange={value => setAttributes({ positionSize: value })}
						min={1}
						max={100}
					></RangeControl>
					<Button isSecondary onClick={resetPositionSize}>
						Zresetuj rozmiar stanowiska
					</Button>
					<Divider />

					<ColorPalette
						label='Kolor stanowiska'
						value={generalColor}
						onChange={color => setAttributes({ generalColor: color })}
					></ColorPalette>
				</PanelBody>
			</InspectorControls>

			<TeamMembers
				customStyles={{ headerColor, headerSize, generalColor, positionSize }}
				members={teamMembers}
			/>
		</div>
	)
}
