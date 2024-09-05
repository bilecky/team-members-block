import { useBlockProps } from '@wordpress/block-editor'
import TeamMembers from './TeamMembers'

export default function save({ attributes }) {
	const { headerColor, headerSize, generalColor, positionSize, teamMembers } = attributes

	return (
		<div {...useBlockProps.save()}>
			<TeamMembers
				customStyles={{ headerColor, headerSize, generalColor, positionSize }}
				members={teamMembers}
			/>
		</div>
	)
}
