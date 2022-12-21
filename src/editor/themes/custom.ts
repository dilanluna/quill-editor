// @ts-expect-error
import BaseTheme from 'quill/themes/base';
import Quill, { QuillOptionsStatic } from 'quill';
import icons from '../ui/icons';
import resizeIcon from '../assets/icons/resize.svg?raw';
import dropdownIcon from '../assets/icons/dropdown.svg?raw';

const TOOLBAR_CONFIG = [
  [{ header: [1, 2, 3, 4, 5, 6] }],
  ['bold', 'italic', 'formula'],
  [
    { align: '' }, // left
    { align: 'center' },
    { align: 'right' },
    { align: 'justify' },
  ],
  [{ indent: '-1' }, { indent: '+1' }],
];

export default class CustomTheme extends BaseTheme {
  constructor(
    private readonly quill: Quill & { container: Element },
    private readonly options: QuillOptionsStatic,
  ) {
    if (options.modules && !options.modules.toolbar?.container) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }

    super(quill, options);
    this.quill.container.classList.add('ql-custom');
    this.extendStatusbar();
  }

  extendToolbar(toolbar: { container: Element }) {
    toolbar.container.classList.add('ql-custom');
    // @ts-expect-error
    this.buildButtons(toolbar.container.querySelectorAll('button'), icons);
    // @ts-expect-error
    this.buildPickers(
      Array.from(toolbar.container.querySelectorAll('select')),
      icons,
    );

    // use custom arrow icon
    toolbar.container.querySelectorAll('.ql-picker-label').forEach((label) => {
      if (
        label.parentElement?.classList.contains('ql-color-picker') ||
        label.parentElement?.classList.contains('ql-align')
      ) {
        label.innerHTML += dropdownIcon;
        return;
      }

      label.innerHTML = dropdownIcon;
    });
  }

  private extendStatusbar() {
    // add statusbar
    const statusbarInner = document.createElement('div');
    statusbarInner.classList.add('ql-statusbar-inner');
    const statusbar: Element = this.quill.addContainer('ql-statusbar');
    statusbar.appendChild(statusbarInner);

    // add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('ql-statusbar-resize');
    resizeHandle.innerHTML = resizeIcon;
    resizeHandle.addEventListener('click', () => {
      const editor = this.quill.container.querySelector('.ql-editor');

      if (editor === null) {
        throw new Error('Editor not found');
      }

      const currentEditorHeight = editor.clientHeight;
      editor.setAttribute('style', `height:${currentEditorHeight + 10}px`);
    });
    statusbar.appendChild(resizeHandle);
  }
}
