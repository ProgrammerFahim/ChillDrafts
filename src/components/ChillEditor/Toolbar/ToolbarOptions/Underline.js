import React from 'react';
import { RichUtils } from 'draft-js';

export default function Underline(props) {
    const { editorState, onChange } = props;

    const _onUnderlineClick = (e) => {
        e.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    };

    const _isUnderlined = () => {
        const currentStyles = editorState.getCurrentInlineStyle();

        if (currentStyles.has('UNDERLINE')) {
            return 'toolbar-binary-option-active';
        }

        return '';
    };

    return (
        <div
            onMouseDown={_onUnderlineClick}
            className={"toolbar-option toolbar-binary-option underline " + _isUnderlined()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M416 448H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h384c17.69 0 32-14.31 32-32S433.7 448 416 448zM48 64.01H64v160c0 88.22 71.78 159.1 160 159.1s160-71.78 160-159.1v-160h16c17.69 0 32-14.32 32-32s-14.31-31.1-32-31.1l-96-.0049c-17.69 0-32 14.32-32 32s14.31 32 32 32H320v160c0 52.94-43.06 95.1-96 95.1S128 276.1 128 224v-160h16c17.69 0 32-14.31 32-32s-14.31-32-32-32l-96 .0049c-17.69 0-32 14.31-32 31.1S30.31 64.01 48 64.01z"/>
            </svg>
        </div>
    );
}