import { CameraControls } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber'
import Model from './Model';
import PostProd from './PostProd';
import Lights from './Lights';
import Monolith from './Monolith';
import Pages from './Pages';
import Planes from './Planes';
// import { useControls, button } from 'leva';
import { useSpring, useSpringRef } from '@react-spring/three';
import useGame from './stores/useGame';
import { easings } from '@react-spring/web'
// import Models from './Models';
// import CameraControls2 from 'camera-controls';


export default function Experience()
{   
    const { width: w, height: h } = useThree((state) => state.viewport);
    const refCam = useRef();
    const speedTransition = useGame((state) => state.speedTransition);
    const position_start = useGame((state) => state.position_start);
    const htmlMeshScale = useGame((state)=> state.htmlMeshScale);
    
    // useControls({
    //     MoveF: button(() => { refCam.current?.dolly(3, true)}),
    //     MoveB: button(() => { refCam.current?.dolly(-3, true)}),
    //     Rot0: button(() => { refCam.current?.setPosition(0, 0, refCam.current?.getPosition().length(), true) }),
    //     Rot1: button(() => { refCam.current?.setPosition(refCam.current?.getPosition().length(), 0, 0, true) }),
    //     Rot2: button(() => { refCam.current?.setPosition(0, 0, -refCam.current?.getPosition().length(), true) }),
    //     Rot3: button(() => { refCam.current?.setPosition(-refCam.current?.getPosition().length(), 0, 0, true) }),
    // })

    const [startAnim] = useSpring(
        () => ({ 
            from: { pos: [position_start.x,position_start.y,position_start.z-htmlMeshScale], intensityL: 0 }, 
            to: { pos: [0,0,0], intensityL: 0.05 },
            delay: 2000,
            config: { duration: 6000, easing: easings.easeInOutCubic }
            }));

    const [camTarget, setCamTarget] = useState();
    const camTransition = (event)=>{
        api.start({ scale: Math.abs(event.target.getPosition().y)>0.05?
                    [(htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(event.target.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight,
                     (htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(event.target.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight,
                      htmlMeshScale]
                    :
                    [(htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(event.target.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight, 
                      htmlMeshScale, 
                     (htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(event.target.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight]
                 });
    };

    const [{scale}, api] = useSpring(()=>({ scale: [htmlMeshScale,htmlMeshScale,htmlMeshScale],
                                                    // target: camTarget,
                                            config: { duration: 2000, easing: easings.easeOutQuad  }
                                            }))
    const {target} = useSpring({
        target: camTarget,
        config: { duration: 2000 }
    })
    
    useEffect(()=>{ // TODO SURE ??
        api.start({ scale: Math.abs(refCam.current.getPosition().y)>0.05?
            [(htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(refCam.current.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight,
             (htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(refCam.current.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight,
              htmlMeshScale]
            :
            [(htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(refCam.current.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight, 
              htmlMeshScale, 
             (htmlMeshScale*(1-window.innerWidth/window.innerHeight)/(position_start.length()-0.5*htmlMeshScale*window.innerWidth/window.innerHeight))*(refCam.current.getPosition().length() - 0.5*htmlMeshScale*window.innerWidth/window.innerHeight)+htmlMeshScale*window.innerWidth/window.innerHeight]
         });
    }, [w,h]);

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

        refCam.current?.addEventListener('transitionstart', camTransition);
        setCamTarget(refCam.current?.camera);

        return () =>
            {
                unsubscribeGototaf();
                refCam.current?.removeEventListener('transitionstart', camTransition);
            }
    }, [])

    return <>
        <color args={ [ 'black' ] } attach="background" />
        {/* <fog attach="fog" args={['black', 1, 10]} /> */}

        <CameraControls
            ref={refCam}
            enableZoom={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            smoothTime= {speedTransition}
            maxDistance= {8}
            minDistance= {0.5*htmlMeshScale*window.innerWidth/window.innerHeight+0.33}
            azimuthRotateSpeed= {0.4}
            dollySpeed= {0.7}
            touches={{  one: 8, 
                        two: 8, 
                        three: 1}} // 1 = ROTATE, 8 = DOLLY, 0 = NONE
            mouseButtons={{ left: 0,
                            right: 0,
                            wheel: 8,
                            middle: 0}}
            />
        
        <PostProd/>
        <Lights position={startAnim.pos} intensityL={startAnim.intensityL} target={target}/>
        <Suspense>
            <Model/>
        </Suspense>
        <Monolith position={startAnim.pos} scale={scale} />
        {/* <Pages htmlMeshScale={htmlMeshScale}/> */}
        <Planes scale={ 15 } receiveShadow>
            <planeGeometry />
            <meshStandardMaterial color="black" metalness = {0.3} roughness = {0.8}/>
        </Planes>

    </>
}