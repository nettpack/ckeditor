import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from './images/source.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './styles/Source.less';
import beatifuly from 'js-beautify';
import ace from 'brace'
import 'brace/mode/html'
import 'brace/theme/monokai'

export default class Source extends Plugin {

	constructor(editor) {
		super(editor);
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Source';
	}

	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add( 'source', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Source',
				icon: imageIcon,
				tooltip: true
			} );

			view.on( 'execute', () => {
				const editingTarget =  editor.ui.view.editable.element;
				const parentTarget = editingTarget.parentElement;
				const modalWrapped = document.createElement('div');
				modalWrapped.classList.add("ck-source-dialog");
				const modalContent = document.createElement('div');
				modalContent.classList.add("ck-source-dialog-content");
				const contentHeader = document.createElement('div');
				contentHeader.classList.add("ck-source-dialog-header");
				const contentBody = document.createElement('div');
				contentBody.classList.add("ck-source-dialog-body");
				const contentFooter = document.createElement('div');
				contentFooter.classList.add("ck-source-dialog-footer");
				const close = document.createElement('span');
				close.classList.add("ck-source-dialog-close");
				close.innerHTML = '&times;';
				contentHeader.append(close);

				close.addEventListener("click", function (event) {
					modalWrapped.remove();
				});

				const title = document.createElement('h2');
				title.innerHTML = 'Source Dialog';
				contentHeader.append(title);

				const saveButton = document.createElement('button');
				saveButton.innerText = 'Done';
				contentFooter.append(saveButton);

				const area = document.createElement('textarea');
				parentTarget.append( modalWrapped );
				area.innerHTML = editor.getData();

				contentBody.append(area);

				let blockForEditor = document.createElement('div');
				blockForEditor.classList.add('ace-Editor');

				modalContent.append(contentHeader);
				modalContent.append(contentBody);
				modalContent.append(contentFooter);

				modalWrapped.append(modalContent);
				area.parentElement.append(blockForEditor)

				let aceEditor = ace.edit(blockForEditor, {
					mode: 'ace/mode/html',
					theme: 'ace/theme/monokai',
					minLines: 50,
					maxLines: 50,
					fontSize: '16px',
					wrap: true,
					useSoftTabs: true,
					tabSize: 2,
				});

				aceEditor.$blockScrolling = Infinity;
				aceEditor.commands.removeCommand('find');
				aceEditor.getSession().setValue(beatifuly.html(area.value));
				aceEditor.getSession().on('change', function(){
					area.value = aceEditor.getSession().getValue();
				});
				saveButton.addEventListener("click", function (event) {
					editor.setData(area.value);
					modalWrapped.remove();
				});

				area.style.display = 'none';
			} );

			return view;
		});
	}
}
