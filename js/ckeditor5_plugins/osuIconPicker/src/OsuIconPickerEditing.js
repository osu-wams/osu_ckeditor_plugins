import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';

export default class OsuIconPickerEditing extends Plugin {
  init() {
    const editor = this.editor;

    // Define the icon model element with class, size, and color attributes
    editor.model.schema.extend('icon', {
      allowWhere: '$block',
      allowAttributes: ['class', 'size', 'color'],
    });

    // Upcast (from view to model)
    editor.conversion.for('upcast').elementToElement({
      model: 'osuIcon',
      view: 'i',  // <i> element for the icon
    });

    // Downcast (from model to view)
    editor.conversion.for('downcast').elementToElement({
      model: 'osuIcon',
      view: (modelElement, { writer }) => {
        const iconClass = modelElement.getAttribute('class');
        const sizeClass = modelElement.getAttribute('size');
        const colorClass = modelElement.getAttribute('color');

        // Create the <i> element with the appropriate classes
        const iElement = writer.createContainerElement('i', {
          class: `${iconClass} ${sizeClass} ${colorClass}`,
        });

        return toWidget(iElement, writer);
      },
    });
  }
}
