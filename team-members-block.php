<?php

/**
 * Plugin Name:       Team Members Block
 * Plugin URI:        https://github.com/bilecky/team-members-block
 * Description:       Wyswietlanie czlonkow Hubry. Stworzone przez bilecky na potrzeby HUBRA
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

	register_post_meta('team_member', 'stanowisko', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta('team_member', 'krotka_biografia', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta('team_member', 'email', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta('team_member', 'telefon', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
}
add_action('init', 'register_team_member_post_type');

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

function team_member_meta_box_callback($post)
{
	wp_nonce_field(basename(__FILE__), 'team_member_nonce');

	$stanowisko = get_post_meta($post->ID, 'stanowisko', true);
	$krotka_biografia = get_post_meta($post->ID, 'krotka_biografia', true);
	$email = get_post_meta($post->ID, 'email', true);
	$telefon = get_post_meta($post->ID, 'telefon', true);

	echo '<p><label for="stanowisko">Stanowisko</label>';
	echo '<input type="text" id="stanowisko" name="stanowisko" value="' . esc_attr($stanowisko) . '" /></p>';

	echo '<p><label for="krotka_biografia">Krótka Biografia</label>';
	echo '<textarea id="krotka_biografia" name="krotka_biografia">' . esc_textarea($krotka_biografia) . '</textarea></p>';

	echo '<p><label for="email">Email</label>';
	echo '<input type="email" id="email" name="email" value="' . esc_attr($email) . '" /></p>';

	echo '<p><label for="telefon">Telefon</label>';
	echo '<input type="text" id="telefon" name="telefon" value="' . esc_attr($telefon) . '" /></p>';
}


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

	$fields = ['stanowisko', 'krotka_biografia', 'email', 'telefon'];
	foreach ($fields as $field) {
		if (array_key_exists($field, $_POST)) {
			update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
		}
	}
}
add_action('save_post', 'save_team_member_meta');


function add_meta_fields_to_rest_api($response, $post, $context)
{
	if ($post->post_type === 'team_member') {
		$thumbnail_id = get_post_thumbnail_id($post->ID);
		// Pobierz URL miniaturki
		$thumbnail_url = wp_get_attachment_image_url($thumbnail_id, 'medium');


		$meta_fields = array(
			'stanowisko' => get_post_meta($post->ID, 'stanowisko', true),
			'krotka_biografia' => get_post_meta($post->ID, 'krotka_biografia', true),
			'email' => get_post_meta($post->ID, 'email', true),
			'telefon' => get_post_meta($post->ID, 'telefon', true),
			'avatar' => $thumbnail_url,  // Dodaj URL miniaturki

		);
		$response->data['meta'] = $meta_fields;
	}
	return $response;
}
add_filter('rest_prepare_team_member', 'add_meta_fields_to_rest_api', 10, 3);
