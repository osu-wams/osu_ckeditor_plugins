import { Plugin } from 'ckeditor5/src/core';
import { toWidget } from 'ckeditor5/src/widget';

export default class OsuIconPickerEditing extends Plugin {
  init() {
    const editor = this.editor;

    // Define the icon model element with class, size, and color attributes
    editor.model.schema.extend('icon', {
      allowWhere: '$block',
      allowAttributes: ['class', 'size', 'color']
    });

    // Upcast (from view to model)
    editor.conversion.for('upcast').elementToElement({
      model: 'icon',
      view: 'span',  // Now using <span> element for the icon
    });

    // Downcast (from model to view)
    editor.conversion.for('downcast').elementToElement({
      model: 'icon',
      view: (modelElement, { writer }) => {
        const iconClass = modelElement.getAttribute('class');
        const sizeClass = modelElement.getAttribute('size');
        const colorClass = modelElement.getAttribute('color');

        // Create the <span> element with the appropriate classes
        const spanElement = writer.createContainerElement('span', {
          class: `${iconClass} ${sizeClass} ${colorClass}`,
        });

        return toWidget(spanElement, writer);
      }
    });
  }
}
