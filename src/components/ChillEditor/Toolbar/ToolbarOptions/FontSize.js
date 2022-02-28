import React, { useState, useEffect } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';

import { fontSizeStyleMap } from '../../fontSizeStyleMap';

export default function FontSize(props) {
    const { editorState, onChange } = props;
    const [ defaultFontSize, setDefaultFontSize ] = useState();
    const [ dropdown, setDropdown ] = useState(false);
    const FONT_SIZES = [8, 10, 12, 14, 16, 18, 24, 32, 40];

    useEffect(() => {
        const editorElm = document.getElementsByClassName('DraftEditor-root');
        if (editorElm && editorElm.length > 0) {
            const editorStyles = window.getComputedStyle(editorElm[0]);
            let presetFontSize = editorStyles.getPropertyValue('font-size');
            presetFontSize = presetFontSize.substring(0, presetFontSize.length - 2);
            setDefaultFontSize('FONT_' + presetFontSize);
        }
    }, []);

    const handleFontSize = (e, id) => {
        e.preventDefault();
        const selection = editorState.getSelection();

        const nextContentState = Object.keys(fontSizeStyleMap)
            .reduce((contentState, fontsize) => {
                return Modifier.removeInlineStyle(contentState, selection, fontsize);
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, fontsize) => {
                if (Object.keys(fontSizeStyleMap).includes(fontsize)) {
                    return RichUtils.toggleInlineStyle(state, fontsize);
                }
                return state;
            }, nextEditorState);
        }

        if (!currentStyle.has(`FONT_${FONT_SIZES[id]}`)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                `FONT_${FONT_SIZES[id]}`
            );
        }

        onChange(nextEditorState);
    };

    const getCurrentFontSize = () => {
        const currentStyles = editorState.getCurrentInlineStyle();

        for (let fontsize of FONT_SIZES) {
            if (currentStyles.has(`FONT_${fontsize}`)) {
                return `FONT_${fontsize}`;
            }
        }

        return defaultFontSize;
    }

    const _onFontDropdownToggle = (e) => {
        e.preventDefault();
        setDropdown(!dropdown);
    };

    return (
        <div
            onMouseDown={_onFontDropdownToggle}
            className={"toolbar-option toolbar-font-size-toggle"}
        >
            <div className="toolbar-font-size">
                <p>{getCurrentFontSize() && getCurrentFontSize().substring(5)}</p>
            </div>
            <div className="toolbar-font-size-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M416 416h-25.81L253.1 52.76c-4.688-12.47-16.57-20.76-29.91-20.76s-25.34 8.289-30.02 20.76L57.81 416H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h96c17.67 0 32-14.31 32-32s-14.33-32-32-32H126.2l17.1-48h159.6l17.1 48H320c-17.67 0-32 14.31-32 32s14.33 32 32 32h96c17.67 0 32-14.31 32-32S433.7 416 416 416zM168.2 304L224 155.1l55.82 148.9H168.2z"/>
                </svg>
            </div>
            {dropdown? <div className="font-size-dropdown">
                {FONT_SIZES.map((fontsize, idx) => {
                    return (
                        <div
                            onMouseDown={(e) => handleFontSize(e, idx)}
                            className="font-size-option"
                            key={idx}
                        >
                            <div className="font-size">
                                {fontsize}
                            </div>
                        </div>
                    );
                })}
            </div> : null}
        </div>
    );
}
