import { registerBlockType } from '@wordpress/blocks'
import Edit from './edit'
import save from './save'
import metadata from './block.json'
import './style.scss'

const calendarIcon = (
	<svg
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		aria-hidden='true'
		focusable='false'
	>
		<path d='M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z'></path>
	</svg>
)

registerBlockType(metadata.name, {
	icon: calendarIcon,
	edit: Edit,
	save,
})
