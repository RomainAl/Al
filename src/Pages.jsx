import { useFrame, useThree } from '@react-three/fiber';
import { Wireframe } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { animated, useSpring, useSpringRef } from '@react-spring/three';
import useGame from './stores/useGame';
import VimeoPlayer from './VimeoPlayer';

export default function Monolith({props, htmlMeshScale}){

    const { size, viewport } = useThree();
    const wh = viewport.width/viewport.height;
    const h = size.height;
    const w = size.width;
//     const [op, setOp] = useState(0);
    const [click, setClick] = useState(false);
    const refMesh = useRef();
//     const htmlMeshScale = useGame((state)=>state.htmlMeshScale);
    
    return <>

        <Html 
            className="html" 
            wrapperClass='html2'
            transform
            occlude
            distanceFactor={ 1/8 }
            position={[0,0,htmlMeshScale*wh/2+0.02]}
            zIndexRange={[100, 0]}
        //     onPointerDown={(e) => {e.preventDefault();}}
        //     onScroll = {(e) => {e.preventDefault();}}
        //     onPointerMove = {(e) => {e.preventDefault();}}
            style={{
                width: `${w}px`,
                height: `${h}px`,
                background: '#FF0000',
                opacity: 0.5,
                pointerEvents:'none',
                prepend: true,
                // userSelect: 'none',
                display: 'grid',
                // flexWrap: 'wrap',
                gridTemplateColumns: '1fr',
                overflowX: 'auto',
                overflowY: 'auto',
                // justifyContent: 'space-around',
                border: "none"
            }}
            >
                
                <section className="video"
                        style= {{display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0,
                                width: '100%',
                                height: '100%',
                                }}>
                <h1>BLABLA TITRE</h1>
                <VimeoPlayer id='750452856' width={w>h?`${w}px`:'auto'} height={h>w?`${h}px`:'auto'}/>
                {/* <div style={{padding:'56.25% 0 0 0',
                                position:'relative'}}>
                        <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae&title=0&byline=0&portrait=0" 
                                style={{position:'absolute',
                                        top:0,
                                        left:0,
                                        width:'100%',
                                        height:'100%',
                                        border:'none'}} 
                                allow="autoplay; fullscreen; picture-in-picture"
                        ></iframe>
                </div> */}
                <p>BLABLA DESCRIPTION</p>
                </section>

                    {/* <iframe src="https://bruno-simon.com/html/" /> */}
                    {/* <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe> */}
                    {/* <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe> */}
            </Html>
    </>

    {/* <Html 
                transform
                className="label"
                distanceFactor={ 0.333 }
                occlude="blending"
                position={[0,0,0.501]}
                center
                style={{ 
                    width: `${3*450*width}px`,
                    height: '1350px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    justifyContent: 'space-around',
                    opacity: op,
                    background: '#FF0000'
                }}
                >

                    <iframe src="https://player.vimeo.com/video/750452856?h=5fb4a2d225" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://player.vimeo.com/video/903302986?h=fd8a1563ae" width="854" height="480" allow="autoplay; fullscreen; picture-in-picture"></iframe>
            </Html> */}

}