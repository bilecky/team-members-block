import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { Spinner } from '@wordpress/components'
import TeamMembers from './TeamMembers'

export default function Edit() {
	const blockProps = useBlockProps()

	const teamMembers = useSelect(select => {
		return select('core').getEntityRecords('postType', 'team_member', {
			per_page: -1,
			_embed: true,
		})
	}, [])

	console.log(teamMembers)

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
			<TeamMembers members={teamMembers} />
		</div>
	)
}
