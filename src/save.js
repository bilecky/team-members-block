import { useBlockProps } from '@wordpress/block-editor'
import TeamMembers from './TeamMembers'

export default function save({ attributes }) {
	const { headerColor, headerSize, positionColor, positionSize, teamMembers } = attributes

	return (
		<div {...useBlockProps.save()}>
			<TeamMembers
				customStyles={{ headerColor, headerSize, positionColor, positionSize }}
				members={teamMembers}
			/>
		</div>
	)
}
