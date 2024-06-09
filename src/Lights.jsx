import { Float, useVideoTexture} from '@react-three/drei';
import TexturedSpotLight from './TexturedSpotLight';
import { animated } from '@react-spring/three';

export default function Lights({position, intensityL})
{
    return <>
        <Float
            speed={1} // Animation speed, defaults to 1
            // rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 3]} 
            floatIntensity={4} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.1, 0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
            <TexturedSpotLight 
                castShadow 
                decay={0} 
                intensity={5} 
                angle={Math.PI/4} 
                penumbra={1} 
                position={position}/>
            <animated.pointLight 
                castShadow 
                intensity={5} 
                position={position} />
        </Float>
        <animated.ambientLight intensity={intensityL} />
        <animated.directionalLight castShadow position={[1,2,3]} intensity={intensityL} />
    </>
}