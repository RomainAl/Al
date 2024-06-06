import Model from "./Model";
import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'
const o = new THREE.Object3D()


export default function Models({ count = 2, size = [0.15, 0.15, 0.15], ...props }) {
        const { nodes, materials } = useGLTF('./PontFerro05.glb')
        const ref = useRef()
        useLayoutEffect(() => {
          // Set positions
          for (let i = 0; i < count; i++) {
            o.rotation.set(0, i*Math.PI/2, 0)
            o.updateMatrix()
            ref.current.setMatrixAt(i, o.matrix)
          }
          // Update the instance
          ref.current.instanceMatrix.needsUpdate = true
        }, [count])
    return (
        <group {...props}>
            <instancedMesh 
                ref={ref} 
                args={[null, null, count]} 
                castShadow
                // receiveShadow
                geometry={nodes.PontFerro.geometry}
                material={materials.PontFerroMat}
                position={[0, -0.151, 0]}
                rotation={[0.064, 0.048, -0.003]}/>
        </group>
    )
}

useGLTF.preload('./PontFerro05.glb')