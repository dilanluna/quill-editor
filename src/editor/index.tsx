import { useRef } from 'react';
import Quill, { QuillOptionsStatic } from 'quill';
import CustomTheme from './themes/custom';
import { CounterModule } from './modules/counter';
import {
  CapitalizationClass,
  CapitalizationStyle,
} from './formats/capitalization';
import './assets/custom/quill.custom.css';
import 'quill/dist/quill.snow.css';

Quill.register('themes/custom', CustomTheme);
Quill.register('modules/counter', CounterModule);
Quill.register('attributors/class/capitalization', CapitalizationClass);
Quill.register('attributors/style/capitalization', CapitalizationStyle);
Quill.register('formats/capitalization', CapitalizationClass);

type CounterModuleOptions = ConstructorParameters<typeof CounterModule>[1];

type EditorProps = QuillOptionsStatic & {
  onChange?: (text: string) => void;
  modules: {
    counter?: false | CounterModuleOptions;
  };
};

export default function Editor({ onChange, ...quillOptions }: EditorProps) {
  const editorInstance = useRef<Quill>();

  const handleChange = () => {
    if (!onChange) {
      return;
    }

    const content = editorInstance.current?.root.innerHTML ?? '';
    onChange(content);
  };

  const initEditor = (ref: HTMLDivElement | null) => {
    // ref is not set
    if (!ref) {
      return;
    }

    // editor has been initialized
    if (editorInstance.current) {
      return;
    }

    editorInstance.current = new Quill(ref, quillOptions);
    editorInstance.current.on('text-change', handleChange);
  };

  return (
    <div className="ql-wrapper">
      <div ref={initEditor} />
    </div>
  );
}
