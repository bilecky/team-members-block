import React from 'react'
import { MailAtSign01Icon, SmartPhone04Icon } from 'hugeicons-react'

const TeamMembers = props => {
	return (
		<div className='team-members-grid'>
			{props.members.map(member => (
				<div key={member.id} className='member-card'>
					<div className='member-image-wrapper'>
						<img
							src={member.meta.avatar}
							alt={member.title.rendered}
							className='member-avatar'
						/>
						<div className='member-overlay'>
							<h2 className='member-name'>{member.title.rendered}</h2>
							<p className='member-position'>{member.meta.position}</p>
						</div>
					</div>
					<div className='member-details'>
						<p className='member-bio'>{member.meta.biography}</p>
						<a href={`mailto:${member.meta.email}`} className='member-contact'>
							<MailAtSign01Icon size={22} className='icon-email' />
							<span>{member.meta.email}</span>
						</a>
						<a href={`tel:${member.meta.phone}`} className='member-contact'>
							<SmartPhone04Icon size={22} className='icon-phone' />
							<span>{member.meta.phone}</span>
						</a>
					</div>
				</div>
			))}
		</div>
	)
}

export default TeamMembers
