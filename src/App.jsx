import Experience from "./Experience";
import { useState } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import useGame from "./stores/useGame";

export default function App(){
    const [dpr, setDpr] = useState(2);
    const position = useGame((state)=>state.position)
    // console.log(dpr);

    return <Canvas
            gl={{ antialias: true }}
            dpr={dpr}
            // frameloop="demand"
            shadows
            eventSource={document.getElementById('root')}
            camera={ {
                fov: 75,
                near: 0.1,
                far: 13,
                position: position
            } }
        >   
                <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1.5)} >
                    <Experience />
                    {/* <Perf position="top-left" /> */}
                </PerformanceMonitor>
            </Canvas>
}