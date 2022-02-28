import React, { useEffect, useRef } from 'react';
import { Editor, RichUtils } from 'draft-js';

export default function Input(props) {
    const { editorState, onChange, customStyleMap } = props;
    const editorRef = useRef();

    useEffect(() => {
        editorRef.current.focus();
    }, []);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const inputClick = (e) => {
        e.preventDefault();
        editorRef.current.focus();
    };

    return (
        <div
            onMouseDown={inputClick}
            className="editor-input"
        >
            <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                customStyleMap={customStyleMap}
                ref={editorRef}
            />
        </div>
    );
}
