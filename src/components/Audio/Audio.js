import { useState, useEffect, useRef } from 'react';
import { music } from './music';

export default function Audio({ alterBg }) {
    const [song, setSong] = useState({
        ...music[0],
        volume: 0.8
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();
    const volumeRef = useRef();

    useEffect(() => {
        alterBg(song.background_image);
    }, [song]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const playPause = () => {
        setIsPlaying(!isPlaying);
    };

    const changeTrack = (id) => {
        if (id === song.id) {
            return;
        }
        setSong({
            ...music[id - 1],
            volume: audioRef.current.volume
        });
        playPause();
    };

    const changeVolume = () => {
        audioRef.current.volume = volumeRef.current.value;
        volumeRef.current.style.setProperty('--seek-before-width',
            `${volumeRef.current.value * 100}%`);
    };

    return (
        <div className="experience">
            <div className="audio-controls">
                <audio ref={audioRef} src={song.song} loop type="audio/mpeg"></audio>
                <div className="volume-control">
                    <div className="volume-control-input">
                        <input onChange={changeVolume} ref={volumeRef} className="volume-bar" type="range" min="0" max="1" step="0.01" defaultValue={song.volume}/>
                    </div>
                </div>
                <div className="play-pause-control" onClick={playPause}>
                    {isPlaying ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/>
                        </svg>
                    }
                </div>
                <div className="choose-song-control">
                    {music.map(track => {
                        let selected = track.id === song.id ? 'song-selected' : ''
                        let selectedClass = `song-choice ${selected}`
                        return (
                            <div 
                                key={track.id} 
                                className={selectedClass}
                                onClick={() => changeTrack(track.id)}
                            >
                                <div 
                                    style={{
                                        backgroundImage: `url(${track.icon})`,
                                        backgroundSize: '70% 70%',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                ></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
