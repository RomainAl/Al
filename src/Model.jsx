// import { useGLTF } from '@react-three/drei'
// export default function Model({material})
// {
//     const model = useGLTF('./model/PontFerro05.glb');
//     model.nodes.PontFerro.castShadow = true;
//     return <primitive object={ model.scene } />
// }
// useGLTF.preload('./model/PontFerro05.glb')

// import { useGLTF } from '@react-three/drei'
// export default function Model() {
//   const { nodes, materials } = useGLTF('./PontFerro05.glb')
//   return (
//       <mesh
//         castShadow
//         // receiveShadow
//         geometry={nodes.PontFerro.geometry}
//         material={materials.PontFerroMat}
//         position={[0, -0.151, 0]}
//         rotation={[0.064, 0.048, -0.003]}
//       />
//   )
// }
// useGLTF.preload('./PontFerro05.glb')


import { Gltf } from '@react-three/drei'
export default function Model() {
  return (
     <Gltf castShadow visible={true} src="./PontFerro05.glb" />
  )
}
