import Experience from "./Experience";
import { useState } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import useGame from "./stores/useGame";

export default function App(){
    const [dpr, setDpr] = useState(2);
    console.log("🚀 ~ App ~ dpr:", dpr);
    const position_start = useGame((state)=>state.position_start)
    
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
                position: [position_start.x,position_start.y,position_start.z]
            } }
        >   
                <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1.5)} >
                    <Experience />
                    <Perf position="top-right" />
                </PerformanceMonitor>
            </Canvas>
}