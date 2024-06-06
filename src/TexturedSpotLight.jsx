import { useVideoTexture } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated } from '@react-spring/three';

export default function TexturedSpotLight(props)
{
  const texture = useVideoTexture('./VideoTexture.mp4');
  // const texture = useTexture('./disturb.jpg');
  const ref = useRef();

  useFrame((state, delta) => {
      ref.current.target = state.camera;
  })

  return <animated.spotLight 
        ref={ref}
        map={texture}
        // color={'#FFFFFF'}
        {...props}
        />

}