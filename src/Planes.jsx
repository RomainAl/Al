export default function Planes({ children, ...props }){

    return <>
        <mesh  
            position-y={-1}
            // position-x={!screenSize.isPaysage?-1:0}
            rotation-x={-Math.PI*0.5}
            // rotation-y={!screenSize.isPaysage? Math.PI*0.5:0}
            {...props}>
                {children}
        </mesh>
        <mesh 
            position-y={1}
            // position-x={!screenSize.isPaysage?1:0}
            rotation-x={Math.PI*0.5}
            // rotation-y={!screenSize.isPaysage?-Math.PI*0.5:0}
            {...props}>
                {children}
        </mesh>
    </>
}