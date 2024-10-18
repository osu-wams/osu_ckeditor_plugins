import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/osu-icon-picker.svg';

export default class OsuIconPickerUI extends Plugin {
  init() {
    const editor = this.editor;

    // Add the button to the UI
    editor.ui.componentFactory.add('osuIconPicker', locale => {
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: 'Insert Icon',
        tooltip: true,
      });

      // Handle the button click
      buttonView.on('execute', () => {
        const iconName = prompt('Enter the icon name (e.g., "fa fa-user"):');

        // Create select lists for size and color
        const sizeOptions = ['icon-size-sm', 'icon-size-md', 'icon-size-lg'];
        const colorOptions = ['icon-color-default', 'icon-color-primary', 'icon-color-danger'];

        const selectedSize = prompt('Choose a size (sm, md, lg):', 'md');
        const selectedColor = prompt('Choose a color (default, primary, danger):', 'default');

        // Validate user input and convert to class names
        const sizeClass = sizeOptions.find(option => option.includes(selectedSize));
        const colorClass = colorOptions.find(option => option.includes(selectedColor));

        // Insert the icon into the editor
        editor.model.change(writer => {
          const iconElement = writer.createElement('icon', {
            class: iconName,
            size: sizeClass || 'icon-size-md',
            color: colorClass || 'icon-color-default',
          });

          editor.model.insertContent(iconElement);
        });
      });

      return buttonView;
    });
  }
}
