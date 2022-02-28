import React, { useState } from 'react';

import ChillEditor from './components/ChillEditor/ChillEditor';
import Audio from './components/Audio/Audio';

export default function MainEditor(props){
    const [ backgroundImage, setBackgroundImage ] = useState();

    const alterBg = (img) => {
        setBackgroundImage(img);
    }

    return (
        <>
            <ChillEditor bgImage={backgroundImage} />
            <Audio alterBg={alterBg} />
        </>
    )
}
