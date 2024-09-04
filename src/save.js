import { useBlockProps } from '@wordpress/block-editor'
import TeamMembers from './TeamMembers'

export default function save({ attributes }) {
	console.log(attributes)

	return (
		<div {...useBlockProps.save()}>
			<TeamMembers members={attributes.teamMembers} />
		</div>
	)
}
