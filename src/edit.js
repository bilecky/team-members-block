import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { Spinner } from '@wordpress/components'
import TeamMembers from './TeamMembers'
import { useEffect } from '@wordpress/element'

export default function Edit({ setAttributes }) {
	const blockProps = useBlockProps()

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
			<TeamMembers members={teamMembers} />
		</div>
	)
}
