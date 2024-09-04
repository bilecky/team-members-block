<?php

/**
 * Plugin Name:       Team Members Plugin Block
 * Plugin URI:        https://github.com/bilecky/team-members-block
 * Description:       Wtyczka odpowiedzialna za mapowanie i wyświetlanie członków zespołu firmy Hubra w formie nowoczesnych kart. Stworzone przez bilecky na potrzeby HUBRA
 * Version:           0.1.0
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Author:            bilecky
 * Author URI:        https://pawelbilski.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       team-members-block
 *
 * @package           create-block
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_team_members_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_team_members_block_init');

//PLUGIN ADMIN STYLES
// ----------------------------------------------------


// function team_member_admin_styles()
// {
// 	wp_enqueue_style('team-member-admin-style', plugin_dir_url(__FILE__) . '/admin-style.css');
// }
// add_action('admin_enqueue_scripts', 'team_member_admin_styles');

// ----------------------------------------------------

function register_team_member_post_type()
{
	$args = array(
		'public'              => false,
		'publicly_queryable'  => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'query_var'           => false,
		'rewrite'             => false,
		'capability_type'     => 'post',
		'has_archive'         => false,
		'hierarchical'        => false,
		'menu_icon'           => 'dashicons-groups', // Dodano ikonę Dashicon
		'menu_position'       => null,
		'supports'            => array('title', 'thumbnail'),
		'show_in_rest'        => true,
		'labels'              => array(
			'name'               => 'Zespół',
			'singular_name'      => 'Członek Zespołu',
			'menu_name'          => 'Zespół',
			'add_new'            => 'Dodaj Nowego',
			'add_new_item'       => 'Dodaj Nowego Członka Zespołu',
			'edit_item'          => 'Edytuj Członka Zespołu',
			'new_item'           => 'Nowy Członek Zespołu',
			'view_item'          => 'Zobacz Członka Zespołu',
			'search_items'       => 'Szukaj Członków Zespołu',
			'not_found'          => 'Nie znaleziono Członków Zespołu',
			'not_found_in_trash' => 'Nie znaleziono Członków Zespołu w koszu'
		),
	);
	register_post_type('team_member', $args);

	register_post_meta('team_member', 'position', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta('team_member', 'biography', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta('team_member', 'email', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta('team_member', 'phone', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
}
add_action('init', 'register_team_member_post_type');

// ----------------------------------------------------


function team_member_add_meta_boxes()
{
	add_meta_box(
		'team_member_details',
		'Szczegóły Członka Zespołu',
		'team_member_meta_box_callback',
		'team_member',
		'normal',
		'high'
	);
}
add_action('add_meta_boxes', 'team_member_add_meta_boxes');

// ----------------------------------------------------
//CALBACK TO UPPER FUNC ^^

function team_member_meta_box_callback($post)
{
	wp_nonce_field(basename(__FILE__), 'team_member_nonce');

	$position = get_post_meta($post->ID, 'position', true);
	$biography = get_post_meta($post->ID, 'biography', true);
	$email = get_post_meta($post->ID, 'email', true);
	$phone = get_post_meta($post->ID, 'phone', true);
?>
	<div class="team-member-meta-box">
		<p>
			<label for="position">Stanowisko:</label>
			<input type="text" id="position" name="position" class="widefat" value="<?php echo esc_attr($position); ?>" />
		</p>
		<p>
			<label for="biography">Krótka Biografia:</label>
			<textarea id="biography" name="biography" class="widefat"><?php echo esc_textarea($biography); ?></textarea>
		</p>
		<p>
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" class="widefat" value="<?php echo esc_attr($email); ?>" />
		</p>
		<p>
			<label for="phone">Numer telefonu:</label>
			<input type="text" id="phone" name="phone" class="widefat" value="<?php echo esc_attr($phone); ?>" />
		</p>
	</div>
<?php
}

// ----------------------------------------------------


function save_team_member_meta($post_id)
{
	if (!isset($_POST['team_member_nonce']) || !wp_verify_nonce($_POST['team_member_nonce'], basename(__FILE__))) {
		return;
	}

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}

	if (!current_user_can('edit_post', $post_id)) {
		return;
	}

	$fields = ['position', 'biography', 'email', 'phone'];
	foreach ($fields as $field) {
		if (array_key_exists($field, $_POST)) {
			update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
		}
	}
}
add_action('save_post', 'save_team_member_meta');

// ----------------------------------------------------


function add_meta_fields_to_rest_api($response, $post, $context)
{
	if ($post->post_type === 'team_member') {
		$thumbnail_id = get_post_thumbnail_id($post->ID);
		// Pobierz URL miniaturki
		$thumbnail_url = wp_get_attachment_image_url($thumbnail_id, 'thumbnail');


		$meta_fields = array(
			'position' => get_post_meta($post->ID, 'position', true),
			'biography' => get_post_meta($post->ID, 'biography', true),
			'email' => get_post_meta($post->ID, 'email', true),
			'phone' => get_post_meta($post->ID, 'phone', true),
			'avatar' => $thumbnail_url,  // Dodaj URL miniaturki

		);
		$response->data['meta'] = $meta_fields;
	}
	return $response;
}
add_filter('rest_prepare_team_member', 'add_meta_fields_to_rest_api', 10, 3);

// ----------------------------------------------------
