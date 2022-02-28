import React, { useState, useEffect } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';

import { fontFamilyStyleMap } from '../../fontFamilyStyleMap';

export default function FontFamily(props) {
    const { editorState, onChange } = props;
    const [ defaultFontFamily, setDefaultFontFamily ] = useState();
    const [ dropdown, setDropdown ] = useState(false);
    const FONT_FAMILIES = ['Times New Roman', 'Montserrat', 'Roboto'];
    const FONT_MAPPING = {
        FONT_TIMESNEWROMAN: 'Times New Roman',
        FONT_MONTSERRAT: 'Montserrat',
        FONT_ROBOTO: 'Roboto',
    };

    useEffect(() => {
        const editorElm = document.getElementsByClassName('DraftEditor-root');
        if (editorElm && editorElm.length > 0) {
            const editorStyles = window.getComputedStyle(editorElm[0]);
            let presetFontFamily = editorStyles.getPropertyValue('font-family');
            presetFontFamily = presetFontFamily.replace(/\s+/g, '').toUpperCase();
            presetFontFamily = presetFontFamily.substring(1, presetFontFamily.length - 1);
            setDefaultFontFamily('FONT_' + presetFontFamily);
            console.log('FONT_' + presetFontFamily);
        }
    }, []);

    const handleFontFamily = (e, id) => {
        e.preventDefault();
        const selection = editorState.getSelection();

        const nextContentState = Object.keys(fontFamilyStyleMap)
            .reduce((contentState, fontfamily) => {
                return Modifier.removeInlineStyle(contentState, selection, fontfamily);
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, fontfamily) => {
                if (Object.keys(fontFamilyStyleMap).includes(fontfamily)) {
                    return RichUtils.toggleInlineStyle(state, fontfamily);
                }
                return state;
            }, nextEditorState);
        }

        if (!currentStyle.has(`FONT_${FONT_FAMILIES[id].replace(/\s+/g, '').toUpperCase()}`)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                `FONT_${FONT_FAMILIES[id].replace(/\s+/g, '').toUpperCase()}`
            );
        }

        onChange(nextEditorState);
    };

    const getCurrentFontFamily = () => {
        const currentStyles = editorState.getCurrentInlineStyle();

        for (let fontfamily of FONT_FAMILIES) {
            if (currentStyles.has(`FONT_${fontfamily.replace(/\s+/g, '').toUpperCase()}`)) {
                return `FONT_${fontfamily.replace(/\s+/g, '').toUpperCase()}`;
            }
        }

        return defaultFontFamily;
    }

    const _onFontDropdownToggle = (e) => {
        e.preventDefault();
        setDropdown(!dropdown);
    };

    return (
        <div
            onMouseDown={_onFontDropdownToggle}
            className={"toolbar-option toolbar-font-family-toggle"}
        >
            <div className="toolbar-font-family">
                <p>{getCurrentFontFamily() && FONT_MAPPING[getCurrentFontFamily()]}</p>
            </div>
            <div className="toolbar-font-family-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M416 416h-25.81L253.1 52.76c-4.688-12.47-16.57-20.76-29.91-20.76s-25.34 8.289-30.02 20.76L57.81 416H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h96c17.67 0 32-14.31 32-32s-14.33-32-32-32H126.2l17.1-48h159.6l17.1 48H320c-17.67 0-32 14.31-32 32s14.33 32 32 32h96c17.67 0 32-14.31 32-32S433.7 416 416 416zM168.2 304L224 155.1l55.82 148.9H168.2z"/>
                </svg>
            </div>
            {dropdown? <div className="font-family-dropdown">
                {FONT_FAMILIES.map((fontfamily, idx) => {
                    return (
                        <div
                            onMouseDown={(e) => handleFontFamily(e, idx)}
                            className="font-family-option"
                            key={idx}
                        >
                            <p className="font-family">
                                {fontfamily}
                            </p>
                        </div>
                    );
                })}
            </div> : null}
        </div>
    );
}
