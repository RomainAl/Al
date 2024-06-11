import { useFrame, useThree } from '@react-three/fiber';
import { Wireframe } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { animated, useSpring, useSpringRef } from '@react-spring/three';
import useGame from './stores/useGame';

export default function Monolith(props){

    const [click, setClick] = useState(false);
    const refMesh = useRef();
    
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
        </animated.mesh>
    </>
}