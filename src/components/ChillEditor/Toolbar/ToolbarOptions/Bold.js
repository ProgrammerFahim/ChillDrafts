import React from 'react';
import { RichUtils } from 'draft-js';

export default function Bold(props) {
    const { editorState, onChange } = props;
    
    const _onBoldClick = (e) => {
        e.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const _isBold = () => {
        const currentStyles = editorState.getCurrentInlineStyle();

        if (currentStyles.has('BOLD')) {
            return 'toolbar-binary-option-active';
        }

        return '';
    };

    return (
        <div
            onMouseDown={_onBoldClick}
            className={"toolbar-option toolbar-binary-option bold " + _isBold()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M321.1 242.4C340.1 220.1 352 191.6 352 160c0-70.59-57.42-128-128-128L32 32.01c-17.67 0-32 14.31-32 32s14.33 32 32 32h16v320H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h224c70.58 0 128-57.41 128-128C384 305.3 358.6 264.8 321.1 242.4zM112 96.01H224c35.3 0 64 28.72 64 64s-28.7 64-64 64H112V96.01zM256 416H112v-128H256c35.3 0 64 28.71 64 63.1S291.3 416 256 416z"/>
            </svg>
        </div>
    );
}
