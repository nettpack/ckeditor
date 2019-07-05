import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import {config, plugins} from './DefaultSettings';
export class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = plugins;
ClassicEditor.defaultConfig = config;
