import { useBlockProps } from '@wordpress/block-editor'

export default function save() {
	return (
		<div {...useBlockProps.save()}>
			{'Example Static block – hello from the saved content!'}
		</div>
	)
}
