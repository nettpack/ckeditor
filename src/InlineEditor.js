import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import {config, plugins} from './DefaultSettings';
export class InlineEditor extends InlineEditorBase {}

InlineEditor.builtinPlugins = plugins;
InlineEditor.defaultConfig = config;
