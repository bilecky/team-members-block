<?php

/**
 * Render function for the block on the frontend.
 */

$team_members = get_posts(array(
	'post_type' => 'team_member',
	'numberposts' => -1,
	'meta_value' => '',
	'meta_compare' => 'EXISTS',
));

// Convert the team members data into a format that JavaScript can use
$members_data = array();
foreach ($team_members as $member) {
	$members_data[] = array(
		'id' => $member->ID,
		'title' => get_the_title($member->ID),
		'meta' => array(
			'stanowisko' => get_post_meta($member->ID, 'stanowisko', true),
			'krotka_biografia' => get_post_meta($member->ID, 'krotka_biografia', true),
			'email' => get_post_meta($member->ID, 'email', true),
			'telefon' => get_post_meta($member->ID, 'telefon', true),
		),
		'image' => get_the_post_thumbnail_url($member->ID, 'full'),
	);
}

// Output the block HTML with data embedded
?>
<div id="team-members-block" data-members='<?php echo esc_attr(json_encode($members_data)); ?>'></div>