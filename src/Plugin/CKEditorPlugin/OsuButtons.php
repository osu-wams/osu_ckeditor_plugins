<?php

namespace Drupal\osu_ckeditor_plugins\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "osu_ckeditor_plugins" plugin.
 *
 * @CKEditorPlugin(
 *   id = "osu_ckeditor_plugins_osu_buttons",
 *   label = @Translation("osu_ckeditor_plugins"),
 *   module = "osu_ckeditor_plugins"
 * )
 */
class OsuButtons extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'osu_ckeditor_plugins') . '/js/plugins/osu_buttons/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $module_path = drupal_get_path('module', 'osu_ckeditor_plugins');
    return [
      'osu_buttons' => [
        'label' => $this->t('osu_buttons'),
        'image' => $module_path . '/js/plugins/osu_buttons/icons/osu_buttons.png',
      ]
    ];
  }

}
