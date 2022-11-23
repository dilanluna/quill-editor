import Quill from 'quill';

export class CounterModule {
  constructor(
    private readonly quill: Quill,
    private readonly options: { unit: string },
  ) {
    this.quill.on('text-change', this.handler.bind(this));
  }

  private handler() {
    const text = this.quill.getText();
    const words = this.format(this.count(text));
    this.render(words);
  }

  private render(words: string) {
    const statusbar = document.querySelector(
      '.ql-statusbar .ql-statusbar-inner',
    );

    if (statusbar === null) {
      throw Error('Statusbar not found');
    }

    let counter = statusbar.querySelector('.ql-counter');

    if (counter === null) {
      counter = document.createElement('span');
      counter.classList.add('ql-counter');
      statusbar.appendChild(counter);
    }

    counter.innerHTML = words;
  }

  private count(text: string) {
    const sanitized = text.trim();
    return sanitized.length > 0 ? sanitized.split(/\s+/).length : 0;
  }

  private format(words: number) {
    const suffixes = new Map([
      ['one', ''],
      ['other', 's'],
    ]);

    const plural = new Intl.PluralRules();
    const rule = plural.select(words);
    const suffix = suffixes.get(rule);

    return `${words} ${this.options.unit}${suffix}`;
  }
}
