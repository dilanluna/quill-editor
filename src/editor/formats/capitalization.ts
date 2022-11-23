import Quill from 'quill';

const Parchment = Quill.import('parchment');

const config = {
  scope: Parchment.Scope.INLINE,
  whitelist: ['lowercase', 'uppercase', 'capitalize'],
};

const CapitalizationClass = new Parchment.Attributor.Class(
  'capitalization',
  'ql-capitalization',
  config,
);

const CapitalizationStyle = new Parchment.Attributor.Style(
  'capitalization',
  'text-transform',
  config,
);

export { CapitalizationClass, CapitalizationStyle };
