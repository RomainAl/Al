import { useFrame, useThree } from '@react-three/fiber';
import { Wireframe } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { animated, useSpring, useSpringRef } from '@react-spring/three';

export default function HtmlMesh(props){

    const { viewport, camera } = useThree();
    const w = viewport.width;
    const h = viewport.height;
    const [op, setOp] = useState(0);
    const [click, setClick] = useState(false);
    const refMesh = useRef();
    
    useFrame((state)=>{
        const algoCamDist = ((8 - state.camera.position.length())/8);
        setOp(algoCamDist);
        const ww = refMesh.current.scale.y * ((state.camera.position.length())/8 + w/h * algoCamDist);
    })

    return <>

        <animated.mesh 
            ref={refMesh}
            {...props}
            onPointerDown={() => setClick(true)} 
            onPointerLeave={() => setClick(false)}>
            <boxGeometry args={[1,1,1]}/>
            <Wireframe 
                simplify={true} 
                squeeze={true}
                squeezeMin={0.3}
                squeezeMax={1}
                stroke={"#000000"} />
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
        </animated.mesh>
    </>
}