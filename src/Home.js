import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
    return (
        <div className="home">
            <h1><span>Chill</span>DRAFTS</h1>
            <p>Ever found yourself looking at an empty Google Doc or Microsoft
                Word document with no clue about what you should write? Is it
                really a lack of creativity, or are the imposing structures of
                those word processors to blame for the intimidation? ChillDRAFT
                has got you covered! Write away without the distrating toolbars,
                with a view of an outstanding environment of your choice with
                ambient music to match! Start writing now!
            </p>
            <Link to="editor">
                Go to Editor!
            </Link>
        </div>
    );
}
