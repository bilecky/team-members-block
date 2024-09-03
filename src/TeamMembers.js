import React from 'react'

const TeamMembers = props => {
	console.log(props)
	return (
		<div className='team-members-grid'>
			{props.members.map(member => (
				<div key={member.id} className='member-card'>
					<img src={member.meta.avatar} alt={member.title.rendered} />
					<div className='member-details'>
						<h3 className='member-name'>{member.title.rendered}</h3>
						<p className='member-position'>{member.meta.stanowisko}</p>
						<p className='member-bio'>{member.meta.krotka_biografia}</p>
						<p className='member-email'>{member.meta.email}</p>
						<p className='member-phone'>{member.meta.telefon}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default TeamMembers
