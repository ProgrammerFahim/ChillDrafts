import React from 'react';

import Bold from './ToolbarOptions/Bold';
import Italic from './ToolbarOptions/Italic';
import Underline from './ToolbarOptions/Underline';
import UnorderedList from './ToolbarOptions/UnorderedList';
import OrderedList from './ToolbarOptions/OrderedList';
import FontSize from './ToolbarOptions/FontSize';
import FontFamily from './ToolbarOptions/FontFamily';

export default function Toolbar(props) {
    const { editorState, onChange } = props;

    return (
        <div className="toolbar-options-wrapper">
            <Bold editorState={editorState} onChange={onChange} />
            <Italic editorState={editorState} onChange={onChange} />
            <Underline editorState={editorState} onChange={onChange} />
            <FontFamily editorState={editorState} onChange={onChange} />
            <FontSize editorState={editorState} onChange={onChange} />
            <UnorderedList editorState={editorState} onChange={onChange} />
            <OrderedList editorState={editorState} onChange={onChange} />
        </div>
    );
}
