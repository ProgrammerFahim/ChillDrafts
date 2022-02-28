import React from 'react';
import { RichUtils } from 'draft-js';

export default function Italic(props) {
    const { editorState, onChange } = props;

    const _onItalicClick = (e) => {
        e.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };

    const _isItalic = () => {
        const currentStyles = editorState.getCurrentInlineStyle();

        if (currentStyles.has('ITALIC')) {
            return 'toolbar-binary-option-active';
        }

        return '';
    };

    return (
        <div
            onMouseDown={_onItalicClick}
            className={"toolbar-option toolbar-binary-option italic " + _isItalic()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M384 64.01c0 17.69-14.31 32-32 32h-58.67l-133.3 320H224c17.69 0 32 14.31 32 32s-14.31 32-32 32H32c-17.69 0-32-14.31-32-32s14.31-32 32-32h58.67l133.3-320H160c-17.69 0-32-14.31-32-32s14.31-32 32-32h192C369.7 32.01 384 46.33 384 64.01z"/>
            </svg>
        </div>
    );
}
