import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from './images/save.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class Save extends Plugin {

	constructor(editor) {
		super(editor);
		this.onSave = {};
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Save';
	}

	init() {
		const editor = this.editor;

		// editor.keystrokes.set( 'Ctrl+S', ( keyEvtData, cancel ) => {
		// 	if (typeof this.onSave !== 'function') {
		// 		alert('onSave event has not been set!');
		// 		return;
		// 	}
		// 	this.onSave(editor.getData(), editor);
		// 	cancel();
		// } );
		// editor.setKeystroke﻿([
		// 	[ CKEDITOR.CTRL + 83, 'save' ],
		// ]);

		editor.ui.componentFactory.add( 'save', locale => {
			const view = new ButtonView( locale );
			view.set( {
				label: 'Save',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				if (typeof this.onSave !== 'function') {
					alert('onSave event has not been set!');
					return;
				}
				this.onSave(this.editor.getData(), this.editor);
			} );

			return view;
		});
	}
}
