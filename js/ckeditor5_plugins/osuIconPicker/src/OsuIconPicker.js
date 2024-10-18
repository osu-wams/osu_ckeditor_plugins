import OsuIconPickerEditing from './OsuIconPickerEditing';
import OsuIconPickerUI from './OsuIconPickerUI';
import { Plugin } from 'ckeditor5/src/core';

export default class OsuIcons extends Plugin {
  static get requires() {
    return [OsuIconPickerEditing, OsuIconPickerUI];
  }
}
