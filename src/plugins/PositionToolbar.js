import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class PositionToolbar extends Plugin {

	constructor(editor) {
		super(editor);
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'PositionToolbar';
	}

	init() {
		const editor = this.editor;
		editor.on('inlineReady', function () {
			const customPosition = editor.config['_config'].customPosition;
			if (customPosition && customPosition.targetId) {
				const targetElement = document.getElementById( customPosition.targetId);
				if (!targetElement) {
					return;
				}
				const toolbarElement = editor.ui.view.toolbar.element;
				const editorHtml = editor.ui.view.editable.element;
				toolbarElement.style.display = 'none';

				targetElement.append(toolbarElement);
				$(editorHtml).on('blur', function () {
					toolbarElement.style.display = 'none'
				});

				$(editorHtml).on('focus', function () {
					toolbarElement.style.display = 'block'
				});
			}

		})
	}
}
