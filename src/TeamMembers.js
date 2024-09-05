import React from 'react'
import { MailAtSign01Icon, SmartPhone04Icon } from 'hugeicons-react'
import defaultAvatar from './profile-boilerplate.jpg'

const TeamMembers = props => {
	console.log(props)
	return (
		<div className='team-members-grid'>
			{props.members.map(member => {
				const memberAvatar = member.meta.avatar ? member.meta.avatar : defaultAvatar
				return (
					<div key={member.id} className='member-card'>
						<div className='member-image-wrapper'>
							<img
								src={memberAvatar}
								alt={member.title.rendered}
								className='member-avatar'
							/>
							<div className='member-overlay'>
								<h2
									ref={node => {
										if (node) {
											node.style.setProperty(
												'color',
												`${props.customStyles.headerColor}`,
												'important'
											)
										}
									}}
									style={{
										fontSize: `${props.customStyles.headerSize}rem`, // Zakłada, że headerSize jest liczbą, która jest już w `rem`
									}}
									className='member-name'
								>
									{member.title.rendered}
								</h2>
								<p
									style={{
										color: props.customStyles.positionColor,
										fontSize: `${props.customStyles.positionSize}rem`,
									}}
									className='member-position'
								>
									{member.meta.position}
								</p>
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
				)
			})}
		</div>
	)
}

export default TeamMembers
