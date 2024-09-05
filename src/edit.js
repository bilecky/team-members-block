import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { Spinner } from '@wordpress/components'
import TeamMembers from './TeamMembers'
import { useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, ColorPalette } from '@wordpress/components'
import { InspectorControls } from '@wordpress/block-editor'

export default function Edit({ setAttributes, attributes }) {
	const blockProps = useBlockProps()
	const { headerColor, headerSize, positionColor, positionSize } = attributes

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
					<ColorPalette
						label='Kolor nagłówka'
						value={headerColor}
						onChange={color => setAttributes({ headerColor: color })}
					></ColorPalette>
				</PanelBody>
				<PanelBody title='Ustawienia stanowiska'>
					<ColorPalette
						label='Kolor stanowiska'
						value={positionColor}
						onChange={color => setAttributes({ positionColor: color })}
					/>
					<RangeControl
						label='Rozmiar stanowiska (REM)'
						value={positionSize}
						onChange={value => setAttributes({ positionSize: value })}
						min={1}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			<TeamMembers
				customStyles={{ headerColor, headerSize, positionColor, positionSize }}
				members={teamMembers}
			/>
		</div>
	)
}
