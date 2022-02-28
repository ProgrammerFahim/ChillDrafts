import React, { useState } from 'react';
import { EditorState } from 'draft-js';

import Input from './Input/Input';
import Toolbar from './Toolbar/Toolbar';
import { fontSizeStyleMap } from './fontSizeStyleMap';
import { fontFamilyStyleMap } from './fontFamilyStyleMap';

export default function ChillEditor(props) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [customStyleMap, setCustomStyleMap] = useState({
        ...fontSizeStyleMap,
        ...fontFamilyStyleMap,
    });

    const onEditorStateChange = (nextEditorState) => {
        setEditorState(nextEditorState);
    };

    return (
        <div
            className="editor-window"
            style={{
                backgroundImage: `url(${props.bgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom'
            }}
        >
            <div className="editor-toolbar">
                <Toolbar
                    editorState={editorState}
                    onChange={onEditorStateChange}
                />
            </div>
            <Input
                editorState={editorState}
                onChange={onEditorStateChange}
                customStyleMap={customStyleMap}
            />
        </div>
    );
}
