import { useState } from "react";
import MonacoEditor from 'react-monaco-editor';

const Editor = () => {
    const [code, setCode] = useState('');
    const options = {
        selectOnLineNumbers: true,
        autoIndent: true
    };

    const handleChange = (newValue, e) => {
        console.log('new Value', JSON.stringify(newValue));
        setCode(newValue);
    }

    const editorDidMount = (editor, monaco) => {
        editor.focus();
    }

    return (
        <MonacoEditor
        width="800"
        height="600"
        language="python"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={handleChange}
        editorDidMount={editorDidMount}
      />
    );
}

export default Editor;