import pretty from 'pretty';
import { useState } from 'react';
import Editor from './editor';
import './main.css';

export default function App() {
  const [editorContent, setEditorContent] = useState('');

  return (
    <div className="container">
      <Editor
        // theme="snow"
        theme="custom"
        placeholder="type here..."
        onChange={setEditorContent}
        modules={{
          counter: {
            unit: 'word',
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [
              { font: [] },
              { size: ['small', false, 'large', 'huge'] },
              { header: [false, 1, 2, 3, 4, 5, 6] },
            ],
            // [{ align: [] }],
            [
              { align: '' },
              { align: 'center' },
              { align: 'right' },
              { align: 'justify' },
            ],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ color: [] }, { background: [] }, 'capitalization', 'clean'],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code'],
            ['image', 'video', 'link', 'code-block'],
            [{ direction: 'rtl' }],
          ],
        }}
      />

      <h2 className="header">HTML</h2>
      <pre className="html">{pretty(editorContent)}</pre>
    </div>
  );
}
