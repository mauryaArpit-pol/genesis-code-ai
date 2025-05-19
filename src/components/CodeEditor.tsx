
import { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  onEditorReady?: () => void;
  className?: string;
}

const CodeEditor = ({
  defaultLanguage = 'javascript',
  defaultValue = '// Write your code here\nconsole.log("Hello, world!");',
  onChange,
  onEditorReady,
  className,
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
    
    if (onEditorReady) {
      onEditorReady();
    }
    
    // Focus the editor
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn('editor-container', className)}>
      <Editor
        height="100%"
        width="100%"
        language={defaultLanguage}
        value={defaultValue}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          automaticLayout: true,
          fontFamily: 'JetBrains Mono, monospace, Monaco, Consolas, "Courier New"',
          suggestOnTriggerCharacters: true,
          tabSize: 2,
          wordWrap: 'on',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
        }}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
