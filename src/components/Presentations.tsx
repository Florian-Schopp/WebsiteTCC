
import React from 'react';
import ReactPlayer from 'react-player'
function Presentation() {
    return (
        <div className='Column-Container'>
            <div className='Column'>
                <h1>Presentation Siicusp (pt)</h1>
                <ReactPlayer
                    className='react-player fixed-bottom'
                    url='Sicusp.mp4'
                    width='100%'
                    height='100%'
                    controls={true}

                />

            </div>
            <div className='Column'>
                <h1>Presentation TCC (pt)</h1>
                <ReactPlayer
                    className='react-player fixed-bottom'
                    url='TCC.mp4'
                    width='100%'
                    height='100%'
                    controls={true}

                />

            </div>
        </div >
    );
}

export default Presentation;