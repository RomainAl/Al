import { CameraControls } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber'
import Model from './Model';
import PostProd from './PostProd';
import Lights from './Lights';
import HtmlMesh from './HtmlMesh';
import Planes from './Planes';
import { useControls, button } from 'leva';
import { useSpring } from '@react-spring/three';
import useGame from './stores/useGame';
// import Models from './Models';
// import CameraControls2 from 'camera-controls';


export default function Experience()
{   
    const { width: w, height: h } = useThree((state) => state.viewport);
    const { gl } = useThree();
    const refCam = useRef();
    useControls({
        MoveF: button(() => { refCam.current?.dolly(3, true)}),
        MoveB: button(() => { refCam.current?.dolly(-3, true)}),
        Rot0: button(() => { refCam.current?.setPosition(0, 0, refCam.current?.getPosition().length(), true) }),
        Rot1: button(() => { refCam.current?.setPosition(refCam.current?.getPosition().length(), 0, 0, true) }),
        Rot2: button(() => { refCam.current?.setPosition(0, 0, -refCam.current?.getPosition().length(), true) }),
        Rot3: button(() => { refCam.current?.setPosition(-refCam.current?.getPosition().length(), 0, 0, true) }),
    })
    
    const gototaf = useGame((state) => state.gototaf);

    useEffect(()=>{
        const unsubscribeGototaf = useGame.subscribe(
            (state) => state.position,
            (value) =>
            {
                if (value.length() > 1){
                    refCam.current?.setPosition(value.x, value.y, value.z, true);
                } else {
                    refCam.current?.setPosition(
                        refCam.current?.getPosition().length()*value.x, 
                        refCam.current?.getPosition().length()*value.y, 
                        refCam.current?.getPosition().length()*value.z, true);
                }
            }
        )

        return () =>
            {
                unsubscribeGototaf();
            }
    }, [])

    const [springs] = useSpring(
        () => ({ 
            from: { pos: [0,0,8], intensityL: 0 }, 
            to: { pos: [0,0,0], intensityL: 0.05 },
            config: { duration: 5000 }
            }));

    return <>
        <color args={ [ 'black' ] } attach="background" />
        {/* <fog attach="fog" args={['black', 1, 10]} /> */}

        <CameraControls
            ref={refCam}
            enableZoom={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            smoothTime= {0.8}
            maxDistance= {8}
            minDistance= {0.5*w/h}
            azimuthRotateSpeed= {0.4}
            dollySpeed= {0.7}
            touches={{  one: 0, 
                        two: 8, 
                        three: 1}} // 1 = ROTATE, 8 = DOLLY, 0 = NONE
            />
        
        <PostProd/>
        <Lights position={springs.pos} intensityL={springs.intensityL}/>
        <Suspense>
            <Model/>
            {/* <Models/> */}
        </Suspense>
        <HtmlMesh position={springs.pos} />
        <Planes scale={ 15 } receiveShadow>
            <planeGeometry />
            <meshStandardMaterial color="black"/>
        </Planes>

    </>
}